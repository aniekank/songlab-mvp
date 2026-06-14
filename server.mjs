import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

function loadLocalEnv() {
  try {
    const envText = readFileSync(join(root, ".env"), "utf8");
    envText.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
      const [key, ...valueParts] = trimmed.split("=");
      if (!process.env[key]) {
        process.env[key] = valueParts.join("=").replace(/^['"]|['"]$/g, "");
      }
    });
  } catch {
    // .env is optional for local prototyping.
  }
}

loadLocalEnv();

const port = Number(process.env.PORT || 4181);
const apiKey = process.env.OPENAI_API_KEY || "";
const analysisModel = process.env.OPENAI_ANALYSIS_MODEL || "gpt-4.1-mini";
const transcribeModel = process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe";

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webm": "audio/webm",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(JSON.stringify(payload));
}

async function readJson(req, limit = 30 * 1024 * 1024) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function transcriptWords(text) {
  return String(text || "").toLowerCase().match(/[a-z0-9']+/g) || [];
}

function repeatedPhraseScore(words) {
  if (words.length < 6) return 1;
  const counts = new Map();
  for (let size = 2; size <= 4; size += 1) {
    for (let index = 0; index <= words.length - size; index += 1) {
      const phrase = words.slice(index, index + size).join(" ");
      counts.set(phrase, (counts.get(phrase) || 0) + 1);
    }
  }
  return Math.max(...counts.values(), 1);
}

function localSongAnalysis({ transcript = "", context = {}, source = "local" }) {
  const words = transcriptWords(transcript);
  const unique = new Set(words);
  const repeated = repeatedPhraseScore(words);
  const hook = context.hook || "";
  const concept = context.concept || "";
  const hookWords = new Set(transcriptWords(hook).filter((word) => word.length > 3));
  const hookHits = words.filter((word) => hookWords.has(word)).length;
  const concreteHits = words.filter((word) => /phone|door|car|room|bed|light|table|street|glass|hand|window|key|porch|mirror|floor/.test(word)).length;
  const sectionCount = Math.max(2, Math.min(6, Math.ceil(words.length / 55)));
  const score = {
    concept: Math.min(100, Math.round((concept ? 54 : 28) + concreteHits * 5 + Math.min(words.length, 80) * 0.25)),
    hook: Math.min(100, Math.round((hook ? 42 : 24) + hookHits * 11 + repeated * 7)),
    lyrics: Math.min(100, Math.round(34 + Math.min(unique.size, 80) * 0.35 + concreteHits * 6)),
    structure: Math.min(100, Math.round(42 + sectionCount * 8 + (words.length > 80 ? 10 : 0))),
    replay: Math.min(100, Math.round(34 + repeated * 10 + hookHits * 8)),
    performance: Math.min(100, Math.round(48 + (context.notes ? 14 : 0) + (words.length > 40 ? 10 : 0))),
  };
  const overall = Math.round(Object.values(score).reduce((sum, item) => sum + item, 0) / Object.keys(score).length);
  const sections = ["Intro / setup", "Verse / scene", "Hook / title return", "Second pass / development", "Outro / final image"].slice(0, sectionCount);
  const repairs = [];
  if (score.concept < 70) repairs.push("Sharpen the concept into person, setting, behavior, and contradiction.");
  if (score.hook < 70) repairs.push("Repeat the title phrase in two obvious places and one unexpected answer.");
  if (score.lyrics < 70) repairs.push("Trade one abstract emotion for a visible object, action, or place.");
  if (score.structure < 70) repairs.push("Give the second hook one new reason to exist: harmony, silence, lyric turn, or ad-lib response.");
  if (!repairs.length) repairs.push("Record one cleaner take and exaggerate the emotional turn before adding more production.");
  return {
    mode: source,
    transcript,
    titleCandidates: hook ? [hook] : words.slice(0, 8).join(" ") ? [words.slice(0, 4).join(" ")] : [],
    sections: sections.map((name, index) => ({
      name,
      start: index === 0 ? "0:00" : "estimate",
      job: index === 0 ? "establish the world" : index === 2 ? "deliver the memory point" : "move the story forward",
      notes: "Local estimate. AI/audio-backed section timing improves with API transcription.",
    })),
    scores: { ...score, overall },
    strengths: [
      hook ? `The hook target "${hook}" gives the analysis a memory candidate.` : "The take has enough language to begin finding a memory point.",
      repeated > 1 ? "Repeated language is starting to create replay behavior." : "The draft is still open enough to choose a stronger repeatable phrase.",
    ],
    repairs,
    nextTakeDirection: "Do one pass where the hook lands earlier, then leave one beat of air after the title.",
  };
}

async function transcribeAudio(audio) {
  if (!audio?.base64) return "";
  const bytes = Buffer.from(audio.base64, "base64");
  const form = new FormData();
  const blob = new Blob([bytes], { type: audio.mimeType || "audio/webm" });
  form.append("file", blob, audio.filename || "songlab-take.webm");
  form.append("model", transcribeModel);
  form.append("response_format", "json");
  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}` },
    body: form,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Transcription failed: ${response.status} ${errorText.slice(0, 240)}`);
  }
  const data = await response.json();
  return data.text || "";
}

async function analyzeWithOpenAI(payload) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: analysisModel,
      input: [
        {
          role: "system",
          content: "You are SongLab's AI Song Analyst for producer-songwriters. Analyze only the user's provided or owned lyrics/audio transcript. Do not quote or reproduce commercial lyrics beyond what the user supplied. Return compact, practical JSON for songwriting improvement.",
        },
        {
          role: "user",
          content: JSON.stringify({
            task: "Analyze songwriting, section jobs, hook strength, replay value, lyric specificity, and performance direction.",
            transcript: payload.transcript,
            context: payload.context || {},
          }),
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "song_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["mode", "transcript", "titleCandidates", "sections", "scores", "strengths", "repairs", "nextTakeDirection"],
            properties: {
              mode: { type: "string" },
              transcript: { type: "string" },
              titleCandidates: { type: "array", items: { type: "string" } },
              sections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["name", "start", "job", "notes"],
                  properties: {
                    name: { type: "string" },
                    start: { type: "string" },
                    job: { type: "string" },
                    notes: { type: "string" },
                  },
                },
              },
              scores: {
                type: "object",
                additionalProperties: false,
                required: ["concept", "hook", "lyrics", "structure", "replay", "performance", "overall"],
                properties: {
                  concept: { type: "number" },
                  hook: { type: "number" },
                  lyrics: { type: "number" },
                  structure: { type: "number" },
                  replay: { type: "number" },
                  performance: { type: "number" },
                  overall: { type: "number" },
                },
              },
              strengths: { type: "array", items: { type: "string" } },
              repairs: { type: "array", items: { type: "string" } },
              nextTakeDirection: { type: "string" },
            },
          },
        },
      },
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Analysis failed: ${response.status} ${errorText.slice(0, 240)}`);
  }
  const data = await response.json();
  const outputText = data.output_text || data.output?.flatMap((item) => item.content || []).find((item) => item.text)?.text || "";
  if (!outputText) throw new Error("Analysis returned no text.");
  return JSON.parse(outputText);
}

async function handleAnalyze(req, res) {
  try {
    const body = await readJson(req);
    const ownsRights = body.ownsRights !== false;
    if (!ownsRights) {
      sendJson(res, 400, { error: "Only upload or paste audio/lyrics you own or have permission to analyze." });
      return;
    }
    let transcript = String(body.transcript || "").trim();
    let mode = apiKey ? "ai" : "local";
    if (apiKey && body.audio?.base64) {
      transcript = await transcribeAudio(body.audio);
    }
    if (!apiKey && body.audio?.base64 && !transcript) {
      sendJson(res, 400, { error: "Audio upload received. Add OPENAI_API_KEY in .env and restart the server to transcribe uploaded audio, or paste a transcript for local analysis." });
      return;
    }
    if (!transcript) {
      sendJson(res, 400, { error: "Add a recording, upload audio, or paste transcript/lyrics before analysis." });
      return;
    }
    const payload = { transcript, context: body.context || {} };
    const analysis = apiKey ? await analyzeWithOpenAI(payload) : localSongAnalysis({ ...payload, source: "local" });
    analysis.mode = mode;
    analysis.transcript = transcript;
    sendJson(res, 200, { analysis, apiEnabled: Boolean(apiKey) });
  } catch (error) {
    sendJson(res, 500, {
      error: error.message || "Song analysis failed.",
      fallback: localSongAnalysis({ transcript: "", source: "local" }),
    });
  }
}

async function serveStatic(req, res) {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const safePath = normalize(requested).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(root, safePath);
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  try {
    const file = await readFile(filePath);
    res.writeHead(200, {
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
      "cache-control": "no-store",
    });
    res.end(file);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true, apiEnabled: Boolean(apiKey), analysisModel, transcribeModel });
    return;
  }
  if (url.pathname === "/api/analyze-song" && req.method === "POST") {
    await handleAnalyze(req, res);
    return;
  }
  if (url.pathname.startsWith("/api/")) {
    sendJson(res, 404, { error: "Unknown API route." });
    return;
  }
  await serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`SongLab server running at http://127.0.0.1:${port}`);
  console.log(apiKey ? "AI analysis enabled." : "OPENAI_API_KEY not set. Using local heuristic analysis.");
});
