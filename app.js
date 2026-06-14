const state = {
  appMode: "songwriter",
  proficiency: "standard",
  activeView: "dashboard",
  activeCase: "max-martin-blinding-lights",
  activeFilter: "All",
  activeRisk: "queen-bohemian-rhapsody",
  activeRiskFilter: "All",
  activeSessionFilter: "All",
  activeMixGuideStyle: "R&B",
  lane: "R&B",
  references: [],
  craftDrafts: {},
  benchScores: {},
  activeWorkshop: "reality",
  workshopAnswers: {},
  currentBlueprint: null,
  activePro: "max-martin",
  activeProFilter: "All",
  activeGlossarySection: "terms",
  activeGlossaryFilter: "All",
  activeSoundFamily: "All",
  activeAcousticTopic: "All",
  glossarySearch: "",
  lastLyricSuggestions: null,
  lastVocalPlan: null,
  proAudioUrl: "",
  streamRefs: [],
  songAnalysis: null,
  analystAudio: null,
  analystApiEnabled: false,
  flow: {
    doctorRan: false,
    studyOpened: false,
    hookSaved: false,
  },
  creation: {
    beatUrl: "",
    beatName: "No beat loaded",
    loopOn: true,
    bpm: 92,
    createMode: "start",
    template: "pop-rnb",
    activeGenreProfile: "drill",
    title: "",
    tempoKey: "",
    concept: "",
    hook: "",
    freewrite: "",
    flowPromptIndex: 0,
    flowCaptures: [],
    sections: {},
    sectionBars: {},
  },
  audio: {
    audioUrl: "",
    trackName: "No track loaded",
    duration: 0,
    bpm: null,
    bpmConfidence: 0,
    peaks: [],
    markers: [],
    loopOn: false,
    markerSeed: 1,
  },
};

const viewTitles = {
  dashboard: "Home",
  create: "Create",
  workshop: "Workshop",
  pros: "Pro Playbook",
  cases: "Case Studies",
  risk: "Creative Risk Lab",
  session: "Session Greats",
  glossary: "Glossary",
  audio: "Audio Lab",
  mixguide: "Mix Guide",
  analyst: "AI Analyst",
  doctor: "Song Doctor",
  hooks: "Hook Sprint",
  vault: "Reference Vault",
};

const proficiencyLevels = {
  starter: {
    label: "Starter",
    dashboardTitle: {
      songwriter: "Write one hook.",
      producer: "Play the beat and find the moment.",
      artist: "Record one take.",
      engineer: "Make the vocal clear.",
    },
    dashboardCopy: {
      songwriter: "Play the track, write the main phrase, and keep the line that feels easiest to repeat.",
      producer: "Load the beat, listen for the strongest part, and decide where the vocal should enter.",
      artist: "Press record, sing or rap the feeling, listen back, and keep the best phrase.",
      engineer: "Play the song and check one thing first: can you hear every important word?",
    },
    pathTitle: "One move",
    pathCopy: "Stay on this page until you have one useful take, phrase, or playback note.",
  },
  simple: {
    label: "Simple",
    dashboardTitle: {
      songwriter: "Make the song easy to sing.",
      producer: "Turn the beat into a record.",
      artist: "Record the feeling first.",
      engineer: "Make it sound clear everywhere.",
    },
    dashboardCopy: {
      songwriter: "Pick a genre, play the beat, write the main idea, then shape the hook.",
      producer: "Load audio, mark the best moments, and leave room for the vocal.",
      artist: "Record a rough take, play it back, keep the best lines, and try again.",
      engineer: "Load the song, check vocal clarity, balance, loudness, and export the right version.",
    },
    pathTitle: "Start here",
    pathCopy: "Use the first card, finish one small move, then continue only when you need more detail.",
  },
  standard: {
    label: "Standard",
  },
  deep: {
    label: "Deep",
  },
};

const glossaryTerms = [
  {
    term: "Concept",
    category: "Songwriting",
    definition: "The one clear idea the song is about.",
    listen: "You should be able to explain the record in one sentence before the beat gets complicated.",
    why: "A strong concept gives the hook, lyrics, performance, and production one shared target.",
  },
  {
    term: "Hook",
    category: "Songwriting",
    definition: "The most memorable part of the song. It can be a melody, phrase, rhythm, sound, or chorus idea.",
    listen: "The part you can remember after one listen, even if you do not know every lyric.",
    why: "Hooks create recall, replay value, and the moment people share with someone else.",
  },
  {
    term: "Topline",
    category: "Songwriting",
    definition: "The vocal melody and lyric idea written over a track.",
    listen: "Hum the lead vocal without the beat. That is the topline doing its job.",
    why: "A great topline turns production into a song people can sing back.",
  },
  {
    term: "Mumble Pass",
    category: "Songwriting",
    definition: "A first vocal pass using sounds, rhythms, and partial words before writing finished lyrics.",
    listen: "Loose vowels, natural phrases, and melodic shapes that feel good before they make perfect sense.",
    why: "It lets instinct find melody and pocket before the inner editor slows the song down.",
  },
  {
    term: "Title",
    category: "Songwriting",
    definition: "The phrase or idea the listener should remember as the song's identity.",
    listen: "The words that feel like they belong on the playlist, cover art, or chorus.",
    why: "A clear title gives the song a handle and keeps the lyric from wandering.",
  },
  {
    term: "Verse",
    category: "Structure",
    definition: "A section that develops the story, scene, attitude, or details.",
    listen: "More information, less repetition, and a feeling of moving toward the bigger payoff.",
    why: "Verses earn the chorus by giving the listener context and tension.",
  },
  {
    term: "Pre-Chorus",
    category: "Structure",
    definition: "A short section that builds pressure before the chorus lands.",
    listen: "Rising melody, tighter rhythm, or lyric language that says something is about to happen.",
    why: "It makes the chorus feel bigger without needing the chorus to do all the work.",
  },
  {
    term: "Chorus",
    category: "Structure",
    definition: "The main payoff section where the central idea is usually clearest and most repeated.",
    listen: "The part that sounds like the song opening up or becoming easier to remember.",
    why: "The chorus is often where replay value, emotional payoff, and commercial clarity meet.",
  },
  {
    term: "Bridge",
    category: "Structure",
    definition: "A contrasting section that gives the song a new angle before returning to the main idea.",
    listen: "New chords, melody, rhythm, or perspective after the listener already knows the song.",
    why: "It prevents fatigue and can make the final chorus feel earned.",
  },
  {
    term: "Vamp",
    category: "Structure",
    definition: "A repeated section near the end that rides a groove, phrase, or vocal moment.",
    listen: "A song staying in one emotional zone while ad-libs, harmony, or rhythm evolve.",
    why: "Vamps are powerful in R&B, gospel, soul, and live-feeling records because they let performance intensify.",
  },
  {
    term: "Pocket",
    category: "Rhythm",
    definition: "How naturally a vocal, drum, bass, or instrument sits inside the groove.",
    listen: "Nothing feels rushed or late in a distracting way. The part feels locked into the bounce.",
    why: "Pocket is the difference between technically correct and physically undeniable.",
  },
  {
    term: "Cadence",
    category: "Rhythm",
    definition: "The rhythm and pattern of how words or notes are delivered.",
    listen: "Where the vocal speeds up, pauses, punches, drags, or repeats rhythmic shapes.",
    why: "Cadence can make simple lyrics feel addictive and give an artist their identity.",
  },
  {
    term: "Syncopation",
    category: "Rhythm",
    definition: "Emphasizing unexpected beats or spaces instead of only the obvious downbeats.",
    listen: "Vocals, chords, or drums landing slightly around the main pulse in a way that creates bounce.",
    why: "Syncopation adds movement, surprise, and groove without needing more notes.",
  },
  {
    term: "Swing",
    category: "Rhythm",
    definition: "A timing feel where notes are uneven in a musical way rather than perfectly straight.",
    listen: "The groove leans, lopes, or bounces instead of feeling like a rigid grid.",
    why: "Swing makes programmed music feel human and helps R&B, hip-hop, drill, and soul records breathe.",
  },
  {
    term: "Microtiming",
    category: "Rhythm",
    definition: "Tiny timing choices that place parts slightly ahead of or behind the beat.",
    listen: "A snare feels laid back, a hi-hat pushes forward, or a vocal drags in a cool way.",
    why: "Microtiming shapes feel. It is often why one loop feels expensive and another feels flat.",
  },
  {
    term: "Chord Progression",
    category: "Harmony",
    definition: "The order of chords that gives the song its harmonic movement.",
    listen: "The emotional path under the melody, such as tension, lift, sadness, or release.",
    why: "Chords shape the emotional weather the topline lives inside.",
  },
  {
    term: "Voice Leading",
    category: "Harmony",
    definition: "How individual notes inside chords move from one chord to the next.",
    listen: "Smooth inner movement where chords feel connected instead of blocky.",
    why: "Good voice leading makes sophisticated harmony feel natural, especially in R&B, gospel, and neo-soul.",
  },
  {
    term: "Extension",
    category: "Harmony",
    definition: "Extra chord tones beyond the basic triad, like 7ths, 9ths, 11ths, and 13ths.",
    listen: "Color, richness, or tension added to otherwise simple chords.",
    why: "Extensions create the lush feeling common in R&B, gospel, jazz, and neo-soul.",
  },
  {
    term: "Tension and Release",
    category: "Harmony",
    definition: "The push-pull between musical pressure and resolution.",
    listen: "A melody or chord that feels unresolved, then lands somewhere satisfying.",
    why: "Songs need tension so the payoff actually feels like a payoff.",
  },
  {
    term: "Arrangement",
    category: "Production",
    definition: "The way parts enter, leave, and change across the song.",
    listen: "Drops, pauses, added harmonies, drum changes, risers, breakdowns, and space.",
    why: "Arrangement turns a loop into a journey and keeps the listener oriented.",
  },
  {
    term: "Ear Candy",
    category: "Production",
    definition: "Small memorable details that decorate the record without becoming the main idea.",
    listen: "A vocal chop, reverse, percussion hit, ad-lib, fill, texture, or transition.",
    why: "Ear candy rewards repeat listens, but too much can distract from the song.",
  },
  {
    term: "Negative Space",
    category: "Production",
    definition: "Intentional emptiness in the track.",
    listen: "Moments where fewer sounds let the vocal, groove, or hook breathe.",
    why: "Space makes important parts feel larger and keeps production from crowding the artist.",
  },
  {
    term: "Drop",
    category: "Production",
    definition: "A section where energy hits after a buildup or setup.",
    listen: "Drums, bass, hook, or rhythm entering with a noticeable lift.",
    why: "Drops create physical payoff and can become the clipable moment of the record.",
  },
  {
    term: "Vocal Stack",
    category: "Performance",
    definition: "Multiple vocal takes layered together for thickness, width, or harmony.",
    listen: "A lead vocal gets bigger, wider, or more emotional without changing the main melody.",
    why: "Stacks can make a hook feel expensive and give R&B, gospel, pop, and hip-hop choruses impact.",
  },
  {
    term: "Ad-lib",
    category: "Performance",
    definition: "A spontaneous or secondary vocal line around the main vocal.",
    listen: "Extra phrases, responses, runs, shouts, or textures between lead lines.",
    why: "Ad-libs add personality, movement, and emotional escalation.",
  },
  {
    term: "Delivery",
    category: "Performance",
    definition: "How the artist performs the words: tone, attitude, timing, volume, and emotion.",
    listen: "The same line can feel cocky, wounded, seductive, funny, or desperate based on delivery.",
    why: "Delivery can make simple writing feel alive and believable.",
  },
  {
    term: "Performance Direction",
    category: "Performance",
    definition: "A clear emotional instruction for how the artist should sing or rap a section.",
    listen: "Examples include closer, colder, more private, more triumphant, more exhausted, or more playful.",
    why: "Direction connects the lyric to a human moment instead of just a technically good take.",
  },
  {
    term: "Replay Value",
    category: "Audience",
    definition: "The reason someone wants to hear the song again.",
    listen: "A feeling, phrase, groove, sound, or moment that keeps pulling the listener back.",
    why: "Replay value is the real test of whether the record lives beyond the first impression.",
  },
  {
    term: "Quotable",
    category: "Audience",
    definition: "A line or phrase listeners want to repeat, post, caption, or say out loud.",
    listen: "The lyric that becomes social currency outside the song.",
    why: "Quotables help records travel through culture, especially in hip-hop, pop, drill, and R&B.",
  },
  {
    term: "Clipability",
    category: "Audience",
    definition: "How easily a song creates a short moment for video, social posts, or performance.",
    listen: "A distinct 5 to 15 second section with a clear phrase, movement, or emotional hit.",
    why: "Modern songs often spread because one moment is easy to use and remember.",
  },
  {
    term: "Publishing",
    category: "Business",
    definition: "The ownership and income tied to the underlying song: melody, lyrics, and composition.",
    listen: "This is about the song itself, not the final recorded master.",
    why: "Songwriters and producers need publishing literacy because strong songs can earn across many recordings and uses.",
  },
  {
    term: "Master",
    category: "Business",
    definition: "The specific recorded version of a song.",
    listen: "The actual audio file or released recording people stream.",
    why: "Master ownership affects who controls and earns from the recording itself.",
  },
  {
    term: "Split",
    category: "Business",
    definition: "The agreed percentage of songwriting or production ownership between collaborators.",
    listen: "Not a sound. It is the credit and income conversation after creating the song.",
    why: "Clear splits protect relationships and prevent confusion once a record starts moving.",
  },
];

const soundGenomeTools = [
  { name: "Rhodes Piano", family: "Keys", era: "1970-1985", defined: ["Soul", "Jazz Fusion", "Neo-Soul", "Hip-Hop Sampling"], study: ["Stevie Wonder", "Herbie Hancock", "Donny Hathaway", "Bob James"], jobs: ["Warmth", "Nostalgia", "Sophistication"], note: "A soft electric-piano voice that makes harmony feel intimate and expensive." },
  { name: "Wurlitzer", family: "Keys", era: "1970-1985", defined: ["Soul", "Rock", "Singer-Songwriter"], study: ["Donny Hathaway", "Ray Charles", "Supertramp"], jobs: ["Grit", "Midrange character", "Intimacy"], note: "More bark and bite than a Rhodes; useful when a part needs human roughness." },
  { name: "Clavinet", family: "Keys", era: "1970-1985", defined: ["Funk", "Soul", "Rock"], study: ["Stevie Wonder", "Herbie Hancock"], jobs: ["Rhythmic bite", "Funk motion", "Riff identity"], note: "A keyboard that behaves like percussion and guitar at the same time." },
  { name: "B3 Organ", family: "Keys", era: "Foundational", defined: ["Gospel", "Soul", "Rock", "Jazz"], study: ["Jimmy Smith", "Booker T.", "Aretha Franklin"], jobs: ["Church lift", "Warmth", "Sustain"], note: "The sound of spiritual pressure, blues authority, and communal release." },
  { name: "Minimoog", family: "Synth", era: "1970-1985", defined: ["Funk", "Synth Bass", "Early Hip-Hop", "Modern Bass Design"], study: ["Parliament", "Stevie Wonder", "Dr. Dre"], jobs: ["Authority", "Weight", "Movement"], note: "A classic mono synth for bass lines that feel alive and commanding." },
  { name: "ARP 2600", family: "Synth", era: "1970-1985", defined: ["Experimental Synthesis", "Early Electronic Music"], study: ["Stevie Wonder", "Herbie Hancock"], jobs: ["Sound design", "Character", "Motion"], note: "A flexible semi-modular synth for producers who want to sculpt sound rather than browse presets." },
  { name: "Prophet-5", family: "Synth", era: "1970-1985", defined: ["1980s Pop", "Film Scores", "Modern Synthwave"], study: ["Michael Jackson", "Prince", "Vangelis"], jobs: ["Analog emotion", "Musicality", "Warm pads"], note: "A polyphonic synth that makes chords feel cinematic and human." },
  { name: "Juno-60 / Juno-106", family: "Synth", era: "1980s", defined: ["Pop", "House", "Indie", "Synthwave"], study: ["Madonna", "Tame Impala", "House classics"], jobs: ["Chorus width", "Simple emotion", "Warm pads"], note: "Reliable analog sweetness; famous for chorus-soaked chords and basses." },
  { name: "Jupiter-8", family: "Synth", era: "1980s", defined: ["Pop", "R&B", "Film", "Synth-Pop"], study: ["Michael Jackson", "Duran Duran", "Prince"], jobs: ["Luxury", "Shine", "Scale"], note: "Big, polished, expensive-sounding analog color." },
  { name: "DX7 Electric Piano", family: "Keys", era: "1980s", defined: ["80s R&B", "Pop Ballads", "Quiet Storm"], study: ["Whitney Houston", "Luther Vandross", "Babyface-era R&B"], jobs: ["Gloss", "Bell tone", "Adult polish"], note: "The glassy FM electric piano that defined a huge amount of 80s and 90s emotional polish." },
  { name: "M1 Piano", family: "Keys", era: "1990s", defined: ["House", "Pop", "R&B"], study: ["90s house", "New jack swing"], jobs: ["Attack", "Instant recognition", "Dance lift"], note: "A bright workstation piano that cuts through dense rhythm tracks." },
  { name: "Akai MPC60", family: "Sampler", era: "1985-1995", defined: ["Boom Bap", "Golden Era Hip-Hop"], study: ["DJ Premier", "Pete Rock"], jobs: ["Groove", "Quantization", "Swing"], note: "A drum/sample workstation that turned chopping and swing into hip-hop language." },
  { name: "E-mu SP-1200", family: "Sampler", era: "1985-1995", defined: ["East Coast Hip-Hop"], study: ["Pete Rock", "Large Professor", "Marley Marl"], jobs: ["Crunch", "Texture", "Limitation character"], note: "Short sample time and gritty conversion made records feel dusty, hard, and human." },
  { name: "E-mu SP-12", family: "Sampler", era: "1985-1995", defined: ["Early Sample-Based Hip-Hop"], study: ["Marley Marl", "Mantronix"], jobs: ["Drum identity", "Early grit", "Tight loops"], note: "A key bridge between drum machines and sample-based rap production." },
  { name: "Akai S950", family: "Sampler", era: "1985-1995", defined: ["Classic Sample Chopping", "Jungle", "Hip-Hop"], study: ["RZA", "Dilla", "90s producers"], jobs: ["Aliasing", "Grit", "Pitch character"], note: "A rack sampler prized for the musical artifacts it adds when samples are pitched and chopped." },
  { name: "ASR-10", family: "Sampler", era: "1985-1995", defined: ["RZA", "Timbaland", "Organized Noize", "Early Kanye"], study: ["RZA", "Timbaland", "Kanye West"], jobs: ["Resampling", "Sound mangling", "Creative workflow"], note: "A sampler-keyboard that encourages performance, resampling, and beautiful damage." },
  { name: "MPC 2000XL", family: "Sampler", era: "1995-2005", defined: ["Hip-Hop", "R&B", "Soul Sampling"], study: ["Just Blaze", "Kanye West", "9th Wonder"], jobs: ["Speed", "Workflow", "Song construction"], note: "A central machine for loop building, chopping, sequencing, and finishing hip-hop ideas." },
  { name: "Korg Triton", family: "Workstation", era: "1995-2005", defined: ["2000s Hip-Hop", "Pop", "R&B"], study: ["Scott Storch", "Just Blaze", "The Heatmakerz"], jobs: ["Instant records", "Radio-ready sounds", "Hooks"], note: "A workstation whose presets became the sound of many early-2000s commercial records." },
  { name: "Yamaha Motif", family: "Workstation", era: "1995-2005", defined: ["R&B", "Southern Hip-Hop", "Gospel"], study: ["Darkchild", "Mannie Fresh", "Gospel producers"], jobs: ["Versatility", "Realistic keys", "Arrangement speed"], note: "A bread-and-butter workstation for realistic instruments and polished demos." },
  { name: "Roland Fantom", family: "Workstation", era: "1995-2005", defined: ["Pop", "Hip-Hop", "R&B"], study: ["2000s radio production"], jobs: ["Workstation mastery", "Layering", "Arrangement"], note: "A performance/workstation hub for producers building full records quickly." },
  { name: "Roland JV-1080", family: "Sound Module", era: "1990s-2000s", defined: ["Pop", "R&B", "Hip-Hop", "Film/TV"], study: ["90s and 2000s producers"], jobs: ["Bread-and-butter sounds", "Layering", "Utility"], note: "A rack sound module that quietly powered countless polished arrangements." },
  { name: "Nexus", family: "Plugin", era: "2000-2015", defined: ["Pop", "EDM", "Radio Production"], study: ["2000s/2010s radio pop"], jobs: ["Speed", "Accessibility", "Preset polish"], note: "Fast polished sounds for producers who need usable ideas immediately." },
  { name: "Omnisphere", family: "Plugin", era: "2000-2015", defined: ["Film", "Hip-Hop", "Pop", "Trailer Music"], study: ["Modern pop/rap scoring hybrids"], jobs: ["Infinite possibility", "Atmosphere", "Texture"], note: "A deep synth/sample instrument for cinematic pads, strange textures, and emotional worlds." },
  { name: "Kontakt", family: "Plugin", era: "2000-2015", defined: ["Modern Composition", "Scoring", "Pop Production"], study: ["Film composers", "Pop arrangers"], jobs: ["Sampling at scale", "Realism", "Libraries"], note: "A host for detailed sample libraries, from orchestras to niche instruments." },
  { name: "Massive", family: "Plugin", era: "2000-2015", defined: ["Dubstep", "EDM", "Modern Bass"], study: ["Skrillex-era bass music"], jobs: ["Aggressive synthesis", "Movement", "Bass design"], note: "A wavetable synth that helped define modern aggressive electronic bass." },
  { name: "Sylenth1", family: "Plugin", era: "2000-2015", defined: ["EDM", "Pop"], study: ["2010s dance-pop"], jobs: ["Simplicity", "Leads", "Chords"], note: "A straightforward virtual analog synth that became a dance-pop workhorse." },
  { name: "Serum", family: "Plugin", era: "2015-2026", defined: ["Modern Electronic", "Hyperpop", "Trap"], study: ["Hyperpop", "Trap sound designers"], jobs: ["Precision", "Flexibility", "Visible sound design"], note: "A modern wavetable synth where producers can design exact movement and tone." },
  { name: "Analog Lab", family: "Plugin", era: "2015-2026", defined: ["Modern Producer Presets", "Pop", "R&B"], study: ["Bedroom producers", "Modern beatmakers"], jobs: ["Fast inspiration", "Vintage color", "Palette browsing"], note: "A curated vintage-keyboard/synth universe for fast taste decisions." },
  { name: "Keyscape", family: "Plugin", era: "2015-2026", defined: ["Modern Keyboard Production"], study: ["Modern R&B", "Pop ballads"], jobs: ["Realism", "Character", "Piano identity"], note: "Detailed keyboard instruments that let piano/Rhodes/Wurli parts feel record-ready." },
  { name: "Trilian", family: "Plugin", era: "2015-2026", defined: ["Bass Production"], study: ["Modern pop/R&B low-end"], jobs: ["Low-end excellence", "Real bass", "Synth bass"], note: "A deep bass instrument for realistic and synthesized low-end parts." },
  { name: "TR-808", family: "Drum Machine", era: "Hall of Fame", defined: ["Hip-Hop", "Trap", "R&B", "Pop"], study: ["Afrika Bambaataa", "Kanye West", "Metro Boomin"], jobs: ["Sub weight", "Space", "Modern knock"], note: "The most important drum machine in modern low-end culture." },
  { name: "TR-909", family: "Drum Machine", era: "Hall of Fame", defined: ["House", "Techno", "EDM"], study: ["Chicago house", "Detroit techno"], jobs: ["Dance-floor psychology", "Punch", "Drive"], note: "The kick/hat language of house and techno pressure." },
  { name: "LinnDrum", family: "Drum Machine", era: "Hall of Fame", defined: ["Pop", "Prince", "1980s R&B"], study: ["Prince", "Janet Jackson-era pop"], jobs: ["Punch", "Synthetic funk", "80s identity"], note: "A drum machine that made programmed drums feel stylish and physical." },
  { name: "DrumTraks", family: "Drum Machine", era: "Hall of Fame", defined: ["Early Hip-Hop", "Electro", "Synth Pop"], study: ["Early programming eras"], jobs: ["Character", "Sequenced personality", "Crunch"], note: "A characterful early drum machine with a distinct programmed feel." },
  { name: "1176 Compressor", family: "Effect", era: "Hall of Fame", defined: ["Vocals", "Drums", "Bass", "Rock"], study: ["Classic vocal chains"], jobs: ["Punch", "Presence", "Forward motion"], note: "Fast compression that can make performances feel urgent and upfront." },
  { name: "LA-2A Compressor", family: "Effect", era: "Hall of Fame", defined: ["Vocals", "Bass", "Soul", "Pop"], study: ["Classic vocal chains"], jobs: ["Smoothness", "Leveling", "Vocal warmth"], note: "Gentle optical compression that keeps vocals intimate and controlled." },
  { name: "Pultec EQ", family: "Effect", era: "Hall of Fame", defined: ["Mixing", "Mastering", "Vocals", "Bass"], study: ["Classic analog mixing"], jobs: ["Warmth", "Weight", "Silky top"], note: "An EQ famous for musical low-end and sweet high-end enhancement." },
  { name: "Space Echo", family: "Effect", era: "Hall of Fame", defined: ["Dub", "Reggae", "Rock", "Alternative"], study: ["Lee Scratch Perry", "Radiohead-like atmospheres"], jobs: ["Atmosphere", "Delay movement", "Vintage haze"], note: "Tape delay that turns space into character." },
  { name: "Lexicon 480L", family: "Effect", era: "Hall of Fame", defined: ["Pop", "R&B", "Film", "Ballads"], study: ["80s/90s expensive reverbs"], jobs: ["Expensive depth", "Width", "Polish"], note: "The sound of huge, glossy, professional digital reverb." },
  { name: "Valhalla VintageVerb", family: "Effect", era: "2015-2026", defined: ["Modern Pop", "R&B", "Electronic"], study: ["Modern bedroom-to-pro mixes"], jobs: ["Modern classic reverb", "Color", "Depth"], note: "A go-to software reverb for vintage-inspired space without hardware cost." },
  { name: "Soundtoys Bundle", family: "Effect", era: "2015-2026", defined: ["Creative Processing", "Pop", "Hip-Hop", "Alternative"], study: ["Modern mix sound design"], jobs: ["Character", "Distortion", "Delay", "Movement"], note: "A toolkit for turning clean sounds into memorable production details." },
  { name: "FabFilter Suite", family: "Effect", era: "2015-2026", defined: ["Modern Mixing", "Mastering", "Precision Production"], study: ["Modern mix engineers"], jobs: ["Precision", "Clarity", "Problem solving"], note: "Transparent modern tools for EQ, compression, limiting, de-essing, and cleanup." },
  { name: "RC-20", family: "Effect", era: "2015-2026", defined: ["Lo-Fi", "Neo-Soul", "Modern Hip-Hop"], study: ["Lo-fi and alt-R&B producers"], jobs: ["Controlled imperfection", "Wobble", "Texture"], note: "A quick way to add dust, noise, wobble, saturation, and emotional age." },
  { name: "Half-Time", family: "Effect", era: "2015-2026", defined: ["Trap", "Experimental Hip-Hop", "Alt-R&B"], study: ["Modern loop makers"], jobs: ["Instant atmosphere", "Slow motion", "Darkness"], note: "A time effect that makes loops feel heavier, slower, and more haunted." },
  { name: "Effectrix", family: "Effect", era: "2015-2026", defined: ["Creative Transitions", "Electronic", "Hip-Hop"], study: ["Glitch and transition-heavy producers"], jobs: ["Arrangement enhancement", "Stutter", "Movement"], note: "A sequenced effects tool for rhythmic edits, glitches, and transitions." },
];

const producerSignatureSounds = [
  { producer: "DJ Premier", lane: "Hip-Hop", signature: ["Filtered samples", "Chopped jazz", "Scratched hooks"], lesson: "A signature can be a repeatable arrangement grammar, not just a drum kit." },
  { producer: "Pete Rock", lane: "Hip-Hop / Soul", signature: ["Horns", "Soul samples", "Layered drums"], lesson: "Warmth and swing can make sample-based records feel emotional and physical." },
  { producer: "J Dilla", lane: "Neo-Soul / Hip-Hop", signature: ["Swing", "Human timing", "Soulful loops"], lesson: "Feel can be more identifiable than sound selection." },
  { producer: "RZA", lane: "Hip-Hop", signature: ["Grit", "Atmosphere", "Darkness"], lesson: "Limitations can become mythology when the world is coherent." },
  { producer: "Dr. Dre", lane: "West Coast / Pop-Rap", signature: ["Pristine mixes", "Moog bass", "Funk DNA"], lesson: "Clean low-end and mix authority can make minimal parts feel expensive." },
  { producer: "Timbaland", lane: "R&B / Pop / Hip-Hop", signature: ["Unconventional percussion", "Rhythmic experimentation", "Vocal-chop hooks"], lesson: "A strange rhythm becomes accessible when the vocal teaches the pocket." },
  { producer: "The Neptunes", lane: "Pop / R&B / Rap", signature: ["Minimalism", "Negative space", "Strange synths"], lesson: "Leaving room can make odd sounds feel iconic." },
  { producer: "Kanye West", lane: "Hip-Hop / Pop", signature: ["Soul samples", "Emotional accessibility", "Choir-scale drama"], lesson: "Sampling can be a storytelling device, not just a loop source." },
  { producer: "Just Blaze", lane: "Hip-Hop", signature: ["Cinematic samples", "Huge drums", "Lift-and-release arrangement"], lesson: "Scale comes from arrangement drama as much as loudness." },
  { producer: "Metro Boomin", lane: "Trap / Rap", signature: ["Darkness", "Atmosphere", "Modern trap orchestration"], lesson: "A producer world can make multiple artists feel like part of one franchise." },
  { producer: "Kaytranada", lane: "Dance / Alt-R&B", signature: ["Groove", "Bounce", "Rhythmic swing"], lesson: "Pocket can be the main hook." },
  { producer: "Darkchild / Rodney Jerkins", lane: "R&B / Pop", signature: ["Punchy syncopation", "Stacked vocal architecture", "Glossy millennium bounce"], lesson: "Commercial R&B can feel futuristic when the rhythm, ad-libs, and vocal stacks all move like one machine." },
  { producer: "Babyface / L.A. Reid / LaFace", lane: "R&B / Pop-Soul", signature: ["Elegant chord movement", "Tender adult emotion", "Polished vocal-first arrangements"], lesson: "A signature can be emotional temperature: restraint, melody, and lyric clarity that makes the singer feel expensive." },
  { producer: "Teddy Riley", lane: "New Jack Swing", signature: ["Hip-hop drums", "R&B harmony", "Synth bass and stabs"], lesson: "Genre fusion becomes a signature when the groove gives singers a new way to phrase." },
  { producer: "Jimmy Jam & Terry Lewis", lane: "R&B / Minneapolis Sound", signature: ["Big programmed drums", "Synth-funk polish", "Dynamic vocal drama"], lesson: "A studio system can turn artist identity into architecture: groove, key changes, breakdowns, and emotional lift." },
  { producer: "Cheiron / Max Martin / Denniz Pop", lane: "Pop", signature: ["Explosive choruses", "Melodic math", "Glossy Swedish pop precision"], lesson: "Pop signature sound is often hook engineering: every section makes the title feel inevitable." },
  { producer: "Stax Records / Booker T. & the M.G.'s", lane: "Soul", signature: ["Dry Memphis rhythm section", "Organ glue", "Horn answers"], lesson: "A label can have a signature sound when the room, players, and arrangement habits become inseparable." },
  { producer: "Motown / The Funk Brothers", lane: "Soul / Pop", signature: ["Dancing bass lines", "Tambourine drive", "Orchestral pop-soul lift"], lesson: "A house band can make a whole catalog feel related without making every song sound identical." },
  { producer: "Nile Rodgers / Chic", lane: "Disco / Pop / Funk", signature: ["Chucking guitar", "Elegant dance pocket", "Clean bass-drum interlock"], lesson: "Rhythm guitar can be a producer signature when it controls the whole body's relationship to the record." },
  { producer: "Quincy Jones", lane: "Pop / R&B / Jazz", signature: ["Elite musicianship", "Layered arrangement", "Cinematic polish"], lesson: "Taste can be orchestration: choosing the right players, leaving the right space, and making sophistication feel effortless." },
  { producer: "Giorgio Moroder", lane: "Disco / Electronic", signature: ["Four-on-the-floor pulse", "Sequenced synth motion", "Futurist repetition"], lesson: "A machine groove becomes emotional when the arrangement keeps opening new windows around it." },
  { producer: "Trevor Horn", lane: "Art-Pop / Synth-Pop", signature: ["Hyper-detailed production", "Fairlight-era collage", "Dramatic pop scale"], lesson: "A signature can come from excess if every sound has a theatrical job." },
  { producer: "Brian Eno / Daniel Lanois", lane: "Ambient / Rock", signature: ["Atmospheric depth", "Textural guitars", "Space as composition"], lesson: "Sometimes the signature is not the instrument, but the world around the instrument." },
  { producer: "Rick Rubin", lane: "Rock / Rap / Country", signature: ["Reduction", "Performance focus", "Dry emotional directness"], lesson: "A signature can be subtraction: remove everything that keeps the artist from sounding undeniable." },
  { producer: "Mutt Lange", lane: "Rock / Country-Pop", signature: ["Stacked hooks", "Huge drums", "Precision background vocals"], lesson: "Rock and country-pop can use pop engineering: every harmony and drum hit is designed for scale." },
  { producer: "Lee Scratch Perry / King Tubby", lane: "Reggae / Dub", signature: ["Echo throws", "Mixer-as-instrument", "Bass-and-space hypnosis"], lesson: "Dub proves that effects can be songwriting tools, not just mix decoration." },
  { producer: "Tony Brown / Nashville A-Team Orbit", lane: "Country", signature: ["Story-first arrangements", "Warm acoustic polish", "Tasteful session musicianship"], lesson: "Country signature sound often lives in restraint: the players frame the lyric instead of competing with it." },
  { producer: "Kirk Franklin / Gospel Choir Language", lane: "Gospel / Contemporary Gospel", signature: ["Choir call-and-response", "Church harmony", "Modern R&B rhythm"], lesson: "A signature can be communal energy: the arrangement makes the listener feel inside the room." },
  { producer: "Skrillex", lane: "EDM / Bass Music / Pop", signature: ["Vocal chops", "Aggressive bass design", "Kinetic drops"], lesson: "Sound design becomes a songwriting identity when the textures themselves behave like hooks." },
];

const soundGlossaryTerms = soundGenomeTools.map((tool) => ({
  term: tool.name,
  category: `Sound: ${tool.family}`,
  definition: tool.note,
  listen: `${tool.jobs.join(", ")}. Study: ${tool.study.join(", ")}.`,
  why: `Defined ${tool.defined.join(", ")}. Use it for ${tool.jobs.join(", ").toLowerCase()}, not just because the gear is famous.`,
}));

const acousticDesignLessons = [
  {
    topic: "Frequency",
    concept: "Frequency Bands",
    hear: "Sub feels like pressure, lows feel like body, mids carry notes and words, highs create air and edge.",
    producerMove: "Before adding another sound, decide which band is supposed to own the emotional job.",
    tryIt: "Mute everything except drums, bass, and vocal. If the song still speaks, the frequency hierarchy is working.",
  },
  {
    topic: "Frequency",
    concept: "Masking",
    hear: "Two sounds fight because they occupy the same range, so neither feels clear even when both are loud.",
    producerMove: "Use arrangement, octave choice, EQ, or timing to stop the vocal, snare, keys, and guitars from stepping on each other.",
    tryIt: "Drop one competing part an octave, simplify it, or move it to answer the vocal instead of playing under it.",
  },
  {
    topic: "Frequency",
    concept: "Overtones",
    hear: "The same note can feel warm, nasal, metallic, soft, or aggressive depending on its harmonic content.",
    producerMove: "Choose timbre by emotion, not just by instrument name. A Rhodes, DX7, guitar, and synth can play the same chord and tell different stories.",
    tryIt: "Play one chord on three sounds and write the mood each one suggests before choosing.",
  },
  {
    topic: "Envelope",
    concept: "Transient",
    hear: "The first hit of a sound: drum crack, pick attack, pluck, consonant, or piano hammer.",
    producerMove: "Use sharper transients for urgency and softer attacks for intimacy, haze, or dreaminess.",
    tryIt: "Soften a lead sound's attack, then sharpen the snare. Notice how the vocal suddenly feels closer.",
  },
  {
    topic: "Envelope",
    concept: "ADSR Envelope",
    hear: "Attack, decay, sustain, and release shape whether a sound pokes, blooms, holds, or trails away.",
    producerMove: "Change envelope before changing presets. Many parts fail because their timing shape is wrong, not because the sound is bad.",
    tryIt: "Shorten release on busy chords for bounce; lengthen release on pads for emotional wash.",
  },
  {
    topic: "Space",
    concept: "Room Size",
    hear: "Small rooms feel close and honest; large spaces feel cinematic, spiritual, lonely, or expensive.",
    producerMove: "Pick the room that matches the lyric perspective. Confession usually wants closeness; triumph can tolerate size.",
    tryIt: "Put verse vocals in a smaller space and chorus backgrounds in a larger space.",
  },
  {
    topic: "Space",
    concept: "Reverb Tail",
    hear: "The length of the space after a sound stops. Long tails can create drama or blur the groove.",
    producerMove: "Time reverb to the song's tempo so space supports rhythm instead of smearing it.",
    tryIt: "Shorten the hook reverb until the words are clear, then use a longer throw only at the end of a phrase.",
  },
  {
    topic: "Space",
    concept: "Delay As Arrangement",
    hear: "Echoes answer a vocal, fill empty bars, or create motion without adding a new instrument.",
    producerMove: "Use delay throws as call-and-response. A delay can become the ear candy after the hook line.",
    tryIt: "Automate delay only on the last word of a hook phrase.",
  },
  {
    topic: "Stereo",
    concept: "Width",
    hear: "Wide sounds wrap around the listener; centered sounds feel direct, stable, and important.",
    producerMove: "Keep kick, bass, lead vocal, and main hook stable. Push support textures wider.",
    tryIt: "Mono the verse, then widen backgrounds or synths at the chorus lift.",
  },
  {
    topic: "Stereo",
    concept: "Depth",
    hear: "Some sounds feel in your face while others sit behind the singer.",
    producerMove: "Depth comes from level, brightness, reverb, pre-delay, and performance intensity.",
    tryIt: "Make the lead vocal slightly brighter and drier than the pad to pull the singer forward.",
  },
  {
    topic: "Movement",
    concept: "Filter Motion",
    hear: "Opening a filter adds brightness and arrival; closing it creates distance, secrecy, or tension.",
    producerMove: "Use filters to make loops evolve without adding clutter.",
    tryIt: "Low-pass the verse loop and open it into the pre or hook.",
  },
  {
    topic: "Movement",
    concept: "Modulation",
    hear: "Chorus, flanging, vibrato, phasing, and wobble make static sounds feel alive or unstable.",
    producerMove: "Use modulation when a part needs personality but not more notes.",
    tryIt: "Add slow chorus to a pad or Rhodes and compare the emotional width before and after.",
  },
  {
    topic: "Texture",
    concept: "Saturation",
    hear: "Gentle distortion adds density, warmth, bite, or perceived loudness.",
    producerMove: "Saturate for emotional grain, not just loudness. Too much makes everything feel flat.",
    tryIt: "Add saturation to bass until it speaks on small speakers, then back it off slightly.",
  },
  {
    topic: "Texture",
    concept: "Noise & Imperfection",
    hear: "Vinyl noise, tape hiss, room tone, finger squeaks, breath, and artifacts make sound feel lived-in.",
    producerMove: "Use imperfection to create memory and intimacy, especially in R&B, soul, alt, lo-fi, and singer-songwriter material.",
    tryIt: "Add a low room-tone layer under a sparse intro, then mute it when the drums enter.",
  },
  {
    topic: "Dynamics",
    concept: "Compression Feel",
    hear: "Compression can make a vocal steady, a drum punchy, a bass controlled, or a whole mix more urgent.",
    producerMove: "Think of compression as performance shaping. It changes how confident or intimate a sound feels.",
    tryIt: "Compare a vocal with no compression, gentle leveling, and aggressive compression. Name the attitude of each.",
  },
  {
    topic: "Dynamics",
    concept: "Ear Fatigue",
    hear: "A track becomes tiring when everything is bright, loud, dense, or constant for too long.",
    producerMove: "Create relief: drop elements, darken sections, vary density, or save brightness for payoff moments.",
    tryIt: "Remove the brightest texture from the verse so the chorus feels more open without turning it up.",
  },
];

const gearHeadGallery = [
  {
    name: "Rhodes Piano",
    type: "Electric piano",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Rhodes_MkI_Stage_88_1970.jpg",
    fingerprint: "Warm bell, soft attack, nostalgic chord color.",
    whyCare: "It makes harmony feel intimate, soulful, and expensive without needing many notes.",
    heardOn: ["Stevie Wonder - You Are the Sunshine of My Life", "Herbie Hancock - Butterfly", "Bob James - Nautilus"],
  },
  {
    name: "Minimoog",
    type: "Analog mono synth",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Minimoog.JPG",
    fingerprint: "Thick mono bass, liquid leads, authority in the low end.",
    whyCare: "It teaches bass as a character, not just a frequency range.",
    heardOn: ["Parliament - Flash Light", "Stevie Wonder - Boogie On Reggae Woman", "Dr. Dre - Nuthin' but a G Thang"],
  },
  {
    name: "Roland TR-808",
    type: "Analog drum machine",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Roland_TR-808_(large).jpg",
    fingerprint: "Booming sine-kick, synthetic percussion, futuristic emptiness.",
    whyCare: "It changed how producers think about drums as tone, bass, and identity at once.",
    heardOn: ["Afrika Bambaataa - Planet Rock", "Marvin Gaye - Sexual Healing", "Kanye West - 808s & Heartbreak"],
  },
  {
    name: "LinnDrum / Linn LM-1 Family",
    type: "Sample-based drum machine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/LinnDrum_digital_drum_machine_front_panel_.jpg/500px-LinnDrum_digital_drum_machine_front_panel_.jpg",
    fingerprint: "Punchy sampled drums, dry funk, 80s pop snap.",
    whyCare: "It shows how machine drums can still feel stylish, physical, and humanly arranged.",
    heardOn: ["Prince - When Doves Cry", "The Human League - Don't You Want Me", "George Michael - I Want Your Sex"],
  },
  {
    name: "Yamaha DX7",
    type: "FM synthesizer",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Yamaha_DX7_synthesizer_-_combined_image_with_diagonal_and_top_views.jpg/330px-Yamaha_DX7_synthesizer_-_combined_image_with_diagonal_and_top_views.jpg",
    fingerprint: "Glassy electric piano, bells, digital bite, cold shine.",
    whyCare: "It explains a huge amount of 80s pop, R&B ballad polish, and glossy keyboard language.",
    heardOn: ["Prince - When Doves Cry", "Sade - Smooth Operator", "Michael Jackson - Smooth Criminal"],
  },
  {
    name: "Korg M1",
    type: "Digital workstation",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Korg_M1.png/960px-Korg_M1.png",
    fingerprint: "Bright piano/organ presets, instant 90s dance and pop recognition.",
    whyCare: "It teaches how presets can become genre-defining when a scene adopts them.",
    heardOn: ["Madonna - Vogue", "Robin S - Show Me Love", "Snap! - Rhythm Is a Dancer"],
  },
  {
    name: "E-mu SP-1200",
    type: "Sampler / drum machine",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/E-mu_SP-1200_%28111607sp1200%29.jpg/500px-E-mu_SP-1200_%28111607sp1200%29.jpg",
    fingerprint: "Dusty crunch, short sample time, hard drums, beautiful limitation.",
    whyCare: "It shows how technical limits can become a genre's emotional texture.",
    heardOn: ["Pete Rock & CL Smooth - They Reminisce Over You", "Gang Starr - Take It Personal", "Wu-Tang Clan - C.R.E.A.M."],
  },
  {
    name: "Akai MPC60",
    type: "Sampler / sequencer",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Akai_MPC60.jpg",
    fingerprint: "Pads, swing, chopped samples, hands-on groove construction.",
    whyCare: "It teaches beatmaking as performance: touch, timing, repetition, and arrangement.",
    heardOn: ["DJ Premier - Mass Appeal", "Pete Rock - The Creator", "Large Professor - Looking at the Front Door"],
  },
  {
    name: "ASR-10",
    type: "Sampler keyboard",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ensoniq_ASR-10_rear.jpg/500px-Ensoniq_ASR-10_rear.jpg",
    fingerprint: "Resampled grit, keyboard workflow, mangled atmosphere.",
    whyCare: "It rewards committing sounds into new sounds, which is where producer identity often appears.",
    heardOn: ["Timbaland - Are You That Somebody?", "RZA - 36 Chambers-era productions", "Kanye West - early soul-sample era"],
  },
  {
    name: "Korg Triton",
    type: "Workstation",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Korg_Triton.jpg",
    fingerprint: "Glossy 2000s presets, plucks, bells, brass, instant radio demo energy.",
    whyCare: "It shows how workstation presets can become commercial songwriting shortcuts.",
    heardOn: ["Dr. Dre - Still D.R.E.", "Fat Joe - Lean Back", "The Diplomats - Dipset Anthem"],
  },
  {
    name: "Roland TR-909",
    type: "Hybrid drum machine",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Roland_TR-909.jpg",
    fingerprint: "House kick, open hats, techno drive, club pressure.",
    whyCare: "It teaches dance-floor psychology: repetition, impact, and machine swing.",
    heardOn: ["Daft Punk - Revolution 909", "Jeff Mills - The Bells", "Inner City - Big Fun"],
  },
  {
    name: "Roland Space Echo",
    type: "Tape delay",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/RE201_Face.JPG/500px-RE201_Face.JPG",
    fingerprint: "Tape delay wobble, dub atmosphere, echo as performance.",
    whyCare: "It teaches effects as arrangement: a delay throw can become a hook, transition, or world.",
    heardOn: ["Lee Scratch Perry productions", "Radiohead - OK Computer-era atmosphere", "Dub and post-punk records"],
  },
];

const sessionPlayers = [
  {
    name: "Scott Storch",
    role: "Keys / producer-musician",
    family: "Keys",
    era: "1990s-2000s",
    superpower: "Turning a keyboard riff into the whole record's identity.",
    signatureMove: "Minor-key piano, Middle Eastern-flavored motifs, and simple loops that leave room for rap or R&B vocals.",
    study: ["Dr. Dre - Still D.R.E.", "The Roots - You Got Me", "50 Cent - Candy Shop"],
    steal: "Write one keyboard phrase strong enough that the artist can build the hook around it.",
  },
  {
    name: "Bernard Purdie",
    role: "Drums",
    family: "Drums",
    era: "1960s-present",
    superpower: "Pocket so deep the band sounds relaxed and expensive.",
    signatureMove: "Ghost notes, hi-hat chatter, and the Purdie shuffle: movement inside the groove without rushing the song.",
    study: ["Aretha Franklin - Rock Steady", "Steely Dan - Home at Last", "Steely Dan - Babylon Sisters"],
    steal: "Use tiny subdivisions to make a simple beat breathe.",
  },
  {
    name: "Slash",
    role: "Lead guitar identity",
    family: "Guitar",
    era: "1980s-present",
    superpower: "Making a guitar part feel like a character in the song.",
    signatureMove: "Blues-based melodic leads, vocal phrasing, and bends that answer the singer instead of showing off randomly.",
    study: ["Guns N' Roses - Sweet Child O' Mine", "Michael Jackson - Give In to Me", "Lenny Kravitz - Always on the Run"],
    steal: "Write guitar hooks that sing like toplines, not just solos.",
  },
  {
    name: "Carol Kaye",
    role: "Bass / guitar",
    family: "Bass",
    era: "1950s-1970s",
    superpower: "Melodic bass lines that move the song without crowding the vocal.",
    signatureMove: "Upper-register bass answers, clean articulation, and lines that feel composed rather than merely supportive.",
    study: ["The Beach Boys - Good Vibrations", "Nancy Sinatra - These Boots Are Made for Walkin'", "Glen Campbell - Wichita Lineman"],
    steal: "Let the bass create countermelody when the arrangement needs motion.",
  },
  {
    name: "James Jamerson",
    role: "Bass",
    family: "Bass",
    era: "1950s-1970s",
    superpower: "Making pop harmony dance through bass movement.",
    signatureMove: "Syncopated Motown bass lines that imply chords, push choruses, and make simple songs feel harmonically alive.",
    study: ["The Temptations - My Girl", "Marvin Gaye - What's Going On", "The Supremes - You Can't Hurry Love"],
    steal: "Write bass as a second melody that still protects the pocket.",
  },
  {
    name: "Hal Blaine",
    role: "Drums",
    family: "Drums",
    era: "1950s-1970s",
    superpower: "Perfect studio decisions under pressure.",
    signatureMove: "Memorable intros, clean fills, and arrangements that make the artist sound bigger without stealing focus.",
    study: ["The Ronettes - Be My Baby", "The Beach Boys - Good Vibrations", "Simon & Garfunkel - Mrs. Robinson"],
    steal: "Give every section one drum detail the listener can recognize.",
  },
  {
    name: "Steve Gadd",
    role: "Drums",
    family: "Drums",
    era: "1970s-present",
    superpower: "Precision that still feels human.",
    signatureMove: "Linear grooves, military-clean rudiments, and fills that sound inevitable rather than flashy.",
    study: ["Paul Simon - 50 Ways to Leave Your Lover", "Steely Dan - Aja", "Paul Simon - Late in the Evening"],
    steal: "Design a drum part with one unforgettable rhythmic hook.",
  },
  {
    name: "Pino Palladino",
    role: "Bass",
    family: "Bass",
    era: "1980s-present",
    superpower: "Tasteful low end that changes shape by genre.",
    signatureMove: "Fretless lyricism, neo-soul restraint, and pocket-first bass that feels both emotional and architectural.",
    study: ["D'Angelo - Untitled (How Does It Feel)", "John Mayer Trio - Vultures", "Paul Young - Everytime You Go Away"],
    steal: "Play fewer notes with more intention; let tone and placement carry emotion.",
  },
  {
    name: "Larry Carlton",
    role: "Guitar",
    family: "Guitar",
    era: "1970s-present",
    superpower: "Sophisticated guitar harmony that still lands in pop records.",
    signatureMove: "Jazz vocabulary, clean phrasing, and solos that outline the chord changes beautifully.",
    study: ["Steely Dan - Kid Charlemagne", "Joni Mitchell - Help Me", "Michael Jackson - She's Out of My Life"],
    steal: "Use harmony-aware fills to make simple sections feel premium.",
  },
  {
    name: "David T. Walker",
    role: "Guitar",
    family: "Guitar",
    era: "1960s-present",
    superpower: "Soul guitar that behaves like silk around the vocal.",
    signatureMove: "Warm chord fragments, elegant fills, and emotional restraint.",
    study: ["Marvin Gaye - Let's Get It On", "The Jackson 5 - I Want You Back", "Bill Withers - Use Me"],
    steal: "Answer vocal phrases with small guitar gestures instead of full chords.",
  },
  {
    name: "Booker T. Jones",
    role: "Organ / keys",
    family: "Keys",
    era: "1960s-present",
    superpower: "Making the keyboard part feel like the room the song lives in.",
    signatureMove: "Hammond organ warmth, economical voicings, and groove-first accompaniment.",
    study: ["Booker T. & the M.G.'s - Green Onions", "Otis Redding - I've Been Loving You Too Long", "Sam & Dave - Hold On, I'm Comin'"],
    steal: "Use organ or electric piano as atmosphere and glue, not constant decoration.",
  },
  {
    name: "Steve Cropper",
    role: "Guitar",
    family: "Guitar",
    era: "1960s-present",
    superpower: "Minimal guitar parts that define soul records.",
    signatureMove: "Tight rhythm figures, clipped double-stops, and riffs that leave room for horns and vocals.",
    study: ["Otis Redding - (Sittin' On) The Dock of the Bay", "Sam & Dave - Soul Man", "Booker T. & the M.G.'s - Green Onions"],
    steal: "Make the guitar part a pocket device before it becomes a lead instrument.",
  },
  {
    name: "Greg Phillinganes",
    role: "Keys / synths",
    family: "Keys",
    era: "1970s-present",
    superpower: "Keyboard polish across pop, R&B, funk, and film-scale arrangements.",
    signatureMove: "Clean voicings, synth support, and musical direction that keeps dense productions controlled.",
    study: ["Michael Jackson - Don't Stop 'Til You Get Enough", "Stevie Wonder - Songs in the Key of Life", "Eric Clapton - Change the World"],
    steal: "Support the hook with voicings that make the chorus feel larger without adding clutter.",
  },
  {
    name: "Nathan East",
    role: "Bass",
    family: "Bass",
    era: "1970s-present",
    superpower: "Session-ready bass that adapts instantly to pop, R&B, jazz, and rock.",
    signatureMove: "Clean pocket, melodic fills, and polished low end that makes records feel finished.",
    study: ["Daft Punk - Get Lucky", "Eric Clapton - Change the World", "Michael Jackson - I Just Can't Stop Loving You"],
    steal: "Serve the record first; let one elegant fill prove the musicianship.",
  },
  {
    name: "Paulinho da Costa",
    role: "Percussion",
    family: "Percussion",
    era: "1970s-present",
    superpower: "Percussion layers that add motion without confusing the groove.",
    signatureMove: "Shakers, congas, bells, and Brazilian rhythmic color placed around the drummer's pocket.",
    study: ["Michael Jackson - Don't Stop 'Til You Get Enough", "Earth, Wind & Fire - September", "Quincy Jones - Ai No Corrida"],
    steal: "Use percussion to create lift and sparkle in transitions, not just constant noise.",
  },
  {
    name: "Sheila E.",
    role: "Drums / percussion",
    family: "Percussion",
    era: "1980s-present",
    superpower: "Percussion as star power, groove, and stage electricity.",
    signatureMove: "Timbales, Latin-pop drive, and rhythmic hooks that feel like performance moments.",
    study: ["Sheila E. - The Glamorous Life", "Prince - A Love Bizarre", "Ringo Starr - Come Together live arrangements"],
    steal: "Make percussion visible in the song's personality, not just tucked behind the beat.",
  },
  {
    name: "Tommy Tedesco",
    role: "Guitar",
    family: "Guitar",
    era: "1950s-1990s",
    superpower: "Extreme versatility: the right guitar language on demand.",
    signatureMove: "Sight-reading, tonal flexibility, and quick stylistic translation for film, TV, pop, and rock sessions.",
    study: ["The Wrecking Crew recordings", "Bonanza theme-era TV work", "Beach Boys session work"],
    steal: "Build vocabulary across styles so the song can ask for anything.",
  },
  {
    name: "Nicky Hopkins",
    role: "Piano",
    family: "Keys",
    era: "1960s-1990s",
    superpower: "Rock piano parts that make bands sound mythic.",
    signatureMove: "Rolling piano lines, elegant intros, and harmonic lift inside guitar-driven arrangements.",
    study: ["The Rolling Stones - She's a Rainbow", "The Beatles - Revolution", "The Who - The Song Is Over"],
    steal: "Use piano to add movement and grace around rougher band textures.",
  },
  {
    name: "Dr. Dre",
    role: "Producer / mixer / sonic architect",
    family: "Mix / Master",
    era: "1980s-present",
    superpower: "Making hip-hop feel cinematic, expensive, sparse, and physically powerful.",
    signatureMove: "Dry commanding vocals, deep low-end control, hard drums, surgical space, and mix decisions that make every element feel intentional.",
    study: ["Dr. Dre - Still D.R.E.", "Snoop Dogg - Gin and Juice", "50 Cent - In Da Club"],
    steal: "Mute anything that does not strengthen vocal authority, groove, or brand identity.",
  },
  {
    name: "Derek \"MixedByAli\" Ali",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "2010s-present",
    superpower: "Detailed hip-hop and R&B mixes where density, vocal emotion, and low-end movement stay legible.",
    signatureMove: "Vocal-forward storytelling, controlled distortion, deep ambience, and mix contrast that supports narrative.",
    study: ["Kendrick Lamar - Money Trees", "SZA - Broken Clocks", "Kendrick Lamar - HUMBLE."],
    steal: "Treat the mix like storytelling: each tone and space choice should reveal the artist's point of view.",
  },
  {
    name: "Young Guru",
    role: "Recording / mix engineer",
    family: "Mix / Master",
    era: "1990s-present",
    superpower: "Rap vocal authority, speed, session command, and clean translation under pressure.",
    signatureMove: "Centered vocals, punch-in discipline, strong monitoring decisions, and mixes that preserve lyric dominance.",
    study: ["Jay-Z - The Blueprint", "Jay-Z - The Black Album", "Jay-Z & Kanye West - Watch the Throne"],
    steal: "Build a session workflow where the artist can move fast without losing technical quality.",
  },
  {
    name: "Serban Ghenea",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "2000s-present",
    superpower: "Ultra-clear modern pop mixes that feel loud, wide, and effortless.",
    signatureMove: "Lead vocal precision, bright but controlled top end, polished low end, and choruses that open without clutter.",
    study: ["The Weeknd - Blinding Lights", "Taylor Swift - Anti-Hero", "Ariana Grande - Thank U, Next"],
    steal: "Make every hook element readable on small speakers before chasing size.",
  },
  {
    name: "Manny Marroquin",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "1990s-present",
    superpower: "Musical balance across pop, hip-hop, R&B, rock, and soul without making the mix feel sterile.",
    signatureMove: "Dimensional vocal placement, tasteful effects, and balances that feel emotional before they feel technical.",
    study: ["Kanye West - Stronger", "Alicia Keys - No One", "John Mayer - Gravity"],
    steal: "Balance for emotion first, then use technical moves to protect that feeling.",
  },
  {
    name: "Leslie Brathwaite",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "1990s-present",
    superpower: "Commercial rap and R&B mixes with punch, width, and smooth vocal focus.",
    signatureMove: "Clean vocal hierarchy, glossy drums, and club-ready low end that still leaves room for melody.",
    study: ["Cardi B - Bodak Yellow", "Pharrell Williams - Happy", "OutKast - Hey Ya!"],
    steal: "Make the record feel finished and market-ready without sanding off personality.",
  },
  {
    name: "Jaycen Joshua",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "2000s-present",
    superpower: "Aggressive modern pop, rap, and R&B mixes that hit hard while keeping the vocal upfront.",
    signatureMove: "Punchy low end, crisp vocal brightness, sharp transient control, and radio-scale impact.",
    study: ["Beyonce - Drunk in Love", "Future - Mask Off", "Rosalia - Con Altura"],
    steal: "Use impact without letting the record become harsh or fatiguing.",
  },
  {
    name: "Mike Dean",
    role: "Producer / mixer / mastering engineer",
    family: "Mix / Master",
    era: "1990s-present",
    superpower: "Massive synth emotion, distorted scale, and modern hip-hop mixes that feel larger than life.",
    signatureMove: "Huge low end, analog synth drama, saturation, and final-stage intensity.",
    study: ["Kanye West - Father Stretch My Hands Pt. 1", "Travis Scott - Sicko Mode", "The Weeknd - After Hours"],
    steal: "Use distortion and scale as emotion, not as a substitute for arrangement.",
  },
  {
    name: "Bob Clearmountain",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "1970s-present",
    superpower: "Rock and pop mixes with depth, motion, and a clear emotional center.",
    signatureMove: "Drum room, vocal rides, tasteful delays, and stereo images that feel alive.",
    study: ["Bruce Springsteen - Born in the U.S.A.", "The Rolling Stones - Start Me Up", "Bryan Adams - Summer of '69"],
    steal: "Use automation and ambience to make a band feel cinematic without losing the song.",
  },
  {
    name: "Chris Lord-Alge",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "1980s-present",
    superpower: "Explosive rock, pop-punk, and radio mixes with instant punch.",
    signatureMove: "Forward drums, bright guitars, commanding vocals, and compression used as energy.",
    study: ["Green Day - American Idiot", "My Chemical Romance - Welcome to the Black Parade", "Avril Lavigne - Complicated"],
    steal: "Commit to bold balances. Timid rock mixes rarely feel finished.",
  },
  {
    name: "Tom Lord-Alge",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "1980s-present",
    superpower: "Rock and pop mixes where choruses feel wide, bright, and built for repeat playback.",
    signatureMove: "Tight low end, polished guitars, energetic vocals, and clean section lift.",
    study: ["Blink-182 - All the Small Things", "Sum 41 - Fat Lip", "Weezer - Beverly Hills"],
    steal: "Make the chorus physically arrive through tone, width, and vocal stack control.",
  },
  {
    name: "Andrew Scheps",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "1990s-present",
    superpower: "Dense, emotionally intense mixes that keep attitude and imperfection alive.",
    signatureMove: "Parallel energy, analog attitude, big drums, and records that feel performed rather than polished to death.",
    study: ["Red Hot Chili Peppers - Californication", "Adele - 21", "Hozier - Take Me to Church"],
    steal: "Let character survive the mix; perfect is not always more moving.",
  },
  {
    name: "Tom Elmhirst",
    role: "Mix engineer",
    family: "Mix / Master",
    era: "2000s-present",
    superpower: "Elegant vocal, soul, pop, and alternative mixes where warmth and clarity coexist.",
    signatureMove: "Natural vocal weight, restrained effects, and mixes that feel timeless instead of trendy.",
    study: ["Amy Winehouse - Rehab", "Adele - Rolling in the Deep", "David Bowie - Blackstar"],
    steal: "Use restraint as taste; leave space for the performance to feel important.",
  },
  {
    name: "Bruce Swedien",
    role: "Recording / mix engineer",
    family: "Mix / Master",
    era: "1950s-2000s",
    superpower: "Pristine pop, R&B, and orchestral recording where depth and detail feel luxurious.",
    signatureMove: "Layered vocal clarity, deep stereo imaging, clean transients, and musical room decisions.",
    study: ["Michael Jackson - Billie Jean", "Michael Jackson - Thriller", "Quincy Jones - The Dude"],
    steal: "Capture and arrange depth early so the mix does not have to fake dimension later.",
  },
  {
    name: "Al Schmitt",
    role: "Recording / mix engineer",
    family: "Mix / Master",
    era: "1950s-2020s",
    superpower: "Natural acoustic recording with unbelievable elegance, balance, and depth.",
    signatureMove: "Mic placement, room truth, minimal processing, and performances captured as records.",
    study: ["Steely Dan - Aja", "Ray Charles - Genius Loves Company", "Diana Krall - The Look of Love"],
    steal: "Move the microphone before reaching for EQ.",
  },
  {
    name: "Sylvia Massy",
    role: "Producer / engineer",
    family: "Mix / Master",
    era: "1980s-present",
    superpower: "Fearless analog experimentation that makes rock and alternative records feel physical.",
    signatureMove: "Unusual rooms, bold distortion, re-amping, performance psychology, and memorable sonic accidents.",
    study: ["Tool - Undertow", "System of a Down - Toxicity-era production orbit", "Johnny Cash - Unchained sessions"],
    steal: "Create a sound the artist reacts to emotionally, then record that reaction.",
  },
  {
    name: "Susan Rogers",
    role: "Recording engineer / producer",
    family: "Mix / Master",
    era: "1980s-present",
    superpower: "Artist trust, fast creative capture, and technical choices that protect inspiration.",
    signatureMove: "Keeping the session emotionally alive while documenting bold sonic ideas.",
    study: ["Prince - Purple Rain", "Prince - Sign o' the Times", "Prince - Parade"],
    steal: "Engineer the room so the artist can stay inside the creative moment.",
  },
  {
    name: "Emily Lazar",
    role: "Mastering engineer",
    family: "Mix / Master",
    era: "1990s-present",
    superpower: "Mastering that preserves impact, emotion, and identity across rock, pop, alternative, and soundtracks.",
    signatureMove: "Translation, tasteful loudness, and final polish that respects the mix's personality.",
    study: ["Beck - Colors", "Foo Fighters - Concrete and Gold", "Haim - Women in Music Pt. III"],
    steal: "Master for emotional translation, not just a louder meter reading.",
  },
  {
    name: "Bob Ludwig",
    role: "Mastering engineer",
    family: "Mix / Master",
    era: "1960s-present",
    superpower: "Final-stage authority across rock, pop, classical, country, and prestige catalog work.",
    signatureMove: "Balanced loudness, full-range translation, and masters that hold up for decades.",
    study: ["Led Zeppelin catalog remasters", "Daft Punk - Random Access Memories", "Nirvana - In Utero"],
    steal: "Make the final master feel inevitable, not hyped.",
  },
];

const sessionCollectives = [
  {
    name: "The Wrecking Crew",
    city: "Los Angeles",
    lesson: "Pop records often become timeless because invisible specialists solve feel, arrangement, and tone fast.",
    study: ["The Beach Boys", "Phil Spector records", "Simon & Garfunkel"],
  },
  {
    name: "The Funk Brothers",
    city: "Detroit / Motown",
    lesson: "A house band can create a label's entire rhythmic and harmonic language.",
    study: ["Marvin Gaye", "The Supremes", "The Temptations"],
  },
  {
    name: "Booker T. & the M.G.'s / Stax orbit",
    city: "Memphis",
    lesson: "The rhythm section can make soul feel conversational, raw, and elegant at the same time.",
    study: ["Otis Redding", "Sam & Dave", "Wilson Pickett"],
  },
  {
    name: "Nashville A-Team",
    city: "Nashville",
    lesson: "First-call players turn plain demos into records through taste, economy, and arrangement discipline.",
    study: ["Patsy Cline", "Elvis Presley", "Brenda Lee"],
  },
];

const mixGuideBenchmarks = [
  {
    style: "R&B",
    family: "Vocal intimacy",
    target: "Lead vocal close, warm low end, soft depth, drums supporting pocket rather than dominating.",
    vocal: "Forward, detailed, de-essed carefully, with ad-libs and stacks sitting behind the lead like emotional shadows.",
    lowEnd: "Round sub and bass relationship; kick should support sensual pulse without swallowing the vocal chest.",
    drums: "Controlled transients, roomy enough to breathe, often softer than hip-hop but still pocket-clear.",
    space: "Short rooms and plate-style depth for lead; wider, wetter backgrounds for lift.",
    dynamics: "Smooth level control. Loud enough to feel finished, not so pinned that the vocal loses vulnerability.",
    checks: ["Can every word be understood quietly?", "Does the hook feel wider without getting harsher?", "Does bass translate on phone and car?"],
    commonIssues: ["Pretty track crowds the singer", "Too much reverb on lead", "Low mids blur desire/intimacy"],
  },
  {
    style: "Soul / Modern Soul",
    family: "Human warmth",
    target: "Band and vocal feel lived-in, with warmth, motion, and emotional grain preserved.",
    vocal: "Natural dynamics are welcome; compression should support conviction, not iron it flat.",
    lowEnd: "Bass should feel like a player, not a sine wave. Let note length and touch matter.",
    drums: "Pocket and room tone matter more than perfect grid impact.",
    space: "Use believable rooms, plates, and chamber-like depth. Avoid sterile brightness.",
    dynamics: "Leave some rise and fall. Soul needs emotional movement more than maximum density.",
    checks: ["Does the band answer the vocal?", "Can you feel hands on instruments?", "Does warmth become mud?"],
    commonIssues: ["Vintage texture with no clarity", "Over-cleaning human noise", "Backgrounds too loud for the lead truth"],
  },
  {
    style: "Neo-Soul",
    family: "Groove sophistication",
    target: "Warm, rounded, harmonically rich, with pocket and bass movement carrying the record.",
    vocal: "Lead can sit slightly inside the music but must remain emotionally legible.",
    lowEnd: "Bass is melodic and central. Keep kick/bass separation clean around complex chords.",
    drums: "Swing and ghost notes should survive. Avoid over-quantized transient shaping.",
    space: "Rhodes, guitars, and pads can be wide and hazy; vocal needs a stable center.",
    dynamics: "Gentle bus glue works, but preserve microtiming and groove softness.",
    checks: ["Can you hum the bass movement?", "Do chords feel rich without masking vocal?", "Does the groove breathe?"],
    commonIssues: ["Low-mid congestion", "Too many lush parts in same register", "Vocal hidden by beautiful chords"],
  },
  {
    style: "Pop / Pop-R&B",
    family: "Clarity and payoff",
    target: "Immediate vocal, obvious chorus lift, controlled brightness, and a hook that survives every speaker.",
    vocal: "Very forward and consistent. Doubles/stacks should make the title feel expensive.",
    lowEnd: "Clean and disciplined. Low end supports chorus size without stealing lyric focus.",
    drums: "Snare/clap and kick need recognizable impact; transients should feel polished.",
    space: "Verse can be tighter; chorus should open through width, backgrounds, and timed effects.",
    dynamics: "Competitive but not crushed. Chorus must feel larger through contrast, not just limiting.",
    checks: ["Is the title clear first listen?", "Does chorus widen without harshness?", "Does vocal stay front on laptop?"],
    commonIssues: ["Chorus louder but not clearer", "Too much top-end excitement", "Stacks mask lead consonants"],
  },
  {
    style: "Dance-Pop",
    family: "Release and motion",
    target: "Kick/bass authority, bright hook energy, and drop/release moments that move physically.",
    vocal: "Clean, rhythmic, and slightly glossy. Vocal chops or post-hooks must feel intentional.",
    lowEnd: "Kick and bass are the engine. Sidechain or arrangement should make the groove pump without losing weight.",
    drums: "Four-on-floor or dance pulse needs consistent impact and controlled high-end hats.",
    space: "Wide synths, timed delays, and reverbs that clear before the next groove hit.",
    dynamics: "Density can be high, but builds and drops need contrast.",
    checks: ["Does the drop hit after a quiet build?", "Can the kick own the club system?", "Is the hook still singable?"],
    commonIssues: ["Drop with no song", "Bass eats vocal", "Builds too bright before payoff"],
  },
  {
    style: "Singer-Songwriter Pop",
    family: "Confession and detail",
    target: "Lyric-first mix with close vocal, believable instrument texture, and gradual emotional lift.",
    vocal: "Natural and intimate. Mouth noise and breaths can help if they do not distract.",
    lowEnd: "Supportive, not dominant. Acoustic bass, piano lows, or soft synth bass should not cloud words.",
    drums: "If present, drums should enter as emotional lift rather than loop dominance.",
    space: "Small room around the singer; bigger spaces saved for bridge/final chorus meaning.",
    dynamics: "Preserve performance range. Over-limiting can make the confession feel fake.",
    checks: ["Do details feel close enough?", "Does the bridge lift emotionally?", "Can quiet playback carry the lyric?"],
    commonIssues: ["Vocal over-polished", "Piano/guitar masks lower vocal", "Final chorus lacks new depth"],
  },
  {
    style: "Alt-Pop / Alternative",
    family: "Texture with a hook path",
    target: "Distinctive sonic world, controlled imperfection, and enough vocal/hook clarity to orient the listener.",
    vocal: "Can be stylized, tucked, doubled, distorted, or dry, but the emotional thesis must remain traceable.",
    lowEnd: "Depends on world: subby electronic, indie bass, or distorted low-mid weight. Keep one anchor clear.",
    drums: "Character matters: dry machines, roomy live drums, crushed loops, or hybrid textures.",
    space: "Use space as identity. Weird reverbs and delays are welcome if they serve perspective.",
    dynamics: "Contrast is vital. Let strange textures appear and disappear.",
    checks: ["What sound identifies the artist?", "Is weirdness helping the hook?", "Does texture become clutter?"],
    commonIssues: ["Random effects with no emotional job", "Hook buried under taste", "No stable center"],
  },
  {
    style: "Hip-Hop",
    family: "Vocal authority and knock",
    target: "Rap vocal intelligibility, drum authority, low-end confidence, and enough negative space for quotables.",
    vocal: "Centered, present, and rhythmically clear. Main vocal should cut without sounding thin.",
    lowEnd: "Kick/808/bass relationship is the mix. Decide what owns the sub and what owns punch.",
    drums: "Transient identity matters: snare/clap should mark pocket and attitude.",
    space: "Often drier than R&B. Use throws and ad-lib spaces instead of washing the lead.",
    dynamics: "Loud and solid, but punch must survive limiting.",
    checks: ["Can every bar be understood?", "Does the beat knock quietly?", "Do ad-libs add depth without clutter?"],
    commonIssues: ["808 masks vocal", "Too much stereo music under rap", "Limiter kills drum punch"],
  },
  {
    style: "Melodic Rap",
    family: "Tune, pocket, and atmosphere",
    target: "Vocal melody sits between rap and singing with tuned clarity, atmospheric space, and controlled low end.",
    vocal: "Tune should feel stylistic, not accidental. Lead needs forward consonants and smooth sustained notes.",
    lowEnd: "808s can be emotional, but must not bury melodic vocal fundamentals.",
    drums: "Trap/melodic pocket should leave room for sustained phrases.",
    space: "Delay/reverb can be more present than rap, but keep hook words readable.",
    dynamics: "Smooth vocal compression; preserve enough transient for flow articulation.",
    checks: ["Is tuning helping identity?", "Does the hook float without blurring?", "Can phone speakers reveal melody?"],
    commonIssues: ["Autotune harshness", "808 covers vocal notes", "Ad-libs cloud hook"],
  },
  {
    style: "Drill",
    family: "Cold motion",
    target: "Sliding 808s, sharp hats, dark ambience, and vocal aggression that stays intelligible.",
    vocal: "Dry, forward, and hard-edged. Keep consonants clear over fast hat motion.",
    lowEnd: "808 slides are musical hooks. Tune and carve so movement is audible on small systems.",
    drums: "Hats and percussion need precision without ice-pick harshness.",
    space: "Dark, short ambience works; avoid long reverbs that soften threat.",
    dynamics: "Aggressive loudness, but retain 808 movement and snare snap.",
    checks: ["Can you follow the 808 melody?", "Does vocal cut through hats?", "Does darkness turn muddy?"],
    commonIssues: ["Uncontrolled 808 notes", "Hats too sharp", "Vocal too buried in dark pads"],
  },
  {
    style: "Country",
    family: "Story and band polish",
    target: "Lyric intelligibility, warm acoustic instruments, tasteful low end, and chorus lift without losing story.",
    vocal: "Lead vocal is the record. Keep it natural, centered, and emotionally believable.",
    lowEnd: "Bass supports groove; kick should feel solid but not urban unless the production asks for it.",
    drums: "Pocket can be polished or rootsy. Snare should not overpower the lyric.",
    space: "Real rooms, plates, slapback, and acoustic depth. Keep guitars separated by role.",
    dynamics: "Moderate polish. Let verses breathe and choruses open.",
    checks: ["Can the story be understood in the car?", "Do guitars fight the vocal?", "Does chorus lift without pop harshness?"],
    commonIssues: ["Too much guitar midrange", "Vocal over-tuned/over-bright", "Low end too modern for lyric"],
  },
  {
    style: "Gospel",
    family: "Communal lift",
    target: "Lead vocal authority, choir width, piano/organ warmth, and dynamic lift that feels spiritual not cluttered.",
    vocal: "Lead must lead. Choir responses should surround, answer, and lift without masking testimony.",
    lowEnd: "Bass and kick support church movement. Keep organ left-hand/piano lows from muddying bass.",
    drums: "Can be live and energetic; cymbals need control around choir brightness.",
    space: "Room size matters. Let the choir feel communal while keeping the lead intelligible.",
    dynamics: "Allow builds, breakdowns, and vamps to grow. Over-flattening kills release.",
    checks: ["Does the room feel alive?", "Can lead cut through choir?", "Does the vamp grow emotionally?"],
    commonIssues: ["Choir masks lead", "Organ/piano low-mid buildup", "Cymbals harsh during lift"],
  },
  {
    style: "Rock & Roll / Classic Rock",
    family: "Band impact",
    target: "Riff identity, drum room, bass/guitar lock, and a vocal that competes with real instruments.",
    vocal: "Can be gritty, but must ride above guitars. Automation matters more than static level.",
    lowEnd: "Bass guitar and kick need physical separation; low mids should feel powerful, not cloudy.",
    drums: "Room and snare identity carry scale. Avoid sample polish that removes band feel.",
    space: "Guitars can be wide; vocal and kick/snare center the record.",
    dynamics: "Preserve punch and section contrast. Rock dies when everything is equally loud.",
    checks: ["Does the riff read instantly?", "Do guitars overpower vocal?", "Does chorus feel physically bigger?"],
    commonIssues: ["Guitar wall masks vocal", "Kick disappears under bass", "No quiet-loud contrast"],
  },
  {
    style: "Punk Rock",
    family: "Urgency",
    target: "Fast, direct, raw, and loud enough to feel immediate without losing the slogan.",
    vocal: "Forward, shouted, and intelligible. Perfection is less important than stance.",
    lowEnd: "Bass should drive with pick/upper-mid identity; kick supports speed.",
    drums: "Snare and cymbals can be aggressive but must not wash out the vocal.",
    space: "Usually dry or small-room. Too much reverb weakens urgency.",
    dynamics: "Compressed and immediate, but not so flattened that the band loses attack.",
    checks: ["Can the slogan be shouted back?", "Does speed blur the hook?", "Is raw still readable?"],
    commonIssues: ["Cymbal wash", "Guitars too fizzy", "Vocal buried for authenticity"],
  },
  {
    style: "Grunge",
    family: "Quiet-loud weight",
    target: "Raw vocal emotion, heavy guitars, dynamic eruption, and low-mid weight that does not collapse.",
    vocal: "Can move from intimate to torn-open. Automation must follow emotional intensity.",
    lowEnd: "Bass and guitars share weight; carve enough space for kick and vocal body.",
    drums: "Roomy, powerful, and human. Snare should feel physical.",
    space: "Verses can feel close; choruses can explode into room/guitar width.",
    dynamics: "Quiet-loud contrast is the genre language. Do not master it flat.",
    checks: ["Does chorus erupt?", "Can vocal pain cut through distortion?", "Do low mids stay controlled?"],
    commonIssues: ["Muddy guitars", "Vocal swallowed by distortion", "Mastering removes dynamic story"],
  },
  {
    style: "Pop-Punk / Emo",
    family: "Crowd diary",
    target: "Huge chorus vocals, bright guitars, energetic drums, and lyric clarity at speed.",
    vocal: "Lead and gang/background vocals should feel shoutable and emotionally urgent.",
    lowEnd: "Tight bass and kick lock; leave room for guitars without thinning the record.",
    drums: "Punchy snare, bright but controlled cymbals, energetic fills into choruses.",
    space: "Mostly tight and forward; use throws/background width for chorus scale.",
    dynamics: "High energy, but bridge/dropdown contrast makes final chorus matter.",
    checks: ["Can a crowd scream the hook?", "Are guitars bright without pain?", "Does bridge reset energy?"],
    commonIssues: ["Cymbals shred ears", "Vocal too low under guitars", "Chorus lacks extra size"],
  },
];

const engineerMixStyleByWorkflow = {
  "R&B": "R&B",
  "Soul": "Soul / Modern Soul",
  "Neo-Soul": "Neo-Soul",
  "Pop": "Pop / Pop-R&B",
  "Dance-Pop": "Dance-Pop",
  "Singer-Songwriter Pop": "Singer-Songwriter Pop",
  "Alt-Pop": "Alt-Pop / Alternative",
  "Pop-R&B": "Pop / Pop-R&B",
  "Hip-Hop": "Hip-Hop",
  "Melodic Rap": "Melodic Rap",
  "Drill": "Drill",
  "Country": "Country",
  "Gospel": "Gospel",
  "Alternative": "Alt-Pop / Alternative",
  "Rock & Roll": "Rock & Roll / Classic Rock",
  "Classic Rock": "Rock & Roll / Classic Rock",
  "Punk Rock": "Punk Rock",
  "Grunge": "Grunge",
  "Pop-Punk/Emo": "Pop-Punk / Emo",
};

const engineerGenreLenses = {
  "R&B": {
    capture: "Protect intimacy: quiet room, soft headphone blend, clean lead vocal, and stacks captured close enough to feel personal.",
    mix: "Lead vocal stays forward and warm; low end supports the chest without swallowing consonants.",
    master: "Keep vulnerability intact. Loudness should not flatten breaths, ad-libs, or chorus softness.",
    deliverable: "Lead, backgrounds, instrumental, acapella, clean, and TV mix matter because vocal arrangement is the record.",
  },
  "Soul": {
    capture: "Prioritize feel, room tone, and performance spill that sounds human rather than sterile.",
    mix: "Let band motion answer the vocal while controlling low-mid warmth before it becomes mud.",
    master: "Leave rise and fall. Soul loses truth when every section is pinned to the same density.",
    deliverable: "Print full mix, instrumental, vocal up/down, and live-band stems with notes on preserved performance moments.",
  },
  "Neo-Soul": {
    capture: "Track groove, chord color, and bass touch carefully; the pocket is a performance, not just timing.",
    mix: "Keep the vocal centered while Rhodes, guitars, pads, and bass create width and harmonic richness.",
    master: "Preserve microtiming and groove softness. Do not chase loudness at the expense of pocket.",
    deliverable: "Export instrumental, acapella, rhythm section, keys, and harmony stacks for future arrangement versions.",
  },
  "Pop": {
    capture: "Capture clean, consistent lead takes and tight doubles that can survive heavy editing and bright playback.",
    mix: "Prioritize title clarity, chorus lift, controlled brightness, and vocal consistency on small speakers.",
    master: "Competitive loudness is allowed, but the chorus must grow through contrast, not only limiting.",
    deliverable: "Full, instrumental, acapella, clean, TV, performance track, and short-form edit are part of the pop package.",
  },
  "Dance-Pop": {
    capture: "Record rhythmic, glossy vocals with clean phrase endings so edits, chops, and drops can lock to the grid.",
    mix: "Kick and bass are the engine; vocals and post-hooks must clear the groove instead of smearing it.",
    master: "Check club weight and phone hook clarity. The drop must hit without deleting the lyric.",
    deliverable: "Full, instrumental, acapella, extended, radio, clean, and stems for remix or performance versions.",
  },
  "Singer-Songwriter Pop": {
    capture: "Record believable proximity: breaths, small dynamics, and instrument texture are emotional evidence.",
    mix: "Keep lyric detail above piano/guitar masking, then widen only when the story earns lift.",
    master: "Avoid over-polish. Quiet playback should still feel close and emotionally readable.",
    deliverable: "Full, instrumental, vocal up/down, stripped version, and performance print are useful.",
  },
  "Alt-Pop": {
    capture: "Commit one strange texture or vocal color early, but keep a clean path back to the emotional thesis.",
    mix: "Texture can be identity, but the hook still needs a stable center and readable phrase.",
    master: "Let contrast survive. Weird details should appear and disappear instead of becoming flat wallpaper.",
    deliverable: "Print main, instrumental, acapella, stems for signature textures, and alternate vocal-effect passes.",
  },
  "Pop-R&B": {
    capture: "Record clean lead, tight doubles, and tasteful harmony options so the hook can feel expensive.",
    mix: "Blend R&B warmth with pop clarity: intimate verses, wide chorus, polished but not icy.",
    master: "Keep vocal air smooth and low end disciplined. Brightness should not make the singer feel distant.",
    deliverable: "Full, clean, instrumental, acapella, TV, lead-only, and stacked-vocal stems.",
  },
  "Hip-Hop": {
    capture: "Get vocal authority: clean gain, tight punch-ins, readable ad-libs, and a headphone mix that supports pocket.",
    mix: "Rap intelligibility, drum knock, 808/kick decisions, and negative space for quotables come first.",
    master: "Loud and solid, but punch must survive. If the snare folds, the record shrinks.",
    deliverable: "Full, clean, dirty, instrumental, acapella, TV, show track, and stems for edits.",
  },
  "Melodic Rap": {
    capture: "Track melody, tune behavior, and emotional ad-libs as part of the identity from the start.",
    mix: "Tuning, atmosphere, and 808s must cooperate so sustained notes remain readable.",
    master: "Smooth density works, but harsh tuning or buried melody will punish phone playback.",
    deliverable: "Full, clean, instrumental, acapella, tuned lead, dry lead, and ad-lib stems.",
  },
  "Drill": {
    capture: "Record dry, hard-edged vocals with clear consonants so delivery cuts through hats and dark pads.",
    mix: "808 slides are musical information. Tune, carve, and automate so the movement survives.",
    master: "Aggression is welcome; harsh hats and uncontrolled sub are the danger zone.",
    deliverable: "Full, clean, instrumental, acapella, performance track, and 808/drum stems for show edits.",
  },
  "Country": {
    capture: "Capture the lyric like a story being told in the room: natural lead, tasteful guitars, and believable band tone.",
    mix: "Vocal and story lead. Guitars separate by role; low end supports without urbanizing the record unless intended.",
    master: "Car translation matters. The story should remain intelligible over road noise.",
    deliverable: "Full, instrumental, vocal up/down, acoustic version, performance track, and clean radio edit.",
  },
  "Gospel": {
    capture: "Capture testimony plus room response: lead authority, choir width, organ/piano warmth, and dynamic lift.",
    mix: "Lead must lead; choir surrounds and answers without masking the message.",
    master: "Let vamps grow. Over-limiting can erase the spiritual release.",
    deliverable: "Full, instrumental, acapella, choir stem, lead stem, TV mix, and extended worship/vamp print.",
  },
  "Alternative": {
    capture: "Record character first: room, distortion, odd mic color, or performance tension that gives the track a world.",
    mix: "Let the sonic world be distinct, but keep one anchor clear: vocal, riff, bass, or beat.",
    master: "Do not sand off the point of view. Translation should keep the edge, not sterilize it.",
    deliverable: "Full, instrumental, acapella, stem groups, and alternate effect-heavy or stripped prints.",
  },
  "Rock & Roll": {
    capture: "Capture band interaction, amp tone, drum room, and vocal attitude before editing makes it polite.",
    mix: "Backbeat, riff, bass/guitar lock, and vocal ride determine whether the record feels alive.",
    master: "Preserve punch and section lift. Rock gets smaller when every transient is flattened.",
    deliverable: "Full, instrumental, vocal up/down, TV mix, drum/bass/guitar/vocal stems, and live-show print.",
  },
  "Classic Rock": {
    capture: "Treat the band as the instrument: drum room, guitar amps, bass touch, and vocal performance are the sound.",
    mix: "Riff identity and vocal automation matter. Guitars can be wide, but the song still needs a center.",
    master: "Keep dynamic story and physical impact. Loudness should not erase the band breathing.",
    deliverable: "Full, instrumental, vocal up/down, stem groups, and alternate master for vinyl/live contexts.",
  },
  "Punk Rock": {
    capture: "Capture urgency fast: stance, shout, guitar bite, bass drive, and drum speed before perfection slows it down.",
    mix: "Slogan clarity and speed matter more than polish; cymbals and fizz need control.",
    master: "Immediate and loud is fine, but the vocal slogan cannot disappear.",
    deliverable: "Full, instrumental, clean if needed, TV mix, and band stems for live/video edits.",
  },
  "Grunge": {
    capture: "Track quiet-loud emotion: intimate verses, torn-open choruses, heavy guitars, and human drum weight.",
    mix: "Low-mid power is the point and the problem. Carve enough space for vocal pain and kick impact.",
    master: "Do not master away the eruption. The contrast is the genre language.",
    deliverable: "Full, instrumental, vocal up/down, guitar/bass/drum/vocal stems, and alternate dynamic master.",
  },
  "Pop-Punk/Emo": {
    capture: "Capture shoutable lead, gang vocals, tight guitars, and drums that push the chorus forward.",
    mix: "Huge hook vocals, bright guitars, punchy drums, and lyric clarity at speed are the target.",
    master: "High energy is required, but cymbal pain and crushed bridges will fatigue the listener.",
    deliverable: "Full, clean, instrumental, acapella, TV, gang vocal stem, and performance track.",
  },
};

const engineerStudyProfiles = [
  {
    name: "Dr. Dre",
    role: "Producer / mixer / sonic architect",
    lanes: ["Hip-Hop", "Melodic Rap"],
    focus: "Authority, low-end discipline, negative space, and cinematic polish.",
    study: ["Still D.R.E.", "Gin and Juice", "In Da Club"],
    copy: "Make the vocal feel expensive by removing anything that weakens its command.",
  },
  {
    name: "Derek \"MixedByAli\" Ali",
    role: "Mix engineer",
    lanes: ["Hip-Hop", "R&B", "Neo-Soul", "Melodic Rap"],
    focus: "Narrative depth, vocal emotion, controlled distortion, and detailed low end.",
    study: ["Money Trees", "Broken Clocks", "HUMBLE."],
    copy: "Mix the artist's perspective, not just the beat and vocal.",
  },
  {
    name: "Young Guru",
    role: "Recording / mix engineer",
    lanes: ["Hip-Hop", "Melodic Rap"],
    focus: "Rap vocal speed, punch-in workflow, lyric dominance, and clean session command.",
    study: ["The Blueprint", "The Black Album", "Watch the Throne"],
    copy: "Engineer the session so the artist can move fast and still sound finished.",
  },
  {
    name: "Serban Ghenea",
    role: "Mix engineer",
    lanes: ["Pop / Pop-R&B", "Dance-Pop", "Alt-Pop / Alternative", "R&B"],
    focus: "Modern pop clarity, vocal consistency, controlled brightness, and hook scale.",
    study: ["Blinding Lights", "Anti-Hero", "Thank U, Next"],
    copy: "Make the title and lead vocal translate before adding shine.",
  },
  {
    name: "Manny Marroquin",
    role: "Mix engineer",
    lanes: ["R&B", "Pop / Pop-R&B", "Hip-Hop", "Rock & Roll / Classic Rock", "Soul / Modern Soul"],
    focus: "Musical balance, dimensional vocals, tasteful effects, and emotional polish.",
    study: ["Stronger", "No One", "Gravity"],
    copy: "Balance the feeling first; solve the technical details in service of that feeling.",
  },
  {
    name: "Leslie Brathwaite",
    role: "Mix engineer",
    lanes: ["Hip-Hop", "R&B", "Pop / Pop-R&B", "Dance-Pop"],
    focus: "Commercial finish, punch, vocal hierarchy, and club-ready low end.",
    study: ["Bodak Yellow", "Happy", "Hey Ya!"],
    copy: "Keep personality intact while making the record feel undeniably released.",
  },
  {
    name: "Jaycen Joshua",
    role: "Mix engineer",
    lanes: ["Hip-Hop", "Melodic Rap", "Pop / Pop-R&B", "Dance-Pop", "Drill"],
    focus: "Impact, loudness, crisp vocals, and aggressive low-end translation.",
    study: ["Dior", "Drunk in Love", "Mask Off"],
    copy: "Push energy hard, then police harshness before it becomes fatigue.",
  },
  {
    name: "Vic Wainstein",
    role: "Recording engineer",
    lanes: ["Drill"],
    focus: "Dry, direct vocal capture that lets Brooklyn drill delivery cut through sliding 808s and fast hats.",
    study: ["Dior", "Meet the Woo-era vocal capture", "Pop Smoke studio workflow"],
    copy: "Capture the vocal with enough front-edge clarity that the mix does not have to fight for every consonant.",
  },
  {
    name: "Jack Baxter",
    role: "Recording engineer",
    lanes: ["Drill"],
    focus: "Clean rap tracking, punch-in continuity, and vocal presence for sparse, high-pressure drill arrangements.",
    study: ["Dior", "Meet the Woo-era recording credits", "Brooklyn drill vocal stacking"],
    copy: "Keep the recording chain simple, dry, and consistent so ad-libs and doubles feel like one performance language.",
  },
  {
    name: "808Melo",
    role: "Producer / drill sound architect",
    lanes: ["Drill"],
    focus: "UK-to-Brooklyn drill bounce, gliding bass movement, dark melodic restraint, and room for a commanding vocal.",
    study: ["Welcome to the Party", "Dior", "Meet the Woo"],
    copy: "Treat the 808 slide as a lead instrument, then leave enough air for the rapper's timing to become the hook.",
  },
  {
    name: "AXL Beats",
    role: "Producer / drill sound architect",
    lanes: ["Drill"],
    focus: "Transatlantic drill bounce, melodic loops, chant space, and production that lets ad-libs become punctuation.",
    study: ["Big Drip", "War", "NY drill crossover records"],
    copy: "Design the bounce so the artist can ride behind, ahead, and around it without the track losing identity.",
  },
  {
    name: "Mike Dean",
    role: "Producer / mixer / mastering engineer",
    lanes: ["Hip-Hop", "Melodic Rap", "Alt-Pop / Alternative", "Dance-Pop"],
    focus: "Synth drama, saturated scale, massive low end, and final-stage intensity.",
    study: ["Sicko Mode", "After Hours", "Father Stretch My Hands Pt. 1"],
    copy: "Use size and distortion as emotion, not clutter.",
  },
  {
    name: "Bob Clearmountain",
    role: "Mix engineer",
    lanes: ["Rock & Roll / Classic Rock", "Pop / Pop-R&B", "Country", "Alt-Pop / Alternative"],
    focus: "Drum room, vocal rides, stereo life, and mixes that move like performances.",
    study: ["Born in the U.S.A.", "Start Me Up", "Summer of '69"],
    copy: "Use automation and ambience to make the band feel cinematic.",
  },
  {
    name: "Chris Lord-Alge",
    role: "Mix engineer",
    lanes: ["Rock & Roll / Classic Rock", "Punk Rock", "Pop-Punk / Emo", "Country"],
    focus: "Explosive drums, commanding vocals, guitar energy, and bold compression.",
    study: ["American Idiot", "Welcome to the Black Parade", "Complicated"],
    copy: "Commit to bold balances; timid impact rarely feels finished.",
  },
  {
    name: "Tom Lord-Alge",
    role: "Mix engineer",
    lanes: ["Pop-Punk / Emo", "Punk Rock", "Rock & Roll / Classic Rock"],
    focus: "Chorus arrival, guitar polish, tight low end, and bright radio energy.",
    study: ["All the Small Things", "Fat Lip", "Beverly Hills"],
    copy: "Make the chorus physically arrive through width, tone, and stacks.",
  },
  {
    name: "Andrew Scheps",
    role: "Mix engineer",
    lanes: ["Rock & Roll / Classic Rock", "Grunge", "Alt-Pop / Alternative", "Singer-Songwriter Pop"],
    focus: "Parallel energy, analog attitude, dense emotion, and preserved imperfection.",
    study: ["Californication", "21", "Take Me to Church"],
    copy: "Let character survive the mix; not every edge needs sanding.",
  },
  {
    name: "Tom Elmhirst",
    role: "Mix engineer",
    lanes: ["Soul / Modern Soul", "Singer-Songwriter Pop", "Alt-Pop / Alternative", "Pop / Pop-R&B"],
    focus: "Elegant vocal weight, restraint, warmth, and timeless finish.",
    study: ["Rehab", "Rolling in the Deep", "Blackstar"],
    copy: "Use restraint as taste and let the performance stay central.",
  },
  {
    name: "Bruce Swedien",
    role: "Recording / mix engineer",
    lanes: ["Pop / Pop-R&B", "R&B", "Soul / Modern Soul", "Dance-Pop"],
    focus: "Depth, detail, vocal layers, clean transients, and luxurious stereo imaging.",
    study: ["Billie Jean", "Thriller", "The Dude"],
    copy: "Capture depth early so the mix does not have to fake dimension later.",
  },
  {
    name: "Al Schmitt",
    role: "Recording / mix engineer",
    lanes: ["Soul / Modern Soul", "Country", "Singer-Songwriter Pop", "Gospel"],
    focus: "Natural acoustic balance, room truth, mic placement, and graceful dynamics.",
    study: ["Aja", "Genius Loves Company", "The Look of Love"],
    copy: "Move the microphone before reaching for EQ.",
  },
  {
    name: "Sylvia Massy",
    role: "Producer / engineer",
    lanes: ["Grunge", "Punk Rock", "Rock & Roll / Classic Rock", "Alt-Pop / Alternative"],
    focus: "Fearless recording experiments, analog color, unusual rooms, and emotional accidents.",
    study: ["Undertow", "Toxicity-era rock engineering", "Unchained sessions"],
    copy: "Create a sound the artist reacts to, then record the reaction.",
  },
  {
    name: "Susan Rogers",
    role: "Recording engineer / producer",
    lanes: ["Pop / Pop-R&B", "R&B", "Soul / Modern Soul", "Alt-Pop / Alternative"],
    focus: "Artist trust, fast capture, bold decisions, and protecting inspiration.",
    study: ["Purple Rain", "Sign o' the Times", "Parade"],
    copy: "Engineer the room so the artist can stay inside the creative moment.",
  },
  {
    name: "Emily Lazar",
    role: "Mastering engineer",
    lanes: ["Rock & Roll / Classic Rock", "Alt-Pop / Alternative", "Pop / Pop-R&B", "Singer-Songwriter Pop"],
    focus: "Emotional translation, impact, tasteful loudness, and final identity.",
    study: ["Colors", "Concrete and Gold", "Women in Music Pt. III"],
    copy: "Master for emotional translation, not just a louder meter.",
  },
  {
    name: "Bob Ludwig",
    role: "Mastering engineer",
    lanes: ["Rock & Roll / Classic Rock", "Dance-Pop", "Country", "Grunge", "Pop / Pop-R&B"],
    focus: "Full-range translation, lasting balance, and masters that age well.",
    study: ["Random Access Memories", "In Utero", "Led Zeppelin catalog remasters"],
    copy: "Make the final master feel inevitable, not hyped.",
  },
  {
    name: "Tony Maserati",
    role: "Mix engineer",
    lanes: ["R&B", "Pop / Pop-R&B", "Hip-Hop", "Soul / Modern Soul"],
    focus: "Silky R&B vocals, luxurious depth, and mixes that feel expensive without shouting.",
    study: ["Crazy in Love", "If I Ain't Got You", "No Scrubs"],
    copy: "Make smoothness feel powerful, not sleepy.",
  },
  {
    name: "Dave Pensado",
    role: "Mix engineer",
    lanes: ["R&B", "Pop / Pop-R&B", "Hip-Hop", "Dance-Pop"],
    focus: "Vocal polish, creative effects, and radio-ready excitement across R&B and pop.",
    study: ["Beyonce catalog studies", "Christina Aguilera records", "Pensado's Place mix breakdowns"],
    copy: "Use effects as arrangement moments, not decoration.",
  },
];

const mixGuideFundamentals = [
  {
    title: "Signal Flow",
    tag: "Routing",
    purpose: "Understand the path from source to final bounce so every decision has a place.",
    chain: ["Source", "Mic / DI", "Preamp", "Converter", "DAW track", "Insert chain", "Bus", "Mix bus", "Limiter", "Print"],
    moves: [
      "Fix the source before reaching for plugins.",
      "Gain stage so every processor receives a healthy level without clipping.",
      "Use buses for shared tone: drums, music, vocals, effects, and mix bus.",
      "Print roughs with headroom so mastering is not fighting hidden clipping.",
    ],
    warning: "If the mix feels worse after every plugin, the signal flow is probably solving symptoms instead of the source.",
  },
  {
    title: "Compression & Limiting",
    tag: "Dynamics",
    purpose: "Control movement without killing emotion, punch, or groove.",
    chain: ["Leveling", "Peak control", "Tone shaping", "Glue", "Parallel energy", "Final ceiling"],
    moves: [
      "Use slow attack when you want transients to punch; faster attack when peaks are too sharp.",
      "Use release to match groove. If release fights the tempo, the mix pumps in the wrong way.",
      "Compress vocals for consistency, drums for impact, bass for stability, and buses for shared motion.",
      "Limit last for translation. Loudness should not erase kick, snare, vocal consonants, or chorus contrast.",
    ],
    warning: "Over-compression sounds exciting for ten seconds, then makes the whole song smaller.",
  },
  {
    title: "Autotune / Pitch Correction",
    tag: "Vocal Tuning",
    purpose: "Decide whether tuning should disappear, polish, or become part of the artist identity.",
    chain: ["Key", "Scale", "Retune speed", "Humanize", "Formant", "Vibrato", "Print / automate"],
    moves: [
      "Transparent tuning needs the correct key, slower retune, and preserved vibrato.",
      "Modern melodic rap and pop effects often use faster retune, but consonants still need clarity.",
      "Tune doubles and stacks tighter than the lead when the lead needs human emotion.",
      "Automate tuning intensity by section: natural verses, tighter hooks, stylized ad-libs.",
    ],
    warning: "Bad tuning is not just wrong notes. It is wrong emotion: the vocal stops sounding believed.",
  },
  {
    title: "Analog vs Digital Recording",
    tag: "Capture",
    purpose: "Choose recording color before the mix has to manufacture it.",
    chain: ["Performance", "Room", "Mic", "Preamp", "Compression on way in", "Converter", "Editing", "Mix tone"],
    moves: [
      "Analog-style chains add commitment: saturation, thickness, compression behavior, and performer confidence.",
      "Digital capture gives flexibility: clean edits, recall, low noise, and precise correction.",
      "Use analog color when the source benefits from weight or attitude; use clean digital capture when you need surgical control later.",
      "Hybrid workflow works well: record clean enough to edit, then commit color through buses, re-amping, saturation, or outboard.",
    ],
    warning: "Analog is not automatically better and digital is not automatically sterile. The source and intention decide.",
  },
];

const appModes = {
  songwriter: {
    label: "Songwriter",
    brand: "songwriter OS",
    eyebrow: "Songwriter mode",
    title: "Turn the idea into a song.",
    copy: "Start with flow, find the title, build the hook, then shape the sections.",
    railEyebrow: "Song focus",
    railCopy: "Concept, hook, lyric detail, and section payoff.",
    defaultView: "create",
    createMode: "flow",
    workflow: "R&B",
    homeTitle: "Songwriter Home",
    pathEyebrow: "Songwriter pathway",
    pathTitle: "Move from instinct to finished song",
    pathCopy: "Start loose, shape the hook, diagnose the weak point, then save the reusable move.",
    actions: [
      { label: "Open Writing Room", view: "create", createMode: "flow", icon: "icon-pen", primary: true },
      { label: "Run Workshop", view: "workshop", icon: "icon-spark", primary: true },
      { label: "Decode Terms", view: "glossary", icon: "icon-bookmark" },
    ],
    pathways: [
      { step: "01", title: "Find the song", body: "Upload a beat, freewrite, and catch the title phrase before structure gets rigid.", view: "create", createMode: "flow", icon: "icon-pen" },
      { step: "02", title: "Build the hook", body: "Generate options, simplify the language, and test what the listener remembers.", view: "hooks", icon: "icon-repeat" },
      { step: "03", title: "Doctor the draft", body: "Use concept, payoff, lyric, and production checks to find the real problem.", view: "doctor", icon: "icon-stethoscope" },
      { step: "04", title: "Study a hit", body: "Compare your issue to a pro case study and copy the principle, not the surface.", view: "cases", icon: "icon-wave" },
    ],
  },
  producer: {
    label: "Producer",
    brand: "producer OS",
    eyebrow: "Producer mode",
    title: "Turn the beat into a record.",
    copy: "Control playback, study references, map moments, and make production serve the song.",
    railEyebrow: "Record focus",
    railCopy: "Playback, arrangement, sonic identity, and vocal space.",
    defaultView: "audio",
    createMode: "start",
    workflow: "Hip-Hop",
    homeTitle: "Producer Home",
    pathEyebrow: "Producer pathway",
    pathTitle: "Turn loops into records",
    pathCopy: "Begin with playback, mark moments, study pro systems, then shape production around the vocal job.",
    actions: [
      { label: "Open Audio Lab", view: "audio", icon: "icon-headphones", primary: true },
      { label: "Study Pro Systems", view: "pros", icon: "icon-award", primary: true },
      { label: "Build a Song", view: "create", createMode: "start", icon: "icon-pen" },
    ],
    pathways: [
      { step: "01", title: "Load the audio", body: "Loop sections, mark payoff moments, and map where the vocal should live.", view: "audio", icon: "icon-headphones" },
      { step: "02", title: "Choose the record model", body: "Use pro playbooks to identify the hook, brand, groove, or arrangement move.", view: "pros", icon: "icon-award" },
      { step: "03", title: "Shape the song", body: "Move from beat loop to section jobs, contrast, and vocal space.", view: "create", createMode: "shape", icon: "icon-pen" },
      { step: "04", title: "Save references", body: "Build a personal library of sounds, structures, and replay mechanics.", view: "vault", icon: "icon-bookmark" },
    ],
  },
  artist: {
    label: "Artist",
    brand: "artist OS",
    eyebrow: "Artist mode",
    title: "Capture the performance.",
    copy: "Record sketches, transcribe takes, grade delivery, and turn the best pass into a song.",
    railEyebrow: "Performance focus",
    railCopy: "Takes, delivery, emotion, transcript, and repeatable phrases.",
    defaultView: "create",
    createMode: "record",
    workflow: "R&B",
    homeTitle: "Artist Home",
    pathEyebrow: "Artist pathway",
    pathTitle: "Capture the take, then shape the song",
    pathCopy: "Record instinct first, listen back, pull phrases into the notebook, and turn performance into structure.",
    actions: [
      { label: "Record Sketches", view: "create", createMode: "record", icon: "icon-pause", primary: true },
      { label: "Open Audio Lab", view: "audio", icon: "icon-headphones", primary: true },
      { label: "Learn the Language", view: "glossary", icon: "icon-bookmark" },
    ],
    pathways: [
      { step: "01", title: "Record the feeling", body: "Loop the beat and capture melody, flow, and emotional delivery before judging it.", view: "create", createMode: "record", icon: "icon-pause" },
      { step: "02", title: "Review the take", body: "Play it back, transcribe the phrases, and grade the performance direction.", view: "create", createMode: "record", icon: "icon-headphones" },
      { step: "03", title: "Write from the take", body: "Move the strongest phrases into the notebook and build sections around them.", view: "create", createMode: "write", icon: "icon-pen" },
      { step: "04", title: "Tighten the record", body: "Run the doctor and identify what the performance still needs to sell.", view: "doctor", icon: "icon-stethoscope" },
    ],
  },
  engineer: {
    label: "Engineer",
    brand: "engineer OS",
    eyebrow: "Mix / mastering engineer mode",
    title: "Translate the record everywhere.",
    copy: "Listen for balance, depth, dynamics, stereo image, tonal emotion, and whether the song survives real-world playback.",
    railEyebrow: "Translation focus",
    railCopy: "Balance, space, dynamics, tone, references, and final playback confidence.",
    defaultView: "audio",
    createMode: "start",
    workflow: "Pop",
    homeTitle: "Engineer Home",
    pathEyebrow: "Engineer pathway",
    pathTitle: "Move from capture to release-ready playback",
    pathCopy: "Prep the session, capture clean takes, edit with taste, mix for emotion, master for translation, then deliver the right prints.",
    actions: [
      { label: "Open Audio Lab", view: "audio", icon: "icon-headphones", primary: true },
      { label: "Open Mix Guide", view: "mixguide", icon: "icon-sliders", primary: true },
      { label: "Run AI Analyst", view: "analyst", icon: "icon-spark" },
    ],
    pathways: [
      { step: "01", title: "Prep the session", body: "Confirm tempo, key, references, deliverables, sample rate, file names, and what the record should feel like.", view: "audio", icon: "icon-headphones" },
      { step: "02", title: "Record with intention", body: "Choose mic or DI path, gain stage cleanly, build the headphone mix, and capture takes that already point toward the final record.", view: "mixguide", icon: "icon-sliders" },
      { step: "03", title: "Edit without killing feel", body: "Comp, tune, de-noise, align, and clean breaths while protecting the human pocket and emotional phrasing.", view: "analyst", icon: "icon-spark" },
      { step: "04", title: "Mix into the benchmark", body: "Set static balance first, then shape tone, compression, width, depth, automation, and vocal presence for the style.", view: "mixguide", icon: "icon-sliders" },
      { step: "05", title: "Master and deliver", body: "Check loudness, limiting, fades, sequencing, mono, phone, car, earbuds, and export the full print package.", view: "vault", icon: "icon-bookmark" },
    ],
  },
};

const caseStudies = [
  {
    id: "max-martin-blinding-lights",
    title: "Blinding Lights",
    artist: "The Weeknd",
    producer: "Max Martin",
    archetype: "The Hook Engineer",
    lane: "Pop",
    proId: "max-martin",
    alternatives: [],
    problem: "A retro-pop palette could have become nostalgia cosplay. The record needed instant modern urgency.",
    concept: "Lonely velocity: a person trying to outrun distance, excess, and need.",
    hook: "Simple chorus contour, clear title memory, and a melody that feels familiar before it finishes.",
    replay: "The pulse never lets the record sag, while the chorus is simple enough to recall after one listen.",
    structure: ["intro", "hook", "verse", "lift", "hook", "hook", "verse", "lift", "hook", "bridge", "hook", "hook", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "A benchmark modern pop record with global reach.",
      "Proved classic chorus engineering still works in streaming behavior.",
      "Turned retro color into a present-tense hit language.",
    ],
    lessons: [
      "Immediate chorus accessibility",
      "Melodic simplicity",
      "Constant momentum",
      "Emotional universality",
    ],
    productionLessons: [
      "Retro influence with modern low-end",
      "Clean arrangement",
      "Chorus-first energy design",
      "No section feels like a waiting room",
    ],
    anatomy: [
      ["Why did this record work?", "It combines one clear emotional world, a fast-recognizable chorus, and forward motion that keeps the listener inside the song before they can overthink it."],
      ["What songwriting problem was solved?", "The hook makes a moody, nocturnal feeling legible as pop. The listener does not need to decode the emotion before singing along."],
      ["What production problem was solved?", "The production uses retro sonics without sounding dusty by pairing synthwave color with punchy modern drums and low-end control."],
      ["What made it replayable?", "The melody is simple, the groove is propulsive, and every return to the chorus feels like a reward rather than a repeat."],
      ["What can be copied?", "Copy the discipline: clear title target, melodic economy, section momentum, and production that points toward the chorus."],
      ["What cannot be copied?", "You cannot copy the exact cultural timing, The Weeknd's vocal identity, or Max Martin's deep pattern recognition. You can only build your own version of that discipline."],
    ],
    exercise: {
      superpower: "Making a complex commercial machine feel effortless.",
      bestRecord: "Blinding Lights",
      structureMap: "Intro hook signal, short verse, lift, chorus payoff, repeat with enough variation, bridge release, final chorus run.",
      hookArchitecture: "Title-level memory plus an easy melodic contour that lands quickly.",
      emotionalArc: "Desire under pressure becomes release through momentum.",
      productionDecisions: "Synth pulse, dry focus, modern drums, no clutter around the hook.",
      transfer: "Before adding production, define the one chorus memory the listener should leave with.",
    },
    takeaway: "People underestimate how simple great songs often are.",
  },
  {
    id: "benny-blanco-love-yourself",
    title: "Love Yourself",
    artist: "Justin Bieber",
    producer: "Benny Blanco",
    archetype: "The Collaborative Hitmaker",
    lane: "Pop",
    proId: "benny-blanco",
    alternatives: [],
    problem: "A breakup song risked becoming generic. It needed one plain-spoken angle with bite.",
    concept: "You think you are amazing, but you are toxic.",
    hook: "Conversational title phrase that works almost like a punchline.",
    replay: "The lyric is easy to remember, easy to quote, and strong enough to survive without heavy production.",
    structure: ["intro", "verse", "verse", "hook", "hook", "verse", "verse", "hook", "hook", "bridge", "bridge", "hook", "hook", "outro", "outro", "outro"],
    whyMatter: [
      "A huge worldwide hit built on restraint.",
      "Demonstrated that a strong song can outperform a flashy track.",
      "Made minimal production feel commercially complete.",
    ],
    lessons: [
      "Concept clarity",
      "Conversational writing",
      "Acoustic foundation",
      "Artist-first phrasing",
    ],
    productionLessons: [
      "Space",
      "Restraint",
      "Minimal arrangement confidence",
      "Let the lyric do the heavy lifting",
    ],
    anatomy: [
      ["Why did this record work?", "It has a single clean emotional argument and refuses to decorate around it. The listener gets the point immediately."],
      ["What songwriting problem was solved?", "The song turns resentment into a conversational line that feels personal, quotable, and slightly funny."],
      ["What production problem was solved?", "The production leaves enough space for the vocal attitude to carry the record without needing a large drop or dense chorus."],
      ["What made it replayable?", "The record is low-friction. The hook is easy to say, the performance feels intimate, and the minimal track does not fatigue the ear."],
      ["What can be copied?", "Copy the one-sentence concept test and the guitar/piano proof: if the song works naked, production can support instead of rescue."],
      ["What cannot be copied?", "You cannot copy Bieber's public context, vocal familiarity, or the exact collaborative chemistry behind the lyric."],
    ],
    exercise: {
      superpower: "Knowing when the song is enough.",
      bestRecord: "Love Yourself",
      structureMap: "Direct verses, hook-centered chorus, minimal bridge, final return without overbuilding.",
      hookArchitecture: "Plain phrase, conversational delivery, sting in the title.",
      emotionalArc: "Calm dismissal becomes satisfying self-protection.",
      productionDecisions: "Acoustic focus, dry vocal presence, tiny supporting details.",
      transfer: "Write the song so it works before the beat earns any credit.",
    },
    takeaway: "If the song works on guitar, it usually works on Spotify.",
  },
  {
    id: "jack-antonoff-anti-hero",
    title: "Anti-Hero",
    artist: "Taylor Swift",
    producer: "Jack Antonoff",
    archetype: "The Creative Director",
    lane: "Pop",
    proId: "jack-antonoff",
    alternatives: [],
    problem: "A self-critical lyric could feel too private or too heavy. The record needed accessibility without sanding off the specificity.",
    concept: "The narrator is the problem and knows it.",
    hook: "A thought-like hook that turns self-awareness into a communal phrase.",
    replay: "Listeners return because the lyric feels psychologically specific and socially usable.",
    structure: ["intro", "verse", "lift", "hook", "hook", "verse", "lift", "hook", "hook", "bridge", "bridge", "hook", "hook", "outro", "outro", "outro"],
    whyMatter: [
      "A defining example of personal-detail pop at blockbuster scale.",
      "Showed how vulnerability can operate as a commercial hook.",
      "Made conversational confession feel arena-sized.",
    ],
    lessons: [
      "Radical honesty",
      "Conversational hooks",
      "Personal becomes universal",
      "Character voice leads the record",
    ],
    productionLessons: [
      "Minimal but intentional",
      "Atmosphere without distraction",
      "Rhythm supports lyric delivery",
      "Arrangement frames the narrator",
    ],
    anatomy: [
      ["Why did this record work?", "It gives listeners a precise emotional mirror while keeping the chorus clear, rhythmic, and easy to repeat."],
      ["What songwriting problem was solved?", "The song turns internal monologue into a hook. The private thought becomes a shared phrase."],
      ["What production problem was solved?", "The track creates enough mood to feel cinematic without burying the lyric or overcomplicating the chorus."],
      ["What made it replayable?", "The specificity creates discovery on repeat, while the hook is direct enough to function immediately."],
      ["What can be copied?", "Copy the courage to write the uncomfortable sentence clearly and then design the production around the vocal point of view."],
      ["What cannot be copied?", "You cannot copy Taylor's autobiography, audience relationship, or Antonoff's long-term creative trust with the artist."],
    ],
    exercise: {
      superpower: "Turning artist identity into song architecture.",
      bestRecord: "Anti-Hero",
      structureMap: "Verse confession, pre-chorus tension, chorus thesis, bridge intensification, final chorus release.",
      hookArchitecture: "A sentence that feels like a thought but behaves like a title.",
      emotionalArc: "Self-recognition moves from discomfort to strange liberation.",
      productionDecisions: "Steady pulse, clean vocal frame, small textures that serve the narrator.",
      transfer: "Ask what only this artist can admit, then make that admission singable.",
    },
    takeaway: "Modern pop increasingly rewards authenticity over perfection.",
  },
  {
    id: "metro-boomin-bad-and-boujee",
    title: "Bad and Boujee",
    artist: "Migos",
    producer: "Metro Boomin",
    archetype: "The Franchise Producer",
    lane: "Hip-Hop",
    proId: "metro-boomin",
    alternatives: ["Like That"],
    problem: "A trap record needed to become a cultural object, not just another hard beat.",
    concept: "Luxury identity with a phrase simple enough to become social currency.",
    hook: "A compact slogan, repeated until it becomes a caption.",
    replay: "The record gives listeners quotable lines, a clear mood, and a producer identity they recognize instantly.",
    structure: ["intro", "hook", "hook", "verse", "verse", "hook", "hook", "verse", "verse", "hook", "hook", "verse", "hook", "hook", "outro", "outro"],
    whyMatter: [
      "A cultural phenomenon with massive streaming impact.",
      "Strengthened the idea of the producer as a public-facing brand.",
      "Showed how simplicity and repetition can create shared language.",
    ],
    lessons: [
      "Simplicity wins",
      "Quotables matter",
      "Repetition creates culture",
      "Identity is a hook",
    ],
    productionLessons: [
      "Space",
      "Mood",
      "Signature identity",
      "Minimal elements with maximum stance",
    ],
    anatomy: [
      ["Why did this record work?", "It compresses lifestyle, rhythm, and attitude into a phrase people could use outside the record."],
      ["What songwriting problem was solved?", "The hook turns a simple identity statement into a repeatable cultural badge."],
      ["What production problem was solved?", "The beat leaves space for cadence and personality while still carrying a dark, premium Metro signature."],
      ["What made it replayable?", "Quotables, negative space, and a hypnotic loop let the listener inhabit the mood repeatedly."],
      ["What can be copied?", "Copy the idea of building around one phrase that works as hook, caption, and brand signal."],
      ["What cannot be copied?", "You cannot copy the exact Migos cadence chemistry, timing, meme life, or Metro's accumulated brand equity."],
    ],
    exercise: {
      superpower: "Turning production identity into franchise value.",
      bestRecord: "Bad and Boujee",
      structureMap: "Hook-first entry, verse rotations, repeated returns to the slogan.",
      hookArchitecture: "Slogan plus rhythmic pocket plus social usability.",
      emotionalArc: "Status statement becomes collective chant.",
      productionDecisions: "Sparse melodic loop, heavy drums, open vocal lanes, recognizable mood.",
      transfer: "Make one line so usable that listeners want to borrow it.",
    },
    takeaway: "A producer tag can become a brand asset.",
  },
  {
    id: "the-dream-umbrella",
    title: "Umbrella",
    artist: "Rihanna",
    producer: "The-Dream",
    archetype: "The Hook Machine",
    lane: "Pop-R&B",
    proId: "the-dream",
    alternatives: ["Single Ladies"],
    problem: "A big pop record needed a hook dense enough to dominate memory without becoming complicated.",
    concept: "Protection, loyalty, and devotion expressed through one concrete image.",
    hook: "Title phrase reinforced until the word itself becomes the record.",
    replay: "The repetition is emotional, melodic, and phonetic at the same time.",
    structure: ["intro", "verse", "lift", "hook", "hook", "verse", "lift", "hook", "hook", "bridge", "bridge", "hook", "hook", "hook", "outro", "outro"],
    whyMatter: [
      "A defining era record.",
      "A masterclass in hook density.",
      "Shows how repetition can deepen rather than cheapen emotion.",
    ],
    lessons: [
      "Phrase first",
      "Repetition",
      "Emotional precision",
      "One image carries the record",
    ],
    productionLessons: [
      "Support the hook",
      "Remove distractions",
      "Let the vocal pattern dominate",
      "Use arrangement to frame repetition",
    ],
    anatomy: [
      ["Why did this record work?", "It attaches a universal emotional promise to a single concrete image and repeats it until it becomes unforgettable."],
      ["What songwriting problem was solved?", "The song makes devotion instantly singable by choosing one object and letting that object carry the relationship."],
      ["What production problem was solved?", "The arrangement supports the vocal hook without competing for the listener's memory."],
      ["What made it replayable?", "Hook density. The listener gets melodic repetition, lyrical repetition, and emotional repetition in the same package."],
      ["What can be copied?", "Copy the discipline of choosing one title image and reinforcing it from multiple angles."],
      ["What cannot be copied?", "You cannot copy Rihanna's tone, the cultural moment, or the exact novelty of that title becoming a pop event."],
    ],
    exercise: {
      superpower: "Making repetition feel emotional instead of lazy.",
      bestRecord: "Umbrella",
      structureMap: "Verse setup, lift, repeated chorus phrase, bridge intensification, final hook saturation.",
      hookArchitecture: "One title image, repeated with rhythmic and melodic force.",
      emotionalArc: "Promise becomes certainty through repetition.",
      productionDecisions: "Sparse support, strong vocal foreground, arrangement clears space for the title.",
      transfer: "Repeat the emotional center more than feels comfortable, then make each repeat slightly useful.",
    },
    takeaway: "Most writers do not repeat enough.",
  },
  {
    id: "dmile-leave-the-door-open",
    title: "Leave The Door Open",
    artist: "Silk Sonic",
    producer: "D'Mile",
    archetype: "The Craftsman",
    lane: "R&B",
    proId: "dmile",
    alternatives: [],
    problem: "A retro soul record needed to feel lovingly classic without becoming a museum piece.",
    concept: "Romantic invitation delivered with warmth, humor, and vocal excellence.",
    hook: "A generous title phrase that feels conversational, melodic, and performative.",
    replay: "The song rewards both casual listening and musician-level attention.",
    structure: ["intro", "verse", "lift", "hook", "hook", "verse", "lift", "hook", "bridge", "bridge", "hook", "hook", "vamp", "vamp", "outro", "outro"],
    whyMatter: [
      "A modern R&B classic.",
      "Major award recognition and broad audience reach.",
      "Balanced musicianship with immediate accessibility.",
    ],
    lessons: [
      "Sophisticated simplicity",
      "Vocal excellence",
      "Timelessness",
      "Craft serves performance",
    ],
    productionLessons: [
      "Harmony",
      "Dynamics",
      "Arrangement discipline",
      "Live-feeling detail without clutter",
    ],
    anatomy: [
      ["Why did this record work?", "It lets craft feel luxurious but never confusing. The top line remains warm, clear, and inviting."],
      ["What songwriting problem was solved?", "The song makes sophisticated harmony easy to enter by keeping the title and emotional offer simple."],
      ["What production problem was solved?", "The arrangement balances lush musicianship with enough space for vocal phrasing, humor, and dynamic lift."],
      ["What made it replayable?", "Performance detail, harmonic color, and a chorus that feels good even before the listener analyzes it."],
      ["What can be copied?", "Copy the top-line simplicity over sophisticated chords, the dynamic build, and the commitment to vocal moments."],
      ["What cannot be copied?", "You cannot copy the exact vocal chemistry, musicianship, or D'Mile's lifetime of taste in classic R&B language."],
    ],
    exercise: {
      superpower: "Making timeless craft feel current.",
      bestRecord: "Leave The Door Open",
      structureMap: "Smooth setup, rising pre-chorus, generous hook, bridge/vamp expansion, final performance payoff.",
      hookArchitecture: "Conversational invitation set on satisfying harmonic movement.",
      emotionalArc: "Charm becomes open-hearted release.",
      productionDecisions: "Live pocket, rich harmony, vocal stacks, disciplined arrangement lifts.",
      transfer: "Use advanced harmony underneath a title phrase anyone can understand.",
    },
    takeaway: "Craft still matters.",
  },
  {
    id: "earth-wind-fire-september",
    title: "September",
    artist: "Earth, Wind & Fire",
    producer: "Maurice White",
    archetype: "The Celestial Band Director",
    lane: "Soul",
    proId: "maurice-white",
    alternatives: ["Shining Star", "Boogie Wonderland"],
    problem: "A joyful ensemble record needed to be sophisticated enough for the band and simple enough for the whole world to sing.",
    concept: "Memory as celebration: a date, a feeling, and a chant that turn nostalgia into motion.",
    hook: "Title plus phonetic chant, with the background vocals and horn/rhythm arrangement behaving like part of the chorus.",
    replay: "The record gives the listener instant emotional weather: joy, lift, rhythm, and a syllable hook that needs no explanation.",
    structure: ["intro", "verse", "lift", "hook", "hook", "verse", "lift", "hook", "bridge", "hook", "hook", "vamp", "vamp", "outro", "outro", "outro"],
    whyMatter: [
      "A signature Earth, Wind & Fire record and one of soul/funk/disco's most durable joy records.",
      "Shows how ensemble arrangement can become songwriting.",
      "Proves that phonetics, groove, and communal energy can carry replay value as strongly as literal lyrics.",
    ],
    lessons: [
      "Joy needs architecture",
      "Chant syllables can be hook craft",
      "Band identity can be the song's brand",
      "Simplicity scales when the groove is elite",
    ],
    productionLessons: [
      "Maurice White produced the record with arrangement-as-celebration discipline",
      "Al McKay's musical sequence/guitar language gives the record motion",
      "Horn, rhythm, and background parts all answer the lead",
      "The mix keeps the smile bright without flattening the pocket",
    ],
    anatomy: [
      ["Credited core", "Writer/lyric credits center Maurice White and Allee Willis, with Al McKay's musical sequence/composer role; Maurice White is credited as producer."],
      ["Why did this record work?", "It makes joy specific enough to remember but open enough for everyone to enter. The date gives a handle; the chant gives the body something to keep."],
      ["What songwriting problem was solved?", "The record needed words without overexplaining joy. The solution was phonetic: a chant that feels better than a literal replacement would have."],
      ["What production problem was solved?", "A large ensemble could have become crowded. The production turns each part into lift: bass, horns, guitar, percussion, and backgrounds all point up."],
      ["What made it replayable?", "Communal release. The listener can sing the date, the title, the chant, or just ride the groove."],
      ["What can be copied?", "Copy the principle: make one nonverbal sound, one groove move, and one title all carry the same feeling."],
      ["What cannot be copied?", "You cannot copy Earth, Wind & Fire's ensemble chemistry, Maurice White's spiritual leadership, or the cultural afterlife of the record."],
    ],
    exercise: {
      superpower: "Turning band arrangement into communal joy.",
      bestRecord: "September",
      structureMap: "Fast groove entrance, verse setup, hook/chant returns, bridge contrast, vamped joy release.",
      hookArchitecture: "Title memory plus chant syllable plus horn/background answer.",
      emotionalArc: "Nostalgia becomes celebration, then celebration becomes participation.",
      productionDecisions: "Bright groove, ensemble lift, horn answers, background vocal hooks, no dead space.",
      transfer: "Write one hook where a sound, not a sentence, does part of the emotional work.",
    },
    takeaway: "Sometimes the most replayable lyric is the syllable that carries the feeling best.",
  },
  {
    id: "stevie-wonder-superstition",
    title: "Superstition",
    artist: "Stevie Wonder",
    producer: "Stevie Wonder",
    archetype: "The Self-Contained Genius",
    lane: "Soul",
    proId: "stevie-wonder",
    alternatives: ["Sir Duke", "I Wish", "As"],
    problem: "A funk-soul record needed a hook so strong that the groove, riff, and warning concept all became one memory.",
    concept: "Superstition as a warning: belief, fear, and groove locked into one physical idea.",
    hook: "The clavinet riff is the first hook; the vocal title is the second hook; the horn punches make the warning feel larger.",
    replay: "The riff restarts desire before the lyric even returns.",
    structure: ["intro", "riff", "verse", "hook", "riff", "verse", "hook", "instrumental", "verse", "hook", "riff", "outro", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "A defining example of Stevie Wonder's self-contained classic-period authorship.",
      "Shows how a riff can do as much songwriting work as a lyric.",
      "Blends funk, soul, pop, and rock energy without weakening the song.",
    ],
    lessons: [
      "Riff as title-level memory",
      "Complex musicianship must still feel obvious",
      "The groove can teach the concept",
      "Auteur production works when everything points at the same center",
    ],
    productionLessons: [
      "Stevie Wonder is credited as writer and producer",
      "Clavinet, bass movement, drums, and horns create one integrated hook machine",
      "The arrangement is dense but never vague",
      "The vocal rides the riff instead of fighting it",
    ],
    anatomy: [
      ["Credited core", "Stevie Wonder is credited as the writer and producer of 'Superstition.'"],
      ["Why did this record work?", "The riff is unforgettable, the concept is clear, and the vocal title lands after the body already believes the groove."],
      ["What songwriting problem was solved?", "The song turns a broad idea into a physical warning. You remember the concept because you feel the riff."],
      ["What production problem was solved?", "A dense funk arrangement could become musician-only. Stevie makes the musicianship serve one obvious, repeatable riff."],
      ["What made it replayable?", "The clavinet motif acts like a reset button. Every time it returns, the record feels alive again."],
      ["What can be copied?", "Copy the discipline of making your strongest instrumental idea responsible for a songwriting job."],
      ["What cannot be copied?", "You cannot copy Stevie Wonder's multi-instrumental genius, voice, or historic creative run."],
    ],
    exercise: {
      superpower: "Making musicianship feel like a universal hook.",
      bestRecord: "Superstition",
      structureMap: "Riff intro, vocal warning, hook returns, instrumental reinforcement, extended groove outro.",
      hookArchitecture: "Instrumental riff plus title phrase plus horn punctuation.",
      emotionalArc: "Suspicion becomes physical confidence.",
      productionDecisions: "Clavinet lead, tight funk pocket, horn stabs, vocal/riff call-and-response.",
      transfer: "Before adding lyrics, ask whether the riff already says the concept.",
    },
    takeaway: "A great riff can be the song's lyric before the singer opens their mouth.",
  },
  {
    id: "marvin-gaye-whats-going-on",
    title: "What's Going On",
    artist: "Marvin Gaye",
    producer: "Marvin Gaye",
    archetype: "The Social Intimate",
    lane: "Soul",
    proId: "marvin-gaye",
    alternatives: ["Mercy Mercy Me", "Inner City Blues"],
    problem: "A socially conscious record needed to ask a huge question without sounding like a lecture.",
    concept: "Public pain heard through a private, compassionate question.",
    hook: "The title is not a slogan; it is a human question repeated until it becomes communal concern.",
    replay: "The record lets listeners return to the groove, the compassion, and the question without feeling preached at.",
    structure: ["intro", "conversation", "verse", "hook", "verse", "hook", "bridge", "hook", "vamp", "vamp", "outro", "outro", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "A landmark in progressive soul and artist-led production at Motown.",
      "Shows how social commentary can become intimate songcraft.",
      "Shifted the role of soul albums toward concept, conscience, and atmosphere.",
    ],
    lessons: [
      "Message as question",
      "Compassion before argument",
      "Atmosphere supports meaning",
      "Background voices can create community",
    ],
    productionLessons: [
      "Writers are credited as Marvin Gaye, Renaldo Benson, and Al Cleveland",
      "Marvin Gaye is credited as producer",
      "Conversational room tone and layered voices make the song feel lived-in",
      "The groove is gentle enough to carry heavy subject matter",
    ],
    anatomy: [
      ["Credited core", "The credited writers are Marvin Gaye, Renaldo 'Obie' Benson, and Al Cleveland; Marvin Gaye is credited as producer."],
      ["Why did this record work?", "It approaches crisis with tenderness. The question feels human before it feels political."],
      ["What songwriting problem was solved?", "The song needed to address social pain without becoming stiff. A repeated question gives the listener emotional entry."],
      ["What production problem was solved?", "The record creates community through voices, groove, and atmosphere rather than a hard protest frame."],
      ["What made it replayable?", "The groove is warm, the melody is gentle, and the question keeps renewing itself with each listen."],
      ["What can be copied?", "Copy the move of turning a message into a compassionate question with a singable center."],
      ["What cannot be copied?", "You cannot copy Marvin's voice, the Motown power struggle, or the exact historical charge of 1971."],
    ],
    exercise: {
      superpower: "Making conscience feel intimate.",
      bestRecord: "What's Going On",
      structureMap: "Conversational intro, verse/question cycles, communal hook returns, vamped concern.",
      hookArchitecture: "Plain question as title, softened by melody and communal vocal atmosphere.",
      emotionalArc: "Confusion becomes compassion and shared awareness.",
      productionDecisions: "Warm groove, background conversation, layered vocals, restrained arrangement.",
      transfer: "Write the message as a question someone would actually ask in pain.",
    },
    takeaway: "A message song travels further when it sounds like compassion, not a lecture.",
  },
  {
    id: "barry-white-cant-get-enough",
    title: "Can't Get Enough of Your Love, Babe",
    artist: "Barry White",
    producer: "Barry White",
    archetype: "The Romantic Orchestrator",
    lane: "Soul",
    proId: "barry-white",
    alternatives: ["You're the First, the Last, My Everything", "Never, Never Gonna Give Ya Up"],
    problem: "A romantic soul record needed to feel sensual, huge, and direct without becoming melodramatic.",
    concept: "Desire as abundance: too much love is not too much.",
    hook: "Spoken setup frames the premise; the chorus title turns desire into a phrase anyone can understand.",
    replay: "The voice, groove, strings, and title all create the feeling of overflow.",
    structure: ["spoken intro", "verse", "hook", "hook", "verse", "hook", "bridge", "hook", "vamp", "vamp", "outro", "outro", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "One of Barry White's signature solo records.",
      "Shows how voice-as-brand, orchestration, and groove can sell a romantic thesis.",
      "Bridges soul, orchestral R&B, and proto-disco physicality.",
    ],
    lessons: [
      "Spoken intro as concept frame",
      "Romance needs pacing",
      "Orchestration can make a title feel cinematic",
      "Persona is part of songwriting",
    ],
    productionLessons: [
      "Barry White is credited as writer and producer",
      "Strings, rhythm section, and vocal tone all serve seduction",
      "The arrangement builds scale without rushing",
      "The spoken voice creates immediate brand identity",
    ],
    anatomy: [
      ["Credited core", "Barry White is credited as the writer and producer of the record."],
      ["Why did this record work?", "It states the romantic premise plainly, then surrounds it with a sound world that makes desire feel luxurious."],
      ["What songwriting problem was solved?", "The song makes sensuality direct but not thin by framing the hook with spoken personality and orchestral emotional scale."],
      ["What production problem was solved?", "The arrangement is large, but the voice remains the center of gravity."],
      ["What made it replayable?", "The groove moves, the strings widen the feeling, and the title gives the listener a simple romantic thesis."],
      ["What can be copied?", "Copy the use of a spoken setup, adult pacing, and arrangement that makes the title feel bigger."],
      ["What cannot be copied?", "You cannot copy Barry White's voice, persona, or orchestral signature."],
    ],
    exercise: {
      superpower: "Making romance cinematic and physical.",
      bestRecord: "Can't Get Enough of Your Love, Babe",
      structureMap: "Spoken premise, groove entrance, chorus/title returns, bridge/vamp expansion, extended romantic release.",
      hookArchitecture: "Spoken frame plus direct title plus orchestral lift.",
      emotionalArc: "Desire moves from claim to overflow.",
      productionDecisions: "Low voice foreground, strings for scale, steady groove, adult pacing.",
      transfer: "Write the spoken sentence that frames the chorus before the melody arrives.",
    },
    takeaway: "Persona can be production, and production can make a simple title feel enormous.",
  },
  {
    id: "hitmaka-thot-box",
    title: "Thot Box",
    artist: "Hitmaka and collaborators",
    producer: "Hitmaka",
    archetype: "The Record Manufacturer",
    lane: "Commercial R&B",
    proId: "hitmaka",
    alternatives: ["Modern R&B placements"],
    problem: "A commercial record needs to know its audience quickly and deliver utility for artists, DJs, and playlists.",
    concept: "Direct, familiar, and built for a specific market lane.",
    hook: "A simple phrase with clear audience targeting and repeat-friendly energy.",
    replay: "Familiarity, directness, and artist matching make the record useful in real listening contexts.",
    structure: ["intro", "hook", "hook", "verse", "hook", "hook", "verse", "hook", "bridge", "hook", "hook", "outro", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "Shows commercial instincts in action.",
      "Demonstrates artist matching and market-fit writing.",
      "Treats finishing records as a repeatable system.",
    ],
    lessons: [
      "Audience awareness",
      "Familiarity",
      "Finish records",
      "Market fit is a creative skill",
    ],
    productionLessons: [
      "Artist fit",
      "Market fit",
      "Efficient arrangement",
      "Avoid cleverness that slows the record down",
    ],
    anatomy: [
      ["Why did this record work?", "It understands who it is for and does not waste time trying to impress listeners outside that lane."],
      ["What songwriting problem was solved?", "The song chooses direct utility over poetic ambiguity: artists can perform it, audiences can remember it, DJs can place it."],
      ["What production problem was solved?", "The production is formatted for vocal turnover, energy maintenance, and easy placement in contemporary R&B/rap contexts."],
      ["What made it replayable?", "Familiar textures, direct hooks, and feature-friendly structure keep the record easy to return to."],
      ["What can be copied?", "Copy the market-awareness workflow: define audience, artist fit, hook utility, and completion speed."],
      ["What cannot be copied?", "You cannot copy Hitmaka's network, deal flow, instinct for artist placement, or business timing."],
    ],
    exercise: {
      superpower: "Turning commercial instinct into finished records.",
      bestRecord: "Thot Box",
      structureMap: "Hook-forward, quick artist entries, repeated returns, minimal friction.",
      hookArchitecture: "Direct phrase, obvious pocket, performance-friendly repetition.",
      emotionalArc: "Utility and confidence over narrative complexity.",
      productionDecisions: "Familiar palette, strong vocal space, market-ready arrangement.",
      transfer: "Decide who the record is for before deciding how clever it should be.",
    },
    takeaway: "The best producers often have exceptional business instincts.",
  },
  {
    id: "kaytranada-10-percent",
    title: "10%",
    artist: "Kaytranada feat. Kali Uchis",
    producer: "Kaytranada",
    archetype: "The Groove Futurist",
    lane: "Groove",
    proId: "kaytranada",
    alternatives: ["Lite Spots"],
    problem: "A dance/R&B hybrid needs movement and identity without overcrowding the vocal.",
    concept: "Cool emotional distance carried by rhythm and texture.",
    hook: "The groove acts as a hook before the lyric has to explain itself.",
    replay: "The drums, bass, and vocal pocket keep revealing feel-based details.",
    structure: ["intro", "verse", "hook", "hook", "verse", "hook", "break", "hook", "hook", "bridge", "hook", "hook", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "Created a distinct lane across alternative dance, R&B, and pop.",
      "Shows rhythm as a songwriting engine.",
      "Makes groove feel like identity.",
    ],
    lessons: [
      "Feel before complexity",
      "Rhythm as hook",
      "Groove carries emotion",
      "Pocket tells the story",
    ],
    productionLessons: [
      "Drums are melody",
      "Bass is melody",
      "Negative space matters",
      "Texture creates coolness",
    ],
    anatomy: [
      ["Why did this record work?", "It makes the listener feel the song before analyzing the song. The groove is the invitation."],
      ["What songwriting problem was solved?", "The record turns rhythmic feel into emotional communication, so the lyric does not have to over-explain."],
      ["What production problem was solved?", "The production balances a distinctive drum/bass language with enough restraint for the vocal to feel effortless."],
      ["What made it replayable?", "Micro-feel. The pocket, swing, and bass movement keep rewarding the body on repeat listens."],
      ["What can be copied?", "Copy the idea that drums and bass can carry hook responsibility, not just support harmony."],
      ["What cannot be copied?", "You cannot copy Kaytranada's exact pocket, swing intuition, or taste in sample/groove interaction."],
    ],
    exercise: {
      superpower: "Making groove feel futuristic and human at once.",
      bestRecord: "10%",
      structureMap: "Groove intro, vocal entry, hook returns, rhythmic breaks, final groove lock.",
      hookArchitecture: "Rhythm and bass movement become the memory target.",
      emotionalArc: "Cool detachment becomes danceable confidence.",
      productionDecisions: "Swinging drums, melodic bass, selective texture, vocal restraint.",
      transfer: "Write one hook that people can feel before they can quote.",
    },
    takeaway: "Listeners dance before they analyze.",
  },
  {
    id: "dj-dahi-money-trees",
    title: "Money Trees",
    artist: "Kendrick Lamar",
    producer: "DJ Dahi",
    archetype: "The Chameleon",
    lane: "Hip-Hop",
    proId: "dj-dahi",
    alternatives: ["Worst Behavior", "Sativa"],
    problem: "A narrative rap record needed atmosphere deep enough to support memory, character, and reflection.",
    concept: "Ambition and survival viewed through nostalgia, temptation, and consequence.",
    hook: "Mood-first hook that lets the song world become memorable.",
    replay: "The atmosphere rewards repeated listening because it supports story, melody, and quotable detail.",
    structure: ["intro", "hook", "verse", "verse", "hook", "verse", "verse", "hook", "bridge", "verse", "hook", "hook", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "A genre-spanning producer statement through restraint.",
      "Shows signature taste without forcing a repeated sound.",
      "Supports one of modern rap's strongest narrative worlds.",
    ],
    lessons: [
      "Adapt to artist",
      "Support narrative",
      "Mood creates meaning",
      "Versatility requires taste",
    ],
    productionLessons: [
      "Texture",
      "Restraint",
      "World building",
      "Let the artist's story lead",
    ],
    anatomy: [
      ["Why did this record work?", "The production creates a world that feels specific enough for the rapper's story but open enough for the listener to live in."],
      ["What songwriting problem was solved?", "The song needed to carry narrative density without losing replay value. The hook and mood give listeners an entry point."],
      ["What production problem was solved?", "The beat supports lyrical storytelling without flattening into background wallpaper or stealing focus."],
      ["What made it replayable?", "Atmosphere, quotables, narrative detail, and a hook mood that feels bigger than one line."],
      ["What can be copied?", "Copy the practice of asking what world the artist needs before choosing sounds."],
      ["What cannot be copied?", "You cannot copy Kendrick's narrative authority, the exact sample context, or Dahi's adaptive taste across artists."],
    ],
    exercise: {
      superpower: "Adapting without disappearing.",
      bestRecord: "Money Trees",
      structureMap: "Mood intro, hook anchor, narrative verses, recurring world-building returns.",
      hookArchitecture: "Atmosphere plus phrase memory rather than oversized chorus mechanics.",
      emotionalArc: "Nostalgia turns into ambition, pressure, and reflection.",
      productionDecisions: "Textural loop, restrained drums, open pocket, narrative-friendly mix space.",
      transfer: "Before producing, name the world the artist is standing in.",
    },
    takeaway: "Versatility becomes a superpower when rooted in taste.",
  },
  {
    id: "p2j-essence",
    title: "Essence",
    artist: "Wizkid feat. Tems",
    producer: "P2J",
    archetype: "The Global Groove Architect",
    lane: "Afrobeats",
    proId: "p2j",
    alternatives: [],
    problem: "A global crossover record needed to preserve ease, pocket, and intimacy while traveling across markets.",
    concept: "Romantic ease carried by warmth, movement, and vocal chemistry.",
    hook: "Rhythm, vocal tone, and melodic simplicity create the invitation.",
    replay: "The groove is light enough to repeat endlessly and emotional enough to feel personal.",
    structure: ["intro", "verse", "hook", "hook", "verse", "hook", "verse", "hook", "hook", "bridge", "hook", "hook", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "A major Afrobeats crossover moment.",
      "Expanded worldwide appetite for Afrobeats and global groove records.",
      "Shows rhythm functioning as the primary hook.",
    ],
    lessons: [
      "Groove first",
      "Simplicity",
      "Emotional ease",
      "Vocal chemistry is structure",
    ],
    productionLessons: [
      "Space",
      "Bounce",
      "Movement",
      "Warmth over density",
    ],
    anatomy: [
      ["Why did this record work?", "It feels effortless. The groove, vocal chemistry, and melodic directness make the song globally readable without flattening its identity."],
      ["What songwriting problem was solved?", "The song keeps the emotional ask simple and lets the vocal pocket communicate intimacy."],
      ["What production problem was solved?", "The production has enough movement to carry the record while leaving air around the vocals."],
      ["What made it replayable?", "Light bounce, warm tone, and hook simplicity make repeated plays feel easy rather than demanding."],
      ["What can be copied?", "Copy the groove-first architecture: drums, bass, and vocal pocket as the emotional center."],
      ["What cannot be copied?", "You cannot copy Wizkid and Tems' exact chemistry, the crossover moment, or P2J's feel for global pocket."],
    ],
    exercise: {
      superpower: "Making rhythm travel without losing intimacy.",
      bestRecord: "Essence",
      structureMap: "Groove intro, relaxed vocal entries, hook returns, duet chemistry, warm outro release.",
      hookArchitecture: "Bounce plus simple melodic phrases plus unmistakable vocal tone.",
      emotionalArc: "Ease becomes seduction without pressure.",
      productionDecisions: "Sparse drums, warm keys, moving bass, vocal-first space.",
      transfer: "Let the groove explain the emotion before the lyric does.",
    },
    takeaway: "Rhythm can be the primary hook.",
  },
  {
    id: "sarz-monalisa",
    title: "Monalisa",
    artist: "Lojay and Sarz",
    producer: "Sarz",
    archetype: "The Minimalist Innovator",
    lane: "Afropop",
    proId: "sarz",
    alternatives: [],
    problem: "A global groove record needed minimalism that felt infectious rather than empty.",
    concept: "Desire and motion distilled into a pocket that travels.",
    hook: "Simple vocal and rhythmic gestures that lock into the drums.",
    replay: "The restraint keeps the groove breathable, memorable, and easy to restart.",
    structure: ["intro", "hook", "verse", "hook", "hook", "verse", "hook", "break", "hook", "hook", "bridge", "hook", "outro", "outro", "outro", "outro"],
    whyMatter: [
      "A global Afropop success built on economy.",
      "Demonstrates producer-driven groove architecture.",
      "Shows how less can create more replay.",
    ],
    lessons: [
      "Less is more",
      "Pocket matters",
      "Simplicity travels",
      "Restraint creates repeat value",
    ],
    productionLessons: [
      "Drum economy",
      "Arrangement restraint",
      "Percussive clarity",
      "Leave space for the bounce",
    ],
    anatomy: [
      ["Why did this record work?", "It trusts the pocket. The song does not overexplain itself because the groove is persuasive."],
      ["What songwriting problem was solved?", "The hook stays simple enough to travel across contexts while still feeling sensual and specific."],
      ["What production problem was solved?", "The production avoids overfilling the arrangement, letting each rhythmic part earn its space."],
      ["What made it replayable?", "Breathable rhythm, clear pocket, and a hook that becomes stronger through repetition."],
      ["What can be copied?", "Copy the subtraction: fewer parts, stronger pocket, cleaner hook entry."],
      ["What cannot be copied?", "You cannot copy Sarz's internal clock, rhythmic taste, or the exact way the record sits in Afropop culture."],
    ],
    exercise: {
      superpower: "Using minimalism as a groove weapon.",
      bestRecord: "Monalisa",
      structureMap: "Hook signal, lean verses, repeated hook returns, small breaks, no excess sections.",
      hookArchitecture: "Pocket-first repetition with compact melodic identity.",
      emotionalArc: "Desire stays light, stylish, and kinetic.",
      productionDecisions: "Economical drums, spacious arrangement, bounce-forward mix.",
      transfer: "Remove one part and make the remaining pocket more undeniable.",
    },
    takeaway: "Complexity often reduces replay value.",
  },
  {
    id: "timbaland-promiscuous",
    title: "Promiscuous",
    artist: "Nelly Furtado feat. Timbaland",
    producer: "Timbaland",
    archetype: "The Innovator",
    lane: "Pop-R&B",
    proId: "timbaland",
    alternatives: ["Cry Me A River", "The Way I Are"],
    problem: "A mainstream pop record needed rhythmic surprise without losing chorus clarity.",
    concept: "Flirtation as a back-and-forth rhythmic game.",
    hook: "Conversational call-and-response fused with a rhythm language only Timbaland could own.",
    replay: "The record keeps the listener alert through rhythmic novelty and playful vocal chemistry.",
    structure: ["intro", "hook", "verse", "hook", "hook", "verse", "hook", "bridge", "hook", "hook", "break", "hook", "hook", "outro", "outro", "outro"],
    whyMatter: [
      "Helped redefine mainstream rhythm language.",
      "Showed innovation could be commercially direct.",
      "Made sonic identity part of the songwriting.",
    ],
    lessons: [
      "Originality wins",
      "Risk creates attention",
      "Rhythm is branding",
      "Innovation needs song clarity",
    ],
    productionLessons: [
      "Unexpected sounds",
      "Rhythmic innovation",
      "Vocal percussion",
      "Negative space as attitude",
    ],
    anatomy: [
      ["Why did this record work?", "It feels strange and obvious at the same time. The rhythm is innovative, but the vocal game is instantly understandable."],
      ["What songwriting problem was solved?", "The song turns flirtation into structure by making the vocal exchange itself the hook."],
      ["What production problem was solved?", "The track uses unusual rhythmic and sonic choices without distracting from the call-and-response center."],
      ["What made it replayable?", "The beat has surprise, the vocal chemistry has attitude, and the hook is easy to re-enter."],
      ["What can be copied?", "Copy the courage to make one unusual rhythmic choice serve the song rather than decorate it."],
      ["What cannot be copied?", "You cannot copy Timbaland's specific sound design language, timing, or decades of rhythmic invention."],
    ],
    exercise: {
      superpower: "Turning rhythm into brand identity.",
      bestRecord: "Promiscuous",
      structureMap: "Hook-forward dialogue, verse exchanges, repeated call-and-response, rhythmic breaks.",
      hookArchitecture: "Conversation plus rhythm novelty plus clear title energy.",
      emotionalArc: "Playful tension becomes confident release.",
      productionDecisions: "Percussive vocal bits, unexpected textures, sparse but animated drum language.",
      transfer: "Make the weirdest sound in the track responsible for a clear songwriting job.",
    },
    takeaway: "Innovation compounds when attached to strong songwriting.",
  },
  {
    id: "pharrell-happy",
    title: "Happy",
    artist: "Pharrell Williams",
    producer: "Pharrell Williams",
    archetype: "The Culture Creator",
    lane: "Pop",
    proId: "pharrell",
    alternatives: ["Get Lucky", "Drop It Like It's Hot"],
    problem: "A simple positive song could become childish or thin. It needed scale, groove, and unmistakable character.",
    concept: "Joy as a communal physical state.",
    hook: "One emotional word turned into a full-body invitation.",
    replay: "The song gives listeners a clear feeling they can return to without explanation.",
    structure: ["intro", "hook", "verse", "hook", "hook", "verse", "hook", "bridge", "hook", "hook", "break", "hook", "hook", "outro", "outro", "outro"],
    whyMatter: [
      "Cross-generational global impact.",
      "A cultural event built on emotional clarity.",
      "Shows that positivity can scale when the groove is undeniable.",
    ],
    lessons: [
      "Emotional clarity",
      "Immediate accessibility",
      "Positive energy scales",
      "Culture beats complexity",
    ],
    productionLessons: [
      "Simplicity",
      "Groove",
      "Character",
      "Handclap-level physicality",
    ],
    anatomy: [
      ["Why did this record work?", "It gives the listener one unmistakable emotional instruction and makes the body agree with it."],
      ["What songwriting problem was solved?", "The song makes joy simple without making it vague by tying the concept to movement and repetition."],
      ["What production problem was solved?", "The production keeps the arrangement light, human, and rhythmically physical instead of overproduced."],
      ["What made it replayable?", "Immediate mood payoff. The record gives a repeatable emotional function, not just a melody."],
      ["What can be copied?", "Copy the clarity: one emotional promise, one physical groove, one title that needs no explanation."],
      ["What cannot be copied?", "You cannot copy Pharrell's voice, cultural touch, timing, or ability to make simplicity feel stylish."],
    ],
    exercise: {
      superpower: "Turning feeling into culture.",
      bestRecord: "Happy",
      structureMap: "Hook signal, simple verses, repeated emotional return, bridge/break energy, communal outro.",
      hookArchitecture: "One-word emotional clarity plus rhythm people can physically join.",
      emotionalArc: "Private mood becomes public celebration.",
      productionDecisions: "Claps, light groove, bright vocal tone, minimal harmonic friction.",
      transfer: "Ask what feeling the record gives people permission to perform.",
    },
    takeaway: "Culture often beats complexity.",
  },
];

const caseCredits = {
  "max-martin-blinding-lights": {
    producers: ["Max Martin", "Oscar Holter", "The Weeknd"],
    songwriters: ["Abel Tesfaye", "Ahmad Balshe", "Jason Quenneville", "Max Martin", "Oscar Holter"],
    recordingEngineering: ["Shin Kamiyama", "Cory Bice", "Jeremy Lertola", "Sean Klein"],
    mixEngineers: ["Serban Ghenea", "John Hanes"],
    mastering: ["Dave Kutch", "Kevin Peterson"],
    notes: "Credits adapted from the Weeknd/Tidal credit listings commonly reproduced for the single.",
  },
  "benny-blanco-love-yourself": {
    producers: ["Benny Blanco"],
    songwriters: ["Justin Bieber", "Benny Blanco", "Ed Sheeran"],
    recordingEngineering: ["Chris \"Anger Management\" Sclafani", "Simon Cohen", "Josh Gudwin", "Chris \"Tek\" O'Ryan", "Henrique Andrade"],
    mixEngineers: ["Josh Gudwin", "Derrick Stockwell"],
    mastering: ["Not separately surfaced in common single credit summaries."],
    notes: "Credits adapted from Purpose liner-note/Tidal summaries.",
  },
  "jack-antonoff-anti-hero": {
    producers: ["Taylor Swift", "Jack Antonoff"],
    songwriters: ["Taylor Swift", "Jack Antonoff"],
    recordingEngineering: ["Jack Antonoff", "Megan Searl", "Jon Sher", "John Rooney", "Jon Gautier"],
    mixEngineers: ["Serban Ghenea"],
    mastering: ["Randy Merrill"],
    notes: "Credits adapted from Midnights liner notes.",
  },
  "metro-boomin-bad-and-boujee": {
    producers: ["Metro Boomin", "G Koop"],
    songwriters: ["Quavious Marshall", "Kiari Cephus", "Robert Mandell", "Symere Woods", "Leland Wayne"],
    recordingEngineering: ["Common public summaries do not consistently surface a full recording-engineer list."],
    mixEngineers: ["Common public summaries do not consistently surface a dedicated mix-engineer credit."],
    mastering: ["Not consistently surfaced in common single credit summaries."],
    notes: "Core writer/producer credits adapted from public single metadata; technical credits are incomplete in common sources.",
  },
  "the-dream-umbrella": {
    producers: ["Tricky Stewart"],
    songwriters: ["Christopher \"Tricky\" Stewart", "Terius \"The-Dream\" Nash", "Kuk Harrell", "Shawn Carter"],
    recordingEngineering: ["Kuk Harrell", "Westlake Recording Studios credit context"],
    mixEngineers: ["Manny Marroquin", "Christian Plata", "Erik Madrid"],
    mastering: ["Chris Gehringer"],
    notes: "Core credits adapted from Good Girl Gone Bad-era liner-note summaries; mix/master credits vary by release summary.",
  },
  "dmile-leave-the-door-open": {
    producers: ["Bruno Mars", "D'Mile"],
    songwriters: ["Bruno Mars", "Brandon Anderson", "D'Mile", "Christopher Brody Brown"],
    recordingEngineering: ["Charles Moniz", "Alex Resoagli", "Cody Chicowski"],
    mixEngineers: ["Serban Ghenea", "John Hanes", "Bryce Bordone"],
    mastering: ["Randy Merrill"],
    notes: "Credits adapted from An Evening with Silk Sonic liner notes and Grammy credit summaries.",
  },
  "earth-wind-fire-september": {
    producers: ["Maurice White"],
    songwriters: ["Maurice White", "Allee Willis", "Al McKay"],
    arrangers: ["Tom \"Tom Tom 84\" Washington"],
    recordingEngineering: ["Older ARC/Columbia summaries emphasize personnel and arrangement; a discrete recording-engineer list is not consistently surfaced."],
    mixEngineers: ["Not consistently listed as a separate role in common public credit summaries."],
    mastering: ["Not consistently surfaced in common single credit summaries."],
    notes: "Writer/producer/personnel credits adapted from single/Best of Earth, Wind & Fire Vol. 1 credit summaries.",
  },
  "stevie-wonder-superstition": {
    producers: ["Stevie Wonder"],
    songwriters: ["Stevie Wonder"],
    recordingEngineering: ["Robert Margouleff", "Malcolm Cecil", "Joan DeCola", "Austin Godsey"],
    mixEngineers: ["Not consistently separated from engineering in common Talking Book-era public credits."],
    mastering: ["Not consistently surfaced in common single credit summaries."],
    notes: "Core writer/producer credits are Stevie Wonder; engineering names reflect commonly surfaced Talking Book-era technical credits.",
  },
  "marvin-gaye-whats-going-on": {
    producers: ["Marvin Gaye"],
    songwriters: ["Marvin Gaye", "Renaldo \"Obie\" Benson", "Al Cleveland"],
    arrangers: ["David Van De Pitte"],
    recordingEngineering: ["Steve Smith", "Mike McLean", "Ken Sands"],
    mixEngineers: ["Ken Sands"],
    mastering: ["Not consistently surfaced in common single credit summaries."],
    notes: "Credits adapted from What's Going On single/album credit summaries.",
  },
  "barry-white-cant-get-enough": {
    producers: ["Barry White"],
    songwriters: ["Barry White"],
    arrangers: ["Gene Page", "Barry White"],
    recordingEngineering: ["Frank Kejmar"],
    mixEngineers: ["Not consistently listed as a separate role in common 1974 credit summaries."],
    mastering: ["Not consistently surfaced in common single credit summaries."],
    notes: "Core writer/producer credits are Barry White; older release summaries often do not separate modern mix/master roles.",
  },
  "hitmaka-thot-box": {
    producers: ["Hitmaka"],
    songwriters: ["Hitmaka", "Meek Mill", "2 Chainz", "A Boogie wit da Hoodie", "Tyga", "YBN Nahmir"],
    recordingEngineering: ["Full technical credits are not consistently surfaced in common public metadata."],
    mixEngineers: ["Not consistently surfaced in common public metadata."],
    mastering: ["Not consistently surfaced in common public metadata."],
    notes: "Core artist/producer credit is public; detailed technical credits require label/rights-database confirmation.",
  },
  "kaytranada-10-percent": {
    producers: ["Kaytranada"],
    songwriters: ["Kaytranada", "Kali Uchis"],
    recordingEngineering: ["Full recording-engineer credits are not consistently surfaced in common public metadata."],
    mixEngineers: ["Neal H Pogue"],
    mastering: ["Mike Bozzi"],
    notes: "Core artist/producer credits are public; mix/master credits reflect commonly surfaced Bubba credit summaries.",
  },
  "dj-dahi-money-trees": {
    producers: ["DJ Dahi"],
    songwriters: ["Kendrick Duckworth", "Dacoury Natche", "Johnny McKinzie", "Victoria Legrand", "Alex Scally"],
    recordingEngineering: ["Derek \"MixedByAli\" Ali"],
    mixEngineers: ["Derek \"MixedByAli\" Ali"],
    mastering: ["Mike Bozzi"],
    notes: "Credits adapted from Good Kid, M.A.A.D City-era summaries; song samples Beach House, hence Legrand/Scally writer credits.",
  },
  "p2j-essence": {
    producers: ["P2J", "Legendury Beatz"],
    songwriters: ["Ayodeji Balogun", "Temilade Openiyi", "Uzezi Oniko", "Okiemute Oniko", "Richard Isong"],
    recordingEngineering: ["Full recording-engineer credits are not consistently surfaced in common public metadata."],
    mixEngineers: ["Leandro Hidalgo"],
    mastering: ["Colin Leonard"],
    notes: "Credits adapted from Made in Lagos/Tidal summaries.",
  },
  "sarz-monalisa": {
    producers: ["Sarz"],
    songwriters: ["Lekan Osifeso Jr.", "Osabuohien Osaretin"],
    recordingEngineering: ["Full recording-engineer credits are not consistently surfaced in common public metadata."],
    mixEngineers: ["Not consistently surfaced in common public metadata."],
    mastering: ["Not consistently surfaced in common public metadata."],
    notes: "Core producer/songwriter credits adapted from LV N ATTN-era public metadata.",
  },
  "timbaland-promiscuous": {
    producers: ["Timbaland", "Danja"],
    songwriters: ["Nelly Furtado", "Timothy Mosley", "Nate Hills", "Timothy Clayton"],
    recordingEngineering: ["Demacio \"Demo\" Castellon", "Marcella \"Ms. Lago\" Araica", "James Roach", "Kobla Tetey", "Ben Jost", "Vadim Chislov"],
    mixEngineers: ["Demacio \"Demo\" Castellon"],
    mastering: ["Herb Powers Jr."],
    notes: "Credits adapted from Loose liner notes.",
  },
  "pharrell-happy": {
    producers: ["Pharrell Williams"],
    songwriters: ["Pharrell Williams"],
    recordingEngineering: ["Mike Larson", "Matthew Desrameaux", "Andrew Coleman"],
    mixEngineers: ["Leslie Brathwaite"],
    mastering: ["Reuben Cohen"],
    notes: "Credits adapted from Despicable Me 2 soundtrack / Happy credit summaries.",
  },
};

const creativeRiskStudies = [
  {
    id: "queen-bohemian-rhapsody",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    lane: "Rock / Pop",
    year: "1975",
    riskType: "Form Explosion",
    producer: "Roy Thomas Baker and Queen",
    risk: "Six-minute single with no traditional chorus, moving through ballad, opera, hard rock, and reflective outro.",
    whyItShouldFail: "Radio logic favored shorter, cleaner formats. This record asked mainstream listeners to follow a miniature suite.",
    whyItWorked: "Every section is theatrical but memorable. The song never becomes random because the emotional arc keeps escalating.",
    copiedPrinciple: "You can break structure if every new section has a memorable job and the transitions feel inevitable.",
    cannotCopy: "The exact operatic novelty, Freddie Mercury's performance, or Queen's stacked vocal identity.",
    studioPrompt: "Write a two-minute song with three distinct worlds. Each world must reveal a new emotional state, not just a new sound.",
    lessons: ["Structure can be cinematic", "Risk needs internal logic", "Performance sells the impossible"],
    productionMoves: ["Vocal stacking as spectacle", "Hard contrast between sections", "Arrangement as narrative"],
  },
  {
    id: "prince-when-doves-cry",
    title: "When Doves Cry",
    artist: "Prince",
    lane: "Pop / Funk",
    year: "1984",
    riskType: "Missing Element",
    producer: "Prince",
    risk: "A major pop-funk single with no bass line, leaving the drums, guitar, synths, and vocal tension exposed.",
    whyItShouldFail: "Funk and dance records usually rely on bass as the physical center.",
    whyItWorked: "The missing bass creates emotional tension. The emptiness makes the relationship conflict feel unstable and unforgettable.",
    copiedPrinciple: "Remove the expected element only when its absence makes the song's emotion clearer.",
    cannotCopy: "Prince's persona, vocal phrasing, and total command of the arrangement.",
    studioPrompt: "Mute the most obvious part of your beat. If the emotion gets sharper, rebuild around the absence.",
    lessons: ["Subtraction can be identity", "Absence can create tension", "The rule-break must serve the lyric"],
    productionMoves: ["No bass line", "Dry drum-machine focus", "Vocal/guitar/synth conflict"],
  },
  {
    id: "outkast-hey-ya",
    title: "Hey Ya!",
    artist: "OutKast",
    lane: "Hip-Hop / Pop",
    year: "2003",
    riskType: "Trojan Horse",
    producer: "Andre 3000",
    risk: "A hip-hop artist delivered a genre-blurring pop/funk/rock record with a painfully skeptical relationship lyric hidden inside party energy.",
    whyItShouldFail: "It did not sit neatly inside rap, R&B, rock, or pop expectations at the time.",
    whyItWorked: "The groove and call-and-response made it instantly usable while the lyric gave it depth on repeat.",
    copiedPrinciple: "A risky message can travel inside a joyful container if the surface is physically irresistible.",
    cannotCopy: "Andre 3000's charisma, cultural position, and genre permission.",
    studioPrompt: "Write the saddest relationship idea you have, then put it over the happiest groove you can make believable.",
    lessons: ["Contrast creates replay", "Genre blur can widen the audience", "A party record can hide a thesis"],
    productionMoves: ["Acoustic strum with drum-machine punch", "Group-response hook", "Bright energy against dark lyric"],
  },
  {
    id: "gnarls-barkley-crazy",
    title: "Crazy",
    artist: "Gnarls Barkley",
    lane: "Alternative Soul",
    year: "2006",
    riskType: "Odd World, Clear Hook",
    producer: "Danger Mouse",
    risk: "A strange, cinematic soul-pop record about sanity and self-perception became a global hit.",
    whyItShouldFail: "The sound world was left-of-center and the concept was psychologically unusual for a mainstream single.",
    whyItWorked: "The chorus is immediate, the vocal performance is huge, and the oddness gives the record identity.",
    copiedPrinciple: "Make the concept unusual, but make the hook emotionally obvious.",
    cannotCopy: "CeeLo Green's vocal gravity or Danger Mouse's specific crate-digging taste.",
    studioPrompt: "Write one psychologically strange title, then make the chorus melody as simple as possible.",
    lessons: ["Strange can still be singable", "A clear hook licenses risk", "World-building matters"],
    productionMoves: ["Cinematic sample feel", "Sparse drums", "Huge vocal foreground"],
  },
  {
    id: "billie-eilish-bad-guy",
    title: "bad guy",
    artist: "Billie Eilish",
    lane: "Alt-Pop",
    year: "2019",
    riskType: "Anti-Banger",
    producer: "Finneas",
    risk: "A minimalist, whispery, bass-heavy pop song with playful menace and a late beat-switch became a mainstream smash.",
    whyItShouldFail: "The vocal is understated, the arrangement is sparse, and the hook behaves more like attitude than belt-out melody.",
    whyItWorked: "The identity is immediate. The sound, vocal posture, bass, and title all describe the same character.",
    copiedPrinciple: "A hook can be a persona if every production decision supports that persona.",
    cannotCopy: "Billie and Finneas's sibling chemistry, visual world, or deadpan performance signature.",
    studioPrompt: "Write a hook where the singer's attitude is the chorus. Keep the vocal small and make the track do the smirk.",
    lessons: ["Persona can be the hook", "Quiet can feel dominant", "Minimalism needs a strong character"],
    productionMoves: ["Dry close vocal", "Sub-bass character", "Section switch as surprise"],
  },
  {
    id: "nirvana-smells-like-teen-spirit",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    lane: "Grunge",
    year: "1991",
    riskType: "Underground Noise Goes Pop",
    producer: "Butch Vig",
    risk: "A distorted, sludgy, alienated grunge song broke into mainstream pop culture.",
    whyItShouldFail: "The vocal was raw, the lyric was cryptic, and the sound rejected glossy rock polish.",
    whyItWorked: "The quiet-loud structure gave listeners a clear physical map, and the chorus melody survived the distortion.",
    copiedPrinciple: "Raw texture can go wide if the energy curve and chorus contour are undeniable.",
    cannotCopy: "Kurt Cobain's voice, the generational timing, or grunge's cultural rupture.",
    studioPrompt: "Make your verse half as loud as your chorus. If the chorus does not explode emotionally, rewrite the melody before adding distortion.",
    lessons: ["Dynamics can translate noise", "Rawness needs a melodic spine", "Alienation can become communal"],
    productionMoves: ["Quiet-loud arrangement", "Distorted guitar wall", "Readable chorus melody"],
  },
  {
    id: "missy-elliott-get-ur-freak-on",
    title: "Get Ur Freak On",
    artist: "Missy Elliott",
    lane: "Hip-Hop",
    year: "2001",
    riskType: "Alien Rhythm",
    producer: "Timbaland",
    risk: "A sparse, globally inflected, tabla-driven beat with unconventional pocket became a club and radio staple.",
    whyItShouldFail: "The beat did not follow the safest radio-rap template and left unusual amounts of space.",
    whyItWorked: "Missy's voice gives the record command, and Timbaland's rhythm is strange but instantly physical.",
    copiedPrinciple: "An unfamiliar rhythm works when the artist's vocal identity tells the listener how to move.",
    cannotCopy: "Missy and Timbaland's chemistry or the shock of that sound arriving when it did.",
    studioPrompt: "Build a beat around one unfamiliar percussion idea, then write the vocal command that teaches the listener the pocket.",
    lessons: ["Rhythmic risk can create culture", "Space can make a beat more aggressive", "Artist command anchors weirdness"],
    productionMoves: ["Sparse percussion", "Global rhythmic color", "Vocal chants as navigation"],
  },
  {
    id: "lil-nas-x-old-town-road",
    title: "Old Town Road",
    artist: "Lil Nas X",
    lane: "Country Rap",
    year: "2019",
    riskType: "Genre Collision",
    producer: "YoungKio",
    risk: "A country-trap hybrid built from internet culture challenged genre boundaries and became a massive hit.",
    whyItShouldFail: "It risked being dismissed as novelty and did not fit cleanly into country or rap institutions.",
    whyItWorked: "The hook was simple, the image was instantly memetic, and the record invited participation.",
    copiedPrinciple: "Genre collision works when the listener can understand the image in one second.",
    cannotCopy: "The meme timing, platform dynamics, or cultural controversy that amplified it.",
    studioPrompt: "Combine two genre symbols, then write the title so a listener can picture the whole record instantly.",
    lessons: ["Novelty needs a real hook", "Images travel faster than explanations", "Genre friction can become marketing"],
    productionMoves: ["Trap drums plus country signifiers", "Short loop economy", "Meme-ready title image"],
  },
];

const referenceCredits = {
  "blinding-lights": caseCredits["max-martin-blinding-lights"],
  "love-yourself": caseCredits["benny-blanco-love-yourself"],
  "anti-hero": caseCredits["jack-antonoff-anti-hero"],
  "bad-and-boujee": caseCredits["metro-boomin-bad-and-boujee"],
  umbrella: caseCredits["the-dream-umbrella"],
  "leave-the-door-open": caseCredits["dmile-leave-the-door-open"],
  september: caseCredits["earth-wind-fire-september"],
  superstition: caseCredits["stevie-wonder-superstition"],
  "whats-going-on": caseCredits["marvin-gaye-whats-going-on"],
  "cant-get-enough": caseCredits["barry-white-cant-get-enough"],
  "thot-box": caseCredits["hitmaka-thot-box"],
  "10-percent": caseCredits["kaytranada-10-percent"],
  "money-trees": caseCredits["dj-dahi-money-trees"],
  essence: caseCredits["p2j-essence"],
  monalisa: caseCredits["sarz-monalisa"],
  promiscuous: caseCredits["timbaland-promiscuous"],
  happy: caseCredits["pharrell-happy"],
  "sir-duke": {
    producers: ["Stevie Wonder"],
    songwriters: ["Stevie Wonder"],
    recordingEngineering: ["Common public summaries emphasize Stevie Wonder as producer/arranger; full technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits verified from public single/album summaries.",
    status: "partial",
  },
  "i-wish": {
    producers: ["Stevie Wonder"],
    songwriters: ["Stevie Wonder"],
    recordingEngineering: ["Common public summaries emphasize Stevie Wonder as producer/arranger; full technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits verified from Songs in the Key of Life-era summaries.",
    status: "partial",
  },
  "youre-the-first": {
    producers: ["Barry White"],
    songwriters: ["Barry White", "Tony Sepe", "Peter Radcliffe"],
    arrangers: ["Barry White", "Gene Page"],
    recordingEngineering: ["Older public summaries do not consistently surface a full engineering list."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer/arrangement credits adapted from common Barry White release summaries.",
    status: "partial",
  },
  "never-never-gonna-give-you-up": {
    producers: ["Barry White"],
    songwriters: ["Barry White"],
    arrangers: ["Barry White", "Gene Page"],
    recordingEngineering: ["Older public summaries do not consistently surface a full engineering list."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits verified; technical credits need liner-note confirmation.",
    status: "partial",
  },
  "tracks-of-my-tears": {
    producers: ["Smokey Robinson"],
    songwriters: ["Smokey Robinson", "Pete Moore", "Marv Tarplin"],
    recordingEngineering: ["Motown-era technical credits require liner-note/session verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core songwriting/production credits adapted from common Motown summaries.",
    status: "partial",
  },
  "ooh-baby-baby": {
    producers: ["Smokey Robinson"],
    songwriters: ["Smokey Robinson", "Pete Moore"],
    recordingEngineering: ["Motown-era technical credits require liner-note/session verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core songwriting/production credits adapted from common Motown summaries.",
    status: "partial",
  },
  "my-girl": {
    producers: ["Smokey Robinson", "Ronald White"],
    songwriters: ["Smokey Robinson", "Ronald White"],
    recordingEngineering: ["Motown-era technical credits require liner-note/session verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core songwriting/production credits adapted from common Motown summaries.",
    status: "partial",
  },
  "move-on-up": {
    producers: ["Curtis Mayfield"],
    songwriters: ["Curtis Mayfield"],
    arrangers: ["Riley Hampton"],
    recordingEngineering: ["Older Curtom-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits verified from common album summaries.",
    status: "partial",
  },
  "people-get-ready": {
    producers: ["Johnny Pate"],
    songwriters: ["Curtis Mayfield"],
    recordingEngineering: ["Older ABC-Paramount-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common release summaries.",
    status: "partial",
  },
  superfly: {
    producers: ["Curtis Mayfield"],
    songwriters: ["Curtis Mayfield"],
    arrangers: ["Johnny Pate"],
    recordingEngineering: ["Older Curtom-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits verified from common soundtrack summaries.",
    status: "partial",
  },
  "forget-me-nots": {
    producers: ["Charles Mims Jr.", "Patrice Rushen"],
    songwriters: ["Patrice Rushen", "Freddie Washington", "Terri McFaddin"],
    recordingEngineering: ["Technical credits require Elektra liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common Straight from the Heart summaries.",
    status: "partial",
  },
  "haven-you-heard": {
    producers: ["Charles Mims Jr.", "Patrice Rushen"],
    songwriters: ["Patrice Rushen", "Charles Mims Jr.", "Sheree Brown"],
    recordingEngineering: ["Technical credits require Elektra liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common release summaries.",
    status: "partial",
  },
  "first-time-ever": {
    producers: ["Joel Dorn"],
    songwriters: ["Ewan MacColl"],
    recordingEngineering: ["Atlantic-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common Roberta Flack release summaries.",
    status: "partial",
  },
  "killing-me-softly": {
    producers: ["Joel Dorn"],
    songwriters: ["Charles Fox", "Norman Gimbel", "Lori Lieberman"],
    recordingEngineering: ["Atlantic-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common Roberta Flack release summaries.",
    status: "partial",
  },
  "sweet-love": {
    producers: ["Michael J. Powell"],
    songwriters: ["Anita Baker", "Gary Bias", "Louis A. Johnson"],
    recordingEngineering: ["Elektra-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common Rapture summaries.",
    status: "partial",
  },
  "caught-up-in-the-rapture": {
    producers: ["Michael J. Powell"],
    songwriters: ["Garry Glenn", "Dianne Quander"],
    recordingEngineering: ["Elektra-era technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common Rapture summaries.",
    status: "partial",
  },
  "you-should-be-here": {
    producers: ["Raphael Saadiq"],
    songwriters: ["Raphael Saadiq", "D'Angelo"],
    recordingEngineering: ["Full technical credits require liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core creative credits are seeded for study; verify against official liner notes before publication.",
    status: "partial",
  },
  "you-got-me": {
    producers: ["The Grand Wizzards", "Scott Storch"],
    songwriters: ["Tariq Trotter", "Ahmir Thompson", "Scott Storch", "Jill Scott"],
    recordingEngineering: ["Full technical credits require Things Fall Apart liner-note verification."],
    mixEngineers: ["Needs liner-note verification."],
    mastering: ["Needs liner-note verification."],
    notes: "Core writer/producer credits adapted from common album summaries.",
    status: "partial",
  },
  "untitled-how-does-it-feel": {
    producers: ["D'Angelo", "Raphael Saadiq"],
    songwriters: ["D'Angelo", "Raphael Saadiq"],
    recordingEngineering: ["Russell Elevado"],
    mixEngineers: ["Russell Elevado"],
    mastering: ["Herb Powers Jr."],
    notes: "Core credits adapted from Voodoo-era credit summaries.",
    status: "partial",
  },
  "love-is-a-losing-game": {
    producers: ["Mark Ronson"],
    songwriters: ["Amy Winehouse"],
    recordingEngineering: ["Back to Black-era technical credits require liner-note verification."],
    mixEngineers: ["Tom Elmhirst"],
    mastering: ["Stuart Hawkes"],
    notes: "Core writer/producer/mix/master credits adapted from common Back to Black summaries.",
    status: "partial",
  },
  "tears-dry-on-their-own": {
    producers: ["Salaam Remi"],
    songwriters: ["Amy Winehouse", "Nickolas Ashford", "Valerie Simpson"],
    recordingEngineering: ["Back to Black-era technical credits require liner-note verification."],
    mixEngineers: ["Tom Elmhirst"],
    mastering: ["Stuart Hawkes"],
    notes: "Includes Ashford & Simpson because of the 'Ain't No Mountain High Enough' interpolation/sample lineage.",
    status: "partial",
  },
};

const queueItems = [
  ["Concept pass", "Write five one-sentence concepts before touching the drums."],
  ["Hook contrast", "Make one hook melodic, one rhythmic, and one lyrical."],
  ["Vocal space audit", "Mute any part that speaks during the singer's strongest line."],
  ["Energy curve", "Mark where the listener gets a new reason to stay."],
  ["Title test", "Say the title once. If it needs explaining, sharpen it."],
  ["Reference steal", "Save one structure move from a song in your lane."],
  ["Loop escape", "Create a pre-chorus or bridge from the same chords with a new bass note."],
  ["Lyric concrete pass", "Replace broad emotion with one object, place, or behavior."],
];

const pillarData = [
  ["Concept", 58, "Needs a sharper sentence"],
  ["Hook", 62, "Promising phrase"],
  ["Structure", 45, "Loop risk"],
  ["Harmony", 84, "Strong mood"],
  ["Lyrics", 50, "Too abstract"],
  ["Performance", 70, "Clear direction"],
];

const hookSeeds = {
  Melodic: [
    "Start low, leap on the emotional word, answer with a three-note fall.",
    "Use one repeated note for tension, then release on the title.",
    "Make the last syllable longer than the phrase feels comfortable.",
  ],
  Rhythmic: [
    "Place the title behind the beat once, then exactly on the beat once.",
    "Use a two-syllable pickup before the downbeat.",
    "Leave beat four empty so the phrase becomes easier to repeat.",
  ],
  Lyrical: [
    "Turn the concept into one sentence someone could text and regret.",
    "Make the title a contradiction, not a description.",
    "Replace the broad feeling with a behavior the listener recognizes.",
  ],
  Sonic: [
    "Create one ear-candy answer after the title, then remove it from the verse.",
    "Use a vocal chop as punctuation, not decoration.",
    "Let the hook start with a sound that identifies the record in one second.",
  ],
};

const sampleReferences = [
  {
    title: "Sparse R&B chorus lift",
    use: "Leave the hook naked for the first repeat, then add stacks.",
    replay: "The second pass feels earned because the first pass teaches the title.",
    lane: "R&B",
  },
  {
    title: "Pop title-first chorus",
    use: "Put the plain title before the clever line.",
    replay: "The listener can remember the song before understanding every detail.",
    lane: "Pop-R&B",
  },
  {
    title: "Rap caption hook",
    use: "Write the phrase that would survive outside the song.",
    replay: "The hook doubles as identity, quote, and short-form moment.",
    lane: "Hip-Hop",
  },
];

const guidePrompts = [
  {
    ratio: 0,
    title: "First impression",
    prompt: "Does the song world feel clear before the listener has time to think?",
  },
  {
    ratio: 0.08,
    title: "Vocal entrance",
    prompt: "Is there enough space for the first line, or is the beat already saying too much?",
  },
  {
    ratio: 0.22,
    title: "Concept check",
    prompt: "Could the artist explain the emotional situation in one sentence right here?",
  },
  {
    ratio: 0.38,
    title: "Hook pocket",
    prompt: "What phrase, melody, or rhythm should the listener remember after this section?",
  },
  {
    ratio: 0.55,
    title: "Second pass",
    prompt: "Did the record evolve, or did the loop return with the same information?",
  },
  {
    ratio: 0.72,
    title: "Bridge or release",
    prompt: "Does this section reveal a new angle, strip down, or create a final lift?",
  },
  {
    ratio: 0.88,
    title: "Replay reason",
    prompt: "What moment would make someone run the song back immediately?",
  },
];

const starterMarkers = [
  ["Intro", 0, "Set the world fast."],
  ["Verse", 0.14, "Leave room for the first line."],
  ["Hook", 0.38, "Make the title impossible to miss."],
  ["Energy Lift", 0.55, "Give the second pass new information."],
  ["Bridge", 0.72, "Change the angle or strip the record down."],
];

const proPlaybooks = [
  {
    id: "max-martin",
    name: "Max Martin",
    category: "Pop Architects",
    archetype: "The Hook Engineer",
    method: "Hook Engineering",
    lane: "Pop architecture",
    thesis: "The listener should understand the song immediately. Hook, melody, title, rhythm, and payoff all point at one memory target.",
    proMove: "Put the emotional keyword on the most satisfying melodic landing point, then repeat it with one small variation.",
    listenFor: ["title phrase arrives early", "melody shape is easy to hum", "chorus payoff feels inevitable"],
    breakdown: ["short title phrase", "symmetrical chorus rhythm", "pre-chorus tension before release"],
    superpower: "Making complexity feel obvious.",
    process: "Reduce the song to one melodic promise, then engineer every section toward that promise.",
    transfers: "Clarity, melodic economy, chorus architecture, first-listen comprehension.",
    cannotCopy: "The exact melodic taste and decades of commercial pattern recognition.",
    osMove: "Before producing more, ask: what should the listener sing after one play?",
    drill: "Write one title phrase. Place it at the beginning, middle, and end of a chorus. Keep the version that feels most unavoidable.",
    sketch: "engineered-hook",
    sketchName: "Hook machine sketch",
  },
  {
    id: "benny-blanco",
    name: "Benny Blanco",
    category: "Pop Architects",
    archetype: "The Collaborative Hitmaker",
    method: "Artist-First Collaboration",
    lane: "Accessible emotion",
    thesis: "Great producers make artists sound like the best version of themselves, not like guests inside the producer's ego.",
    proMove: "Strip the record down until the artist's personality, phrase, and emotional access point become unavoidable.",
    listenFor: ["simple emotional language", "production that flatters the artist", "room energy over technical display"],
    breakdown: ["artist comfort", "emotional accessibility", "simple structure that invites performance"],
    superpower: "Creating rooms where artists reveal usable truth.",
    process: "Find the artist's easiest emotional doorway, then protect it from overproduction.",
    transfers: "Collaboration, taste, simplicity, writing for the singer in front of you.",
    cannotCopy: "The relationship network and in-room social intuition.",
    osMove: "Ask what this artist can say more naturally than anyone else.",
    drill: "Write the same hook three ways: superstar, indie artist, and rapper. Notice which words each artist would actually believe.",
    sketch: "collab-clarity",
    sketchName: "Artist-first sketch",
  },
  {
    id: "jack-antonoff",
    name: "Jack Antonoff",
    category: "Pop Architects",
    archetype: "The Creative Director",
    method: "Artist Development",
    lane: "Identity and eras",
    thesis: "Build eras, not songs. Production becomes a world where the artist's long-term identity is coherent.",
    proMove: "Start with something intimate and human, then let the arrangement widen only after the point of view is clear.",
    listenFor: ["small personal entrance", "arrangement grows around identity", "aesthetic consistency across songs"],
    breakdown: ["voice/personality first", "bedroom detail into arena lift", "nostalgia texture with modern structure"],
    superpower: "Turning personal taste into a coherent artist era.",
    process: "Develop the artist's world, vocabulary, palette, and recurring emotional questions.",
    transfers: "Creative direction, long-term collaboration, artist trust, aesthetic consistency.",
    cannotCopy: "Another artist's era or private language.",
    osMove: "Define the world before defining the beat.",
    drill: "Write the verse like a private note, then make the chorus sound like the same thought finally said out loud.",
    sketch: "artist-lift",
    sketchName: "Intimate-to-wide sketch",
  },
  {
    id: "daniel-nigro",
    name: "Daniel Nigro",
    category: "Pop Architects",
    archetype: "The Star Builder",
    method: "Star Creation",
    lane: "Artist narrative",
    thesis: "Build stars before chasing stars. The record must clarify who the artist is becoming.",
    proMove: "Build around a point-of-view turn: private verse, exposed pre, explosive chorus, revealing bridge.",
    listenFor: ["character before polish", "chorus magnifies the persona", "bridge feels like a scene change"],
    breakdown: ["emotional anchor", "wide chorus impact", "identity reveal"],
    superpower: "Making vulnerability feel like star power.",
    process: "Find the artist's contradiction, dramatize it, then make the chorus the public version of that private conflict.",
    transfers: "Artist identity, emotional specificity, developmental songwriting.",
    cannotCopy: "The exact artist mythology or breakout cultural moment.",
    osMove: "Write the song's camera direction before writing the full lyric.",
    drill: "Name where the artist is emotionally in verse, chorus, and bridge. Each section must move the character.",
    sketch: "star-arc",
    sketchName: "Star-arc sketch",
  },
  {
    id: "metro-boomin",
    name: "Metro Boomin",
    category: "Hip-Hop Architects",
    archetype: "The Franchise Producer",
    method: "Producer Branding",
    lane: "Sonic identity",
    thesis: "Become bigger than individual placements. A producer brand is an emotional world listeners recognize fast.",
    proMove: "Choose one dark signature texture, one drum attitude, and one negative-space rule; keep them consistent.",
    listenFor: ["minimal cinematic intro", "808 as character", "space that makes the artist sound larger"],
    breakdown: ["ominous motif", "sub restraint", "drum pocket with brand confidence"],
    superpower: "Turning a production style into a franchise.",
    process: "Make each placement feel like it belongs to a larger world without using the same beat every time.",
    transfers: "Brand consistency, executive curation, producer-led releases, world building.",
    cannotCopy: "The tag, exact world, or cultural ownership of that lane.",
    osMove: "Define the emotional weather of your catalog.",
    drill: "Strip your loop to three identifiers: texture, drum feel, and one silence rule. Remove everything that dilutes the world.",
    sketch: "brand-world",
    sketchName: "Producer-world sketch",
  },
  {
    id: "hitmaka",
    name: "Hitmaka",
    category: "Hip-Hop Architects",
    archetype: "The Record Manufacturer",
    method: "Commercial Record Manufacturing",
    lane: "Record-ready clarity",
    thesis: "Finish records. A commercial record makes the use case obvious: who sings it, where it plays, what phrase sells it.",
    proMove: "Reduce friction: clean pocket, direct hook, immediate tempo identity, and a chorus that explains the record's function.",
    listenFor: ["fast setup", "obvious bounce", "hook language that feels usable"],
    breakdown: ["record function first", "simple melodic target", "arrangement built for vocal replacement"],
    superpower: "Converting ideas into usable commercial assets.",
    process: "Match artist, tempo, hook language, nostalgia reference, and market function quickly.",
    transfers: "Output volume, commercial instinct, artist matching, finishing.",
    cannotCopy: "The exact network and placement machine.",
    osMove: "Every draft needs a record brief, not just a vibe.",
    drill: "Write the record brief in one line: artist type, setting, hook phrase, and first chorus payoff.",
    sketch: "commercial-bounce",
    sketchName: "Commercial bounce sketch",
  },
  {
    id: "dj-dahi",
    name: "DJ Dahi",
    category: "Hip-Hop Architects",
    archetype: "The Chameleon",
    method: "Adaptive Versatility",
    lane: "Genre fluidity",
    thesis: "Versatility wins when identity remains intact. The producer adapts to the artist without disappearing.",
    proMove: "Keep one taste signature while changing rhythm, palette, and arrangement around the artist.",
    listenFor: ["restraint", "texture that adapts", "genre movement without confusion"],
    breakdown: ["artist adaptation", "subtle signature", "texture over flexing"],
    superpower: "Shape-shifting without losing taste.",
    process: "Start from the artist's world, then add only the producer decisions that improve the song.",
    transfers: "Restraint, range, listening, artist-specific production.",
    cannotCopy: "The private taste compass that chooses what not to do.",
    osMove: "Build a taste signature that survives genre changes.",
    drill: "Make one idea as rap, R&B, and alt-pop. Keep only one signature element constant.",
    sketch: "chameleon",
    sketchName: "Chameleon texture sketch",
  },
  {
    id: "noah-40-shebib",
    name: "Noah \"40\" Shebib",
    category: "Hip-Hop Architects",
    archetype: "The Sonic Architect",
    method: "Atmospheric Minimalism",
    lane: "Artist-specific sound design",
    thesis: "A signature world beats a signature drum kit. Atmosphere can become the artist's emotional home.",
    proMove: "Use minimal drums, low-pass mood, and space so the vocal feels like thought instead of performance.",
    listenFor: ["atmospheric restraint", "negative space", "sound design tied to persona"],
    breakdown: ["soft edges", "vocal-forward minimalism", "mood as identity"],
    superpower: "Making emptiness feel branded.",
    process: "Design the sonic room around the artist's interior monologue.",
    transfers: "Atmosphere, minimalism, artist-world alignment.",
    cannotCopy: "The exact artist-producer chemistry.",
    osMove: "Ask what your artist sounds like when nobody is watching.",
    drill: "Remove drums for eight bars and make the atmosphere carry the hook.",
    sketch: "atmosphere",
    sketchName: "Atmospheric minimalism sketch",
  },
  {
    id: "maurice-white",
    name: "Maurice White / Earth, Wind & Fire",
    category: "Soul Architects",
    archetype: "The Celestial Band Director",
    method: "Joy, Ensemble Lift & Spiritual Pop-Soul",
    lane: "classic soul, funk and disco-soul",
    thesis: "A soul record can feel spiritual, physical, and pop at the same time. The arrangement should make joy feel organized, communal, and bigger than one singer.",
    proMove: "Build the hook from band identity: groove, horns, background vocals, chant syllables, and a title that feels like celebration.",
    listenFor: ["ensemble joy as hook", "horns and backgrounds answering the lead", "nonsense syllables used as memory"],
    breakdown: ["communal chorus", "rhythm-section lift", "arrangement as celebration"],
    superpower: "Making sophisticated ensemble music feel instantly joyful.",
    process: "Start with groove and spiritual intent, then arrange every section so the room rises together.",
    transfers: "Communal lift, horn/vocal arrangement, joyful repetition, band-as-brand identity.",
    cannotCopy: "The exact Earth, Wind & Fire ensemble chemistry, Maurice White's leadership, or the era's cultural position.",
    osMove: "Ask what the room sings when the lyric stops needing language.",
    drill: "Write one title, one chant syllable, one horn answer, and one bass movement that all point to the same feeling.",
    sketch: "soul-groove",
    sketchName: "Communal joy sketch",
  },
  {
    id: "stevie-wonder",
    name: "Stevie Wonder",
    category: "Soul Architects",
    archetype: "The Self-Contained Genius",
    method: "Songwriter-Producer-Multi-Instrumentalist Vision",
    lane: "progressive soul and funk-pop",
    thesis: "The song, groove, harmony, arrangement, and performance can all come from one unified musical imagination. Complexity works when the hook is undeniable.",
    proMove: "Anchor rich musicianship to one unmistakable riff, melodic idea, or emotional thesis.",
    listenFor: ["riff as hook", "advanced harmony made singable", "instrumental parts behaving like characters"],
    breakdown: ["self-produced vision", "riff-driven replay", "musical density with clear joy"],
    superpower: "Making genius-level musicianship feel like common language.",
    process: "Let the musical idea lead, then make every instrument serve the song's emotional and rhythmic center.",
    transfers: "Riff invention, harmonic color, one-person arrangement vision, melodic clarity.",
    cannotCopy: "The full multi-instrumental fluency and historical genius. You can copy the discipline of making complexity sing.",
    osMove: "If the riff is the hook, protect it like the title.",
    drill: "Write a two-bar riff that can survive alone, then make the vocal answer it instead of covering it.",
    sketch: "soul-groove",
    sketchName: "Auteur funk-soul sketch",
  },
  {
    id: "marvin-gaye",
    name: "Marvin Gaye",
    category: "Soul Architects",
    archetype: "The Social Intimate",
    method: "Personal Voice as Public Conscience",
    lane: "progressive soul and message soul",
    thesis: "A protest record can feel intimate when the singer sounds like a person asking a human question, not a slogan shouting at the listener.",
    proMove: "Frame the social question as a conversation, then let arrangement, background voices, and groove make the concern communal.",
    listenFor: ["question as hook", "background voices as community", "soft vocal tone carrying heavy subject matter"],
    breakdown: ["message without lecture", "jazz/soul atmosphere", "vocal intimacy at social scale"],
    superpower: "Turning public pain into private-feeling songcraft.",
    process: "Start with the human wound, then produce the record so compassion leads the politics.",
    transfers: "Concept depth, social perspective, conversational hooks, gentle vocal authority.",
    cannotCopy: "Marvin's voice, Motown battle for control, or the exact historical pressure around the record.",
    osMove: "Make the message a human question before making it a statement.",
    drill: "Write one social concern as something you would ask a friend across the room.",
    sketch: "classic-rnb",
    sketchName: "Message soul sketch",
  },
  {
    id: "barry-white",
    name: "Barry White",
    category: "Soul Architects",
    archetype: "The Romantic Orchestrator",
    method: "Orchestral Seduction & Spoken Authority",
    lane: "orchestral soul and proto-disco",
    thesis: "Romantic soul can be theatrical without losing intimacy. The voice, spoken intro, strings, rhythm section, and groove all sell one feeling of abundance.",
    proMove: "Use spoken setup as emotional framing, then let the orchestra and groove make desire feel inevitable.",
    listenFor: ["spoken intro as concept doorway", "strings acting like emotional scale", "groove that makes romance physical"],
    breakdown: ["voice as brand", "orchestral lift", "title phrase as seduction"],
    superpower: "Making romance sound enormous and direct.",
    process: "State the romantic premise plainly, then arrange it like cinema around the voice.",
    transfers: "Spoken framing, orchestral arrangement logic, adult sensual pacing, title repetition.",
    cannotCopy: "Barry's unmistakable voice, persona, and orchestral signature.",
    osMove: "Let the first spoken sentence tell the listener what kind of romance they entered.",
    drill: "Write a two-line spoken intro that frames the chorus before the singer starts singing.",
    sketch: "soul-groove",
    sketchName: "Orchestral romance sketch",
  },
  {
    id: "smokey-robinson",
    name: "Smokey Robinson",
    category: "Soul Architects",
    archetype: "The Elegant Heartbreaker",
    method: "Plainspoken Poetic Soul",
    lane: "Motown soul craft",
    thesis: "Soul can be poetic without becoming distant. The central image should feel graceful, conversational, and easy for the singer to live inside.",
    proMove: "Build around a tender image, then make every melodic turn sound like the singer is discovering the feeling in real time.",
    listenFor: ["simple image carrying deep feeling", "melody shaped for conversational grace", "chorus that feels inevitable without force"],
    breakdown: ["elegant title", "lead vocal charm", "background response as emotional frame"],
    superpower: "Making heartbreak sound beautiful and instantly understandable.",
    process: "Start with a clean emotional image, then polish the melody until the lyric feels spoken and sung at once.",
    transfers: "Title elegance, emotional economy, graceful melodic writing, background response.",
    cannotCopy: "The exact Motown context, voice, and era-specific innocence.",
    osMove: "Find the prettiest plain image that tells the truth.",
    drill: "Write one title image for heartbreak. Keep it under five words and make it singable without explanation.",
    sketch: "classic-rnb",
    sketchName: "Elegant soul title sketch",
  },
  {
    id: "curtis-mayfield",
    name: "Curtis Mayfield",
    category: "Soul Architects",
    archetype: "The Message Groover",
    method: "Social Truth + Falsetto Grace",
    lane: "message soul",
    thesis: "A soul record can carry social perspective without becoming a speech. Groove, melody, and compassion make the message replayable.",
    proMove: "Put the moral center in the groove, then let the vocal deliver the message with warmth instead of lecture.",
    listenFor: ["social observation made melodic", "groove carrying seriousness", "vocal softness against heavy subject matter"],
    breakdown: ["message as hook", "bass and percussion as motion", "arrangement that feels human-scale"],
    superpower: "Turning conscience into groove.",
    process: "Write the human consequence first, then make the rhythm inviting enough for the message to travel.",
    transfers: "Perspective, social clarity, groove discipline, emotional restraint.",
    cannotCopy: "The exact cultural moment or Mayfield's singular moral voice.",
    osMove: "Ask what the song believes about people, not just what it feels.",
    drill: "Write a hook that says something socially true without sounding like a slogan.",
    sketch: "soul-groove",
    sketchName: "Message groove sketch",
  },
  {
    id: "patrice-rushen",
    name: "Patrice Rushen",
    category: "Soul Architects",
    archetype: "The Groove Sophisticate",
    method: "Musicianship With Pop Ease",
    lane: "jazz-funk soul",
    thesis: "Sophisticated playing works best when the song still feels effortless. Harmony, bass, and groove should make the hook feel smoother, not harder.",
    proMove: "Let the rhythm section be intricate under a vocal phrase that stays light, clean, and memorable.",
    listenFor: ["musical sophistication under easy vocal language", "bass movement as hook support", "smooth pocket with pop readability"],
    breakdown: ["jazz-funk color", "light vocal top line", "groove-forward arrangement"],
    superpower: "Making musicianship feel like a smile.",
    process: "Start from groove and harmonic color, then simplify the vocal until the record feels inviting.",
    transfers: "Pocket, bass movement, harmony taste, effortless top-line design.",
    cannotCopy: "The exact keyboard touch and deep musicianship without reps.",
    osMove: "If the chords are fancy, make the singer's sentence friendlier.",
    drill: "Write a simple two-line hook over your richest groove. Do not let the lyric compete with the band.",
    sketch: "rnb-craft",
    sketchName: "Sophisticated groove sketch",
  },
  {
    id: "roberta-flack",
    name: "Roberta Flack",
    category: "Soul Architects",
    archetype: "The Intimate Interpreter",
    method: "Quiet Emotional Authority",
    lane: "soul ballad interpretation",
    thesis: "A performance can make restraint feel enormous. The song should leave enough space for phrasing, breath, and emotional patience to become the hook.",
    proMove: "Strip the arrangement until the lyric, timing, and tone carry the drama.",
    listenFor: ["quiet vocal authority", "space around the phrase", "slow emotional reveal"],
    breakdown: ["patient tempo", "lyric clarity", "performance over ornament"],
    superpower: "Making stillness feel devastating.",
    process: "Trust the singer's phrasing and let the song unfold with emotional patience.",
    transfers: "Restraint, lyric interpretation, vocal space, ballad pacing.",
    cannotCopy: "The exact tone, phrasing authority, and interpretive depth.",
    osMove: "Before adding parts, ask whether silence lets the truth land harder.",
    drill: "Take one line and perform it three quieter ways. Keep the version that feels most dangerous.",
    sketch: "artist-lift",
    sketchName: "Quiet authority sketch",
  },
  {
    id: "anita-baker",
    name: "Anita Baker",
    category: "Soul Architects",
    archetype: "The Quiet Storm Architect",
    method: "Adult Emotion + Velvet Pocket",
    lane: "quiet storm soul",
    thesis: "Adult soul lives in tone, patience, and refined emotional language. The song should feel elegant without losing ache.",
    proMove: "Keep the groove smooth and the lyric emotionally direct, then let phrasing and harmony create the sophistication.",
    listenFor: ["velvet pocket", "adult relationship language", "chorus lift without shouting"],
    breakdown: ["warm harmonic bed", "controlled vocal intensity", "smooth but emotionally precise arrangement"],
    superpower: "Making restraint feel luxurious and wounded at the same time.",
    process: "Write with adult clarity, then shape the performance so the feeling smolders instead of explodes.",
    transfers: "Quiet storm pacing, mature lyric framing, elegant vocal production.",
    cannotCopy: "The voice, phrasing, and lived sophistication.",
    osMove: "Let maturity show through what the singer refuses to overstate.",
    drill: "Write a chorus that admits desire without sounding teenage or vague.",
    sketch: "rnb-craft",
    sketchName: "Quiet storm sketch",
  },
  {
    id: "raphael-saadiq",
    name: "Raphael Saadiq",
    category: "Soul Architects",
    archetype: "The Modern Classicist",
    method: "Vintage Feel, Modern Discipline",
    lane: "modern soul",
    thesis: "Modern soul does not need to cosplay the past. It can borrow warmth, band feel, and vocal conviction while keeping structure and sonics current.",
    proMove: "Use live-feeling rhythm and classic harmonic warmth, then keep the hook concise enough for modern replay.",
    listenFor: ["classic warmth without museum dust", "tight hook economy", "band feel serving modern song form"],
    breakdown: ["vintage-informed palette", "modern arrangement discipline", "vocal-centered groove"],
    superpower: "Making classic soul grammar feel current.",
    process: "Study the old records deeply, then write the song for today's listener attention.",
    transfers: "Tasteful referencing, live groove, timeless hook shape, sonic restraint.",
    cannotCopy: "Deep lineage fluency without listening and playing through the tradition.",
    osMove: "Borrow the principle, not the costume.",
    drill: "Take a vintage-feeling groove and write a hook that would still make sense this year.",
    sketch: "soul-groove",
    sketchName: "Modern classicist sketch",
  },
  {
    id: "questlove",
    name: "Questlove",
    category: "Soul Architects",
    archetype: "The Pocket Historian",
    method: "Human Groove Architecture",
    lane: "neo-soul and live pocket",
    thesis: "Feel is a composition choice. The drum pocket, bass conversation, and restraint can teach the listener how to inhabit the song.",
    proMove: "Let microtiming and restraint create personality before adding arrangement flash.",
    listenFor: ["laid-back pocket", "drums conversing with vocal and bass", "groove evolving without losing feel"],
    breakdown: ["human timing", "negative space", "historical taste applied to modern records"],
    superpower: "Making pocket feel intellectual and physical at once.",
    process: "Build from groove feel, then let every part earn its space inside that pocket.",
    transfers: "Microtiming, groove literacy, restraint, live-band arrangement.",
    cannotCopy: "The historical depth and drummer's touch without years of immersion.",
    osMove: "Do not quantize the humanity out of the hook.",
    drill: "Move one drum, bass, or vocal answer slightly behind the beat and listen for emotional change.",
    sketch: "rnb-craft",
    sketchName: "Human pocket sketch",
  },
  {
    id: "salaam-remi",
    name: "Salaam Remi",
    category: "Soul Architects",
    archetype: "The Raw Soul Translator",
    method: "Character-First Modern Soul",
    lane: "modern soul and hip-hop-soul",
    thesis: "Modern soul can feel raw, conversational, and imperfect while still being sharply produced. Character is the hook.",
    proMove: "Frame the artist's grain with warm samples, live-feel rhythm, and space for personality to stay unpolished.",
    listenFor: ["vocal character foregrounded", "soul warmth with hip-hop discipline", "imperfection as identity"],
    breakdown: ["sample/live blend", "dry emotional vocal space", "arrangement that protects personality"],
    superpower: "Turning rough character into record identity.",
    process: "Find the artist's truthful vocal grain, then produce around it instead of sanding it smooth.",
    transfers: "Character-first production, sample warmth, honest vocal framing.",
    cannotCopy: "The exact artist chemistry and taste for what roughness to keep.",
    osMove: "Protect the human edge that makes the singer believable.",
    drill: "Record one imperfect vocal pass and build around the phrase that feels most like the person.",
    sketch: "atmosphere",
    sketchName: "Raw soul frame sketch",
  },
  {
    id: "the-dream",
    name: "The-Dream",
    category: "R&B Architects",
    archetype: "The Hook Machine",
    method: "Hook Density & Emotional Repetition",
    lane: "Repetition as feeling",
    thesis: "Memory beats complexity. Repetition becomes craft when every repeat changes pressure or meaning.",
    proMove: "Make the hook phrase short enough to repeat until it becomes the emotion, then stack variations around it.",
    listenFor: ["tiny phrase repeated often", "ad-libs create new meaning", "density builds without new plot"],
    breakdown: ["title as mantra", "call-and-response layers", "emotional repetition over explanation"],
    superpower: "Turning a phrase into a feeling through density.",
    process: "Repeat the emotional title while changing melody, stacks, and ad-lib perspective.",
    transfers: "Phrase construction, melody stacking, emotional repetition.",
    cannotCopy: "The exact melodic swagger and phrase instincts.",
    osMove: "Let one phrase do more work before writing another line.",
    drill: "Repeat your title four times. Change only rhythm, harmony answer, ad-lib, and last-word emphasis.",
    sketch: "hook-density",
    sketchName: "Dense repetition sketch",
  },
  {
    id: "dmile",
    name: "D'Mile",
    category: "R&B Architects",
    archetype: "The Craftsman",
    method: "Modern R&B Craftsmanship",
    lane: "Musicianship and pocket",
    thesis: "Master the fundamentals at an elite level. Harmony, groove, vocals, and arrangement all serve the song.",
    proMove: "Let the chords be sophisticated, but make the vocal pocket conversational and the bass movement emotional.",
    listenFor: ["warm harmonic color", "bass answers the melody", "vocal stacks support instead of crowd"],
    breakdown: ["Rhodes-like color", "microtiming pocket", "call-and-response bass motion"],
    superpower: "Making elite musicianship feel effortless.",
    process: "Build the song from harmonic taste, vocal support, and arrangement discipline.",
    transfers: "Craftsmanship, harmony, pocket, vocal production.",
    cannotCopy: "The level of musicianship without doing the reps.",
    osMove: "Use sophistication only where it makes the emotion clearer.",
    drill: "Keep your richest chord, then simplify the topline rhythm until the singer sounds natural over it.",
    sketch: "rnb-craft",
    sketchName: "Modern R&B pocket sketch",
  },
  {
    id: "bryan-michael-cox",
    name: "Bryan-Michael Cox",
    category: "R&B Architects",
    archetype: "The Song Constructor",
    method: "Timeless R&B Song Construction",
    lane: "Classic song form",
    thesis: "Strong songs survive changing trends. Section logic and emotional pacing make a record age well.",
    proMove: "Let the verse tell the scene, the pre-chorus admit the need, and the chorus state the emotional thesis plainly.",
    listenFor: ["classic verse-pre-hook lift", "title as emotional thesis", "chords support vocal drama"],
    breakdown: ["song-first arrangement", "strong bridge logic", "melody that invites vocal performance"],
    superpower: "Building songs that survive production trends.",
    process: "Use structure, melody, and emotional pacing as the foundation before sonic decoration.",
    transfers: "Timeless form, emotional pacing, bridge construction.",
    cannotCopy: "The era-specific feel without the underlying songwriting discipline.",
    osMove: "Assign every section an emotional job.",
    drill: "Write verse, pre, hook, and bridge as four emotional jobs, not four beat sections.",
    sketch: "classic-rnb",
    sketchName: "Timeless R&B construction sketch",
  },
  {
    id: "jermaine-dupri",
    name: "Jermaine Dupri",
    category: "R&B Architects",
    archetype: "The Ecosystem Builder",
    method: "Artist Ecosystem Building",
    lane: "Catalog and community",
    thesis: "Build systems, not records. Hits emerge when artist, audience, label strategy, performance, and song identity align.",
    proMove: "Build the song around the artist's ecosystem: audience language, feature chemistry, performance setting, and identity slogan.",
    listenFor: ["artist brand feels social", "call-and-response energy", "record fits a scene beyond headphones"],
    breakdown: ["audience participation", "identity slogan", "arrangement made for performance"],
    superpower: "Knowing how records live in an audience ecosystem.",
    process: "Develop artists, spot records, connect scenes, and create repeatable lanes.",
    transfers: "Executive production, hit identification, audience thinking.",
    cannotCopy: "The relationships, timing, and cultural proximity.",
    osMove: "Name the room where the record wins.",
    drill: "Choose car, club, stage, bedroom, short-form clip, or radio. Then write every hook decision for that room.",
    sketch: "ecosystem",
    sketchName: "Audience ecosystem sketch",
  },
  {
    id: "p2j",
    name: "P2J",
    category: "Afrobeats & Global Pop",
    archetype: "The Global Groove Architect",
    method: "Crossover Groove Design",
    lane: "Global rhythm",
    thesis: "Rhythm travels further than language. Groove can make a record feel international before the lyric translates.",
    proMove: "Build a simple rhythmic invitation that supports melody, movement, and crossover clarity.",
    listenFor: ["groove simplicity", "melody riding rhythm", "global pop spacing"],
    breakdown: ["rhythm-first arrangement", "clean percussion language", "melody supported by bounce"],
    superpower: "Making groove feel universal without flattening identity.",
    process: "Prioritize pocket, movement, and vocal simplicity so the record crosses borders.",
    transfers: "Rhythmic clarity, crossover arrangement, global song instincts.",
    cannotCopy: "Cultural fluency without listening deeply to the source worlds.",
    osMove: "Make the body understand the song before the brain parses the lyric.",
    drill: "Mute harmonic clutter and make the groove carry the first 15 seconds.",
    sketch: "global-groove",
    sketchName: "Global groove sketch",
  },
  {
    id: "sarz",
    name: "Sarz",
    category: "Afrobeats & Global Pop",
    archetype: "The Minimalist Innovator",
    method: "Pocket Economy",
    lane: "Movement and space",
    thesis: "Leave space for movement. Minimal arrangement can feel huge when pocket and restraint are strong.",
    proMove: "Use fewer parts, sharper pocket, and more intentional space so the rhythm breathes.",
    listenFor: ["lean percussion", "movement in the gaps", "economy with identity"],
    breakdown: ["pocket over density", "negative space", "rhythmic motif as arrangement"],
    superpower: "Making minimalism feel alive.",
    process: "Find the pocket first, then protect it from unnecessary parts.",
    transfers: "Arrangement economy, rhythm discipline, danceability.",
    cannotCopy: "The exact pocket without immersion and taste.",
    osMove: "If the body stops moving, your extra part is probably too expensive.",
    drill: "Remove half the instruments and make the drums and bass feel better, not emptier.",
    sketch: "minimal-groove",
    sketchName: "Minimal pocket sketch",
  },
  {
    id: "magicsticks",
    name: "Magicsticks",
    category: "Afrobeats & Global Pop",
    archetype: "The Afrobeats Hit Specialist",
    method: "Movement + Melody",
    lane: "Danceable emotion",
    thesis: "Movement and melody must coexist. The record should feel good in the body and still leave a singable trace.",
    proMove: "Support the melody with a groove that never competes with the title phrase.",
    listenFor: ["danceability", "melody support", "emotional accessibility"],
    breakdown: ["melody-first bounce", "soft repetition", "arrangement that invites motion"],
    superpower: "Balancing dance feel with singable warmth.",
    process: "Keep the hook emotionally clear while the groove creates social energy.",
    transfers: "Melody support, danceability, light-touch production.",
    cannotCopy: "The scene-specific rhythmic feel without cultural grounding.",
    osMove: "Let the chorus be both a phrase and a movement.",
    drill: "Write a hook that can be sung while dancing, not just admired while sitting.",
    sketch: "melody-movement",
    sketchName: "Movement plus melody sketch",
  },
  {
    id: "london",
    name: "London",
    category: "Afrobeats & Global Pop",
    archetype: "The Global Hybrid Producer",
    method: "Genre Ecosystem Blending",
    lane: "Hybrid pop",
    thesis: "Genres are becoming ecosystems rather than categories. The producer translates between worlds without breaking the artist.",
    proMove: "Blend Afrobeats, pop spacing, and artist-specific tone into one clean record function.",
    listenFor: ["genre blend feels natural", "artist adaptation", "modern arrangement"],
    breakdown: ["hybrid rhythm", "pop clarity", "artist-first palette"],
    superpower: "Making crossover feel native.",
    process: "Translate rhythm, melody, and arrangement between scenes while protecting the artist's center.",
    transfers: "Hybrid thinking, artist adaptation, modern structure.",
    cannotCopy: "Surface genre markers without understanding their ecosystem.",
    osMove: "Ask what each genre is doing functionally, not just sonically.",
    drill: "Take one hook and make rhythm, harmony, and arrangement each come from a different world without sounding pasted together.",
    sketch: "hybrid-pop",
    sketchName: "Global hybrid sketch",
  },
  {
    id: "kaytranada",
    name: "Kaytranada",
    category: "Alternative & Crossover",
    archetype: "The Groove Futurist",
    method: "Feel-First Fusion",
    lane: "Groove futurism",
    thesis: "Feel beats complexity. A groove can be sophisticated and still immediately physical.",
    proMove: "Build around swing, pocket, and a minimal arrangement that lets the bounce become the hook.",
    listenFor: ["off-grid bounce", "minimal arrangement", "genre fusion through rhythm"],
    breakdown: ["swing as identity", "bass/drum conversation", "texture without clutter"],
    superpower: "Making rhythm feel futuristic and human.",
    process: "Let pocket, not density, create sophistication.",
    transfers: "Groove, bounce, restraint, fusion.",
    cannotCopy: "The exact feel without internalizing the swing.",
    osMove: "Quantize less; listen harder.",
    drill: "Move one percussion element late and one bass note early until the loop smiles.",
    sketch: "groove-future",
    sketchName: "Groove futurist sketch",
  },
  {
    id: "rick-rubin",
    name: "Rick Rubin",
    category: "Alternative & Crossover",
    archetype: "The Editor",
    method: "Reduction and Emotional Clarity",
    lane: "Artist psychology",
    thesis: "Knowing what to remove is a superpower. The producer protects the essence from the artist's fear of emptiness.",
    proMove: "Strip the record until the emotional center becomes undeniable, then add only what deepens it.",
    listenFor: ["reduction", "performance focus", "emotional clarity"],
    breakdown: ["remove decoration", "center the voice or idea", "make silence useful"],
    superpower: "Hearing the song underneath the production.",
    process: "Interrogate every part: does it reveal the song, or does it protect the creator from vulnerability?",
    transfers: "Editing, psychology, taste, restraint.",
    cannotCopy: "Authority without trust and deep listening.",
    osMove: "Delete the cleverest part and see if the song gets better.",
    drill: "Bounce a version with only vocal, core chord, bass, and one hook support element.",
    sketch: "editor",
    sketchName: "Reduction sketch",
  },
  {
    id: "danger-mouse",
    name: "Danger Mouse",
    category: "Alternative & Crossover",
    archetype: "The Curator",
    method: "Taste and Sonic Cohesion",
    lane: "Curated worlds",
    thesis: "Taste compounds over decades. The producer's choices create a coherent world even when genres blend.",
    proMove: "Choose a sonic frame, then make every instrument feel like it belongs to the same movie.",
    listenFor: ["curated texture", "genre blending", "cohesive palette"],
    breakdown: ["taste filter", "cinematic cohesion", "unexpected pairings"],
    superpower: "Making references feel like a new world.",
    process: "Curate fewer, stronger ingredients and make them emotionally compatible.",
    transfers: "Taste, cohesion, long-range reference building.",
    cannotCopy: "A taste archive you have not built yet.",
    osMove: "Build a reference library by emotional function, not genre labels.",
    drill: "Pick three references from different genres and write why they feel emotionally related.",
    sketch: "curator",
    sketchName: "Curated texture sketch",
  },
  {
    id: "james-blake",
    name: "James Blake",
    category: "Alternative & Crossover",
    archetype: "The Emotional Experimentalist",
    method: "Vulnerability + Texture",
    lane: "Experimental emotion",
    thesis: "Innovation works best when attached to emotion. Texture should make vulnerability sharper, not obscure it.",
    proMove: "Use unusual processing or harmony to make a simple emotional line feel exposed and new.",
    listenFor: ["vulnerable vocal center", "textural experimentation", "space around fragile emotion"],
    breakdown: ["emotion first", "experimental support", "quiet drama"],
    superpower: "Making experimental sound feel intimate.",
    process: "Start with a human emotional phrase, then distort the world around it.",
    transfers: "Texture, vulnerability, unconventional harmony.",
    cannotCopy: "The specific emotional voice and production language.",
    osMove: "Every experimental choice must answer an emotional question.",
    drill: "Write one plain line, then design one texture that makes it feel more alone, not more impressive.",
    sketch: "emotional-experiment",
    sketchName: "Emotional experiment sketch",
  },
  {
    id: "john-congleton",
    name: "John Congleton",
    category: "Alt-Rock & Indie Architects",
    archetype: "The Sonic Risk Taker",
    method: "Memorable Over Polished",
    lane: "Risk and intensity",
    thesis: "Memorable beats polished. Emotional intensity often needs friction, danger, and personality.",
    proMove: "Let one uncomfortable sound or performance choice carry the record's emotional truth.",
    listenFor: ["experimentation", "intensity", "artist individuality"],
    breakdown: ["risk as identity", "texture with teeth", "performance over perfection"],
    superpower: "Making imperfection unforgettable.",
    process: "Push the artist toward the sound that reveals them, even if it is not conventionally pretty.",
    transfers: "Risk, individuality, emotional intensity.",
    cannotCopy: "Shock value without emotional purpose.",
    osMove: "Ask what makes the record impossible to confuse.",
    drill: "Add one risky sound. If it does not reveal the artist, delete it.",
    sketch: "sonic-risk",
    sketchName: "Sonic risk sketch",
  },
  {
    id: "catherine-marks",
    name: "Catherine Marks",
    category: "Alt-Rock & Indie Architects",
    archetype: "The Modern Rock Builder",
    method: "Dynamics and Performance Capture",
    lane: "Energy architecture",
    thesis: "Energy matters more than perfection. The song must feel performed, not assembled.",
    proMove: "Shape the arrangement around performance dynamics: restraint, attack, release, and physical lift.",
    listenFor: ["dynamic contrast", "performance energy", "arrangement momentum"],
    breakdown: ["capture urgency", "section lift", "human edges"],
    superpower: "Turning band energy into record architecture.",
    process: "Use arrangement and capture choices to make emotion feel physical.",
    transfers: "Dynamics, performance, arrangement energy.",
    cannotCopy: "Band chemistry by editing alone.",
    osMove: "Track the energy curve, not just the grid.",
    drill: "Mark where the performance should lean forward, pull back, and explode.",
    sketch: "rock-dynamics",
    sketchName: "Performance dynamics sketch",
  },
  {
    id: "shawn-everett",
    name: "Shawn Everett",
    category: "Alt-Rock & Indie Architects",
    archetype: "The Sound World Designer",
    method: "Production as Narrative",
    lane: "Texture and depth",
    thesis: "Production can become narrative. Sound design can tell the story alongside the lyric.",
    proMove: "Design depth, texture, and motion so the production changes as the song's emotional scene changes.",
    listenFor: ["depth", "sonic storytelling", "texture that evolves"],
    breakdown: ["scene-based texture", "depth as emotion", "arrangement as camera movement"],
    superpower: "Making records feel like worlds you move through.",
    process: "Treat production changes as story beats, not decoration.",
    transfers: "Texture, narrative, depth, motion.",
    cannotCopy: "Complexity without story logic.",
    osMove: "Write the production scene list before sound design.",
    drill: "For each section, name the visual distance: close, wide, underwater, bright, crowded, empty.",
    sketch: "sound-world",
    sketchName: "Sound-world sketch",
  },
  {
    id: "dan-nigro-alt",
    name: "Dan Nigro (Alternative Origins)",
    category: "Alt-Rock & Indie Architects",
    archetype: "The Genre Translator",
    method: "Indie-to-Mainstream Translation",
    lane: "Genre translation",
    thesis: "The future belongs to genre translators. Indie sensibility can become mainstream when the emotional core remains intact.",
    proMove: "Keep the edge, point of view, and texture, but clarify the structure and hook enough for broader listeners.",
    listenFor: ["indie taste", "mainstream chorus clarity", "translation without dilution"],
    breakdown: ["edge preserved", "hook clarified", "artist identity centered"],
    superpower: "Converting niche feeling into wide emotional access.",
    process: "Identify what is sacred about the artist, then make the song easier to enter.",
    transfers: "Translation, taste, structure, artist protection.",
    cannotCopy: "Mainstreaming by sanding off all personality.",
    osMove: "Clarify the door without changing the house.",
    drill: "Take a strange verse idea and write the clearest chorus it can honestly support.",
    sketch: "genre-translator",
    sketchName: "Genre translator sketch",
  },
  {
    id: "sam-phillips",
    name: "Sam Phillips",
    category: "Rock Era Architects",
    archetype: "The Rock & Roll Spark",
    method: "Performance Capture & Youth Energy",
    lane: "1950s rock & roll",
    thesis: "Early rock & roll worked because the performance felt dangerous, physical, and immediate. The record captured youth culture before it explained it.",
    proMove: "Protect the backbeat, vocal attitude, and simple title phrase so the song feels like a body-first event.",
    listenFor: ["slapback vocal presence", "band playing like a room", "title phrase as movement command"],
    breakdown: ["live energy over polish", "backbeat as culture", "simple hook with attitude"],
    superpower: "Capturing the moment American youth culture became a sound.",
    process: "Find the performer with unmistakable attitude, keep the arrangement simple, and let rhythm carry the release.",
    transfers: "Performance capture, simplicity, backbeat authority, title-as-motion.",
    cannotCopy: "The exact cultural shock of early rock & roll or the historical moment around it.",
    osMove: "Before polishing, ask whether the record makes the body believe it.",
    drill: "Write a two-line hook that sounds like a dare, then record it with claps or a backbeat before adding anything else.",
    sketch: "rock-dynamics",
    sketchName: "Backbeat capture sketch",
  },
  {
    id: "tom-dowd",
    name: "Tom Dowd",
    category: "Rock Era Architects",
    archetype: "The Band-in-the-Room Engineer",
    method: "Classic Rock Performance Architecture",
    lane: "Roots rock, soul-rock, album rock",
    thesis: "Classic rock records often live or die by band chemistry. The production must make instruments feel like people answering each other.",
    proMove: "Treat the rhythm section, riff, vocal, and solo as a conversation with section jobs, not separate overdubs.",
    listenFor: ["band conversation", "riff and vocal taking turns", "solo as emotional answer"],
    breakdown: ["room energy", "instrument roles", "performance-led arrangement"],
    superpower: "Making technically strong players sound human, urgent, and connected.",
    process: "Capture the band interaction first, then use arrangement and engineering to clarify the emotional center.",
    transfers: "Live-band arrangement, instrumental storytelling, classic-rock section discipline.",
    cannotCopy: "Legendary room chemistry without musicians listening to each other.",
    osMove: "Ask what the band is saying back to the singer.",
    drill: "Map one answer for each instrument: drums push, bass anchors, guitar replies, vocal states the thesis.",
    sketch: "rock-dynamics",
    sketchName: "Band conversation sketch",
  },
  {
    id: "mutt-lange",
    name: "Mutt Lange",
    category: "Rock Era Architects",
    archetype: "The Arena Precisionist",
    method: "Hard-Rock Hook Engineering",
    lane: "Arena rock and hard rock",
    thesis: "Arena rock scales when every riff, gang vocal, drum hit, and chorus phrase is engineered for maximum physical memory.",
    proMove: "Make the riff and chorus chant work as one machine: tight rhythm, obvious title, massive answer vocals.",
    listenFor: ["riff as hook", "gang vocal reinforcement", "drums engineered for impact"],
    breakdown: ["precision arrangement", "chorus stacking", "riff/title unity"],
    superpower: "Turning band force into gigantic pop architecture.",
    process: "Refine the riff, simplify the chorus language, then build every part to punch the same hook.",
    transfers: "Chorus scale, arrangement precision, riff discipline, crowd-ready repetition.",
    cannotCopy: "Huge sound without ruthless editing and performance control.",
    osMove: "If the riff and title are not working together, the record is not big yet.",
    drill: "Write one riff rhythm, then make the title phrase copy or answer that rhythm.",
    sketch: "engineered-hook",
    sketchName: "Arena hook sketch",
  },
  {
    id: "rick-rubin-rock",
    name: "Rick Rubin (Rock)",
    category: "Rock Era Architects",
    archetype: "The Reductionist",
    method: "Essence, Stance & Raw Focus",
    lane: "Punk, hard rock, alternative, roots revival",
    thesis: "Rock often gets stronger when the producer removes the decoration and exposes the stance, riff, lyric, or performance truth.",
    proMove: "Strip the song until the central riff, title, and vocal conviction cannot hide.",
    listenFor: ["arrangement reduction", "riff and vocal exposed", "artist stance centered"],
    breakdown: ["less arrangement clutter", "identity first", "performance pressure"],
    superpower: "Finding the primitive core of a record and making it unavoidable.",
    process: "Ask what the song is really about, then remove anything that lets the artist avoid that answer.",
    transfers: "Reduction, taste, performance challenge, cross-genre rock instincts.",
    cannotCopy: "Minimalism without a powerful core to reveal.",
    osMove: "Delete until the song either gets stronger or admits it is not written yet.",
    drill: "Mute every overdub. If the vocal and one instrument do not create a point of view, rewrite.",
    sketch: "sonic-risk",
    sketchName: "Reductionist rock sketch",
  },
  {
    id: "butch-vig",
    name: "Butch Vig",
    category: "Rock Era Architects",
    archetype: "The Grunge Translator",
    method: "Raw Energy Into Mainstream Impact",
    lane: "Grunge and 90s alternative rock",
    thesis: "Grunge crossed over when raw band energy, damaged melody, and quiet-loud dynamics became readable without losing danger.",
    proMove: "Keep the cracked vocal and dirty guitars, but make the chorus melody and dynamic release impossible to miss.",
    listenFor: ["quiet-loud contrast", "distortion with hook clarity", "raw vocal made readable"],
    breakdown: ["dynamic eruption", "melody through noise", "band aggression framed"],
    superpower: "Translating underground tension into mainstream emotional force.",
    process: "Preserve the band's raw identity while clarifying the chorus, drum impact, and emotional arc.",
    transfers: "Quiet-loud structure, raw vocal framing, distortion with songwriting purpose.",
    cannotCopy: "Distortion and angst without melody or dynamic architecture.",
    osMove: "Make the chorus explode because the verse withheld something real.",
    drill: "Write one quiet verse image and one chorus line that sounds like it finally breaks.",
    sketch: "rock-dynamics",
    sketchName: "Quiet-loud grunge sketch",
  },
  {
    id: "brendan-obrien",
    name: "Brendan O'Brien",
    category: "Rock Era Architects",
    archetype: "The 90s Rock Finisher",
    method: "Band Power, Hooks & Mix Authority",
    lane: "90s alternative, post-grunge, modern rock",
    thesis: "Rock records become durable when the band feels physical, the chorus is centered, and the mix gives every section a clear emotional size.",
    proMove: "Make guitars, drums, and vocal intensity grow by section so the final chorus feels earned rather than merely louder.",
    listenFor: ["big but human drums", "guitars supporting chorus scale", "vocal conviction in the center"],
    breakdown: ["band power", "chorus focus", "mix as emotional scale"],
    superpower: "Making rock bands sound massive without losing human performance.",
    process: "Shape song arrangement and mix energy together: verse tension, chorus size, bridge change, final lift.",
    transfers: "Rock finishing, mix perspective, band dynamics, final-chorus lift.",
    cannotCopy: "Big mix energy if the arrangement has no emotional curve.",
    osMove: "Track the size of each section before touching another guitar layer.",
    drill: "Write a section-size map: tight verse, wider chorus, different bridge, biggest final return.",
    sketch: "rock-dynamics",
    sketchName: "90s rock finish sketch",
  },
  {
    id: "jerry-finn",
    name: "Jerry Finn",
    category: "Rock Era Architects",
    archetype: "The Pop-Punk Polisher",
    method: "Speed, Hooks & Shoutable Emotion",
    lane: "Pop-punk and 2000s emo-adjacent rock",
    thesis: "Pop-punk works when speed, guitar tightness, melodic hooks, and emotional directness feel polished but still urgent.",
    proMove: "Tighten the band around the chorus melody, then make the bridge confession set up the final shout.",
    listenFor: ["tight drums and guitars", "chorus melody leaps forward", "bridge creates final-chorus payoff"],
    breakdown: ["speed with clarity", "melodic chorus focus", "emotional bridge setup"],
    superpower: "Making youthful urgency sound huge, clean, and still believable.",
    process: "Keep the tempo moving, simplify the hook, stack the chorus, and use the bridge to reveal the real wound.",
    transfers: "Pop-punk chorus craft, guitar arrangement, youth-culture emotional directness.",
    cannotCopy: "Gloss without the nerve, humor, or emotional specificity.",
    osMove: "The chorus should feel like a private line the crowd somehow already knows.",
    drill: "Write one diary-detail hook, then arrange guitars so the downbeat makes it shoutable.",
    sketch: "engineered-hook",
    sketchName: "Pop-punk chorus sketch",
  },
  {
    id: "pharrell",
    name: "Pharrell Williams",
    category: "God-Tier Generalists",
    archetype: "The Culture Designer",
    method: "Culture Over Genre",
    lane: "Longevity and trend creation",
    thesis: "Culture beats genre. The record works because it feels like an idea people want to wear, quote, move to, and belong to.",
    proMove: "Make the simplest motif carry style, attitude, melody, and cultural utility.",
    listenFor: ["minimal motif", "style as hook", "melody with cultural posture"],
    breakdown: ["less is iconic", "fashionable rhythm", "identity in small details"],
    superpower: "Turning small ideas into culture.",
    process: "Design records as lifestyle objects, not just songs.",
    transfers: "Taste, melody, branding, cultural instinct.",
    cannotCopy: "The cultural antenna and personal style.",
    osMove: "Ask what the record lets people become for three minutes.",
    drill: "Write one motif that works as beat, hook, caption, and identity signal.",
    sketch: "culture",
    sketchName: "Culture motif sketch",
  },
  {
    id: "timbaland",
    name: "Timbaland",
    category: "God-Tier Generalists",
    archetype: "The Innovator",
    method: "Innovation & Sonic Identity",
    lane: "Rhythm invention",
    thesis: "Originality scales. A sound can be the hook if it is rhythmically memorable and emotionally tied to the vocal idea.",
    proMove: "Invent one percussive or vocal-like motif that answers the lead line; make the record impossible to confuse.",
    listenFor: ["non-obvious percussion", "syncopated identity motif", "space around the weird sound"],
    breakdown: ["sonic hook", "rhythmic surprise", "minimal parts with maximum personality"],
    superpower: "Making new sound feel commercially undeniable.",
    process: "Use rhythm invention and sonic character as songwriting, not just production.",
    transfers: "Innovation, rhythm, sonic identity, fearless arrangement.",
    cannotCopy: "Weirdness without groove.",
    osMove: "If the sound is strange, make the pocket undeniable.",
    drill: "Create one sound that can answer the title. If it does not feel like a character, keep designing.",
    sketch: "sonic-identity",
    sketchName: "Sonic identity sketch",
  },
  {
    id: "kanye-west",
    name: "Kanye West",
    category: "God-Tier Generalists",
    archetype: "The Vision Architect",
    method: "Creative Direction as Leverage",
    lane: "World building and risk",
    thesis: "Vision creates leverage. The producer's job can expand into story, aesthetics, collaborators, samples, sequencing, and cultural moments.",
    proMove: "Treat the record as part of a larger statement, then organize collaborators and risks around that statement.",
    listenFor: ["big creative thesis", "risk as identity", "collage with direction"],
    breakdown: ["world first", "sample/story relationship", "bold arrangement decisions"],
    superpower: "Turning taste, risk, and narrative into an event.",
    process: "Create a world, recruit the right pieces, and make every decision serve the larger vision.",
    transfers: "Creative direction, ambition, risk-taking, sequencing.",
    cannotCopy: "Shock, scale, or controversy without artistic thesis.",
    osMove: "Name the world your project belongs to before collecting sounds.",
    drill: "Write the project thesis in one sentence, then reject any beat that does not strengthen it.",
    sketch: "vision",
    sketchName: "Vision architecture sketch",
  },
  {
    id: "dr-dre",
    name: "Dr. Dre",
    category: "God-Tier Generalists",
    archetype: "The Standards Architect",
    method: "Quality Control & Artist Development",
    lane: "Sonic standards",
    thesis: "Standards create legacies. The producer develops artists and records through ruthless clarity, sonics, and performance expectation.",
    proMove: "Raise the floor: fewer records, better performances, stronger low end, cleaner identity, no weak moments.",
    listenFor: ["sonic authority", "artist development", "quality control"],
    breakdown: ["performance standard", "mix clarity as brand", "identity sharpening"],
    superpower: "Making excellence feel non-negotiable.",
    process: "Develop the artist, refine the performance, and enforce sonic discipline until the record feels undeniable.",
    transfers: "Standards, coaching, low-end discipline, quality control.",
    cannotCopy: "Authority without the ears and the standard.",
    osMove: "Do not release a record that lowers your floor.",
    drill: "Audit your demo for the weakest 10 seconds. Fix that before adding anything new.",
    sketch: "standards",
    sketchName: "Quality-control sketch",
  },
  {
    id: "young-chop",
    name: "Young Chop",
    category: "Drill Architects",
    archetype: "The Chicago Drill Originator",
    method: "Raw Identity & Minimal Menace",
    lane: "Chicago drill",
    thesis: "Early drill works because the production feels like pressure without explaining itself. The song survives on attitude, chant memory, and cold negative space.",
    proMove: "Make the hook phrase feel like the neighborhood already knows it.",
    listenFor: ["one cold motif", "chant repetition", "space around ad-libs"],
    breakdown: ["minimal loop as threat", "identity before polish", "repetition as posture"],
    superpower: "Turning a sparse loop into a cultural identity signal.",
    process: "Start with a hard, simple motif; leave room for the artist's voice; make the title phrase repeat until it becomes a stance.",
    transfers: "Minimalism, chant writing, artist-first menace, loop discipline.",
    cannotCopy: "The lived context, street codes, or cultural ownership behind the original movement.",
    osMove: "Before adding another part, ask if the phrase, drum pocket, and identity already carry the record.",
    drill: "Build an 8-bar loop with one cold motif. Write a four-word chant hook and repeat it until it becomes posture.",
    sketch: "franchise-trap",
    sketchName: "Chicago drill pressure sketch",
  },
  {
    id: "808-melo",
    name: "808Melo",
    category: "Drill Architects",
    archetype: "The NY Drill Architect",
    method: "Gliding Bass & Vocal Pocket",
    lane: "NY drill",
    thesis: "NY drill became explosive when UK-style glide, Brooklyn vocal presence, and chantable hooks locked into one instantly recognizable pocket.",
    proMove: "Let the sliding bass and drum bounce create a moving floor, then keep the vocal hook blunt enough to cut through it.",
    listenFor: ["glide as movement", "vocal space", "hook phrases that hit like commands"],
    breakdown: ["bounce before complexity", "bass motion as hook", "vocal authority centered"],
    superpower: "Making aggression feel kinetic instead of cluttered.",
    process: "Design the bass movement first, carve a vocal lane, then keep the hook short enough to survive the bounce.",
    transfers: "Bass-led writing, pocket control, space, hook economy.",
    cannotCopy: "Surface-level drill drums without the vocal pocket and regional identity.",
    osMove: "Make the groove feel like it is chasing the vocal, not covering it.",
    drill: "Write a hook that can be understood over drums and bass only. If it needs pads to make sense, simplify it.",
    sketch: "rhythm-inventor",
    sketchName: "Glide-bass pocket sketch",
  },
  {
    id: "axl-beats",
    name: "AXL Beats",
    category: "Drill Architects",
    archetype: "The Transatlantic Drill Translator",
    method: "UK-to-NY Drill Language",
    lane: "UK/London drill and NY drill",
    thesis: "The exportable drill sound works because it turns regional rhythm, dark melody, and artist charisma into a flexible language artists can inhabit.",
    proMove: "Build a dark melodic loop with enough identity to brand the record, but enough space for the artist to own the scene.",
    listenFor: ["minor-key motif", "drum economy", "artist identity over architecture"],
    breakdown: ["regional bounce", "portable mood", "loop as brand"],
    superpower: "Making drill travel without losing its core tension.",
    process: "Choose a narrow mood, make the melody unforgettable, then subtract until the vocal has authority.",
    transfers: "Translation, restraint, dark motif writing, international bounce.",
    cannotCopy: "Borrowing the surface rhythm without respecting the culture and vocal language around it.",
    osMove: "Treat the beat as a stage, not the lead actor.",
    drill: "Make two versions of the same loop: one for an aggressive rapper, one for a melodic hook. Keep only the elements both versions need.",
    sketch: "genre-translator",
    sketchName: "Transatlantic drill sketch",
  },
  {
    id: "dave-cobb",
    name: "Dave Cobb",
    category: "Country Architects",
    archetype: "The Roots Truth Producer",
    method: "Performance-First Country",
    lane: "Roots country and Americana",
    thesis: "Great country production often wins by letting the song sound lived-in. The performance, room, lyric, and restraint carry more weight than polish.",
    proMove: "Protect the emotional truth of the vocal and let the band feel like a human conversation around it.",
    listenFor: ["vocal truth", "room feel", "arrangement restraint"],
    breakdown: ["song over shine", "performance as proof", "small arrangement turns"],
    superpower: "Making timeless records feel emotionally unedited.",
    process: "Start from the lyric and vocal performance, then add only the instruments that deepen the story.",
    transfers: "Restraint, acoustic storytelling, vocal trust, organic dynamics.",
    cannotCopy: "Vintage texture without a real song or a believable performance.",
    osMove: "If the vocal does not hurt, smile, or confess yet, production cannot save it.",
    drill: "Mute everything except vocal and one instrument. Rewrite until the lyric still lands there.",
    sketch: "artist-lift",
    sketchName: "Performance-first country sketch",
  },
  {
    id: "dann-huff",
    name: "Dann Huff",
    category: "Country Architects",
    archetype: "The Modern Country Polisher",
    method: "Radio-Ready Country Architecture",
    lane: "Modern country",
    thesis: "Modern country can be huge without losing story when the chorus is engineered, the guitars lift emotion, and every section has a clear job.",
    proMove: "Make the chorus feel inevitable by arranging guitars, drums, and harmony around the lyric's emotional turn.",
    listenFor: ["chorus lift", "guitar architecture", "clean emotional pacing"],
    breakdown: ["story clarity", "radio-scale payoff", "polished dynamics"],
    superpower: "Turning country storytelling into wide-screen records.",
    process: "Clarify the lyric arc, build section contrast, then polish the arrangement until the hook feels effortless.",
    transfers: "Chorus lift, arrangement discipline, melodic clarity, radio pacing.",
    cannotCopy: "Gloss without story, or big guitars without emotional direction.",
    osMove: "Every production lift should reveal the lyric, not just make the track louder.",
    drill: "Write a chorus lift plan: one lyric turn, one chord lift, one instrument lift, one vocal lift.",
    sketch: "hook-engineer",
    sketchName: "Country chorus-lift sketch",
  },
  {
    id: "joey-moi",
    name: "Joey Moi",
    category: "Country Architects",
    archetype: "The Country Streaming Manufacturer",
    method: "Hybrid Country Momentum",
    lane: "Country-pop and arena country",
    thesis: "Streaming-era country wins when a plainspoken hook, forward drums, and familiar emotional utility make the record usable in real life.",
    proMove: "Make the song instantly useful: drive, party, heartbreak, flex, hometown pride, or late-night regret.",
    listenFor: ["plainspoken hook", "hybrid low end", "immediate lifestyle utility"],
    breakdown: ["audience awareness", "hook-first chorus", "genre-blended momentum"],
    superpower: "Building country records that travel through playlists, radio, cars, and crowds.",
    process: "Choose the user moment, simplify the title, then build the track so the chorus arrives fast and repeats cleanly.",
    transfers: "Commercial instinct, tempo utility, direct hooks, repeatable structure.",
    cannotCopy: "Formula without a real audience read or artist fit.",
    osMove: "Name the exact moment the listener will use the song before finishing the demo.",
    drill: "Write one chorus for a truck, one for a breakup, and one for a tailgate. Keep the title under six words.",
    sketch: "culture",
    sketchName: "Streaming country utility sketch",
  },
  {
    id: "kirk-franklin",
    name: "Kirk Franklin",
    category: "Gospel Architects",
    archetype: "The Urban Gospel Architect",
    method: "Choir Energy + Contemporary Rhythm",
    lane: "contemporary gospel and urban gospel",
    thesis: "Contemporary gospel can feel urgent, communal, and current when testimony, choir response, and modern rhythm all point to the same release.",
    proMove: "Turn the hook into a call the room can answer, then let choir arrangement, vamp, and groove intensify the testimony.",
    listenFor: ["choir as hook engine", "spoken/preached energy", "R&B and hip-hop rhythm serving testimony"],
    breakdown: ["call-and-response architecture", "vamp escalation", "community as lead instrument"],
    superpower: "Making gospel feel communal and contemporary without losing testimony.",
    process: "Start from the spiritual claim, build the response language, then arrange the record so the final section feels like the room has joined.",
    transfers: "Call-and-response hooks, vamp design, choir lift, testimony-first writing.",
    cannotCopy: "Church authority, choir culture, or spiritual conviction as surface decoration.",
    osMove: "Write the line the room can answer before polishing the track.",
    drill: "Write one testimony sentence, one choir answer, and one vamp phrase that can repeat while gaining intensity.",
    sketch: "gospel-lift",
    sketchName: "Urban gospel lift sketch",
  },
  {
    id: "donald-lawrence",
    name: "Donald Lawrence",
    category: "Gospel Architects",
    archetype: "The Choir Dramatist",
    method: "Choir Direction & Harmonic Testimony",
    lane: "choir-driven contemporary gospel",
    thesis: "Gospel choir records work when arrangement becomes storytelling: the lead states the need, the choir widens the truth, and the vamp turns belief into motion.",
    proMove: "Use choir parts like dramatic characters: unison for certainty, harmony for lift, and repetition for conviction.",
    listenFor: ["choir voicing as drama", "vamp as emotional proof", "lead-to-choir section logic"],
    breakdown: ["arranged testimony", "harmonic lift", "communal payoff"],
    superpower: "Turning choir arrangement into song structure.",
    process: "Map what the lead says, what the choir confirms, and what the vamp keeps proving until the ending earns its lift.",
    transfers: "Choir writing, harmony pacing, section escalation, communal hooks.",
    cannotCopy: "Formal choir command without understanding voices, church dynamics, and arrangement discipline.",
    osMove: "Make every choir entrance answer a real emotional question.",
    drill: "Write a three-part choir answer to your hook: agreement, lift, and final vamp.",
    sketch: "gospel-lift",
    sketchName: "Choir drama sketch",
  },
  {
    id: "warryn-campbell",
    name: "Warryn Campbell",
    category: "Gospel Architects",
    archetype: "The Gospel-R&B Translator",
    method: "Faith Message + Radio Polish",
    lane: "gospel, R&B, and contemporary soul",
    thesis: "Gospel can cross into contemporary R&B language when the production is polished but the message remains spiritually direct.",
    proMove: "Let modern drums, bass, and vocal production carry the record without weakening the testimony or church-rooted lift.",
    listenFor: ["radio-ready gospel polish", "R&B pocket under faith language", "stacked vocals serving the message"],
    breakdown: ["modern groove", "faith-centered hook", "clean vocal architecture"],
    superpower: "Making gospel records feel current without turning them generic.",
    process: "Build a contemporary pocket, keep the hook plain and spiritually legible, then stack vocals so the lift feels earned.",
    transfers: "Hybrid gospel/R&B production, vocal polish, pocket discipline, message clarity.",
    cannotCopy: "Borrowing gospel language without reverence for its purpose and audience.",
    osMove: "If the beat modernizes the record, the hook must keep the testimony centered.",
    drill: "Write a faith-centered hook that still works over drums and bass only.",
    sketch: "rnb-craft",
    sketchName: "Gospel-R&B translation sketch",
  },
  {
    id: "fred-hammond",
    name: "Fred Hammond",
    category: "Gospel Architects",
    archetype: "The Praise Groove Builder",
    method: "Band Pocket, Bass Motion & Worship Lift",
    lane: "contemporary gospel and praise worship",
    thesis: "Praise-focused gospel often wins through pocket and repetition: the groove keeps the body moving while the lyric gives the room a simple truth to hold.",
    proMove: "Use bass movement, band feel, and repeatable praise language to make the song function live as well as on record.",
    listenFor: ["bass-led worship pocket", "repeatable praise phrase", "live-band lift"],
    breakdown: ["groove as invitation", "simple praise language", "band arrangement discipline"],
    superpower: "Making praise feel physical, musical, and collective.",
    process: "Find the groove that makes the room lean forward, then keep the lyric direct enough for people to join quickly.",
    transfers: "Bass motion, live arrangement, praise repetition, pocket-centered hooks.",
    cannotCopy: "Live worship authority without understanding the room and the rhythm section.",
    osMove: "Make the groove invite the body before asking the lyric to lift the room.",
    drill: "Write one praise phrase that can repeat over a bass movement for eight bars without getting tired.",
    sketch: "soul-groove",
    sketchName: "Praise groove sketch",
  },
];

const suggestedReferenceSlots = {
  "max-martin": [
    { id: "blinding-lights", title: "Blinding Lights", artist: "The Weeknd", focus: "Hook", timestamp: "0:43", listenFor: "How fast the chorus becomes readable.", note: "Listen for title memory, melodic simplicity, and constant forward motion." },
    { id: "cant-feel-my-face", title: "Can't Feel My Face", artist: "The Weeknd", focus: "Replay", timestamp: "0:37", listenFor: "How the chorus feels familiar on first contact.", note: "Track the short phrases, repeated rhythm, and frictionless chorus entry." },
    { id: "since-u-been-gone", title: "Since U Been Gone", artist: "Kelly Clarkson", focus: "Structure", timestamp: "0:49", listenFor: "How the pre-chorus makes the chorus feel inevitable.", note: "Map the tension ramp before the payoff." },
  ],
  "benny-blanco": [
    { id: "love-yourself", title: "Love Yourself", artist: "Justin Bieber", focus: "Concept", timestamp: "0:32", listenFor: "A song that survives with almost no production.", note: "Notice how the concept is clear enough to work on guitar." },
    { id: "eastside", title: "Eastside", artist: "Benny Blanco, Halsey, Khalid", focus: "Vocal Space", timestamp: "0:45", listenFor: "How collaboration keeps the emotional language simple.", note: "Study how the track makes room for multiple vocal identities." },
    { id: "diamonds", title: "Diamonds", artist: "Rihanna", focus: "Hook", timestamp: "0:46", listenFor: "How a plain image becomes a huge chorus.", note: "Listen for repetition, vowel shape, and emotional directness." },
  ],
  "jack-antonoff": [
    { id: "anti-hero", title: "Anti-Hero", artist: "Taylor Swift", focus: "Concept", timestamp: "0:52", listenFor: "How a private confession turns into a chorus.", note: "Listen for conversational honesty behaving like pop architecture." },
    { id: "green-light", title: "Green Light", artist: "Lorde", focus: "Structure", timestamp: "1:04", listenFor: "How emotional release is delayed until it bursts.", note: "Map the build from intimate verse to communal release." },
    { id: "we-are-young", title: "We Are Young", artist: "fun. feat. Janelle Monae", focus: "Replay", timestamp: "0:50", listenFor: "How one huge communal phrase organizes the record.", note: "Notice the wide chorus and the emotional lift into group memory." },
  ],
  "daniel-nigro": [
    { id: "drivers-license", title: "drivers license", artist: "Olivia Rodrigo", focus: "Concept", timestamp: "0:56", listenFor: "How specific heartbreak becomes universal.", note: "Study the conversational verse detail and cinematic chorus lift." },
    { id: "good-4-u", title: "good 4 u", artist: "Olivia Rodrigo", focus: "Hook", timestamp: "0:45", listenFor: "How attitude turns into a shouted hook.", note: "Listen for the persona shift from contained verse to explosive chorus." },
    { id: "vampire", title: "vampire", artist: "Olivia Rodrigo", focus: "Structure", timestamp: "1:23", listenFor: "How the arrangement keeps escalating.", note: "Track how the song changes emotional gears instead of looping flatly." },
  ],
  "metro-boomin": [
    { id: "bad-and-boujee", title: "Bad and Boujee", artist: "Migos", focus: "Hook", timestamp: "0:23", listenFor: "How a phrase becomes social currency.", note: "Study negative space, quotables, and producer-brand mood." },
    { id: "like-that", title: "Like That", artist: "Future, Metro Boomin, Kendrick Lamar", focus: "Sonic Identity", timestamp: "0:31", listenFor: "How a producer-led world can frame star performances.", note: "Listen for menace, space, and how the beat creates event energy." },
    { id: "mask-off", title: "Mask Off", artist: "Future", focus: "Replay", timestamp: "0:26", listenFor: "How one loop can become hypnotic without crowding the vocal.", note: "Track the flute motif as brand, hook, and atmosphere." },
  ],
  hitmaka: [
    { id: "thot-box", title: "Thot Box", artist: "Hitmaka and collaborators", focus: "Hook", timestamp: "0:30", listenFor: "How direct commercial utility shapes the hook.", note: "Study the market fit, feature turnover, and hook-first formatting." },
    { id: "startender", title: "Startender", artist: "A Boogie wit da Hoodie feat. Offset and Tyga", focus: "Groove", timestamp: "0:42", listenFor: "How bounce and familiarity make the record usable.", note: "Listen for clean artist fit and repeat-friendly melodic space." },
    { id: "dangerous", title: "Dangerous", artist: "Meek Mill feat. Jeremih and PnB Rock", focus: "Vocal Space", timestamp: "0:36", listenFor: "How the production leaves space for a polished commercial hook.", note: "Study how the record balances rap identity and R&B accessibility." },
  ],
  "dj-dahi": [
    { id: "money-trees", title: "Money Trees", artist: "Kendrick Lamar", focus: "Concept", timestamp: "0:26", listenFor: "How atmosphere supports narrative.", note: "Listen for a world that lets story, hook, and mood all breathe." },
    { id: "worst-behavior", title: "Worst Behavior", artist: "Drake", focus: "Sonic Identity", timestamp: "0:18", listenFor: "How restraint lets attitude dominate.", note: "Study the mood and vocal pocket instead of the number of parts." },
    { id: "sativa", title: "Sativa", artist: "Jhene Aiko feat. Swae Lee", focus: "Groove", timestamp: "0:40", listenFor: "How a producer adapts to an artist's atmosphere.", note: "Notice the texture and restraint around the vocal." },
  ],
  "noah-40-shebib": [
    { id: "marvins-room", title: "Marvins Room", artist: "Drake", focus: "Vocal Space", timestamp: "0:30", listenFor: "How negative space becomes the emotional home.", note: "Study low-pass mood, minimal drums, and confessional vocal framing." },
    { id: "hold-on-were-going-home", title: "Hold On, We're Going Home", artist: "Drake", focus: "Hook", timestamp: "0:48", listenFor: "How atmosphere and pop clarity meet.", note: "Listen for soft-focus production that still supports a direct chorus." },
    { id: "jungle", title: "Jungle", artist: "Drake", focus: "Concept", timestamp: "0:55", listenFor: "How the sound world makes the vocal feel like thought.", note: "Map the emotional role of space, texture, and patience." },
  ],
  "maurice-white": [
    { id: "september", title: "September", artist: "Earth, Wind & Fire", focus: "Hook", timestamp: "0:42", listenFor: "How title, chant, groove, and ensemble lift become one joy machine.", note: "Study the phonetic hook and the way every part points upward." },
    { id: "shining-star", title: "Shining Star", artist: "Earth, Wind & Fire", focus: "Concept", timestamp: "0:35", listenFor: "How spiritual uplift becomes a compact funk/soul record.", note: "Listen for positive thesis, band identity, and groove authority." },
    { id: "boogie-wonderland", title: "Boogie Wonderland", artist: "Earth, Wind & Fire with The Emotions", focus: "Groove", timestamp: "0:49", listenFor: "How disco motion and soul ensemble energy meet.", note: "Map the rhythm, backgrounds, and chorus participation." },
  ],
  "stevie-wonder": [
    { id: "superstition", title: "Superstition", artist: "Stevie Wonder", focus: "Riff", timestamp: "0:04", listenFor: "How the clavinet riff becomes the song's first hook.", note: "Study riff-as-concept, horn punctuation, and vocal pocket." },
    { id: "sir-duke", title: "Sir Duke", artist: "Stevie Wonder", focus: "Hook", timestamp: "0:45", listenFor: "How advanced musicianship becomes pure pop joy.", note: "Listen for melodic clarity, horn lines, and tribute energy." },
    { id: "i-wish", title: "I Wish", artist: "Stevie Wonder", focus: "Groove", timestamp: "0:28", listenFor: "How bass line, memory, and chorus become one engine.", note: "Study nostalgia riding a hard funk pocket." },
  ],
  "marvin-gaye": [
    { id: "whats-going-on", title: "What's Going On", artist: "Marvin Gaye", focus: "Concept", timestamp: "0:38", listenFor: "How a social question becomes intimate and communal.", note: "Study compassion, background voices, and groove restraint." },
    { id: "mercy-mercy-me", title: "Mercy Mercy Me (The Ecology)", artist: "Marvin Gaye", focus: "Message", timestamp: "0:41", listenFor: "How ecological grief becomes singable soul.", note: "Listen for soft melody carrying heavy subject matter." },
    { id: "inner-city-blues", title: "Inner City Blues (Make Me Wanna Holler)", artist: "Marvin Gaye", focus: "Groove", timestamp: "0:32", listenFor: "How pressure and groove carry social exhaustion.", note: "Study minimal repetition, atmosphere, and title force." },
  ],
  "barry-white": [
    { id: "cant-get-enough", title: "Can't Get Enough of Your Love, Babe", artist: "Barry White", focus: "Concept", timestamp: "0:22", listenFor: "How spoken premise, title, groove, and strings create romantic abundance.", note: "Study the spoken setup and orchestral seduction logic." },
    { id: "youre-the-first", title: "You're the First, the Last, My Everything", artist: "Barry White", focus: "Hook", timestamp: "0:39", listenFor: "How a huge title phrase becomes direct and celebratory.", note: "Listen for title scale, groove, and persona." },
    { id: "never-never-gonna-give-you-up", title: "Never, Never Gonna Give Ya Up", artist: "Barry White", focus: "Vamp", timestamp: "1:05", listenFor: "How repetition and orchestration deepen romantic certainty.", note: "Study adult pacing and extended release." },
  ],
  "smokey-robinson": [
    { id: "tracks-of-my-tears", title: "The Tracks of My Tears", artist: "Smokey Robinson & The Miracles", focus: "Concept", timestamp: "0:36", listenFor: "How one graceful image carries heartbreak.", note: "Study title elegance, melodic gentleness, and background response." },
    { id: "ooh-baby-baby", title: "Ooo Baby Baby", artist: "Smokey Robinson & The Miracles", focus: "Performance", timestamp: "0:31", listenFor: "How simple language leaves room for ache.", note: "Listen for vocal restraint, pleading melody, and emotional economy." },
    { id: "my-girl", title: "My Girl", artist: "The Temptations", focus: "Hook", timestamp: "0:43", listenFor: "How a simple title and arrangement become instant warmth.", note: "Map the guitar figure, vocal entrance, and chorus clarity." },
  ],
  "curtis-mayfield": [
    { id: "move-on-up", title: "Move On Up", artist: "Curtis Mayfield", focus: "Groove", timestamp: "0:38", listenFor: "How uplift, groove, and message move together.", note: "Study rhythm as optimism and the message as motion." },
    { id: "people-get-ready", title: "People Get Ready", artist: "The Impressions", focus: "Concept", timestamp: "0:28", listenFor: "How spiritual/social language becomes gentle and communal.", note: "Listen for moral clarity without heaviness." },
    { id: "superfly", title: "Superfly", artist: "Curtis Mayfield", focus: "Sonic Identity", timestamp: "0:35", listenFor: "How groove and social observation create character.", note: "Study the bass, vocal tone, and cinematic perspective." },
  ],
  "patrice-rushen": [
    { id: "forget-me-nots", title: "Forget Me Nots", artist: "Patrice Rushen", focus: "Groove", timestamp: "0:24", listenFor: "How bass movement and light vocal phrasing create replay.", note: "Study sophisticated musicianship made friendly." },
    { id: "haven-you-heard", title: "Haven't You Heard", artist: "Patrice Rushen", focus: "Hook", timestamp: "0:42", listenFor: "How jazz-funk harmony stays accessible.", note: "Listen for groove invitation and clean title shape." },
    { id: "remind-me", title: "Remind Me", artist: "Patrice Rushen", focus: "Harmony", timestamp: "0:36", listenFor: "How smooth harmony supports intimate phrasing.", note: "Map the chord color against the conversational vocal." },
  ],
  "roberta-flack": [
    { id: "first-time-ever", title: "The First Time Ever I Saw Your Face", artist: "Roberta Flack", focus: "Performance", timestamp: "0:45", listenFor: "How patience makes the lyric enormous.", note: "Study space, tempo, phrasing, and quiet authority." },
    { id: "killing-me-softly", title: "Killing Me Softly With His Song", artist: "Roberta Flack", focus: "Concept", timestamp: "0:38", listenFor: "How a listener's experience becomes the song's drama.", note: "Listen for storytelling restraint and chorus inevitability." },
    { id: "feel-like-makin-love", title: "Feel Like Makin' Love", artist: "Roberta Flack", focus: "Vocal Space", timestamp: "0:33", listenFor: "How sensuality stays elegant through space.", note: "Study phrasing, breath, and arrangement restraint." },
  ],
  "anita-baker": [
    { id: "sweet-love", title: "Sweet Love", artist: "Anita Baker", focus: "Hook", timestamp: "0:53", listenFor: "How adult emotion becomes a luxurious chorus.", note: "Study quiet storm pacing, harmonic warmth, and vocal control." },
    { id: "caught-up-in-the-rapture", title: "Caught Up in the Rapture", artist: "Anita Baker", focus: "Performance", timestamp: "0:45", listenFor: "How phrasing makes romance feel mature.", note: "Listen for smooth pocket and controlled intensity." },
    { id: "giving-you-the-best", title: "Giving You the Best That I Got", artist: "Anita Baker", focus: "Concept", timestamp: "0:50", listenFor: "How a plain devotion title gains emotional weight.", note: "Map the title placement and vocal lift." },
  ],
  "raphael-saadiq": [
    { id: "you-should-be-here", title: "You Should Be Here", artist: "Raphael Saadiq feat. D'Angelo", focus: "Groove", timestamp: "0:34", listenFor: "How modern soul keeps classic warmth alive.", note: "Study groove, vocal tone, and spacious arrangement." },
    { id: "still-ray", title: "Still Ray", artist: "Raphael Saadiq", focus: "Hook", timestamp: "0:32", listenFor: "How a compact groove supports a clean modern hook.", note: "Listen for old-school feel with modern economy." },
    { id: "good-man", title: "Good Man", artist: "Raphael Saadiq", focus: "Concept", timestamp: "0:44", listenFor: "How character and soul tradition meet.", note: "Study story, arrangement discipline, and vocal framing." },
  ],
  questlove: [
    { id: "you-got-me", title: "You Got Me", artist: "The Roots feat. Erykah Badu and Eve", focus: "Pocket", timestamp: "0:40", listenFor: "How live pocket supports multiple vocal identities.", note: "Study groove restraint and emotional tension." },
    { id: "untitled-how-does-it-feel", title: "Untitled (How Does It Feel)", artist: "D'Angelo", focus: "Performance", timestamp: "0:55", listenFor: "How pocket, space, and vocal intimacy become the record.", note: "Listen for microtiming and human feel." },
    { id: "the-seed-2", title: "The Seed (2.0)", artist: "The Roots feat. Cody ChesnuTT", focus: "Groove", timestamp: "0:31", listenFor: "How band groove can still feel hook-forward.", note: "Map drum feel, bass movement, and vocal energy." },
  ],
  "salaam-remi": [
    { id: "love-is-a-losing-game", title: "Love Is a Losing Game", artist: "Amy Winehouse", focus: "Concept", timestamp: "0:34", listenFor: "How raw character carries classic song form.", note: "Study lyric economy, vocal grain, and warm restraint." },
    { id: "tears-dry-on-their-own", title: "Tears Dry on Their Own", artist: "Amy Winehouse", focus: "Groove", timestamp: "0:36", listenFor: "How soul reference and modern character meet.", note: "Listen for vocal personality against classic movement." },
    { id: "fu-gee-la", title: "Fu-Gee-La", artist: "Fugees", focus: "Sonic Identity", timestamp: "0:32", listenFor: "How sample warmth and character create replay.", note: "Study hip-hop-soul framing and artist chemistry." },
  ],
  "the-dream": [
    { id: "umbrella", title: "Umbrella", artist: "Rihanna", focus: "Hook", timestamp: "0:52", listenFor: "How repetition turns one image into a record.", note: "Listen for hook density, title reinforcement, and emotional repetition." },
    { id: "single-ladies", title: "Single Ladies", artist: "Beyonce", focus: "Replay", timestamp: "0:43", listenFor: "How one phrase becomes movement, identity, and culture.", note: "Study the chant logic and the physicality of the hook." },
    { id: "bed", title: "Bed", artist: "J. Holiday", focus: "Concept", timestamp: "0:47", listenFor: "How direct emotional repetition carries R&B songwriting.", note: "Notice how the hook stays simple and performance-focused." },
  ],
  dmile: [
    { id: "leave-the-door-open", title: "Leave The Door Open", artist: "Silk Sonic", focus: "Structure", timestamp: "1:03", listenFor: "How sophisticated harmony stays easy on top.", note: "Study vocal excellence, dynamic lift, and timeless arrangement discipline." },
    { id: "smokin-out-the-window", title: "Smokin Out The Window", artist: "Silk Sonic", focus: "Concept", timestamp: "0:42", listenFor: "How humor and craft coexist.", note: "Listen for character, performance, and arrangement detail." },
    { id: "pick-up-your-feelings", title: "Pick Up Your Feelings", artist: "Jazmine Sullivan", focus: "Vocal Space", timestamp: "0:49", listenFor: "How the arrangement serves vocal authority.", note: "Study how the production lets performance carry the emotional weight." },
  ],
  "bryan-michael-cox": [
    { id: "be-without-you", title: "Be Without You", artist: "Mary J. Blige", focus: "Hook", timestamp: "0:56", listenFor: "How timeless R&B structure supports emotional certainty.", note: "Map the chorus lift and the clean relationship concept." },
    { id: "burn", title: "Burn", artist: "Usher", focus: "Concept", timestamp: "0:49", listenFor: "How a clear emotional decision becomes the song.", note: "Study verse-to-chorus storytelling and vocal payoff." },
    { id: "shake-it-off", title: "Shake It Off", artist: "Mariah Carey", focus: "Replay", timestamp: "0:55", listenFor: "How a clean title phrase drives replay.", note: "Listen for polished R&B-pop structure and title placement." },
  ],
  "jermaine-dupri": [
    { id: "confessions-part-ii", title: "Confessions Part II", artist: "Usher", focus: "Concept", timestamp: "0:47", listenFor: "How narrative stakes make the record unavoidable.", note: "Study the ecosystem: artist identity, story, hook, and radio clarity." },
    { id: "we-belong-together", title: "We Belong Together", artist: "Mariah Carey", focus: "Hook", timestamp: "0:50", listenFor: "How an emotional thesis becomes a comeback-sized hook.", note: "Listen for title gravity, vocal drama, and clean structure." },
    { id: "nice-and-slow", title: "Nice & Slow", artist: "Usher", focus: "Groove", timestamp: "0:38", listenFor: "How artist persona and R&B pacing work together.", note: "Study the pocket and the performance world around the artist." },
  ],
  p2j: [
    { id: "essence", title: "Essence", artist: "Wizkid feat. Tems", focus: "Groove", timestamp: "0:42", listenFor: "How rhythm becomes the primary hook.", note: "Study bounce, vocal chemistry, warmth, and emotional ease." },
    { id: "come-closer", title: "Come Closer", artist: "Wizkid feat. Drake", focus: "Replay", timestamp: "0:38", listenFor: "How global groove and pop readability meet.", note: "Listen for space, swing, and a hook that travels." },
    { id: "finesse", title: "Finesse", artist: "Pheelz feat. BNXN", focus: "Hook", timestamp: "0:35", listenFor: "How simple melodic language rides the groove.", note: "Study rhythm-first memorability." },
  ],
  sarz: [
    { id: "monalisa", title: "Monalisa", artist: "Lojay and Sarz", focus: "Groove", timestamp: "0:38", listenFor: "How minimalism keeps the pocket addictive.", note: "Study drum economy, bounce, and hook restraint." },
    { id: "mad", title: "Mad", artist: "Sarz and WurlD", focus: "Vocal Space", timestamp: "0:41", listenFor: "How sparse production keeps the vocal floating.", note: "Listen for space, percussion discipline, and atmosphere." },
    { id: "come-closer-sarz", title: "Come Closer", artist: "Wizkid feat. Drake", focus: "Replay", timestamp: "0:38", listenFor: "How groove architecture helps a record cross borders.", note: "Map the bounce and negative space." },
  ],
  magicsticks: [
    { id: "sungba", title: "Sungba", artist: "Asake", focus: "Groove", timestamp: "0:28", listenFor: "How percussion and chant energy drive the hook.", note: "Study movement, repetition, and crowd-ready rhythm." },
    { id: "organise", title: "Organise", artist: "Asake", focus: "Structure", timestamp: "0:34", listenFor: "How sections evolve without losing motion.", note: "Listen for groove continuity and vocal arrangement energy." },
    { id: "lonely-at-the-top", title: "Lonely At The Top", artist: "Asake", focus: "Concept", timestamp: "0:42", listenFor: "How melodic ease carries a reflective concept.", note: "Study simplicity, pocket, and emotional accessibility." },
  ],
  london: [
    { id: "calm-down", title: "Calm Down", artist: "Rema", focus: "Hook", timestamp: "0:47", listenFor: "How a light phrase becomes global pop language.", note: "Study hybrid groove, melodic simplicity, and bounce." },
    { id: "soundgasm", title: "Soundgasm", artist: "Rema", focus: "Groove", timestamp: "0:35", listenFor: "How texture and rhythm make a sensual record travel.", note: "Listen for vocal space and understated movement." },
    { id: "dirty", title: "Dirty", artist: "Rema", focus: "Sonic Identity", timestamp: "0:36", listenFor: "How a producer world supports artist eccentricity.", note: "Study the blend of rhythm, mood, and artist identity." },
  ],
  kaytranada: [
    { id: "10-percent", title: "10%", artist: "Kaytranada feat. Kali Uchis", focus: "Groove", timestamp: "0:33", listenFor: "How the groove becomes the hook.", note: "Study swing, bass movement, and vocal restraint." },
    { id: "lite-spots", title: "Lite Spots", artist: "Kaytranada", focus: "Sonic Identity", timestamp: "0:27", listenFor: "How instrumental rhythm can carry personality.", note: "Listen for bounce as identity rather than decoration." },
    { id: "glowed-up", title: "Glowed Up", artist: "Kaytranada feat. Anderson .Paak", focus: "Structure", timestamp: "0:40", listenFor: "How a groove record can still shift scenes.", note: "Map rhythm, vocal pocket, and arrangement changes." },
  ],
  "rick-rubin": [
    { id: "hurt", title: "Hurt", artist: "Johnny Cash", focus: "Concept", timestamp: "0:32", listenFor: "How reduction makes the emotion unavoidable.", note: "Study restraint, vocal center, and absence as production." },
    { id: "99-problems", title: "99 Problems", artist: "Jay-Z", focus: "Sonic Identity", timestamp: "0:20", listenFor: "How minimal aggression frames a performance.", note: "Listen for the power of stripped-down production decisions." },
    { id: "under-the-bridge", title: "Under the Bridge", artist: "Red Hot Chili Peppers", focus: "Structure", timestamp: "0:58", listenFor: "How vulnerability grows into a band-sized payoff.", note: "Study arrangement expansion and emotional clarity." },
  ],
  "sam-phillips": [
    { id: "thats-all-right", title: "That's All Right", artist: "Elvis Presley", focus: "Groove", timestamp: "0:12", listenFor: "How the backbeat, vocal attitude, and room energy create youth-culture release.", note: "Study simplicity, slapback feel, and body-first hook energy." },
    { id: "mystery-train", title: "Mystery Train", artist: "Elvis Presley", focus: "Performance", timestamp: "0:18", listenFor: "How minimal arrangement makes the vocal and groove feel alive.", note: "Listen for performance capture before polish." },
    { id: "folsom-prison-blues", title: "Folsom Prison Blues", artist: "Johnny Cash", focus: "Identity", timestamp: "0:20", listenFor: "How a simple groove and unmistakable voice create character.", note: "Study economy, persona, and rhythmic inevitability." },
  ],
  "tom-dowd": [
    { id: "layla", title: "Layla", artist: "Derek and the Dominos", focus: "Riff", timestamp: "0:12", listenFor: "How a riff becomes the song's emotional identity.", note: "Study instrumental hook, band urgency, and release." },
    { id: "whipping-post", title: "Whipping Post", artist: "The Allman Brothers Band", focus: "Band Dynamics", timestamp: "0:33", listenFor: "How the band conversation creates tension and scale.", note: "Map rhythm section, vocal pain, and instrumental answer." },
    { id: "sunshine-of-your-love", title: "Sunshine of Your Love", artist: "Cream", focus: "Riff", timestamp: "0:08", listenFor: "How a compact riff gives the whole record a body.", note: "Study riff economy and vocal-riff relationship." },
  ],
  "mutt-lange": [
    { id: "back-in-black", title: "Back In Black", artist: "AC/DC", focus: "Riff", timestamp: "0:05", listenFor: "How the riff, drums, and title attitude lock into one machine.", note: "Study space, precision, and crowd-readable rock architecture." },
    { id: "pour-some-sugar-on-me", title: "Pour Some Sugar On Me", artist: "Def Leppard", focus: "Hook", timestamp: "0:56", listenFor: "How gang vocals and title repetition scale a chorus.", note: "Listen for arena precision and chant engineering." },
    { id: "you-shook-me-all-night-long", title: "You Shook Me All Night Long", artist: "AC/DC", focus: "Chorus", timestamp: "0:48", listenFor: "How simple language and riff discipline create replay.", note: "Study hook economy and band restraint." },
  ],
  "rick-rubin-rock": [
    { id: "fight-for-your-right", title: "(You Gotta) Fight For Your Right", artist: "Beastie Boys", focus: "Stance", timestamp: "0:42", listenFor: "How a slogan, riff, and attitude become culture.", note: "Study reduction, chant utility, and youth rebellion." },
    { id: "give-it-away", title: "Give It Away", artist: "Red Hot Chili Peppers", focus: "Groove", timestamp: "0:30", listenFor: "How reduction lets bass, vocal stance, and hook phrase dominate.", note: "Listen for raw focus and negative space." },
    { id: "chop-suey", title: "Chop Suey!", artist: "System Of A Down", focus: "Structure", timestamp: "0:52", listenFor: "How extreme contrast becomes song architecture.", note: "Study dynamic shock, vocal identity, and section compression." },
  ],
  "butch-vig": [
    { id: "smells-like-teen-spirit", title: "Smells Like Teen Spirit", artist: "Nirvana", focus: "Dynamics", timestamp: "0:53", listenFor: "How quiet-loud release turns alienation into a communal chorus.", note: "Study dirty guitars, readable melody, and explosive structure." },
    { id: "come-as-you-are", title: "Come As You Are", artist: "Nirvana", focus: "Riff", timestamp: "0:08", listenFor: "How a watery riff sets identity before the lyric.", note: "Map riff, vocal restraint, and chorus lift." },
    { id: "stupid-girl", title: "Stupid Girl", artist: "Garbage", focus: "Sonic Identity", timestamp: "0:21", listenFor: "How alt-rock texture and pop structure coexist.", note: "Study looped feel, attitude, and hook readability." },
  ],
  "brendan-obrien": [
    { id: "alive", title: "Alive", artist: "Pearl Jam", focus: "Chorus", timestamp: "1:12", listenFor: "How band size and vocal conviction make the chorus feel communal.", note: "Study final-chorus lift, guitar support, and emotional scale." },
    { id: "interstate-love-song", title: "Interstate Love Song", artist: "Stone Temple Pilots", focus: "Structure", timestamp: "0:44", listenFor: "How melody, guitar movement, and band polish support replay.", note: "Listen for section flow and radio-rock economy." },
    { id: "bulls-on-parade", title: "Bulls On Parade", artist: "Rage Against The Machine", focus: "Riff", timestamp: "0:28", listenFor: "How riff, groove, and vocal attack create political force.", note: "Study band power and hook-as-rhythm." },
  ],
  "jerry-finn": [
    { id: "all-the-small-things", title: "All The Small Things", artist: "blink-182", focus: "Hook", timestamp: "0:42", listenFor: "How a simple chorus becomes huge through melody and tight arrangement.", note: "Study phrase economy, guitar tightness, and crowd-ready repetition." },
    { id: "whats-my-age-again", title: "What's My Age Again?", artist: "blink-182", focus: "Concept", timestamp: "0:34", listenFor: "How immaturity becomes a clean song concept.", note: "Listen for persona, melodic hook, and pop-punk pacing." },
    { id: "feeling-this", title: "Feeling This", artist: "blink-182", focus: "Structure", timestamp: "0:46", listenFor: "How overlapping vocal identities and final chorus energy create payoff.", note: "Study bridge/final chorus build and emotional chaos made organized." },
  ],
  "danger-mouse": [
    { id: "crazy", title: "Crazy", artist: "Gnarls Barkley", focus: "Hook", timestamp: "0:41", listenFor: "How a strange world still has pop clarity.", note: "Study curation, texture, and melodic directness." },
    { id: "tighten-up", title: "Tighten Up", artist: "The Black Keys", focus: "Groove", timestamp: "0:38", listenFor: "How taste makes a sparse record feel complete.", note: "Listen for cohesion, restraint, and attitude." },
    { id: "feel-good-inc", title: "Feel Good Inc.", artist: "Gorillaz", focus: "Sonic Identity", timestamp: "0:31", listenFor: "How a curated world becomes instantly identifiable.", note: "Study groove, contrast, and character sound." },
  ],
  "james-blake": [
    { id: "retrograde", title: "Retrograde", artist: "James Blake", focus: "Concept", timestamp: "0:54", listenFor: "How texture makes vulnerability sharper.", note: "Study the emotional function of space and processing." },
    { id: "limit-to-your-love", title: "Limit To Your Love", artist: "James Blake", focus: "Vocal Space", timestamp: "0:45", listenFor: "How silence and sub pressure create intimacy.", note: "Listen for restraint as emotional drama." },
    { id: "mile-high", title: "Mile High", artist: "James Blake, Travis Scott, Metro Boomin", focus: "Sonic Identity", timestamp: "0:40", listenFor: "How experimental space can still support a record.", note: "Study low-end, vocal atmosphere, and minimal movement." },
  ],
  "john-congleton": [
    { id: "birth-in-reverse", title: "Birth in Reverse", artist: "St. Vincent", focus: "Sonic Identity", timestamp: "0:24", listenFor: "How friction makes the artist more memorable.", note: "Study risky texture with a clear song purpose." },
    { id: "shut-up-kiss-me", title: "Shut Up Kiss Me", artist: "Angel Olsen", focus: "Replay", timestamp: "0:35", listenFor: "How rough edges increase identity.", note: "Listen for performance character over polish." },
    { id: "digital-witness", title: "Digital Witness", artist: "St. Vincent", focus: "Structure", timestamp: "0:42", listenFor: "How unusual arrangement choices still create hook logic.", note: "Study risk, repetition, and personality." },
  ],
  "catherine-marks": [
    { id: "dont-delete-the-kisses", title: "Don't Delete the Kisses", artist: "Wolf Alice", focus: "Structure", timestamp: "1:05", listenFor: "How atmosphere grows into emotional release.", note: "Study performance capture, dynamics, and lyric intimacy." },
    { id: "not-strong-enough", title: "Not Strong Enough", artist: "boygenius", focus: "Hook", timestamp: "0:56", listenFor: "How band dynamics support a confessional chorus.", note: "Listen for vocal blend, performance energy, and dynamic lift." },
    { id: "moaning-lisa-smile", title: "Moaning Lisa Smile", artist: "Wolf Alice", focus: "Sonic Identity", timestamp: "0:38", listenFor: "How guitar energy and vocal character create identity.", note: "Study dynamics and performance urgency." },
  ],
  "shawn-everett": [
    { id: "sound-and-color", title: "Sound & Color", artist: "Alabama Shakes", focus: "Sonic Identity", timestamp: "0:44", listenFor: "How production becomes a world you move through.", note: "Study depth, texture, and scene-based arrangement." },
    { id: "dont-wanna-fight", title: "Don't Wanna Fight", artist: "Alabama Shakes", focus: "Vocal Space", timestamp: "0:33", listenFor: "How sound design frames a powerful vocal.", note: "Listen for depth and movement around the performance." },
    { id: "slow-burn", title: "Slow Burn", artist: "Kacey Musgraves", focus: "Concept", timestamp: "0:49", listenFor: "How production can support a reflective world.", note: "Study space, warmth, and narrative pacing." },
  ],
  "dan-nigro-alt": [
    { id: "brutal", title: "brutal", artist: "Olivia Rodrigo", focus: "Sonic Identity", timestamp: "0:21", listenFor: "How indie edge gets translated into pop clarity.", note: "Study texture, attitude, and hook readability." },
    { id: "deja-vu", title: "deja vu", artist: "Olivia Rodrigo", focus: "Concept", timestamp: "0:50", listenFor: "How specificity makes jealousy singable.", note: "Listen for detail, character, and section contrast." },
    { id: "bad-idea-right", title: "bad idea right?", artist: "Olivia Rodrigo", focus: "Structure", timestamp: "0:41", listenFor: "How spoken attitude becomes pop structure.", note: "Study the translation from messy thought to organized hook." },
  ],
  pharrell: [
    { id: "happy", title: "Happy", artist: "Pharrell Williams", focus: "Replay", timestamp: "0:40", listenFor: "How one feeling becomes culture.", note: "Study emotional clarity, groove, claps, and physical participation." },
    { id: "get-lucky", title: "Get Lucky", artist: "Daft Punk feat. Pharrell Williams", focus: "Groove", timestamp: "0:44", listenFor: "How groove and vocal ease create cross-generational appeal.", note: "Listen for simplicity, style, and rhythmic invitation." },
    { id: "drop-it-like-its-hot", title: "Drop It Like It's Hot", artist: "Snoop Dogg feat. Pharrell Williams", focus: "Sonic Identity", timestamp: "0:20", listenFor: "How minimal sound becomes iconic.", note: "Study negative space, motif, and cultural posture." },
  ],
  timbaland: [
    { id: "promiscuous", title: "Promiscuous", artist: "Nelly Furtado feat. Timbaland", focus: "Sonic Identity", timestamp: "0:39", listenFor: "How rhythm becomes branding.", note: "Study call-and-response, unusual percussion, and playful space." },
    { id: "cry-me-a-river", title: "Cry Me A River", artist: "Justin Timberlake", focus: "Structure", timestamp: "0:48", listenFor: "How sonic innovation supports emotional drama.", note: "Listen for beatbox-like texture, tension, and chorus payoff." },
    { id: "the-way-i-are", title: "The Way I Are", artist: "Timbaland feat. Keri Hilson and D.O.E.", focus: "Hook", timestamp: "0:44", listenFor: "How a strange pocket still lands as pop.", note: "Study minimal parts, rhythmic personality, and hook clarity." },
  ],
  "kanye-west": [
    { id: "stronger", title: "Stronger", artist: "Kanye West", focus: "Sonic Identity", timestamp: "0:53", listenFor: "How a sample becomes a project-level statement.", note: "Study world-building, hook scale, and cultural synthesis." },
    { id: "power", title: "POWER", artist: "Kanye West", focus: "Structure", timestamp: "0:45", listenFor: "How maximalism can still have a thesis.", note: "Listen for arrangement, chant, and event-level identity." },
    { id: "heartless", title: "Heartless", artist: "Kanye West", focus: "Concept", timestamp: "0:38", listenFor: "How one emotional persona carries production choices.", note: "Study melody, vocal processing, and concept clarity." },
  ],
  "dr-dre": [
    { id: "still-dre", title: "Still D.R.E.", artist: "Dr. Dre feat. Snoop Dogg", focus: "Sonic Identity", timestamp: "0:21", listenFor: "How one piano motif creates instant authority.", note: "Study low-end discipline, repetition, artist identity, and mix clarity." },
    { id: "nuthin-but-a-g-thang", title: "Nuthin' but a \"G\" Thang", artist: "Dr. Dre feat. Snoop Dogg", focus: "Groove", timestamp: "0:32", listenFor: "How pocket and tone build a world.", note: "Listen for groove, vocal chemistry, and effortless identity." },
    { id: "in-da-club", title: "In Da Club", artist: "50 Cent", focus: "Hook", timestamp: "0:44", listenFor: "How a sparse beat leaves room for an undeniable hook.", note: "Study artist development, vocal presence, and record-ready minimalism." },
  ],
  "young-chop": [
    { id: "love-sosa", title: "Love Sosa", artist: "Chief Keef", focus: "Chant Hook", timestamp: "0:27", listenFor: "How the title phrase becomes attitude more than explanation.", note: "Study minimal melody, ad-lib space, and repetition as identity.", lyricLens: { anchor: "Title as chant", move: "The lyric keeps returning to a name and social signal instead of explaining a plot.", why: "A chant works when listeners can borrow the posture before they know every detail.", prompt: "Write one title that feels like a crew phrase, then repeat it with ad-libs instead of extra explanation." } },
    { id: "i-dont-like", title: "I Don't Like", artist: "Chief Keef feat. Lil Reese", focus: "Concept", timestamp: "0:17", listenFor: "How one blunt premise organizes the whole record.", note: "Notice how little the song needs once the stance is clear.", lyricLens: { anchor: "I Don't Like", move: "The title sets a negative thesis that can accept endless examples.", why: "The song does not need a complex story because the concept is a filter for every line.", prompt: "Pick one blunt opinion. List five things, people, or behaviors that prove it without softening the stance." } },
    { id: "3hunna", title: "3Hunna", artist: "Chief Keef feat. Rick Ross", focus: "Pressure", timestamp: "0:21", listenFor: "How the beat creates threat while leaving vocal space.", note: "Track the way drums, repetition, and tone build the record's world.", lyricLens: { anchor: "Identity code", move: "The lyric uses coded affiliation and repeated identity markers as the hook language.", why: "Drill often becomes memorable through belonging, refusal, and repeated signals of place.", prompt: "Create a fictional crew code for your song world. Let the verse reveal what that code means through action." } },
  ],
  "808-melo": [
    { id: "dior", title: "Dior", artist: "Pop Smoke", focus: "Bounce", timestamp: "0:20", listenFor: "How the sliding bass and vocal commands create motion.", note: "Study the hook economy and the way the vocal sits on top of the bounce.", lyricLens: { anchor: "Luxury object", move: "A designer word becomes a rhythmic object, not just a flex.", why: "The hook is memorable because the consonants, bounce, and image all hit together.", prompt: "Choose one object that signals status. Make it rhythmically satisfying before adding any surrounding lyric." } },
    { id: "welcome-to-the-party", title: "Welcome To The Party", artist: "Pop Smoke", focus: "Identity", timestamp: "0:16", listenFor: "How the voice, tag, and groove create instant world-building.", note: "Map the space around the vocal and the drum-bass relationship.", lyricLens: { anchor: "Welcome as threat", move: "A familiar invitation phrase is flipped into intimidation and arrival.", why: "The lyric works because the phrase is simple, but the delivery changes its meaning.", prompt: "Take a friendly phrase and perform it like a warning. Write the verse from that contradiction." } },
    { id: "gatti", title: "GATTI", artist: "JACKBOYS, Pop Smoke, Travis Scott", focus: "Pocket", timestamp: "0:35", listenFor: "How drill bounce adapts around star vocal identities.", note: "Listen for bass movement, sparse arrangement, and command-like hooks.", lyricLens: { anchor: "Command language", move: "Short commands and status images let different artists share the same pocket.", why: "The lyric can travel across voices because it is built from rhythm-first fragments.", prompt: "Write four two-beat commands. Let each one answer the bass movement, not the chord progression." } },
  ],
  "axl-beats": [
    { id: "big-drip", title: "Big Drip", artist: "Fivio Foreign", focus: "NY Drill Translation", timestamp: "0:25", listenFor: "How the melodic loop and drums create a stage for ad-libs.", note: "Study how the beat supports personality without overcrowding it.", lyricLens: { anchor: "Big Drip", move: "The title is a compact lifestyle claim that can be shouted, paused, or answered by ad-libs.", why: "A drill hook can be less about sentence craft and more about usable vocal punctuation.", prompt: "Write one two-word identity claim. Test it shouted, whispered, and as an ad-lib response." } },
    { id: "war", title: "War", artist: "Drake", focus: "Cross-Genre Pocket", timestamp: "0:30", listenFor: "How drill architecture bends around a non-drill artist.", note: "Notice the balance between regional bounce and artist-specific delivery.", lyricLens: { anchor: "Regional voice", move: "The lyric leans on local phrasing and cadence choices to make the pocket feel inhabited.", why: "Genre translation works when the words and accent sit naturally inside the bounce.", prompt: "Write four bars in your own speaking rhythm first, then place them against the drill pattern." } },
    { id: "mannequin", title: "Mannequin", artist: "Pop Smoke feat. Lil Tjay", focus: "Melodic Drill Space", timestamp: "0:34", listenFor: "How melodic phrases can sit inside drill energy.", note: "Track how the hook softens the record without weakening the bounce.", lyricLens: { anchor: "Melodic contrast", move: "The melodic writing gives the record a softer surface while the drums keep pressure underneath.", why: "Contrast lets a drill record become more replayable without losing edge.", prompt: "Write one melodic line that sounds vulnerable, then answer it with one colder spoken line." } },
  ],
  "dave-cobb": [
    { id: "tennessee-whiskey", title: "Tennessee Whiskey", artist: "Chris Stapleton", focus: "Performance", timestamp: "0:40", listenFor: "How the vocal carries the entire emotional contract.", note: "Study restraint, band feel, and how little the production needs to prove.", lyricLens: { anchor: "Tennessee Whiskey", move: "The lyric uses one familiar image as a container for devotion.", why: "Country writing often lands when the metaphor is concrete enough to taste and simple enough to remember.", prompt: "Pick one object with sensory weight. Use it to describe a person without explaining the emotion directly." } },
    { id: "starting-over", title: "Starting Over", artist: "Chris Stapleton", focus: "Story", timestamp: "0:45", listenFor: "How a simple chorus feels adult, hopeful, and lived-in.", note: "Track the room feel and the way arrangement supports lyric sincerity.", lyricLens: { anchor: "Starting Over", move: "The title frames renewal as a plainspoken decision rather than a dramatic speech.", why: "The emotional power comes from maturity, not cleverness; the lyric trusts the situation.", prompt: "Write a chorus where the title is a decision. Keep the language conversational and avoid poetic decoration." } },
    { id: "cover-me-up", title: "Cover Me Up", artist: "Jason Isbell", focus: "Lyric Truth", timestamp: "1:03", listenFor: "How direct writing and performance create replay value.", note: "Listen for emotional specificity before production size.", lyricLens: { anchor: "Cover Me Up", move: "Domestic, intimate language turns love into shelter rather than slogan.", why: "Specific private imagery can make a quiet song feel bigger than a huge chorus.", prompt: "Write a love line using a room, weather, or object. Make it feel overheard, not announced." } },
  ],
  "dann-huff": [
    { id: "blue-aint-your-color", title: "Blue Ain't Your Color", artist: "Keith Urban", focus: "Chorus Lift", timestamp: "0:48", listenFor: "How the hook turns a simple image into a wide chorus.", note: "Study guitar tone, vocal lift, and the emotional pacing into the chorus.", lyricLens: { anchor: "Blue Ain't Your Color", move: "The hook turns color into emotional diagnosis and romantic permission.", why: "The title works because it is visual, conversational, and flattering at the same time.", prompt: "Choose one color, outfit, or object. Use it to tell someone what emotion does not belong on them." } },
    { id: "bless-the-broken-road", title: "Bless The Broken Road", artist: "Rascal Flatts", focus: "Melodic Payoff", timestamp: "0:52", listenFor: "How the melody makes the lyric feel inevitable.", note: "Map the way structure, harmony, and vocal blend lift the title.", lyricLens: { anchor: "Broken road", move: "The lyric converts past pain into a map that leads to the present relationship.", why: "Country payoff is strong when the chorus reframes earlier struggle as meaning.", prompt: "Write a chorus that turns three past mistakes into the reason the narrator arrived here." } },
    { id: "what-hurts-the-most", title: "What Hurts The Most", artist: "Rascal Flatts", focus: "Emotional Scale", timestamp: "0:53", listenFor: "How a clean concept becomes arena-sized without losing pain.", note: "Study the restraint before the chorus and the vocal intensity after it.", lyricLens: { anchor: "What Hurts The Most", move: "The title asks a direct emotional question, then the chorus narrows the answer.", why: "Big ballads often work when the chorus names the wound with no clever detour.", prompt: "Ask one plain emotional question. Answer it with the smallest missed moment, not the biggest tragedy." } },
  ],
  "joey-moi": [
    { id: "cruise", title: "Cruise", artist: "Florida Georgia Line", focus: "Lifestyle Hook", timestamp: "0:35", listenFor: "How the chorus turns a scene into a repeatable identity.", note: "Study simplicity, tempo utility, and the easy social function of the hook.", lyricLens: { anchor: "Cruise", move: "The lyric builds a driving scene that listeners can enter without backstory.", why: "Lifestyle country replays when the chorus feels like something people already want to do.", prompt: "Write a chorus around one verb. Add vehicle, place, person, and weather in plain language." } },
    { id: "whiskey-glasses", title: "Whiskey Glasses", artist: "Morgan Wallen", focus: "Plainspoken Concept", timestamp: "0:43", listenFor: "How the title phrase makes heartbreak useful and memorable.", note: "Notice the conversational lyric, sturdy chorus, and playlist-friendly momentum.", lyricLens: { anchor: "Whiskey Glasses", move: "The title turns heartbreak avoidance into a physical object and a pun-like image.", why: "The concept is sticky because it is sad, social, and easy to visualize.", prompt: "Turn an emotional coping habit into an object. Make the title work as both image and behavior." } },
    { id: "last-night", title: "Last Night", artist: "Morgan Wallen", focus: "Streaming Hook", timestamp: "0:34", listenFor: "How a simple conflict resets quickly for replay.", note: "Track the tight intro, fast emotional setup, and title-centered chorus.", lyricLens: { anchor: "Last Night", move: "The lyric starts from a recent argument so the emotional stakes are immediate.", why: "Streaming hooks benefit from fast context: who fought, what changed, and why it might repeat.", prompt: "Open with a scene from the last 24 hours. Make the chorus reveal what the narrator cannot stop replaying." } },
  ],
  "kirk-franklin": [
    { id: "stomp", title: "Stomp", artist: "God's Property feat. Kirk Franklin", focus: "Choir Energy", timestamp: "0:45", listenFor: "How gospel testimony, chant energy, and contemporary rhythm create a communal hook.", note: "Study the call, the choir response, and how the groove makes participation feel immediate.", lyricLens: { anchor: "Stomp", move: "A short physical command turns praise into movement.", why: "Contemporary gospel often travels when the listener can answer the record with body and voice.", prompt: "Write one praise command and one choir answer that can work without explanation." } },
    { id: "revolution", title: "Revolution", artist: "Kirk Franklin", focus: "Crossover Testimony", timestamp: "0:36", listenFor: "How urgent rhythm supports a gospel message without hiding it.", note: "Listen for chant design, crowd energy, and modern production serving testimony." },
    { id: "love-theory", title: "Love Theory", artist: "Kirk Franklin", focus: "Modern Praise Hook", timestamp: "0:42", listenFor: "How a clear faith message becomes bright, rhythmic, and instantly repeatable.", note: "Study the bounce, choir lift, and phrase economy." },
  ],
  "donald-lawrence": [
    { id: "encourage-yourself", title: "Encourage Yourself", artist: "Donald Lawrence & The Tri-City Singers", focus: "Testimony Structure", timestamp: "0:58", listenFor: "How a personal instruction becomes a communal gospel statement.", note: "Map the lead line, choir support, and gradual lift.", lyricLens: { anchor: "Encourage Yourself", move: "The title gives the listener a spiritual action, not just a feeling.", why: "Gospel hooks become powerful when they are usable in real life.", prompt: "Write a title that tells the listener what to do when faith is under pressure." } },
    { id: "the-blessing-of-abraham", title: "The Blessing of Abraham", artist: "Donald Lawrence & The Tri-City Singers", focus: "Choir Payoff", timestamp: "0:52", listenFor: "How arrangement makes doctrine feel musical and repeatable.", note: "Study harmonic lift, choir certainty, and vamp movement." },
    { id: "back-ii-eden", title: "Back II Eden", artist: "Donald Lawrence & Co.", focus: "Arrangement Drama", timestamp: "0:48", listenFor: "How choir and lead phrasing create gospel theater.", note: "Listen for section contrast and communal arrival." },
  ],
  "warryn-campbell": [
    { id: "shackles", title: "Shackles (Praise You)", artist: "Mary Mary", focus: "Gospel-R&B Translation", timestamp: "0:35", listenFor: "How a faith-centered hook sits inside a radio-ready groove.", note: "Study the drum pocket, direct title language, and vocal-stack lift.", lyricLens: { anchor: "Shackles", move: "The lyric turns freedom into a concrete image that can be sung and danced.", why: "A crossover gospel hook works when the message stays clear while the groove modernizes the frame.", prompt: "Choose one image for spiritual release and make it simple enough for a pop chorus." } },
    { id: "god-in-me", title: "God in Me", artist: "Mary Mary feat. Kierra Sheard", focus: "Identity Hook", timestamp: "0:32", listenFor: "How gospel identity language meets contemporary club/R&B pressure.", note: "Track the confidence, vocal arrangement, and low-end restraint." },
    { id: "go-get-it", title: "Go Get It", artist: "Mary Mary", focus: "Motivational Gospel", timestamp: "0:40", listenFor: "How a faith message becomes a forward-moving command.", note: "Study momentum, hook directness, and modern vocal production." },
  ],
  "fred-hammond": [
    { id: "no-weapon", title: "No Weapon", artist: "Fred Hammond", focus: "Worship Hook", timestamp: "0:51", listenFor: "How repetition, band pocket, and conviction make a simple faith statement endure.", note: "Study how the phrase stays powerful because the performance keeps deepening.", lyricLens: { anchor: "No Weapon", move: "The title compresses spiritual confidence into one durable declaration.", why: "Gospel repetition works when belief gets stronger each time, not merely louder.", prompt: "Write one faith declaration that can repeat four times while the harmony and delivery intensify." } },
    { id: "you-are-the-living-word", title: "You Are the Living Word", artist: "Fred Hammond", focus: "Praise Ballad", timestamp: "0:47", listenFor: "How worship language becomes melodic and communal.", note: "Listen for patient lift, vocal authority, and ensemble support." },
    { id: "let-the-praise-begin", title: "Let The Praise Begin", artist: "Fred Hammond", focus: "Praise Groove", timestamp: "0:31", listenFor: "How bass, band energy, and simple praise language invite participation.", note: "Study live functionality and groove-first arrangement." },
  ],
};

const curatedStreamUrls = {
  "blinding-lights": "https://www.youtube.com/watch?v=4NRXx6U8ABQ",
  "cant-feel-my-face": "https://www.youtube.com/watch?v=KEI4qSrkPAs",
  "since-u-been-gone": "https://www.youtube.com/watch?v=R7UrFYvl5TE",
  "love-yourself": "https://www.youtube.com/watch?v=oyEuk8j8imI",
  eastside: "https://www.youtube.com/watch?v=56WBK4ZK_cw",
  diamonds: "https://www.youtube.com/watch?v=lWA2pjMjpBs",
  "anti-hero": "https://www.youtube.com/watch?v=b1kbLwvqugk",
  "green-light": "https://www.youtube.com/watch?v=dMK_npDG12Q",
  "we-are-young": "https://www.youtube.com/watch?v=Sv6dMFF_yts",
  "drivers-license": "https://www.youtube.com/watch?v=ZmDBbnmKpqQ",
  "good-4-u": "https://www.youtube.com/watch?v=gNi_6U5Pm_o",
  vampire: "https://www.youtube.com/watch?v=RlPNh_PBZb4",
  "bad-and-boujee": "https://www.youtube.com/watch?v=S-sJp1FfG7Q",
  "like-that": "https://www.youtube.com/watch?v=N9bKBAA22Go",
  "mask-off": "https://www.youtube.com/watch?v=xvZqHgFz51I",
  "money-trees": "https://www.youtube.com/watch?v=0nF69UTw99E",
  "worst-behavior": "https://www.youtube.com/watch?v=CccnAvfLPvE",
  "marvins-room": "https://www.youtube.com/watch?v=JDb3ZZD4bA0",
  "hold-on-were-going-home": "https://www.youtube.com/watch?v=GxgqpCdOKak",
  umbrella: "https://www.youtube.com/watch?v=CvBfHwUxHIk",
  "single-ladies": "https://www.youtube.com/watch?v=4m1EFMoRFvY",
  bed: "https://www.youtube.com/watch?v=82t_UOMHPJY",
  "leave-the-door-open": "https://www.youtube.com/watch?v=adLGHcj_fmA",
  "smokin-out-the-window": "https://www.youtube.com/watch?v=GG7fLOmlhYg",
  dangerous: "https://www.youtube.com/watch?v=stcIiJbwpio",
  "be-without-you": "https://www.youtube.com/watch?v=8XNaPX6MKlU",
  burn: "https://www.youtube.com/watch?v=t5XNWFw5HVw",
  "confessions-part-ii": "https://www.youtube.com/watch?v=5Sy19X0xxrM",
  "we-belong-together": "https://www.youtube.com/watch?v=0habxsuXW4g",
  "nice-and-slow": "https://www.youtube.com/watch?v=DIpQ4AZSAf8",
  essence: "https://www.youtube.com/watch?v=jipQpjUA_o8",
  monalisa: "https://www.youtube.com/watch?v=to8nQNGarRw",
  "10-percent": "https://www.youtube.com/watch?v=02KzxLGcNJg",
  "calm-down": "https://www.youtube.com/watch?v=CQLsdm1ZYAw",
  hurt: "https://www.youtube.com/watch?v=8AHCfZTRGiI",
  crazy: "https://www.youtube.com/watch?v=-N4jf6rtyuw",
  "feel-good-inc": "https://www.youtube.com/watch?v=HyHNuVaZJ-k",
  retrograde: "https://www.youtube.com/watch?v=6p6PcFFUm5I",
  "limit-to-your-love": "https://www.youtube.com/watch?v=oOT2-OTebx0",
  "not-strong-enough": "https://www.youtube.com/watch?v=bIX_ouNJsTs",
  "slow-burn": "https://www.youtube.com/watch?v=NC7cmWkBoz4",
  brutal: "https://www.youtube.com/watch?v=OGUy2UmRxJ0",
  "deja-vu": "https://www.youtube.com/watch?v=cii6ruuycQA",
  "bad-idea-right": "https://www.youtube.com/watch?v=Dj9qJsJTsjQ",
  happy: "https://www.youtube.com/watch?v=ZbZSe6N_BXs",
  "get-lucky": "https://www.youtube.com/watch?v=5NV6Rdv1a3I",
  "drop-it-like-its-hot": "https://www.youtube.com/watch?v=GtUVQei3nX4",
  promiscuous: "https://www.youtube.com/watch?v=0J3vgcE5i2o",
  "cry-me-a-river": "https://www.youtube.com/watch?v=DksSPZTZES0",
  "the-way-i-are": "https://www.youtube.com/watch?v=U5rLz5AZBIA",
  stronger: "https://www.youtube.com/watch?v=PsO6ZnUZI0g",
  power: "https://www.youtube.com/watch?v=L53gjP-TtGE",
  heartless: "https://www.youtube.com/watch?v=Co0tTeuUVhU",
  "still-dre": "https://www.youtube.com/watch?v=_CL6n0FJZpk",
  "nuthin-but-a-g-thang": "https://www.youtube.com/watch?v=8GliyDgAGQI",
  "in-da-club": "https://www.youtube.com/watch?v=5qm8PH4xAss",
  "i-dont-like": "https://www.youtube.com/watch?v=2WcRXJ4piHg",
  dior: "https://www.youtube.com/watch?v=oorVWW9ywG0",
  "welcome-to-the-party": "https://www.youtube.com/watch?v=usu0XY4QNB0",
  "tennessee-whiskey": "https://www.youtube.com/watch?v=4zAThXFOy2c",
  "blue-aint-your-color": "https://www.youtube.com/watch?v=SoIKv3xxuMA",
  cruise: "https://www.youtube.com/watch?v=8PvebsWcpto",
  "whiskey-glasses": "https://www.youtube.com/watch?v=FjBp30kjzTc",
  "last-night": "https://www.youtube.com/watch?v=bUjPPBxbQrQ",
};

const workshopModules = [
  {
    id: "reality",
    number: "0",
    title: "Beatmaker Trap",
    competency: "Separate instrumental, production, song, and record.",
    trap: "A producer keeps improving the loop because the beat is impressive, while the artist still has nothing clear to perform.",
    songwriterMove: "Start with the emotional promise. Production should make the concept easier to feel, not harder to find.",
    weak: "This beat is crazy. The chords are lush, the drums knock, and the texture feels expensive.",
    strong: "This is a song about checking someone's page at 2 AM while pretending you have moved on.",
    why: "The strong version gives the artist a role, a behavior, and a conflict. The beat now has a job.",
    question: "Which note would make an artist more likely to start writing?",
    choices: [
      "Add more ear candy before the chorus so the track feels expensive.",
      "Mute two elements and write the sentence the singer is emotionally trapped inside.",
    ],
    correct: 1,
    rationale: "Artists do not only pick sounds. They pick a world they can perform inside.",
    drill: "Write the sentence before changing the beat again.",
  },
  {
    id: "concept",
    number: "3",
    title: "Concept Development",
    competency: "Turn a vague emotion into a memorable premise.",
    trap: "The idea names a feeling but does not give the listener a situation to remember.",
    songwriterMove: "Use person, setting, behavior, and contradiction. A strong concept is singable before it is poetic.",
    weak: "I miss you.",
    strong: "I only call when I know you will not answer.",
    why: "The strong version is still simple, but it has behavior and irony. It lets the verse write itself.",
    question: "Which concept is more likely to create replay value?",
    choices: [
      "I am sad because the relationship ended.",
      "I saved your parking spot even after you gave your key back.",
    ],
    correct: 1,
    rationale: "Concrete behavior beats emotional labeling. The listener can see the second one.",
    drill: "Make the concept one sentence with a contradiction or visible behavior.",
  },
  {
    id: "hook",
    number: "6",
    title: "Hook Design",
    competency: "Create a hook producers actually believe in.",
    trap: "The hook is technically melodic, but no phrase survives after the section ends.",
    songwriterMove: "Choose one title phrase, place it where the body expects resolution, and repeat it with slight rhythmic variation.",
    weak: "I have been feeling some type of way and I do not know what to do.",
    strong: "I still check in late.",
    why: "The strong hook is short enough to repeat, specific enough to own, and rhythmic enough to sit in a pocket.",
    question: "Which hook move is stronger for a producer-first writer?",
    choices: [
      "Write one clean title phrase and test it in three rhythmic positions.",
      "Write eight clever lines and hope one becomes the hook.",
    ],
    correct: 0,
    rationale: "Hooks are memory architecture. Cleverness helps only after the listener knows what to remember.",
    drill: "Generate melodic, rhythmic, sonic, and lyrical versions of the same title.",
  },
  {
    id: "lyrics",
    number: "7",
    title: "Lyrics for Non-Lyricists",
    competency: "Replace vague emotion with concrete language.",
    trap: "The lyric describes the mood the production already implies.",
    songwriterMove: "Let the beat carry mood; use lyrics for image, behavior, setting, and perspective.",
    weak: "I am lonely and I cannot sleep.",
    strong: "The TV asks if I am still watching; I say yes to nobody.",
    why: "The strong line gives loneliness a room, an object, and a tiny performance.",
    question: "Which line adds information the beat cannot already give?",
    choices: [
      "I feel so empty without you here.",
      "Your side of the bed still has the charger plugged in.",
    ],
    correct: 1,
    rationale: "Specific objects make emotion portable. Listeners borrow the detail for their own memory.",
    drill: "Turn one abstract line into one image, one action, and one conversational phrase.",
  },
  {
    id: "topline",
    number: "8",
    title: "Topline and Flow",
    competency: "Find melodies and flows through contour, pocket, and tension.",
    trap: "The melody follows the chords politely, so every section feels like the same loop with different words.",
    songwriterMove: "Use contour and rhythm to give each section a job: verse talks, pre lifts, hook resolves.",
    weak: "Verse and chorus both sit in the same three-note range with the same rhythm.",
    strong: "Verse stays conversational, pre-chorus climbs, hook lands on a longer title note.",
    why: "The listener hears the emotional arc even before they understand every lyric.",
    question: "Which topline pass should happen first?",
    choices: [
      "Attach final lyrics immediately so the demo feels complete.",
      "Mumble for contour, then find phonetics, then attach lyrics to the strongest hook shape.",
    ],
    correct: 1,
    rationale: "Producer-first writers often discover the hook in sound before language. That is useful if you refine it intentionally.",
    drill: "Do a mumble pass, a phonetic pass, then a lyric attachment pass.",
  },
  {
    id: "structure",
    number: "9",
    title: "Structure and Payoff",
    competency: "Escape the 8-bar loop trap.",
    trap: "The loop repeats, but the listener never receives a new reason to stay.",
    songwriterMove: "Give every section a different promise: setup, tension, payoff, release, final reward.",
    weak: "Intro, verse, hook, verse, hook with the same drums and chords throughout.",
    strong: "Verse strips down, pre raises the question, hook opens space around the title, second hook adds harmony.",
    why: "Replay value often comes from knowing the reward is coming and still wanting to feel it again.",
    question: "Which structure repair best serves replay?",
    choices: [
      "Add more sections because longer feels more complete.",
      "Make the second hook answer or intensify the first hook.",
    ],
    correct: 1,
    rationale: "A song evolves when repeated sections return with new emotional information.",
    drill: "Map where the listener gets setup, tension, payoff, and a final reason to replay.",
  },
  {
    id: "production",
    number: "15",
    title: "Produce for the Song",
    competency: "Make production decisions that support the hook.",
    trap: "The producer fills every gap, so the vocal has to fight the track for attention.",
    songwriterMove: "Define core elements, supporting elements, ear candy, and transition moments before adding more.",
    weak: "Layer the chorus with every best sound so it feels bigger.",
    strong: "Remove the prettiest countermelody under the title, then bring it back as an answer.",
    why: "Restraint creates focus. Ear candy is strongest when it points at the hook instead of replacing it.",
    question: "What should happen if listeners remember only the beat?",
    choices: [
      "The production is winning against the song; repair concept, hook, or vocal space.",
      "The mix needs more loudness so the song competes better.",
    ],
    correct: 0,
    rationale: "If the beat is the only memory, the record may be impressive but the song is not yet doing its job.",
    drill: "Mute anything that speaks over the title phrase, then create one answer after the vocal.",
  },
];

const workshopGenrePaths = {
  "Pop": [
    {
      id: "pop-one-memory",
      title: "One Memory Target",
      competency: "Aim concept, title, melody, and rhythm at one thing the listener remembers.",
      trap: "The song has several clever parts but no single memory point.",
      songwriterMove: "Choose the phrase before decorating the production.",
      weak: "The chorus has three possible titles.",
      strong: "Every section points at one phrase: I can't come back different.",
      why: "Pop is not shallow because it is clear. It is hard because every choice has to sharpen the same memory.",
      question: "Which move creates stronger pop replay?",
      choices: ["Add another clever line to the chorus.", "Make one title phrase impossible to miss."],
      correct: 1,
      rationale: "A listener can only leave first contact with a small amount of information. Make that information intentional.",
      drill: "Write five titles. Pick one and make every section aim at it.",
    },
    {
      id: "pop-pre-lift",
      title: "Pre-Chorus Lift",
      competency: "Use the pre-chorus to make the chorus feel inevitable.",
      trap: "The chorus arrives, but the song did not create hunger for it.",
      songwriterMove: "Raise rhythm, pitch, sentence pressure, or emotional stakes before the title lands.",
      weak: "Repeat the verse energy until the chorus starts.",
      strong: "Let the last pre-chorus line feel unfinished until the title answers it.",
      why: "A great pop chorus often feels big because the pre-chorus made the listener need release.",
      question: "What does a strong pre-chorus do?",
      choices: ["Explain every detail before the hook.", "Create pressure the title can release."],
      correct: 1,
      rationale: "The pre-chorus is a ramp, not a second verse.",
      drill: "Write a four-line pre where line four cannot fully resolve until the chorus title.",
    },
  ],
  "Dance-Pop": [
    {
      id: "dancepop-body-first",
      title: "Body First",
      competency: "Make the groove and title work while the listener is moving.",
      trap: "The lyric is thoughtful, but it fights the pulse.",
      songwriterMove: "Shorten phrases until they sit inside the groove without breaking movement.",
      weak: "Explain the whole backstory over the build.",
      strong: "Say the emotional command in five words or fewer.",
      why: "Dance-pop has to carry emotion without stopping the body.",
      question: "Which choice serves the dance-pop job?",
      choices: ["Add more verse detail before the drop.", "Make the title physical and rhythm-friendly."],
      correct: 1,
      rationale: "If the title cannot survive motion, the record loses its strongest environment.",
      drill: "Write a title that can be sung while walking, dancing, or clapping.",
    },
    {
      id: "dancepop-release",
      title: "Release Point",
      competency: "Design the chorus or drop as emotional and physical release.",
      trap: "The drop hits sonically but does not answer the song.",
      songwriterMove: "Make the release phrase answer the verse problem.",
      weak: "Build into a louder beat with no lyric payoff.",
      strong: "Let the drop repeat the exact sentence the verse was avoiding.",
      why: "The best dance-pop records make the production release and the songwriting release happen together.",
      question: "What makes a drop feel written?",
      choices: ["A louder synth only.", "A production release tied to the title's emotional answer."],
      correct: 1,
      rationale: "Sound impact matters, but the song impact makes the moment replayable.",
      drill: "Write one build line that makes the drop/title feel like the only possible answer.",
    },
  ],
  "Singer-Songwriter Pop": [
    {
      id: "writerpop-proof-detail",
      title: "Proof Detail",
      competency: "Use one concrete detail to make a private feeling believable.",
      trap: "The lyric names the emotion but does not prove it.",
      songwriterMove: "Trade abstract feeling for object, behavior, place, or time.",
      weak: "I feel broken and confused tonight.",
      strong: "Your sweater is still folded on the chair I never use.",
      why: "Personal-detail pop travels when the detail is specific enough to feel real and simple enough to understand.",
      question: "Which line gives the singer more truth?",
      choices: ["Name the feeling directly.", "Show the object or behavior that proves it."],
      correct: 1,
      rationale: "The listener believes the emotion faster when they can see it.",
      drill: "Write three objects in the room. Make one object carry the chorus idea.",
    },
    {
      id: "writerpop-bridge-confession",
      title: "Bridge Confession",
      competency: "Use the bridge to say what the first chorus could not say yet.",
      trap: "The bridge repeats the same emotional information.",
      songwriterMove: "Reveal the hidden fear, reversal, or decision before the final chorus.",
      weak: "Repeat the chorus idea with new chords.",
      strong: "Admit the sentence that changes what the title means.",
      why: "In singer-songwriter pop, the bridge is often where the song becomes authored.",
      question: "What should the bridge add?",
      choices: ["More of the same feeling.", "A confession that changes the final chorus."],
      correct: 1,
      rationale: "The final chorus should return with new weight.",
      drill: "Write: 'The truth is...' and finish it with the line the song has avoided.",
    },
  ],
  "Alt-Pop": [
    {
      id: "altpop-weird-clear",
      title: "Weird But Clear",
      competency: "Use strange images without losing the emotional thesis.",
      trap: "The song feels aesthetic but nobody knows what it is about.",
      songwriterMove: "Attach every strange image to a plain human pressure.",
      weak: "Neon ghosts in a velvet machine.",
      strong: "Your neon sign still buzzes when I try to sleep.",
      why: "Alt-pop can be vivid and unusual, but the listener still needs a human doorway.",
      question: "Which choice makes the odd image useful?",
      choices: ["Make the lyric more abstract.", "Tie the image to a clear feeling or action."],
      correct: 1,
      rationale: "Distinct language works best when it clarifies perspective.",
      drill: "Write one weird image, then add the plain sentence underneath it.",
    },
  ],
  "Soul": [
    {
      id: "soul-lived-truth",
      title: "Lived Truth",
      competency: "Write a plain emotional sentence the singer can perform with conviction.",
      trap: "The track sounds soulful, but the lyric does not feel lived.",
      songwriterMove: "Make the central line simple enough to mean harder on every repeat.",
      weak: "I'm experiencing a complicated emotional transition.",
      strong: "I stayed because my heart got there first.",
      why: "Soul does not need ornamental language to be deep. It needs a truth the voice can carry.",
      question: "Which line gives the performer more power?",
      choices: ["Use more poetic abstraction.", "Give the singer a plain sentence with emotional weight."],
      correct: 1,
      rationale: "The performance can deepen a plain line. It cannot rescue a line with no lived center.",
      drill: "Write one sentence a singer could repeat three times with more meaning each time.",
    },
    {
      id: "soul-call-response",
      title: "Response Architecture",
      competency: "Let background vocals, band answers, or ad-libs respond to the lead's truth.",
      trap: "Everything supports the lead but nothing talks back.",
      songwriterMove: "Write one answer phrase for the band, background singers, or harmony stack.",
      weak: "Layer every word to make it bigger.",
      strong: "Lead states the truth; backgrounds answer with the wound.",
      why: "Soul often feels communal because the arrangement behaves like a conversation.",
      question: "What makes a soul arrangement feel alive?",
      choices: ["Stack every lead line.", "Let the track answer the lead vocal."],
      correct: 1,
      rationale: "Call-and-response turns a private feeling into a room.",
      drill: "Write one lead line and one answer line. Make the answer shorter and more emotional.",
    },
    {
      id: "soul-vamp-meaning",
      title: "Vamp With Meaning",
      competency: "Use repetition to intensify conviction, not just extend the ending.",
      trap: "The vamp repeats because the groove feels good.",
      songwriterMove: "Change delivery, harmony, answer, or lyric pressure on each repeat.",
      weak: "Repeat the title until fade.",
      strong: "Repeat the title as plea, decision, release, then testimony.",
      why: "Soul repetition becomes powerful when the same phrase means more each time.",
      question: "Which vamp earns its length?",
      choices: ["Repeat without changing emotion.", "Let the same phrase climb through new emotional states."],
      correct: 1,
      rationale: "The listener should feel the singer arriving somewhere through repetition.",
      drill: "Mark four vamp passes: whisper, answer, cry, release.",
    },
  ],
  "R&B": [
    {
      id: "rnb-private-sentence",
      title: "Private Sentence",
      competency: "Write an intimate emotional job the singer can perform close to the mic.",
      trap: "The track has mood, but the singer has no specific private thing to say.",
      songwriterMove: "Start with confession, desire, regret, or vulnerability before adding vocal decoration.",
      weak: "This feels smooth and emotional.",
      strong: "I only act calm because I know you can hear me breaking.",
      why: "R&B lands when the vocal has a private pressure point. The listener should feel invited into the room.",
      question: "Which move gives the singer more emotional truth?",
      choices: ["Add a prettier pad under the verse.", "Write the sentence the singer is trying not to admit."],
      correct: 1,
      rationale: "The production can deepen intimacy, but the song needs the private sentence first.",
      drill: "Write one line that sounds like it was said too close to the mic.",
    },
    {
      id: "rnb-vocal-pocket",
      title: "Vocal Pocket",
      competency: "Shape melody, breath, and rhythm so the vocal sits inside the groove.",
      trap: "The lyrics are good on paper, but every line crowds the pocket.",
      songwriterMove: "Cut words until the singer can lean, pause, drag, and answer the drums.",
      weak: "I need to explain every detail before the hook arrives.",
      strong: "Say less, leave breath, let the last word hang.",
      why: "R&B often communicates through timing and tone as much as literal language.",
      question: "What should happen before writing more lines?",
      choices: ["Fill the empty beats with more story.", "Sing the line and remove any word the pocket rejects."],
      correct: 1,
      rationale: "If the pocket does not feel believable, the lyric will not feel intimate.",
      drill: "Record one hook pass using only vowels, breaths, and the title phrase.",
    },
    {
      id: "rnb-stacks-adlibs",
      title: "Stacks and Subtext",
      competency: "Use doubles, harmonies, and ad-libs to reveal what the lead is not saying.",
      trap: "Stacks make the hook bigger but blur the title phrase.",
      songwriterMove: "Keep the title clean, then let background vocals answer it.",
      weak: "Stack every word in the chorus so it feels expensive.",
      strong: "Leave the title solo, then answer it with one wounded harmony.",
      why: "Vocal layers work best when they clarify emotion instead of competing with the lead.",
      question: "Which stack move protects the song?",
      choices: ["Triple every hook word.", "Let the lead own the title and use stacks as emotional response."],
      correct: 1,
      rationale: "The title should remain the memory point; layers should create ache around it.",
      drill: "Mark three words only: one double, one harmony, one ad-lib answer.",
    },
  ],
  "Neo-Soul": [
    {
      id: "neo-plain-sentence",
      title: "Plain Sentence, Rich Chord",
      competency: "Place a clear human sentence over sophisticated harmony.",
      trap: "The chords are beautiful enough that the hook becomes abstract.",
      songwriterMove: "Let the harmony be rich and the top line be plain.",
      weak: "I am orbiting spiritual complexity inside emotional weather.",
      strong: "I keep forgiving you before you ask.",
      why: "Neo-soul can be musically deep, but listeners still need a sentence they can carry.",
      question: "Which choice keeps the song grounded?",
      choices: ["Make the lyric as complex as the chord.", "Put the plainest truth on the richest change."],
      correct: 1,
      rationale: "Sophistication hits harder when the top line stays emotionally readable.",
      drill: "Write one plain sentence over your prettiest chord.",
    },
    {
      id: "neo-groove-meaning",
      title: "Groove as Meaning",
      competency: "Make bass, drums, and vocal phrasing carry emotional perspective.",
      trap: "The groove feels good but does not change the song's meaning.",
      songwriterMove: "Use pocket shifts, bass answers, and vamps to deepen the point of view.",
      weak: "Loop the best groove until the song ends.",
      strong: "Let the bass answer the vocal differently after the hook.",
      why: "Neo-soul replay often comes from evolution inside the groove, not obvious drops.",
      question: "What makes the groove feel written?",
      choices: ["Keep every section in the same pocket.", "Make the rhythm answer the vocal's changing perspective."],
      correct: 1,
      rationale: "A groove becomes songwriting when it changes what the listener understands.",
      drill: "Write one bass or drum answer for each hook return.",
    },
    {
      id: "neo-vamp",
      title: "Vamp That Deepens",
      competency: "Use repetition to reveal more meaning, not just extend the outro.",
      trap: "The vamp repeats because the band likes the feel.",
      songwriterMove: "Let each repeat shift harmony, harmony stack, ad-lib, or communal response.",
      weak: "Repeat the last line until fade.",
      strong: "Repeat the line while the singer changes from question to decision.",
      why: "A great vamp makes the same phrase feel more true each time.",
      question: "Which vamp choice earns the repetition?",
      choices: ["Repeat because the groove works.", "Repeat because the emotional meaning keeps opening."],
      correct: 1,
      rationale: "Repetition needs escalation, revelation, or participation.",
      drill: "Write four vamp repeats: whisper, answer, harmony, release.",
    },
  ],
  "Pop-R&B": [
    {
      id: "poprnb-title-clarity",
      title: "Title Clarity",
      competency: "Make the title understandable in one listen without losing vocal feeling.",
      trap: "The verse is tasteful, but the title arrives too late or too softly.",
      songwriterMove: "Choose the title early and build every section toward it.",
      weak: "There are several possible ideas in the chorus.",
      strong: "The whole song points at one phrase: I still check in late.",
      why: "Pop-R&B needs emotional access fast. The listener should know what to remember.",
      question: "Which move helps crossover replay?",
      choices: ["Keep the title hidden until the bridge.", "Make the title the emotional handle by the first hook."],
      correct: 1,
      rationale: "Commercial clarity does not kill emotion; it gives emotion a handle.",
      drill: "Say the title once. If it needs explaining, rewrite it.",
    },
    {
      id: "poprnb-chorus-lift",
      title: "Chorus Lift",
      competency: "Design the chorus so melody, lyric, and production all lift together.",
      trap: "The production gets bigger but the song does not pay off emotionally.",
      songwriterMove: "Make the chorus answer the verse problem in a singable way.",
      weak: "Add more drums and stacks for the hook.",
      strong: "Open space around the title, then let harmony arrive after it.",
      why: "A chorus feels big when the title lands, not just when the arrangement is louder.",
      question: "Which lift is more useful?",
      choices: ["More layers on every beat.", "One clean title moment followed by a supporting lift."],
      correct: 1,
      rationale: "The lift should frame the hook, not bury it.",
      drill: "Plan one lyric lift, one melody lift, and one production lift.",
    },
  ],
  "Hip-Hop": [
    {
      id: "hiphop-identity",
      title: "Identity Under Rhythm",
      competency: "Make the artist's point of view stronger than the beat's personality.",
      trap: "The beat has a clear identity, but the rapper could be anyone.",
      songwriterMove: "Write from posture, place, pressure, and point of view.",
      weak: "This beat is hard; rap something confident.",
      strong: "I walk in like I already survived the room.",
      why: "Hip-hop records stick when rhythm and identity become inseparable.",
      question: "Which starting point gives the artist a lane?",
      choices: ["Describe the beat's mood.", "Write the line only this artist would say."],
      correct: 1,
      rationale: "The beat frames the artist; it should not replace them.",
      drill: "Write five caption-level lines, then keep the one with the clearest posture.",
    },
    {
      id: "hiphop-quotable",
      title: "Quotable Hook",
      competency: "Create a phrase listeners can repeat outside the song.",
      trap: "The hook is a section, but not a social phrase.",
      songwriterMove: "Test the hook as caption, chant, ad-lib, and crowd response.",
      weak: "I have a lot to say about my life right now.",
      strong: "I made the pressure look normal.",
      why: "Quotables travel because they give listeners language they want to borrow.",
      question: "Which hook has more cultural utility?",
      choices: ["A long explanation of the mood.", "A short phrase someone can post, shout, or answer."],
      correct: 1,
      rationale: "The phrase has to function outside the record too.",
      drill: "Write one hook phrase under eight words and test it three ways.",
    },
    {
      id: "hiphop-flow-switch",
      title: "Flow Switch",
      competency: "Use cadence changes as structure and replay value.",
      trap: "The verse rides one pocket until the energy flattens.",
      songwriterMove: "Switch rhythm when the perspective changes, not randomly.",
      weak: "Same cadence through every eight bars.",
      strong: "Talk pocket for setup, clipped pocket for pressure, melodic tag for memory.",
      why: "Flow switches tell the listener where the song is moving.",
      question: "Which flow switch is intentional?",
      choices: ["Switch because the beat gets boring.", "Switch because the lyric angle changes."],
      correct: 1,
      rationale: "Cadence is songwriting when it marks emotional or narrative turns.",
      drill: "Map one cadence for setup, one for pressure, and one for the hook phrase.",
    },
  ],
  "Melodic Rap": [
    {
      id: "melodic-phonetic-hook",
      title: "Phonetic Hook Shape",
      competency: "Find the melody and mouth-feel before locking final lyric language.",
      trap: "The writer starts with finished bars and never discovers the hook's natural vowel shape.",
      songwriterMove: "Mumble for contour, find the strongest vowels, then attach simple words to the melody.",
      weak: "I wrote a clever hook, but it fights the melody.",
      strong: "The melody says ah-oh first; the lyric bends around that shape.",
      why: "Melodic rap replay often starts with sound before meaning. The words should fit the hook's mouth-feel.",
      question: "Which first pass fits melodic rap?",
      choices: ["Write finished lyrics before singing anything.", "Mumble the contour, keep the vowel shape, then write into it."],
      correct: 1,
      rationale: "The strongest melodic rap hooks usually feel singable before the lyric is fully polished.",
      drill: "Record three vowel-only hook passes and name the one your mouth repeats.",
    },
    {
      id: "melodic-phrase-economy",
      title: "Phrase Economy",
      competency: "Use fewer words so melody, pocket, and repetition can carry the feeling.",
      trap: "The section has too many syllables, so the emotion cannot breathe.",
      songwriterMove: "Cut the line until the hook can loop without fatigue.",
      weak: "I need to explain the whole relationship inside the chorus.",
      strong: "I still call, then let the melody answer.",
      why: "Melodic rap works when the phrase is light enough to repeat and emotional enough to return.",
      question: "Which revision improves replay?",
      choices: ["Add detail to every empty pocket.", "Keep the title short and let the melody repeat it differently."],
      correct: 1,
      rationale: "Repetition needs space. Too much language can kill the melodic pocket.",
      drill: "Reduce the hook to seven words or fewer, then sing it three times with small rhythmic changes.",
    },
    {
      id: "melodic-verse-to-hook",
      title: "Verse-to-Hook Glide",
      competency: "Connect rap cadence to sung payoff without making the song feel stitched together.",
      trap: "The verse raps in one world and the hook sings in another.",
      songwriterMove: "Let the verse cadence gradually reveal the hook melody before the chorus lands.",
      weak: "Hard rap verse, then unrelated sung hook.",
      strong: "The last two bars of the verse start leaning into the hook's rhythm.",
      why: "Melodic rap needs a believable bridge between speech rhythm and melody.",
      question: "Which transition feels more natural?",
      choices: ["Drop into a sung hook with no setup.", "Let the verse cadence hint at the hook before it arrives."],
      correct: 1,
      rationale: "The hook feels inevitable when the flow starts preparing the ear.",
      drill: "Write the last two verse bars using the hook's rhythm but not the full melody.",
    },
  ],
  "Drill": [
    {
      id: "drill-code",
      title: "Identity Code",
      competency: "Make place, posture, and coded specificity organize the record.",
      trap: "The track copies drill drums but the writing has no world.",
      songwriterMove: "Build a phrase that feels like identity before explanation.",
      weak: "This is a dark aggressive drill beat.",
      strong: "Everybody knows the stairwell by the sound of my keys.",
      why: "Drill needs world-building. Specific coded detail is more powerful than generic aggression.",
      question: "Which move makes drill feel inhabited?",
      choices: ["Add more sliding bass movement.", "Write one detail that proves the block, crew, or pressure."],
      correct: 1,
      rationale: "The beat creates pressure; the lyric has to own the world.",
      drill: "Write three coded details and one chant phrase. Keep the coldest one.",
    },
    {
      id: "drill-chant",
      title: "Chant Hook",
      competency: "Turn a compact phrase into a repeatable posture.",
      trap: "The hook explains too much and loses command energy.",
      songwriterMove: "Use short commands, names, objects, or identity claims that hit rhythmically.",
      weak: "I am explaining why everyone should respect me.",
      strong: "No face, no case, no second call.",
      why: "A drill hook often works as punctuation and attitude before it works as melody.",
      question: "Which hook behaves more like drill?",
      choices: ["A paragraph of explanation.", "A short phrase with consonants, bounce, and threat."],
      correct: 1,
      rationale: "The listener should catch the posture fast.",
      drill: "Write four two-beat commands and answer each with an ad-lib.",
    },
    {
      id: "drill-pocket",
      title: "Pocket and Silence",
      competency: "Use negative space, bass motion, and flow switches as the arrangement.",
      trap: "Every bar is full, so nothing sounds dangerous.",
      songwriterMove: "Let silence make the phrase hit harder.",
      weak: "Fill every gap with ad-libs and percussion.",
      strong: "Drop out before the title, then let the bass answer.",
      why: "Drill pressure often comes from restraint and timing.",
      question: "Which production move serves the vocal?",
      choices: ["Crowd the hook with extra sounds.", "Leave one cold gap before the chant lands."],
      correct: 1,
      rationale: "The threat gets bigger when the listener has room to feel it.",
      drill: "Mute one element on the title phrase and bring it back as an answer.",
    },
  ],
  "Country": [
    {
      id: "country-object",
      title: "Object That Tells the Story",
      competency: "Use concrete nouns, place, and behavior to carry emotion.",
      trap: "The song uses country imagery, but none of it proves the story.",
      songwriterMove: "Pick one object that makes the relationship visible.",
      weak: "I miss you in this small town tonight.",
      strong: "Your coffee mug is still turned handle-out by the sink.",
      why: "Country emotion lands when ordinary objects become evidence.",
      question: "Which line gives the singer a real story?",
      choices: ["A familiar country mood.", "A specific object that reveals what changed."],
      correct: 1,
      rationale: "The detail makes the feeling believable without over-explaining it.",
      drill: "List five objects in the room; choose the one that tells the whole song.",
    },
    {
      id: "country-title",
      title: "Plainspoken Title",
      competency: "Make the title feel like something a person would actually say.",
      trap: "The title is clever but the chorus has no lived turn.",
      songwriterMove: "Let the title summarize a decision, regret, promise, or lesson.",
      weak: "Neon Memories on a Broken Highway.",
      strong: "I still save your side.",
      why: "Country titles often work because they sound simple until the story gives them weight.",
      question: "Which title is more singable?",
      choices: ["The clever image with no story yet.", "The plain phrase that implies a behavior."],
      correct: 1,
      rationale: "Plain language lets the vocal carry sincerity.",
      drill: "Write the title as a sentence you could say across a kitchen table.",
    },
    {
      id: "country-verse-two",
      title: "Verse Two Turn",
      competency: "Make the second verse change the story, not repeat the setup.",
      trap: "Verse two adds more scenery but no new emotional information.",
      songwriterMove: "Reveal what changed after the first chorus.",
      weak: "More road, more bar, more weather.",
      strong: "I sold the truck, but kept the key.",
      why: "Country replay depends on story movement and emotional payoff.",
      question: "Which verse-two move earns another chorus?",
      choices: ["Add more setting.", "Reveal a behavior that reframes the title."],
      correct: 1,
      rationale: "The chorus should mean more when it returns.",
      drill: "Write verse two as the moment after the narrator should have moved on.",
    },
  ],
  "Gospel": [
    {
      id: "gospel-testimony",
      title: "Testimony Arc",
      competency: "Build the song around before, belief, and breakthrough.",
      trap: "The vocal is huge, but the testimony is unclear.",
      songwriterMove: "Name what changed and why the room should believe it.",
      weak: "This is uplifting and powerful.",
      strong: "I came in tired, but I am not leaving bound.",
      why: "Gospel power comes from a truth people can believe and repeat together.",
      question: "Which line creates testimony?",
      choices: ["A big inspirational feeling.", "A before-and-after truth the room can stand inside."],
      correct: 1,
      rationale: "The song needs a spiritual or emotional turn, not just vocal size.",
      drill: "Write the before, the belief, and the breakthrough in three plain lines.",
    },
    {
      id: "gospel-call-response",
      title: "Call and Response",
      competency: "Design phrases the lead can call and the room can answer.",
      trap: "The melody is impressive but not participatory.",
      songwriterMove: "Make the answer simple enough for choir, congregation, or stacked vocals.",
      weak: "The lead sings every important idea alone.",
      strong: "Lead: I still believe. Room: Still believe.",
      why: "Gospel often becomes powerful when private testimony turns communal.",
      question: "Which hook invites participation?",
      choices: ["A long lead-only run.", "A call phrase with a simple answer."],
      correct: 1,
      rationale: "The room needs language it can carry.",
      drill: "Write one call and three possible room answers.",
    },
    {
      id: "gospel-vamp",
      title: "Vamp Intensification",
      competency: "Use repetition to lift, testify, and release.",
      trap: "The vamp repeats but does not grow.",
      songwriterMove: "Escalate through dynamics, harmony, modulation, ad-libs, and choir response.",
      weak: "Repeat the same phrase at the same intensity.",
      strong: "Start low, add response, open harmony, then let the lead testify over it.",
      why: "The vamp should feel like breakthrough, not a loop.",
      question: "Which vamp earns the final section?",
      choices: ["Repeat because it sounds good.", "Repeat while the room gets freer each time."],
      correct: 1,
      rationale: "Repetition needs spiritual and dynamic movement.",
      drill: "Plan four vamp levels: low, answered, wide, released.",
    },
  ],
  "Alternative": [
    {
      id: "alt-strange-detail",
      title: "Strange Concrete Detail",
      competency: "Use unusual images that still point at a clear emotional thesis.",
      trap: "The lyric is vague and calls itself mysterious.",
      songwriterMove: "Make the strange detail visible enough to believe.",
      weak: "I am lost inside a beautiful chaos.",
      strong: "Your toothbrush leans like it is trying to leave first.",
      why: "Alternative writing can be odd, but it still needs a human anchor.",
      question: "Which line gives the artist a distinct point of view?",
      choices: ["An abstract mood cloud.", "A strange object that reveals the feeling."],
      correct: 1,
      rationale: "Specific weirdness beats vague mystery.",
      drill: "Write five strange objects, then attach one to a plain truth.",
    },
    {
      id: "alt-texture-thesis",
      title: "Texture With a Thesis",
      competency: "Make the signature sound describe the song's emotional world.",
      trap: "The production is interesting, but the song idea is blurry.",
      songwriterMove: "Choose one sound that behaves like the narrator's nervous system.",
      weak: "Add distortion because it sounds cool.",
      strong: "Let the guitar fray only when the narrator lies.",
      why: "Alternative production feels intentional when texture and concept point at the same truth.",
      question: "Which texture choice is written?",
      choices: ["A random weird sound.", "A sound that changes with the emotional turn."],
      correct: 1,
      rationale: "Risk works when it has a job.",
      drill: "Name one texture and the lyric moment that triggers it.",
    },
    {
      id: "alt-release",
      title: "Tension and Release",
      competency: "Use dynamics, arrangement risk, and chorus shape to release pressure.",
      trap: "Every section is intense, so nothing actually explodes.",
      songwriterMove: "Withhold one element until the emotional thesis arrives.",
      weak: "Full band from the first bar.",
      strong: "Keep verse dry, let drums enter when the title finally tells the truth.",
      why: "Alternative payoff often comes from contrast, not polish.",
      question: "Which arrangement makes the chorus matter?",
      choices: ["Keep energy maxed out.", "Withhold one core element until the truth lands."],
      correct: 1,
      rationale: "Release needs pressure before it.",
      drill: "Mark the exact word where the arrangement should open.",
    },
  ],
  "Rock & Roll": [
    {
      id: "rockroll-backbeat",
      title: "Backbeat Command",
      competency: "Write a body-first title that works as dance, dare, or release.",
      trap: "The song gets clever before it makes anyone move.",
      songwriterMove: "Put the title on the backbeat and make it easy to answer.",
      weak: "I have complicated feelings tonight.",
      strong: "Come on, shake it till the lights come up.",
      why: "In the 1950s and early 1960s, rock & roll became American youth culture because the hook gave the body permission before the lyric explained anything.",
      question: "Which move feels like early rock & roll?",
      choices: ["Explain the whole emotion in the verse.", "Give the room a phrase it can move to immediately."],
      correct: 1,
      rationale: "The backbeat, title, and vocal attitude should arrive as one physical invitation.",
      drill: "Write three title phrases that sound like a dance command or teenage dare.",
    },
    {
      id: "rockroll-call-response",
      title: "Call and Answer",
      competency: "Use simple response phrases so the band and crowd can talk back.",
      trap: "The lead vocal carries everything alone.",
      songwriterMove: "Let guitar, piano, backing vocals, or handclaps answer the hook.",
      weak: "The singer says the title once and moves on.",
      strong: "Lead says the title; band answers with a riff or shout.",
      why: "Early rock records often feel communal because the song is built like a conversation.",
      question: "Which arrangement makes the hook stick?",
      choices: ["Keep the band under the lead the whole time.", "Let the band answer the title like a second character."],
      correct: 1,
      rationale: "Call-and-answer turns a simple phrase into a record people can join.",
      drill: "Write one vocal call and one guitar/piano/backing-vocal answer.",
    },
  ],
  "Classic Rock": [
    {
      id: "classic-riff-logo",
      title: "Riff as Logo",
      competency: "Create a riff or band gesture recognizable before the lyric starts.",
      trap: "The verse is fine, but the band has no signature identity.",
      songwriterMove: "Treat the riff like the song's logo and let the chorus release it.",
      weak: "Strum chords until the vocal enters.",
      strong: "Open with a riff the listener can identify from the first bar.",
      why: "Late 60s and 70s rock dominated American culture partly because bands had instantly recognizable sonic identities.",
      question: "Which choice feels like classic rock architecture?",
      choices: ["Let the riff be background texture.", "Make the riff the song's front door."],
      correct: 1,
      rationale: "The riff should carry identity, not just harmony.",
      drill: "Write one two-bar riff and decide where the vocal leaves space for it.",
    },
    {
      id: "classic-chorus-arena",
      title: "Communal Chorus",
      competency: "Build a chorus that feels bigger than the narrator.",
      trap: "The band jams, but the crowd has nothing to sing.",
      songwriterMove: "Make the title broad, physical, and repeatable enough for a room.",
      weak: "The chorus keeps developing new thoughts.",
      strong: "The chorus gives one release phrase and lets the band lift it.",
      why: "Classic and arena rock made private feeling communal through scale, repetition, and band dynamics.",
      question: "Which chorus earns the arena?",
      choices: ["More lyric information every line.", "One title phrase that can expand through harmony and drums."],
      correct: 1,
      rationale: "The crowd needs a handle before the band gets huge.",
      drill: "Write a chorus title that works whispered, shouted, and doubled by guitars.",
    },
    {
      id: "classic-solo-bridge",
      title: "Solo as Section",
      competency: "Use a solo, bridge, or breakdown to answer the vocal emotionally.",
      trap: "The solo shows skill but does not move the song.",
      songwriterMove: "Make the band speak the feeling the lyric cannot say.",
      weak: "Insert a long solo because rock songs need one.",
      strong: "Let the solo intensify the question before the final chorus.",
      why: "Album-rock structures often gave the band narrative power; the solo can be songwriting.",
      question: "Which solo choice serves the song?",
      choices: ["Play the flashiest run available.", "Answer the lyric's emotional pressure through melody and dynamics."],
      correct: 1,
      rationale: "Technical display matters less than emotional architecture.",
      drill: "Name what the solo is answering before writing the solo section.",
    },
  ],
  "Punk Rock": [
    {
      id: "punk-stance",
      title: "One Stance",
      competency: "Compress the song into a grievance, refusal, or demand.",
      trap: "The song has energy but no target.",
      songwriterMove: "Say what you are against, then make the chorus a slogan.",
      weak: "Everything is messed up and I am angry.",
      strong: "I am not buying what you sold me.",
      why: "Late 70s punk pushed back against excess by making urgency and stance the song's engine.",
      question: "Which idea gives punk its spine?",
      choices: ["A general angry mood.", "A clear refusal the crowd can shout."],
      correct: 1,
      rationale: "Punk needs a target, not just distortion.",
      drill: "Write one sentence that starts with I will not, We do not, or You cannot.",
    },
    {
      id: "punk-speed-edit",
      title: "Speed Edit",
      competency: "Cut anything that slows the argument down.",
      trap: "The bridge, intro, and extra lines make urgency leak out.",
      songwriterMove: "Arrive fast, repeat hard, end before the idea goes stale.",
      weak: "Long intro, detailed verse, then the point.",
      strong: "Count off, hit the slogan, leave a bruise.",
      why: "Punk's cultural force came from compression: no permission, no ornament, no waiting.",
      question: "Which edit is more punk?",
      choices: ["Explain before attacking.", "Start at the nerve and keep moving."],
      correct: 1,
      rationale: "Urgency is a writing decision, not only a tempo.",
      drill: "Cut the first four bars unless they create immediate pressure.",
    },
  ],
  "Grunge": [
    {
      id: "grunge-quiet-loud",
      title: "Quiet-Loud Wound",
      competency: "Use dynamics to move from numbness to eruption.",
      trap: "Everything is distorted, so nothing releases.",
      songwriterMove: "Let the verse withhold and the chorus rupture.",
      weak: "Full distortion for every section.",
      strong: "Dry verse, cracked image, then the chorus explodes.",
      why: "In the 1990s, grunge became American mainstream by making alienation physical through quiet-loud contrast.",
      question: "Which dynamic shape feels like grunge?",
      choices: ["Stay loud from start to finish.", "Make the chorus sound like the feeling finally breaks open."],
      correct: 1,
      rationale: "Distortion works because it releases pressure, not because it is always present.",
      drill: "Mark the one lyric where the guitars should open.",
    },
    {
      id: "grunge-strange-ache",
      title: "Strange Ache",
      competency: "Pair plain pain with an image odd enough to cut through the noise.",
      trap: "The lyric is mumbled sadness with no memorable picture.",
      songwriterMove: "Write one concrete image that sounds tired, surreal, or disillusioned.",
      weak: "I feel broken and lost.",
      strong: "The ceiling fan keeps counting what I cannot say.",
      why: "Grunge and 90s alt-rock made discomfort memorable through raw melody and strange, grounded images.",
      question: "Which lyric survives the distortion?",
      choices: ["A generic sadness label.", "A concrete image with emotional damage inside it."],
      correct: 1,
      rationale: "The image gives the vocal something to bleed through.",
      drill: "Write one ordinary object acting like the narrator's anxiety.",
    },
  ],
  "Pop-Punk/Emo": [
    {
      id: "emo-diary-hook",
      title: "Diary Hook",
      competency: "Turn a private line into a crowd-scream chorus.",
      trap: "The song is energetic but emotionally generic.",
      songwriterMove: "Make the chorus sound like a diary entry that became public.",
      weak: "I am upset about growing up.",
      strong: "I kept your hoodie like evidence.",
      why: "Late 90s and 2000s pop-punk/emo worked because suburban confession became communal release.",
      question: "Which hook feels more emo/pop-punk?",
      choices: ["A broad mood about being young.", "A specific private detail that a crowd can scream."],
      correct: 1,
      rationale: "The specificity makes the big chorus feel earned.",
      drill: "Write one embarrassing true line, then make it shoutable.",
    },
    {
      id: "emo-bridge-confession",
      title: "Bridge Confession",
      competency: "Use the bridge to reveal the line the chorus has been avoiding.",
      trap: "The bridge is only a breakdown with no new emotional information.",
      songwriterMove: "Strip or half-time the band so the confession can change the final chorus.",
      weak: "Breakdown, then repeat the chorus the same way.",
      strong: "Bridge admits the real wound, then the final chorus hits like release.",
      why: "Pop-punk and emo final choruses work when the bridge makes the title mean more.",
      question: "Which bridge earns the last chorus?",
      choices: ["A breakdown with no confession.", "A new truth that changes how the chorus lands."],
      correct: 1,
      rationale: "Catharsis needs a reveal.",
      drill: "Write the bridge line that the narrator was too proud to say earlier.",
    },
  ],
};

const creationTemplates = [
  {
    id: "pure-pop",
    label: "Pop",
    promise: "One concept, one title, fast chorus lift, and a memory point the listener can carry after one play.",
    sections: [
      ["intro", "Intro", "Signal the hook world immediately.", "What sound, word, or rhythm tells us the song's promise in five seconds?"],
      ["verse1", "Verse 1", "Set up the emotional problem in plain language.", "What is happening that anyone can understand fast?"],
      ["pre", "Pre-Chorus", "Tighten the pressure and aim at the title.", "What sentence makes the chorus feel inevitable?"],
      ["hook", "Chorus", "Deliver the title with the clearest melody in the song.", "What phrase should a listener sing after one play?"],
      ["postHook", "Post-Chorus", "Turn the title into a chant, tag, or melodic afterimage.", "What fragment keeps replaying after the chorus?"],
      ["bridge", "Bridge", "Reveal the deeper reason or flip the camera.", "What new angle makes the final chorus hit harder?"],
      ["finalHook", "Final Chorus", "Return with more urgency, more harmony, or one clean lyrical lift.", "What makes the final title feel earned?"],
    ],
  },
  {
    id: "dance-pop",
    label: "Dance-Pop",
    promise: "Body-first groove, quick setup, release-point chorus, and a title that survives movement.",
    sections: [
      ["intro", "Intro / Pulse", "Establish tempo, groove, and a small vocal or synth identity.", "What makes the body understand the record first?"],
      ["verse1", "Verse 1", "Keep the lyric lean so the rhythm stays in front.", "What story can be told without slowing the floor down?"],
      ["pre", "Build", "Create lift with repetition, rising melody, or drum pressure.", "What makes the drop or chorus feel earned?"],
      ["hook", "Chorus / Drop", "Make the title physical and singable.", "What phrase can be sung while moving?"],
      ["postHook", "Post-Hook", "Let rhythm, chant, or melody continue the hook.", "What wordless or short phrase keeps the record alive?"],
      ["breakdown", "Breakdown", "Strip back enough to reset desire.", "What disappears so the next return feels bigger?"],
      ["finalHook", "Final Release", "Return with the strongest groove and cleanest title moment.", "What is the last movement cue?"],
    ],
  },
  {
    id: "songwriter-pop",
    label: "Singer-Songwriter Pop",
    promise: "Personal detail, conversational phrasing, clean title payoff, and a bridge that reveals the real wound.",
    sections: [
      ["intro", "Intro", "Start close: instrument, room, or first sentence.", "What makes this feel like a person before it feels like a record?"],
      ["verse1", "Verse 1", "Give the scene with concrete details.", "What object or behavior proves the feeling?"],
      ["pre", "Lift", "Let the thought turn toward the title.", "What question or confession needs the chorus?"],
      ["hook", "Chorus", "Make the title plain enough to say in conversation.", "What is the sentence the listener borrows?"],
      ["verse2", "Verse 2", "Add consequence or self-awareness.", "What do we understand now that we did not know before?"],
      ["bridge", "Bridge", "Say the thing the first chorus avoided.", "What truth changes the final hook?"],
      ["finalHook", "Final Chorus", "Return with emotional clarity rather than extra decoration.", "What word now means more than it did at first?"],
    ],
  },
  {
    id: "pop-rnb",
    label: "Pop-R&B",
    promise: "Fast emotional clarity, clean chorus payoff, replayable title.",
    sections: [
      ["intro", "Intro", "Set the emotional weather in one sound or line.", "What does the beat make the room feel like?"],
      ["verse1", "Verse 1", "Give the listener a person, place, and behavior.", "What is the first visible thing the artist does?"],
      ["pre", "Pre", "Raise pressure before the hook lands.", "What question or tension makes the title inevitable?"],
      ["hook", "Hook", "Make the title phrase impossible to miss.", "What phrase should the listener remember after one pass?"],
      ["verse2", "Verse 2", "Add new information, not just more lines.", "What changes after the first hook?"],
      ["bridge", "Bridge", "Break the pattern and reveal the deeper truth.", "What would the artist admit when the beat strips down?"],
      ["finalHook", "Final Hook", "Return bigger, clearer, or more vulnerable.", "What harmony, ad-lib, or silence makes the last hook matter?"],
    ],
  },
  {
    id: "rap-sung-hook",
    label: "Rap + Sung Hook",
    promise: "Identity in the verses, emotional access in the hook.",
    sections: [
      ["intro", "Intro", "Signal world, tempo, and attitude quickly.", "What tag, motif, or quote frames the record?"],
      ["hook", "Hook", "Give the crowd the simple memory first.", "What line can someone repeat without knowing the verses?"],
      ["verse1", "Verse 1", "Establish perspective, stakes, and quotables.", "What is the sharpest identity claim?"],
      ["postHook", "Post-Hook", "Reinforce the title with rhythm or chant.", "What short phrase can become social currency?"],
      ["verse2", "Verse 2", "Escalate detail, flex, or story.", "What new angle keeps the second verse alive?"],
      ["bridge", "Break", "Create contrast before the last return.", "Should the drums drop, the vocal switch, or the beat breathe?"],
      ["outro", "Outro", "Leave one phrase ringing.", "What is the final line people quote?"],
    ],
  },
  {
    id: "soul",
    label: "Soul",
    promise: "Truth, groove, vocal conviction, and a chorus that feels both personal and communal.",
    sections: [
      ["intro", "Intro", "Put the listener in the room with a groove, chord, or vocal entrance.", "What makes the record feel human before it explains itself?"],
      ["verse1", "Verse 1", "Name the feeling through lived detail.", "What ordinary image carries the emotional truth?"],
      ["lift", "Lift", "Let harmony, response, or melody open the heart of the song.", "Where does the feeling start to rise?"],
      ["hook", "Chorus", "State the emotional thesis with conviction.", "What sentence can the singer mean more each time?"],
      ["verse2", "Verse 2", "Deepen the testimony, relationship, or social perspective.", "What new detail makes the first chorus heavier?"],
      ["bridge", "Bridge", "Turn confession into decision, plea, or release.", "What does the singer finally know?"],
      ["vamp", "Vamp / Outro", "Let repetition become performance, response, and release.", "What phrase can grow through ad-libs, harmony, and band movement?"],
    ],
  },
  {
    id: "neo-soul",
    label: "Neo-Soul",
    promise: "Groove, perspective, and harmonic movement without losing the song.",
    sections: [
      ["intro", "Intro", "Let the pocket introduce the world.", "What instrument or chord color tells the truth first?"],
      ["verse1", "Verse 1", "Speak with intimacy and point of view.", "What is the specific observation?"],
      ["lift", "Lift", "Let harmony or melody open the thought.", "Where does the perspective expand?"],
      ["hook", "Hook", "Keep the language simple over rich harmony.", "What plain sentence can sit on the prettiest change?"],
      ["verse2", "Verse 2", "Answer the first verse with a deeper layer.", "What has the narrator realized?"],
      ["vamp", "Vamp", "Let repetition become feeling.", "What phrase can evolve through stacks or call-and-response?"],
      ["outro", "Outro", "Resolve with texture, not clutter.", "What should fade in the listener's body?"],
    ],
  },
  {
    id: "alt-rnb",
    label: "Alt-R&B",
    promise: "Atmosphere first, but the concept still has teeth.",
    sections: [
      ["intro", "Intro", "Create the private world.", "What sound feels like the secret?"],
      ["verse1", "Verse 1", "Write like thought, not performance.", "What line feels too honest to announce?"],
      ["pre", "Tension", "Let the loop tilt or narrow.", "What changes just before the hook?"],
      ["hook", "Hook", "Repeat the emotional thesis with restraint.", "What phrase gets colder or warmer each time?"],
      ["verse2", "Verse 2", "Change perspective or time frame.", "What detail makes the world less vague?"],
      ["bridge", "Bridge", "Disrupt the mood.", "What happens if the beat disappears for one confession?"],
      ["finalHook", "Final Hook", "Let the hook return changed.", "What final layer makes replay feel earned?"],
    ],
  },
  {
    id: "drill",
    label: "Drill",
    promise: "Threat, motion, identity, and contrast: cold verses with a phrase that cuts through.",
    sections: [
      ["intro", "Intro", "Set the warning signal before the drums fully arrive.", "What sound, tag, or line makes the room tense immediately?"],
      ["hook", "Hook", "Make one phrase repeatable without softening the edge.", "What line can become the record's caption or chant?"],
      ["verse1", "Verse 1", "Establish identity, place, conflict, and coded detail.", "What image proves this narrator's world without overexplaining?"],
      ["turnaround", "Turnaround", "Let the beat breathe before the next attack.", "Where can the 808, pause, or ad-lib reset the pocket?"],
      ["verse2", "Verse 2", "Escalate with flow switches and sharper perspective.", "What rhythm change keeps the second verse from flattening?"],
      ["hookReturn", "Hook Return", "Bring the hook back harder or colder.", "What ad-lib, harmony, or beat drop makes the title hit again?"],
      ["outro", "Outro", "Exit with identity intact.", "What final phrase leaves the world ringing?"],
    ],
  },
  {
    id: "country",
    label: "Country",
    promise: "Plain-spoken truth, concrete images, and a chorus that feels lived-in.",
    sections: [
      ["intro", "Intro", "Signal place, time, or emotional weather.", "What object, road, room, or instrument puts the listener somewhere?"],
      ["verse1", "Verse 1", "Tell the first scene without rushing the lesson.", "Who is there, what happened, and what small detail makes it real?"],
      ["pre", "Lift", "Turn the scene toward the chorus truth.", "What realization makes the title feel inevitable?"],
      ["hook", "Chorus", "Make the title simple, singable, and emotionally plain.", "What phrase could someone say at a bar, in a truck, or at a kitchen table?"],
      ["verse2", "Verse 2", "Add consequence, not just more scenery.", "What changed after the first chorus?"],
      ["bridge", "Bridge", "Reveal the lesson, twist, or confession.", "What does the narrator finally admit?"],
      ["finalHook", "Final Chorus", "Return with the title carrying more meaning.", "What harmony, lyric flip, or stripped line makes the last chorus land?"],
    ],
  },
  {
    id: "gospel",
    label: "Gospel",
    promise: "Testimony, uplift, call-and-response, and a final section that invites participation.",
    sections: [
      ["intro", "Intro", "Open with invitation, reverence, or testimony.", "What first line tells the listener why this song exists?"],
      ["verse1", "Verse 1", "Name the struggle with sincerity.", "What was the before picture?"],
      ["pre", "Build", "Move from personal story to shared belief.", "What line lets the room join emotionally?"],
      ["hook", "Chorus", "Make the central truth repeatable and communal.", "What phrase can a choir or audience answer?"],
      ["verse2", "Verse 2", "Show transformation through detail.", "What changed, healed, opened, or became possible?"],
      ["bridge", "Bridge / Vamp Setup", "Create a phrase that can intensify through repetition.", "What one sentence can grow with stacks, ad-libs, and modulation?"],
      ["vamp", "Vamp", "Let repetition become release.", "What call-and-response line can carry the final lift?"],
    ],
  },
  {
    id: "alternative",
    label: "Alternative",
    promise: "Distinct perspective, texture, tension, and a hook that feels inevitable without sounding obvious.",
    sections: [
      ["intro", "Intro", "Establish the world with a sound, flaw, or motif.", "What texture makes the song identifiable before the vocal?"],
      ["verse1", "Verse 1", "Start specific and slightly off-center.", "What image feels personal, strange, or psychologically true?"],
      ["pre", "Tension", "Let pressure gather through rhythm, harmony, or lyric narrowing.", "What line makes the chorus feel necessary?"],
      ["hook", "Chorus", "Land the emotional thesis without over-polishing it.", "What phrase could be shouted, whispered, or repeated and still work?"],
      ["verse2", "Verse 2", "Deepen the point of view or destabilize it.", "What second image changes how we hear the first?"],
      ["bridge", "Bridge", "Break the arrangement or perspective.", "What happens if the song turns against itself for eight bars?"],
      ["finalHook", "Final Chorus", "Return with more noise, more space, or more conviction.", "What production change makes the last hook feel earned?"],
    ],
  },
  {
    id: "rock-band",
    label: "Rock Band",
    promise: "Riff, attitude, band dynamics, chorus release, and a performance that feels lived on stage.",
    sections: [
      ["intro", "Riff / Intro", "Put the guitar, piano, groove, or band identity in the listener's body.", "What musical gesture identifies the song in three seconds?"],
      ["verse1", "Verse 1", "Set the narrator, scene, or social pressure without killing momentum.", "Who is singing, and what are they pushing against?"],
      ["pre", "Lift / Pre", "Build tension through melody, drums, or harmonic climb.", "What makes the chorus feel like release?"],
      ["hook", "Chorus", "Give the crowd a title, slogan, confession, or shoutable release.", "What phrase works in a car, bar, bedroom, or arena?"],
      ["verse2", "Verse 2", "Escalate the story, attitude, or band energy.", "What new detail makes the second chorus hit harder?"],
      ["bridge", "Bridge / Solo", "Change the pressure with a solo, breakdown, bridge, or half-time move.", "What can the band say that the lyric cannot?"],
      ["finalHook", "Final Chorus", "Return with more conviction, harmony, distortion, or crowd energy.", "What final lift makes the song feel communal?"],
    ],
  },
];

const genreProfiles = [
  {
    id: "pop",
    title: "Pop",
    scope: "Mainstream Pop | Chorus-first radio and streaming records",
    template: "pure-pop",
    lane: "Pop",
    thesis: "Pop works when the listener understands the emotional promise fast and remembers one clean phrase. The craft is clarity without making the record feel empty.",
    tempo: "Usually 90-130 BPM, with ballads lower and upbeat chorus-pop higher.",
    songwriting: ["One central concept", "Title arrives early", "Melody is easy to repeat", "Pre-chorus creates obvious lift"],
    production: ["Hook-first arrangement", "Clean vocal foreground", "Ear candy after the title", "Contrast between verse intimacy and chorus width"],
    substyles: [
      ["Chorus Pop", "Big melody, clean title, wide payoff."],
      ["Pop Ballad", "Plain emotional premise, gradual lift, vocal center."],
      ["Pop-Rock / Pop Hybrid", "Band or guitar energy shaped into pop clarity."],
    ],
    traps: ["Too many concepts", "Clever lines that do not sing", "A chorus that is louder but not clearer", "No post-hook memory point"],
    prompts: ["What can the listener sing after one play?", "What is the title doing before the first chorus?", "Where does the melody become easiest?"],
  },
  {
    id: "dance-pop",
    title: "Dance-Pop",
    scope: "Dance-Pop | Club-pop | Electronic crossover",
    template: "dance-pop",
    lane: "Dance-Pop",
    thesis: "Dance-pop needs the body to understand the song before the brain analyzes it. Lyric, groove, and release point should all serve motion.",
    tempo: "Often 115-128 BPM for club-pop; some modern pockets move slower with a dance feel.",
    songwriting: ["Physical title phrase", "Lean verses", "Build and release", "Post-hook or drop as memory"],
    production: ["Kick and bass clarity", "Build tension before release", "Synth or vocal motif identity", "Breakdown resets energy"],
    substyles: [
      ["Club-Pop", "Four-on-floor pulse, big release, simple title."],
      ["Disco-Pop", "Bass movement, joyful groove, communal chorus."],
      ["Electro-Pop", "Synth identity, processed hooks, tight arrangement."],
    ],
    traps: ["Beat drop with no song title", "Too many lyric details for the groove", "Build without emotional reason", "Chorus that cannot be sung while moving"],
    prompts: ["What phrase survives the dance floor?", "Where does the body feel release?", "What disappears before the final return?"],
  },
  {
    id: "songwriter-pop",
    title: "Singer-Songwriter Pop",
    scope: "Confessional Pop | Acoustic-pop | Personal-detail pop",
    template: "songwriter-pop",
    lane: "Singer-Songwriter Pop",
    thesis: "Singer-songwriter pop wins when private detail becomes a clean shared sentence. It should feel authored, not assembled.",
    tempo: "Often 65-105 BPM, though personal-detail pop can scale into faster band or synth arrangements.",
    songwriting: ["Specific scene", "Conversational title", "Bridge revelation", "Melody that preserves natural speech"],
    production: ["Instrument or texture close to the vocal", "Arrangement grows with the confession", "Space around important words", "Final chorus carries new meaning"],
    substyles: [
      ["Acoustic Pop", "Instrument-first intimacy with clear hook payoff."],
      ["Diary Pop", "Specific details, plain title, emotional bridge."],
      ["Cinematic Pop", "Personal writing scaled through atmosphere and lift."],
    ],
    traps: ["Journal entry with no hook", "Overexplaining the feeling", "Bridge that repeats the verse", "Production too glossy for the confession"],
    prompts: ["What detail proves the feeling?", "What is the sentence people borrow?", "What does the bridge finally admit?"],
  },
  {
    id: "alt-pop",
    title: "Alt-Pop",
    scope: "Alt-Pop | Left-of-center mainstream | Indie-pop crossover",
    template: "alternative",
    lane: "Alt-Pop",
    thesis: "Alt-pop needs personality and risk, but the listener still needs a hook path. Strange is strongest when it has a clear emotional job.",
    tempo: "Wide range: 70-150 BPM depending on intimacy, indie drive, or electronic pulse.",
    songwriting: ["Distinct point of view", "Concrete weird image", "Hook that does not feel generic", "Tension between polish and edge"],
    production: ["Signature texture", "Unusual motif", "Controlled imperfection", "Pop-readable section contrast"],
    substyles: [
      ["Indie-Pop", "Texture and personality with a soft hook center."],
      ["Bedroom Pop", "Intimate tone, lo-fi edges, conversational melody."],
      ["Experimental Pop", "Risky sound design with enough title clarity to hold the song."],
    ],
    traps: ["Randomness instead of perspective", "No emotional thesis", "Texture louder than the topline", "Hook too buried to remember"],
    prompts: ["What is the weird image with a human point?", "What sound identifies the artist?", "Where does the strange choice become singable?"],
  },
  {
    id: "rnb",
    title: "R&B",
    scope: "Contemporary R&B | Alt-R&B | Slow jams",
    template: "alt-rnb",
    lane: "R&B",
    thesis: "R&B works when the vocal has a private emotional job. The lyric, pocket, harmony, and space should all make the performance feel closer.",
    tempo: "Usually 62-98 BPM, or double-time feels around 124-150.",
    songwriting: ["Intimacy before cleverness", "Specific desire, regret, or vulnerability", "Conversational lines with melodic room", "Hook as emotional confession"],
    production: ["Leave air around the lead vocal", "Use harmony as emotional pressure", "Let drums support pocket, not crowd it", "Ad-libs and stacks reveal subtext"],
    substyles: [
      ["Contemporary R&B", "Clean hook, warm low end, vocal-forward arrangement."],
      ["Alt-R&B", "Atmosphere and texture with a clear emotional thesis."],
      ["Slow Jam", "Sensual pacing, repetition, and performance detail."],
    ],
    traps: ["Pretty chords with no concept", "Too many words under runs", "Overproducing the title phrase", "Mood replacing a singable hook"],
    prompts: ["What line sounds like it was said too close to the mic?", "Where does the singer need room to breathe?", "What phrase can return with more ache each time?"],
  },
  {
    id: "soul",
    title: "Soul",
    scope: "Classic Soul | Quiet Storm | Modern Soul",
    template: "soul",
    lane: "Soul",
    thesis: "Soul is conviction made musical: the singer has to sound like the lyric is lived, the groove has to breathe, and repetition should feel like truth deepening.",
    tempo: "Often 65-110 BPM, from slow-burning ballads and quiet storm to midtempo groove records.",
    songwriting: ["Plain truth with emotional weight", "Vocal conviction", "Groove as testimony", "Vamp or repeated phrase that intensifies"],
    production: ["Warm rhythm section", "Human pocket", "Background responses", "Arrangement that follows the singer's emotional arc"],
    substyles: [
      ["Motown / Classic Soul", "Compact hooks, elegant arrangement, lead vocal charisma."],
      ["Curtis / Message Soul", "Social perspective, groove, and moral clarity."],
      ["Quiet Storm", "Smooth pocket, adult intimacy, refined vocal phrasing."],
      ["Modern Soul", "Classic feeling through modern sonics, restraint, and groove literacy."],
    ],
    traps: ["Pretty vintage texture with no conviction", "Runs replacing a clear emotional sentence", "Groove that never changes meaning", "Modern polish removing the human edge"],
    prompts: ["What truth can the singer mean more on the third repeat?", "Where does the band answer the vocal?", "What line feels lived rather than written?"],
  },
  {
    id: "neo-soul",
    title: "Neo-Soul",
    scope: "Neo-Soul | Soulful R&B | Live-feel groove",
    template: "neo-soul",
    lane: "Neo-Soul",
    thesis: "Neo-soul rewards feel, musicianship, and perspective, but the listener still needs a plain sentence to hold onto.",
    tempo: "Often 70-100 BPM with swing, pocket, or live push-pull.",
    songwriting: ["Perspective over polish", "Plain hook over rich harmony", "Groove as emotional language", "Vamps that deepen meaning"],
    production: ["Live-feel drums and bass conversation", "Chord color with vocal clarity", "Organic evolution instead of obvious drops", "Stacks, calls, and responses"],
    substyles: [
      ["Classic Neo-Soul", "Warm chords, pocket, intimate perspective."],
      ["Jazz-Soul", "Extended harmony with a simple top line."],
      ["Modern Soul", "Cleaner sonics with live-feel emotion."],
    ],
    traps: ["Chords doing all the writing", "Hook too abstract", "Groove without section payoff", "Musicianship hiding the concept"],
    prompts: ["What plain sentence sits on the richest chord?", "Where can the vamp change meaning?", "What does the bass answer in the vocal?"],
  },
  {
    id: "pop-rnb",
    title: "Pop-R&B",
    scope: "Pop-R&B | Commercial R&B | Crossover ballad",
    template: "pop-rnb",
    lane: "Pop-R&B",
    thesis: "Pop-R&B needs emotional access fast: the title must be clear, the chorus must lift, and the vocal still has to feel human.",
    tempo: "Often 75-105 BPM, with flexible half-time or dance-pop energy.",
    songwriting: ["Title clarity", "Fast chorus payoff", "Simple emotional premise", "Verse detail that points at the hook"],
    production: ["Vocal-first polish", "Clear section contrast", "Ear candy after the title, not over it", "Modern low end with clean topline space"],
    substyles: [
      ["Radio R&B", "Direct hook, polished vocal, broad emotion."],
      ["Pop Ballad", "Simple concept, big chorus lift."],
      ["Dance-R&B", "Groove utility with emotional chorus."],
    ],
    traps: ["Too tasteful to remember", "Hook arrives late", "Verse details do not support the title", "Production gets bigger but song does not"],
    prompts: ["What title can land in one listen?", "Where does the chorus lift emotionally?", "What detail makes the verse less generic?"],
  },
  {
    id: "hip-hop",
    title: "Hip-Hop",
    scope: "Rap | Melodic rap | Rap with sung hooks",
    template: "rap-sung-hook",
    lane: "Hip-Hop",
    thesis: "Hip-hop songwriting is identity under rhythm. The record needs a point of view, a pocket, and at least one phrase people can repeat.",
    tempo: "Wide range: 70-100 half-time, 120-160 trap/drill/dance pockets.",
    songwriting: ["Identity first", "Quotables and captions", "Rhythmic hooks", "Verses that escalate perspective"],
    production: ["Space for cadence", "Loop identity", "Low-end discipline", "Ad-libs and drops as punctuation"],
    substyles: [
      ["Rap + Sung Hook", "Verses carry identity, hook gives emotional access."],
      ["Melodic Rap", "Topline pocket and repetition drive replay."],
      ["Trap", "Minimal loop, hard drums, phrase economy."],
    ],
    traps: ["Beat has more identity than the artist", "No quotable phrase", "Flow never changes", "Hook is just a section, not a memory"],
    prompts: ["What line sounds like a caption?", "Where does the flow switch?", "What phrase can a crowd say back?"],
  },
  {
    id: "drill",
    title: "Drill",
    scope: "Chicago Drill | UK/London Drill | NY Drill",
    template: "drill",
    lane: "Drill",
    thesis: "Drill works when the writing has identity, threat, coded specificity, and rhythmic control. The beat creates pressure; the lyric has to own the world.",
    tempo: "Usually 60-75 BPM halftime feel or 120-150 double-time energy.",
    songwriting: ["Identity before explanation", "Caption-level hook phrases", "Place, crew, rivalry, survival, pressure", "Flow switches as section contrast"],
    production: ["Sliding 808s or bass movement", "Sparse, cold melodic motifs", "Hard negative space", "Hi-hat/percussion pocket as momentum"],
    substyles: [
      ["Chicago", "Raw urgency, street reportage, blunt chant hooks, minimal darkness."],
      ["UK/London", "Triplet bounce, gliding bass, icy samples, intricate pocket control."],
      ["NY", "Sample recognition, chant hooks, callouts, dance/movement energy over drill drums."],
    ],
    traps: ["Only copying drum patterns", "Too many names/details without a central hook", "Aggression without perspective", "No contrast between verse and hook"],
    prompts: ["What is the one phrase people quote outside the song?", "What detail proves the world without explaining it?", "Where can silence make the threat hit harder?"],
  },
  {
    id: "country",
    title: "Country",
    scope: "Modern Country | Country-Pop | Americana-leaning songwriting",
    template: "country",
    lane: "Country",
    thesis: "Country works when the song turns ordinary life into a clear emotional picture. The lyric carries the record; production should frame the truth, not bury it.",
    tempo: "Ballads around 70-90 BPM; midtempo/story records around 90-115 BPM.",
    songwriting: ["Concrete nouns and places", "Plain-spoken titles", "Story, lesson, or emotional turn", "Chorus that feels like something people would actually say"],
    production: ["Acoustic rhythm bed", "Guitar/pedal steel/fiddle color", "Drums that support storytelling", "Lift through harmony and arrangement, not clutter"],
    substyles: [
      ["Country-Pop", "Cleaner chorus lift, universal language, tight structure."],
      ["Traditional", "Stronger narrative, roots instrumentation, title clarity."],
      ["Americana", "Texture, character, lyrical grain, less obvious payoff."],
    ],
    traps: ["Generic small-town imagery", "A clever title with no story", "Overproducing the chorus", "Writing slogans instead of lived details"],
    prompts: ["What object tells the whole story?", "What is the title saying plainly?", "What changes between verse one and verse two?"],
  },
  {
    id: "gospel",
    title: "Gospel",
    scope: "Contemporary Gospel | Praise & Worship | Choir-driven R&B Gospel",
    template: "gospel",
    lane: "Gospel",
    thesis: "Gospel works when testimony becomes shared release. The song needs a truth people can believe, repeat, and intensify together.",
    tempo: "Worship ballads can sit 60-80 BPM; praise and choir records often move 90-130 BPM.",
    songwriting: ["Testimony arc: before, belief, breakthrough", "Communal language", "Call-and-response hooks", "Vamp phrases that can grow through repetition"],
    production: ["Piano/organ foundation", "Choir or stacked vocal response", "Dynamic builds", "Modulation, breakdown, and vamp as emotional architecture"],
    substyles: [
      ["Contemporary", "R&B harmony, polished drums, strong lead vocal arc."],
      ["Praise & Worship", "Simple congregational phrases, lift, repetition."],
      ["Choir-driven", "Call-and-response, stacked power, final vamp release."],
    ],
    traps: ["Big vocals without a clear testimony", "Too many concepts in one song", "Vamp that repeats but does not intensify", "Production overpowering the lead message"],
    prompts: ["What truth can the room repeat?", "What is the before-and-after testimony?", "Where does the choir answer the lead?"],
  },
  {
    id: "alternative",
    title: "Alternative",
    scope: "Alt-Pop | Indie Rock | Alternative R&B / experimental crossover",
    template: "alternative",
    lane: "Alternative",
    thesis: "Alternative works when the perspective feels distinct, not random. Texture can be strange, but the emotional thesis still needs to land.",
    tempo: "Wide range: 70-100 for intimate records, 100-150 for driving band or alt-pop energy.",
    songwriting: ["Point of view over polish", "Unusual but concrete images", "Chorus as thesis, not necessarily slogan", "Tension between intimacy and release"],
    production: ["Signature texture or motif", "Dynamics and distortion as emotion", "Imperfect performance character", "Arrangement risk with clear song purpose"],
    substyles: [
      ["Alt-Pop", "Left-of-center sound with pop-readable hooks."],
      ["Indie Rock", "Band dynamics, guitar identity, emotional velocity."],
      ["Experimental Crossover", "Texture and processing carry mood while lyric keeps the listener oriented."],
    ],
    traps: ["Being vague and calling it mysterious", "Texture replacing concept", "No chorus payoff", "Random arrangement changes without emotional logic"],
    prompts: ["What is the strange detail that only this artist would notice?", "What texture identifies the record in one second?", "Where does the song release tension?"],
  },
  {
    id: "rock-roll",
    title: "Rock & Roll",
    scope: "1950s-early 1960s rock & roll | dancehall, radio, teenage culture",
    template: "rock-band",
    lane: "Rock & Roll",
    thesis: "Early rock & roll was American youth culture becoming rhythm, attitude, and release. The song needs a simple body-first hook, a backbeat, and a reason to move.",
    tempo: "Often 120-180 BPM, shuffle/swing or straight backbeat energy.",
    songwriting: ["Danceable title phrase", "Teenage desire or rebellion", "Call-and-response simplicity", "Riff or piano/guitar figure as hook"],
    production: ["Backbeat upfront", "Guitar/piano/rhythm section identity", "Short solos", "Live-room energy over polish"],
    substyles: [
      ["1950s Rock & Roll", "Backbeat, dance command, youth attitude, compact choruses."],
      ["Rockabilly", "Slapback feel, country-blues swing, vocal hiccups and swagger."],
      ["Early Soul/Rock Crossover", "Gospel/R&B phrasing moving into pop-radio energy."],
    ],
    traps: ["Too many modern sections", "Overwriting what should feel physical", "No dance command", "Band performance too polished to feel alive"],
    prompts: ["What phrase makes people move?", "What riff answers the vocal?", "What teenage feeling is being released?"],
  },
  {
    id: "classic-rock",
    title: "Classic Rock",
    scope: "Late 1960s-1970s album rock | FM radio, guitar culture, arena beginnings",
    template: "rock-band",
    lane: "Classic Rock",
    thesis: "Classic rock turns riffs, chorus release, mythology, and band identity into communal culture. The record needs a riff people recognize and a chorus built for shared release.",
    tempo: "Usually 70-140 BPM depending on blues-rock weight, arena lift, or driving road energy.",
    songwriting: ["Riff as identity", "Chorus as communal release", "Verse imagery with attitude or mythology", "Bridge/solo as song architecture"],
    production: ["Band performance first", "Guitar tone as character", "Drums/bass create physical size", "Solos or breakdowns that answer the lyric"],
    substyles: [
      ["Late 60s Roots/Psych Rock", "Blues, folk, experimentation, counterculture perspective."],
      ["70s Album Rock", "Riffs, longer forms, FM-radio identity, band chemistry."],
      ["Arena Rock", "Bigger choruses, crowd-ready titles, dramatic builds."],
    ],
    traps: ["Long jam with no title payoff", "Riff stronger than the song", "Solo that does not answer the vocal", "Verse imagery too vague to ground the anthem"],
    prompts: ["What riff is the song's logo?", "What chorus can a room shout?", "Where does the solo change the emotional pressure?"],
  },
  {
    id: "punk-rock",
    title: "Punk Rock",
    scope: "Late 1970s-1980s punk, hardcore, new wave edge",
    template: "rock-band",
    lane: "Punk Rock",
    thesis: "Punk works when urgency, point of view, and compression beat polish. The song should feel like it had to be said now.",
    tempo: "Often 140-220 BPM, though new wave/post-punk can be slower and angular.",
    songwriting: ["One grievance or stance", "Short slogans", "Fast verse-to-chorus payoff", "Energy over ornament"],
    production: ["Raw guitars", "Forward drums", "Minimal overdubs", "Vocal attitude over perfection"],
    substyles: [
      ["1977 Punk", "Fast, direct, anti-bloat songwriting with chantable hooks."],
      ["Hardcore", "Compressed aggression, slogans, breakdown impact."],
      ["New Wave / Post-Punk", "Angular hooks, irony, groove, and art-school tension."],
    ],
    traps: ["Too polished to feel urgent", "Anger without a target", "No shoutable slogan", "Bridge that slows the argument down"],
    prompts: ["What are you against?", "What line fits on a wall?", "Can the chorus arrive before the listener relaxes?"],
  },
  {
    id: "grunge",
    title: "Grunge",
    scope: "Late 1980s-1990s grunge and alternative rock mainstream era",
    template: "rock-band",
    lane: "Grunge",
    thesis: "Grunge made alienation, distortion, quiet-loud dynamics, and anti-glamour central to American culture. The song needs tension between numbness and eruption.",
    tempo: "Often 70-130 BPM, heavy midtempo grooves or explosive punk-derived energy.",
    songwriting: ["Alienation or disillusionment", "Plain ache plus strange image", "Quiet-loud chorus release", "Melody that survives distortion"],
    production: ["Dirty guitars", "Heavy drums", "Raw vocal edges", "Dynamic contrast over clean polish"],
    substyles: [
      ["Seattle Grunge", "Heavy riffs, disillusioned vocal tone, quiet-loud architecture."],
      ["90s Alt-Rock Radio", "Strange images with strong choruses and guitar identity."],
      ["Post-Grunge", "Cleaner hooks, heavier emotional directness, radio-ready dynamics."],
    ],
    traps: ["Mumbling without a thesis", "Distortion replacing the chorus", "Everything loud all the time", "Vague sadness without a memorable image"],
    prompts: ["What hurts but refuses to explain itself?", "Where does the song explode?", "What image cuts through the distortion?"],
  },
  {
    id: "pop-punk-emo",
    title: "Pop-Punk/Emo",
    scope: "Late 1990s-2000s pop-punk, emo, Warped Tour, suburban youth culture",
    template: "rock-band",
    lane: "Pop-Punk/Emo",
    thesis: "Pop-punk and emo made suburban frustration, confession, speed, and huge melodic hooks feel communal. The song needs urgency plus a line people can scream like a diary entry.",
    tempo: "Often 140-200 BPM for pop-punk; emo can range from intimate midtempo to explosive builds.",
    songwriting: ["Diary-entry specificity", "Big melodic chorus", "Verse urgency", "Bridge confession or breakdown"],
    production: ["Tight drums", "Power chords and octave lines", "Layered shoutable vocals", "Breakdowns before final chorus"],
    substyles: [
      ["Pop-Punk", "Fast, bright, hook-heavy, teenage defiance and romance."],
      ["Emo", "Confessional detail, dynamic builds, cathartic choruses."],
      ["Mall/Radio Rock 2000s", "Polished guitars, huge choruses, clean emotional payoff."],
    ],
    traps: ["Generic angst", "Chorus melody not big enough", "Too much cleverness before the feeling", "Bridge that does not confess anything new"],
    prompts: ["What line sounds like a diary you regret sharing?", "Where does the crowd scream back?", "What bridge confession changes the final chorus?"],
  },
];

const flowWritingPrompts = [
  {
    phase: "Pocket",
    title: "Mumble the take",
    prompt: "Run the beat. Catch vowels, slang, rhythm, and mouth-feel. No editing.",
    harvest: "Keep the phrase your body repeats.",
  },
  {
    phase: "Scene",
    title: "Name the room",
    prompt: "List objects, place, light, weather, clothes, and one small action.",
    harvest: "Keep the detail that proves the feeling.",
  },
  {
    phase: "Title",
    title: "Find the repeat",
    prompt: "Write five title phrases. Say each over the strongest pocket.",
    harvest: "Pick rhythm over cleverness.",
  },
  {
    phase: "Turn",
    title: "Flip the angle",
    prompt: "Write the contradiction, confession, or real problem.",
    harvest: "Use it for the lift, bridge, or verse-two reveal.",
  },
  {
    phase: "Hook",
    title: "Build the spine",
    prompt: "Write short phrases around the title. Do not order them yet.",
    harvest: "Three strong fragments can become the chorus.",
  },
  {
    phase: "Delivery",
    title: "Call the performance",
    prompt: "Pick the take: clipped, numb, cocky, pleading, whispered, almost spoken.",
    harvest: "Cut any lyric the performance cannot carry.",
  },
];

const workflowPresets = {
  "R&B": {
    template: "alt-rnb",
    profile: "rnb",
    proFilter: "R&B Architects",
    mood: "low-lit vocal room",
    flowStart: 5,
    focus: ["intimacy", "vocal pocket", "emotional detail"],
    firstMove: "Start with a private sentence the singer can perform close to the mic.",
  },
  "Soul": {
    template: "soul",
    profile: "soul",
    proFilter: "Soul Architects",
    mood: "warm live-room truth",
    flowStart: 5,
    focus: ["conviction", "groove testimony", "vocal response"],
    firstMove: "Write the plain truth the singer can mean harder every time it repeats.",
  },
  "Neo-Soul": {
    template: "neo-soul",
    profile: "neo-soul",
    proFilter: "Soul Architects",
    mood: "warm groove room",
    flowStart: 1,
    focus: ["groove", "perspective", "simple language over rich chords"],
    firstMove: "Find the plain sentence that can sit on the prettiest change.",
  },
  "Pop": {
    template: "pure-pop",
    profile: "pop",
    proFilter: "Pop Architects",
    mood: "chorus architecture room",
    flowStart: 2,
    focus: ["title clarity", "melody memory", "first-listen payoff"],
    firstMove: "Write the one phrase the listener should sing after one play.",
  },
  "Dance-Pop": {
    template: "dance-pop",
    profile: "dance-pop",
    proFilter: "Pop Architects",
    mood: "release-point room",
    flowStart: 0,
    focus: ["movement", "build and release", "post-hook memory"],
    firstMove: "Find the phrase that can be sung while the body is moving.",
  },
  "Singer-Songwriter Pop": {
    template: "songwriter-pop",
    profile: "songwriter-pop",
    proFilter: "Pop Architects",
    mood: "close-mic confession room",
    flowStart: 1,
    focus: ["specific detail", "conversational title", "bridge reveal"],
    firstMove: "Write the object, behavior, or sentence that makes the feeling believable.",
  },
  "Alt-Pop": {
    template: "alternative",
    profile: "alt-pop",
    proFilter: "Alternative & Crossover",
    mood: "left-field hook room",
    flowStart: 1,
    focus: ["distinct image", "signature texture", "hook path"],
    firstMove: "Find one strange concrete image and make sure it still points to a hook.",
  },
  "Pop-R&B": {
    template: "pop-rnb",
    profile: "pop-rnb",
    proFilter: "R&B Architects",
    mood: "clean hook room",
    flowStart: 2,
    focus: ["title clarity", "chorus lift", "fast emotional access"],
    firstMove: "Decide the title before polishing the verse.",
  },
  "Hip-Hop": {
    template: "rap-sung-hook",
    profile: "hip-hop",
    proFilter: "Hip-Hop Architects",
    mood: "rhythm-first room",
    flowStart: 0,
    focus: ["identity", "quotables", "rhythmic hook"],
    firstMove: "Write the line that sounds like a caption, then build around it.",
  },
  "Melodic Rap": {
    template: "rap-sung-hook",
    profile: "hip-hop",
    proFilter: "Hip-Hop Architects",
    mood: "melody pocket room",
    flowStart: 0,
    focus: ["melody pocket", "phrase economy", "hook repetition"],
    firstMove: "Mumble the hook shape before attaching final words.",
  },
  "Drill": {
    template: "drill",
    profile: "drill",
    proFilter: "Drill Architects",
    mood: "cold motion room",
    flowStart: 0,
    focus: ["threat", "motion", "chant identity"],
    firstMove: "Make one phrase cold enough to repeat without explanation.",
  },
  "Country": {
    template: "country",
    profile: "country",
    proFilter: "Country Architects",
    mood: "story-first room",
    flowStart: 1,
    focus: ["scene", "plain truth", "title payoff"],
    firstMove: "Write the object, room, road, or regret before the hook.",
  },
  "Gospel": {
    template: "gospel",
    profile: "gospel",
    proFilter: "Gospel Architects",
    mood: "communal lift room",
    flowStart: 3,
    focus: ["testimony", "call-and-response", "communal lift"],
    firstMove: "Name the before, then write the phrase the room can answer.",
  },
  "Alternative": {
    template: "alternative",
    profile: "alternative",
    proFilter: "Alt-Rock & Indie Architects",
    mood: "texture lab",
    flowStart: 1,
    focus: ["point of view", "texture", "tension release"],
    firstMove: "Find one strange concrete image and attach it to a plain truth.",
  },
  "Rock & Roll": {
    template: "rock-band",
    profile: "rock-roll",
    proFilter: "Rock Era Architects",
    mood: "teenage backbeat room",
    flowStart: 2,
    focus: ["backbeat", "dance command", "youth release"],
    firstMove: "Write the title like a dance command or teenage dare.",
  },
  "Classic Rock": {
    template: "rock-band",
    profile: "classic-rock",
    proFilter: "Rock Era Architects",
    mood: "FM radio band room",
    flowStart: 0,
    focus: ["riff identity", "chorus release", "band dynamics"],
    firstMove: "Find the riff that acts like the song's logo.",
  },
  "Punk Rock": {
    template: "rock-band",
    profile: "punk-rock",
    proFilter: "Rock Era Architects",
    mood: "garage urgency room",
    flowStart: 2,
    focus: ["stance", "slogan", "speed"],
    firstMove: "Write the line that has to be shouted now.",
  },
  "Grunge": {
    template: "rock-band",
    profile: "grunge",
    proFilter: "Rock Era Architects",
    mood: "quiet-loud distortion room",
    flowStart: 1,
    focus: ["alienation", "dynamic eruption", "raw melody"],
    firstMove: "Find the image that cuts through the distortion.",
  },
  "Pop-Punk/Emo": {
    template: "rock-band",
    profile: "pop-punk-emo",
    proFilter: "Rock Era Architects",
    mood: "suburban chorus room",
    flowStart: 3,
    focus: ["diary specificity", "huge chorus", "bridge confession"],
    firstMove: "Write the line a crowd can scream like a diary entry.",
  },
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function workflowSlug(lane = state.lane) {
  return String(lane || "R&B").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function applyWorkflowChrome() {
  document.body.dataset.workflow = workflowSlug();
  const preset = workflowPresets[state.lane] || workflowPresets["R&B"];
  const label = $("#workflowMoodLabel");
  if (label) label.textContent = `${state.lane} | ${preset.mood || "writing room"}`;
  renderSessionStrip();
}

const sketchRecorderState = {
  recorder: null,
  stream: null,
  chunks: [],
  startedAt: 0,
  timerId: null,
  meterFrame: null,
  audioContext: null,
  analyser: null,
  meterData: null,
  recognition: null,
  transcriptSupported: false,
  transcriptActive: false,
  transcriptFinal: "",
  transcriptRestarting: false,
  transcriptBase: "",
  takes: [],
  currentTakeId: null,
};

const createModes = {
  start: {
    title: "Start the session",
    body: "Load the beat, choose workflow, and check the lane rules before writing.",
    panels: ["player", "genre"],
  },
  flow: {
    title: "Catch ideas",
    body: "Run the beat and save phrases, pockets, scenes, hooks, and turns without arranging them yet.",
    panels: ["flow", "player"],
  },
  record: {
    title: "Record sketches",
    body: "Capture rough vocal, melody, and flow takes. Play them back, transcribe, and grade the pass.",
    panels: ["record", "player"],
  },
  write: {
    title: "Write the song",
    body: "Turn captures and takes into concept, hook target, freewrite, and notes.",
    panels: ["notebook", "coach"],
  },
  shape: {
    title: "Shape the record",
    body: "Choose the song form, assign section jobs, and tighten the structure.",
    panels: ["structure", "coach", "genre"],
  },
};

function setView(view) {
  const visibleNav = $$("[data-view]").find((button) => button.dataset.view === view && !button.hidden);
  if (!visibleNav && view !== "dashboard") {
    view = "dashboard";
  }
  const isNewView = state.activeView !== view;
  if (isNewView) {
    document.body.classList.add("is-view-transitioning");
    window.clearTimeout(setView.transitionTimer);
    setView.transitionTimer = window.setTimeout(() => {
      document.body.classList.remove("is-view-transitioning");
    }, 520);
  }
  state.activeView = view;
  document.body.dataset.activeView = view;
  $$(".view").forEach((section) => section.classList.toggle("is-active", section.id === view));
  $$(".nav-item").forEach((button) => button.classList.toggle("is-active", button.dataset.view === view));
  $("#viewTitle").textContent = viewTitles[view];
  if (view === "pros" || view === "cases") setFlowFlag("studyOpened");
  if (view === "create") window.requestAnimationFrame(renderCreationRoom);
  if (view === "dashboard") window.requestAnimationFrame(renderStudioFlow);
  if (view === "audio") window.requestAnimationFrame(updateAudioInterface);
  if (view === "workshop") window.requestAnimationFrame(renderWorkshop);
  if (view === "pros") window.requestAnimationFrame(renderPros);
  if (view === "risk") window.requestAnimationFrame(renderRiskLab);
  if (view === "session") window.requestAnimationFrame(renderSessionGreats);
  if (view === "mixguide") window.requestAnimationFrame(renderMixGuide);
  if (view === "glossary") window.requestAnimationFrame(renderGlossary);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function activeAppMode() {
  return appModes[state.appMode] || appModes.songwriter;
}

function persistAppMode() {
  localStorage.setItem("songlabAppMode", state.appMode);
}

function loadAppMode() {
  const saved = localStorage.getItem("songlabAppMode");
  if (appModes[saved]) state.appMode = saved;
}

function loadProficiency() {
  const saved = localStorage.getItem("songlabProficiency");
  if (proficiencyLevels[saved]) state.proficiency = saved;
}

function setProficiency(level, { silent = false } = {}) {
  state.proficiency = proficiencyLevels[level] ? level : "standard";
  localStorage.setItem("songlabProficiency", state.proficiency);
  renderAppModeChrome();
  ensureActiveViewAllowed();
  renderStudioFlow();
  renderCreateRoute();
  renderSessionStrip();
  if (!silent) showToast(`${proficiencyLevels[state.proficiency].label} level.`);
}

function ensureActiveViewAllowed() {
  if (state.activeView === "dashboard") return;
  const nav = $$("[data-view]").find((button) => button.dataset.view === state.activeView);
  if (!nav || nav.hidden || getComputedStyle(nav).display === "none") {
    setView("dashboard");
  }
}

const proficiencyRank = { starter: 0, simple: 1, standard: 2, deep: 3 };

// Progressive disclosure: each room unlocks at a minimum skill level so a
// beginner (Starter/Simple) sees a calm, focused app that grows with them.
// Standard and Deep show everything, so the default experience is unchanged.
const viewMinLevel = {
  dashboard: 0,
  create: 0,
  pros: 0,
  vault: 0,
  doctor: 1,
  workshop: 1,
  hooks: 1,
  cases: 2,
  session: 2,
  glossary: 2,
  audio: 2,
  mixguide: 2,
  analyst: 2,
  risk: 3,
};

function viewUnlockedAtLevel(view) {
  if (!view) return true;
  const min = viewMinLevel[view] ?? 0;
  const current = proficiencyRank[state.proficiency] ?? 2;
  return current >= min;
}

function renderAppModeChrome() {
  const mode = activeAppMode();
  const engineerLens = state.appMode === "engineer" ? activeEngineerLens() : null;
  const beginner = state.proficiency === "starter" || state.proficiency === "simple";
  const proficiency = proficiencyLevels[state.proficiency] || proficiencyLevels.standard;
  document.body.dataset.activeMode = state.appMode;
  document.body.dataset.activeView = state.activeView;
  document.body.dataset.proficiency = state.proficiency;
  applyWorkflowChrome();
  $("#brandModeLabel").textContent = mode.brand;
  viewTitles.dashboard = mode.homeTitle || "Home";
  $("#dashboardModeEyebrow").textContent = mode.eyebrow;
  $("#dashboardModeTitle").textContent = beginner
    ? proficiency.dashboardTitle[state.appMode]
    : engineerLens ? `Engineer the ${state.lane} record.` : mode.title;
  $("#dashboardModeCopy").textContent = beginner
    ? proficiency.dashboardCopy[state.appMode]
    : engineerLens ? `${engineerLens.capture} ${engineerLens.mix}` : mode.copy;
  const proficiencySelect = $("#proficiencySelect");
  if (proficiencySelect) proficiencySelect.value = state.proficiency;
  const modeRailEyebrow = $("#modeRailEyebrow");
  const modeRailCopy = $("#modeRailCopy");
  if (modeRailEyebrow) modeRailEyebrow.textContent = mode.railEyebrow;
  if (modeRailCopy) modeRailCopy.textContent = mode.railCopy;
  $$("[data-app-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.appMode === state.appMode);
  });
  $$("[data-view], [data-view-jump]").forEach((button) => {
    const view = button.dataset.view || button.dataset.viewJump;
    const modes = (button.dataset.modes || "songwriter producer artist").split(/\s+/);
    button.hidden = !modes.includes(state.appMode) || !viewUnlockedAtLevel(view);
  });
  $$(".nav-section-label").forEach((label) => {
    let next = label.nextElementSibling;
    let hasVisible = false;
    while (next && !next.classList.contains("nav-section-label")) {
      if (next.matches?.("[data-view]") && !next.hidden) hasVisible = true;
      next = next.nextElementSibling;
    }
    label.hidden = !hasVisible;
  });
  if (state.activeView === "dashboard") $("#viewTitle").textContent = viewTitles.dashboard;
  renderModeLanding();
  renderSessionStrip();
}

function modeActionButton(action) {
  const buttonClass = action.primary ? "primary-action" : "secondary-action";
  const createMode = action.createMode ? ` data-open-create-mode="${action.createMode}"` : "";
  const glossarySection = action.glossarySection ? ` data-open-glossary-section="${action.glossarySection}"` : "";
  return `
    <button class="${buttonClass}" data-open-view="${action.view}"${createMode}${glossarySection} type="button">
      <svg><use href="#${action.icon}"></use></svg>
      ${action.label}
    </button>
  `;
}

function renderModeLanding() {
  const mode = activeAppMode();
  const engineerLens = state.appMode === "engineer" ? activeEngineerLens() : null;
  const beginner = state.proficiency === "starter" || state.proficiency === "simple";
  const starter = state.proficiency === "starter";
  const proficiency = proficiencyLevels[state.proficiency] || proficiencyLevels.standard;
  const actions = $("#modeHeroActions");
  const grid = $("#modePathwayGrid");
  if (!actions || !grid) return;
  $("#modePathEyebrow").textContent = mode.pathEyebrow;
  $("#modePathTitle").textContent = beginner ? proficiency.pathTitle : engineerLens ? `${state.lane} engineering path` : mode.pathTitle;
  $("#modePathCopy").textContent = beginner ? proficiency.pathCopy : engineerLens ? `${engineerLens.capture} ${engineerLens.master}` : mode.pathCopy;
  const actionsToShow = starter ? mode.actions.filter((action) => action.primary).slice(0, 2) : mode.actions;
  actions.innerHTML = actionsToShow.map(modeActionButton).join("");
  const pathways = starter ? mode.pathways.slice(0, 1) : state.proficiency === "simple" ? mode.pathways.slice(0, 3) : mode.pathways;
  grid.innerHTML = pathways
    .map((path) => {
      const createMode = path.createMode ? ` data-open-create-mode="${path.createMode}"` : "";
      const glossarySection = path.glossarySection ? ` data-open-glossary-section="${path.glossarySection}"` : "";
      return `
        <button class="mode-pathway-card" data-open-view="${path.view}"${createMode}${glossarySection} type="button">
          <span class="mode-pathway-step">${path.step}</span>
          <span class="mode-pathway-icon"><svg><use href="#${path.icon}"></use></svg></span>
          <strong>${path.title}</strong>
          <p>${path.body}</p>
        </button>
      `;
    })
    .join("");
}

function renderSessionStrip() {
  const mode = activeAppMode();
  const workflow = activeWorkflowPreset();
  const trackName = state.audio?.trackName && state.audio.trackName !== "No track loaded" ? state.audio.trackName : "No track loaded";
  const focus = state.appMode === "engineer"
    ? `${state.lane} translation`
    : workflow.focus?.[0] || workflow.firstMove || "Start the session";
  const simpleFocus = state.appMode === "artist"
    ? "Record one take"
    : state.appMode === "engineer"
      ? "Make it clear"
      : state.appMode === "producer"
        ? "Find the moment"
        : "Write the hook";
  const fields = [
    ["#sessionModeLabel", mode.label],
    ["#sessionGenreLabel", state.lane],
    ["#sessionAudioLabel", trackName],
    ["#sessionTempoLabel", state.audio?.bpm ? bpmReadout() : "BPM pending"],
    ["#sessionFocusLabel", state.proficiency === "starter" || state.proficiency === "simple" ? simpleFocus : focus],
  ];
  fields.forEach(([selector, value]) => {
    const node = $(selector);
    if (node) node.textContent = value;
  });
}

function setAppMode(modeId) {
  if (!appModes[modeId]) return;
  state.appMode = modeId;
  const mode = activeAppMode();
  state.creation.createMode = mode.createMode;
  persistAppMode();
  applyWorkflowPreset(mode.workflow, { silent: true, rerender: false });
  renderAppModeChrome();
  setView("dashboard");
  renderCreationRoom();
  showToast(`${mode.label} mode.`);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function activeProPlaybook() {
  return proPlaybooks.find((pro) => pro.id === state.activePro) || proPlaybooks[0];
}

function visibleProPlaybooks() {
  return proPlaybooks.filter((pro) => state.activeProFilter === "All" || pro.category === state.activeProFilter);
}

function identityVisual({ name, kicker, imageUrl = "", className = "identity-visual" }) {
  if (!imageUrl) return "";
  const safeName = escapeHtml(name);
  const safeKicker = escapeHtml(kicker || "Profile");
  return `
    <div class="${className}">
      <img src="${escapeHtml(imageUrl)}" alt="${safeName}" loading="lazy" />
      <em>${safeName}</em>
      <span>${safeKicker}</span>
    </div>
  `;
}

function renderProFilters() {
  const filters = ["All", ...new Set(proPlaybooks.map((pro) => pro.category))];
  $("#proFilters").innerHTML = filters
    .map((filter) => `
      <button class="filter-chip ${state.activeProFilter === filter ? "is-active" : ""}" type="button" data-pro-filter="${filter}">
        ${filter}
      </button>
    `)
    .join("");
}

function renderProList() {
  const visible = visibleProPlaybooks();
  if (!visible.some((pro) => pro.id === state.activePro)) {
    state.activePro = visible[0]?.id || proPlaybooks[0].id;
  }
  $("#proList").innerHTML = visible
    .map((pro) => {
      const index = proPlaybooks.findIndex((item) => item.id === pro.id);
      return `
      <button class="pro-card ${pro.id === state.activePro ? "is-active" : ""}" type="button" data-pro="${pro.id}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <strong>${pro.name}</strong>
          <small>${pro.archetype} | ${pro.method}</small>
        </div>
      </button>
    `;
    })
    .join("");
}

const streamStudyTags = ["Hook", "Concept", "Groove", "Structure", "Sonic Identity", "Vocal Space", "Replay"];

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character]));
}

function parseTimestampToSeconds(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return 0;

  if (/^\d+(\.\d+)?$/.test(raw)) return Math.max(0, Math.floor(Number(raw)));

  if (raw.includes(":")) {
    const parts = raw.split(":").map((part) => Number(part));
    if (parts.some((part) => !Number.isFinite(part))) return 0;
    return Math.max(0, Math.floor(parts.reduce((total, part) => (total * 60) + part, 0)));
  }

  const hours = Number(raw.match(/(\d+(?:\.\d+)?)\s*h/)?.[1] || 0);
  const minutes = Number(raw.match(/(\d+(?:\.\d+)?)\s*m/)?.[1] || 0);
  const seconds = Number(raw.match(/(\d+(?:\.\d+)?)\s*s/)?.[1] || 0);
  const total = (hours * 3600) + (minutes * 60) + seconds;
  return Number.isFinite(total) ? Math.max(0, Math.floor(total)) : 0;
}

function youtubeStartFromUrl(parsedUrl) {
  const rawStart = parsedUrl.searchParams.get("t") || parsedUrl.searchParams.get("start") || "";
  return parseTimestampToSeconds(rawStart);
}

function extractYoutubeId(parsedUrl) {
  const host = parsedUrl.hostname.replace(/^www\./, "");
  const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

  if (host === "youtu.be") return pathParts[0] || "";
  if (pathParts[0] === "shorts" || pathParts[0] === "embed") return pathParts[1] || "";
  return parsedUrl.searchParams.get("v") || "";
}

function buildStreamEmbed(rawUrl, timestamp) {
  const url = rawUrl.trim();
  const parsedUrl = new URL(url);
  const host = parsedUrl.hostname.replace(/^www\./, "");
  const typedSeconds = parseTimestampToSeconds(timestamp);

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Unsupported stream protocol");
  }

  if (host.includes("youtube.com") || host === "youtu.be") {
    const videoId = extractYoutubeId(parsedUrl);
    const startSeconds = typedSeconds || youtubeStartFromUrl(parsedUrl);
    if (videoId) {
      const params = new URLSearchParams({
        playsinline: "1",
        rel: "0",
      });
      if (startSeconds) params.set("start", String(startSeconds));
      if (window.location.origin.startsWith("http")) params.set("origin", window.location.origin);
      return {
        provider: "youtube",
        providerLabel: "YouTube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`,
        playerType: "video",
        height: 320,
        seconds: startSeconds,
      };
    }

    const playlistId = parsedUrl.searchParams.get("list");
    if (playlistId) {
      const params = new URLSearchParams({
        list: playlistId,
        playsinline: "1",
        rel: "0",
      });
      if (window.location.origin.startsWith("http")) params.set("origin", window.location.origin);
      return {
        provider: "youtube",
        providerLabel: "YouTube",
        embedUrl: `https://www.youtube-nocookie.com/embed/videoseries?${params.toString()}`,
        playerType: "video",
        height: 320,
        seconds: startSeconds,
      };
    }
  }

  if (host === "open.spotify.com") {
    const allowedTypes = ["track", "album", "playlist", "episode", "show"];
    const pathParts = parsedUrl.pathname.split("/").filter(Boolean);
    const typeIndex = pathParts.findIndex((part) => allowedTypes.includes(part));
    const type = pathParts[typeIndex];
    const id = pathParts[typeIndex + 1];
    if (type && id) {
      return {
        provider: "spotify",
        providerLabel: "Spotify",
        embedUrl: `https://open.spotify.com/embed/${encodeURIComponent(type)}/${encodeURIComponent(id)}?utm_source=generator`,
        playerType: "audio",
        height: type === "track" || type === "episode" ? 152 : 352,
        seconds: typedSeconds,
      };
    }
  }

  if (host === "music.apple.com" || host === "embed.music.apple.com") {
    const embedPath = parsedUrl.pathname;
    const embedSearch = parsedUrl.search;
    return {
      provider: "apple",
      providerLabel: "Apple Music",
      embedUrl: `https://embed.music.apple.com${embedPath}${embedSearch}`,
      playerType: "audio",
      height: 175,
      seconds: typedSeconds,
    };
  }

  if (host.includes("soundcloud.com") || host === "snd.sc") {
    return {
      provider: "soundcloud",
      providerLabel: "SoundCloud",
      embedUrl: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%2307847f&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=false`,
      playerType: "audio",
      height: 166,
      seconds: typedSeconds,
    };
  }

  return {
    provider: "link",
    providerLabel: "Link",
    embedUrl: "",
    playerType: "link",
    height: 0,
    seconds: typedSeconds,
  };
}

function streamRefsForPro(proId = state.activePro) {
  return state.streamRefs.filter((reference) => reference.proId === proId);
}

function suggestedSlotsForPro(proId = state.activePro) {
  return suggestedReferenceSlots[proId] || [];
}

function suggestedSlotById(proId, slotId) {
  return suggestedSlotsForPro(proId).find((slot) => slot.id === slotId);
}

function streamRefsForSlot(proId, slotId) {
  return streamRefsForPro(proId).filter((reference) => reference.slotId === slotId);
}

function extraStreamRefsForPro(proId) {
  const slotIds = new Set(suggestedSlotsForPro(proId).map((slot) => slot.id));
  return streamRefsForPro(proId).filter((reference) => !reference.slotId || !slotIds.has(reference.slotId));
}

function recordSearchUrl(slot, provider) {
  const query = encodeURIComponent(`${slot.artist} ${slot.title}`);
  if (provider === "spotify") return `https://open.spotify.com/search/${query}`;
  if (provider === "apple") return `https://music.apple.com/us/search?term=${query}`;
  if (provider === "youtube") return `https://www.youtube.com/results?search_query=${query}`;
  return `https://soundcloud.com/search?q=${query}`;
}

function streamUrlForSlot(slot) {
  return slot.url || curatedStreamUrls[slot.id] || "";
}

function providerLinksForSlot(slot) {
  const providerLabels = {
    spotify: "Spotify",
    apple: "Apple Music",
    soundcloud: "SoundCloud",
    youtube: "YouTube",
  };
  return ["spotify", "apple", "soundcloud", "youtube"].map((provider) => ({
    provider,
    label: providerLabels[provider],
    url: recordSearchUrl(slot, provider),
  }));
}

function normalizedStreamReference(reference) {
  if (!reference?.url) return reference;
  try {
    const embed = buildStreamEmbed(reference.url, reference.timestamp || "");
    return embed ? {
      ...reference,
      seconds: embed.seconds,
      provider: embed.provider,
      providerLabel: embed.providerLabel,
      embedUrl: embed.embedUrl,
      playerType: embed.playerType,
      height: embed.height,
    } : reference;
  } catch {
    return reference;
  }
}

function defaultReferenceForSlot(pro, slot) {
  const streamUrl = streamUrlForSlot(slot);
  if (!streamUrl) {
    return {
      id: `search-${pro.id}-${slot.id}`,
      proId: pro.id,
      slotId: slot.id,
      url: recordSearchUrl(slot, "youtube"),
      title: `${slot.artist} - ${slot.title}`,
      timestamp: slot.timestamp || "",
      seconds: parseTimestampToSeconds(slot.timestamp || ""),
      tag: slot.focus,
      note: slot.note,
      provider: "youtube-search",
      providerLabel: "YouTube Search",
      embedUrl: "",
      playerType: "link",
      height: 0,
      isDefault: true,
      isSearchFallback: true,
    };
  }
  try {
    const streamEmbed = buildStreamEmbed(streamUrl, slot.timestamp || "");
    return {
      id: `default-${pro.id}-${slot.id}`,
      proId: pro.id,
      slotId: slot.id,
      url: streamUrl,
      title: `${slot.artist} - ${slot.title}`,
      timestamp: slot.timestamp || (streamEmbed.seconds ? formatTime(streamEmbed.seconds) : ""),
      seconds: streamEmbed.seconds,
      tag: slot.focus,
      note: slot.note,
      provider: streamEmbed.provider,
      providerLabel: streamEmbed.providerLabel,
      embedUrl: streamEmbed.embedUrl,
      playerType: streamEmbed.playerType,
      height: streamEmbed.height,
      isDefault: true,
    };
  } catch {
    return null;
  }
}

function currentStreamEmbed(reference) {
  return normalizedStreamReference(reference);
}

function renderStreamPlayer(reference) {
  const playableReference = currentStreamEmbed(reference);
  if (!playableReference.embedUrl) {
    return `
      <a class="stream-link-card" href="${escapeHtml(reference.url)}" target="_blank" rel="noreferrer">
        Open ${escapeHtml(reference.providerLabel || "streaming reference")}
      </a>
    `;
  }

  const playerClass = playableReference.playerType === "video" ? "is-video" : "is-audio";
  const height = Number(playableReference.height) || 166;
  return `
    <div class="stream-embed ${playerClass}" style="--stream-height: ${height}px">
      <iframe
        src="${escapeHtml(playableReference.embedUrl)}"
        title="Streaming reference: ${escapeHtml(reference.title)}"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    </div>
  `;
}

function renderStreamReferenceCard(reference) {
  const playableReference = currentStreamEmbed(reference);
  const timestamp = playableReference.timestamp ? `<span class="tag">${escapeHtml(playableReference.timestamp)}</span>` : "";
  const defaultLabel = playableReference.isSearchFallback
    ? `<span class="tag">Streaming search</span>`
    : playableReference.isDefault
      ? `<span class="tag">Curated player</span>`
      : "";
  const providerHint = playableReference.provider === "youtube"
    ? `<p class="stream-provider-hint">If YouTube blocks inline playback here, use Open; the study prompt still starts at the same timestamp.</p>`
    : playableReference.isSearchFallback
      ? `<p class="stream-provider-hint">This song is linked to provider search because a direct official embed has not been curated yet.</p>`
    : "";
  const vaultAction = playableReference.isDefault ? "vault-default" : "vault";
  const vaultAttrs = playableReference.isDefault
    ? `data-slot-id="${escapeHtml(playableReference.slotId)}"`
    : `data-stream-id="${escapeHtml(playableReference.id)}"`;
  const removeButton = playableReference.isDefault
    ? ""
    : `<button type="button" data-stream-action="delete" data-stream-id="${escapeHtml(playableReference.id)}">Remove</button>`;

  return `
    <article class="stream-card">
      ${renderStreamPlayer(playableReference)}
      <div class="stream-card-copy">
        <div class="reference-meta">
          <span class="case-tag">${escapeHtml(playableReference.providerLabel)}</span>
          <span class="tag">${escapeHtml(playableReference.tag)}</span>
          ${timestamp}
          ${defaultLabel}
        </div>
        <strong>${escapeHtml(playableReference.title)}</strong>
        <p>${escapeHtml(playableReference.note || "Listen for the producer move, then add a study note after playback.")}</p>
        ${providerHint}
        <div class="marker-actions">
          <a class="ghost-button" href="${escapeHtml(playableReference.url)}" target="_blank" rel="noreferrer">Open</a>
          <button type="button" data-stream-action="${vaultAction}" ${vaultAttrs}>Save to Vault</button>
          ${removeButton}
        </div>
      </div>
    </article>
  `;
}

function lyricLaneForPro(pro) {
  const text = `${pro.category || ""} ${pro.lane || ""}`.toLowerCase();
  if (text.includes("gospel") || text.includes("worship") || text.includes("praise")) return "Gospel";
  if (text.includes("soul architect") || text.includes("classic soul") || text.includes("message soul") || text.includes("quiet storm") || text.includes("modern soul")) return "Soul";
  if (text.includes("neo-soul")) return "Neo-Soul";
  if (text.includes("r&b")) return "R&B";
  if (text.includes("neo")) return "Neo-Soul";
  if (text.includes("hip-hop") || text.includes("rap") || text.includes("trap")) return "Hip-Hop";
  if (text.includes("drill")) return "Drill";
  if (text.includes("country") || text.includes("americana")) return "Country";
  if (text.includes("afro") || text.includes("global")) return "Afrobeats";
  if (text.includes("punk") || text.includes("emo")) return "Pop-Punk/Emo";
  if (text.includes("grunge")) return "Grunge";
  if (text.includes("classic rock") || text.includes("arena") || text.includes("album rock")) return "Classic Rock";
  if (text.includes("rock")) return "Rock";
  if (text.includes("alternative") || text.includes("indie")) return "Alternative";
  if (text.includes("pop")) return "Pop";
  return "Song";
}

function lyricLensByFocus(slot, lane) {
  const focus = String(slot.focus || "").toLowerCase();
  const title = slot.title || "the title";
  if (focus.includes("concept") || focus.includes("story") || focus.includes("lyric")) {
    return {
      anchor: title,
      move: "The lyric gives the song a clear emotional premise before the production has to explain the mood.",
      why: `${lane} writing gets stronger when the listener can name the situation, not just feel the atmosphere.`,
      prompt: "Write the song's premise in one sentence, then add one object, setting, or behavior that proves it.",
    };
  }
  if (focus.includes("hook") || focus.includes("chorus") || focus.includes("payoff")) {
    return {
      anchor: title,
      move: "The title behaves like the memory engine: short enough to return, clear enough to survive the track.",
      why: "Hooks land when the listener knows what to remember and the phrase feels natural in the pocket.",
      prompt: "Write three versions of the title: plain, rhythmic, and emotional. Keep the one your mouth repeats first.",
    };
  }
  if (focus.includes("replay")) {
    return {
      anchor: title,
      move: "The lyric creates a repeatable emotional loop instead of resolving every question the first time.",
      why: "Replay value often comes from a phrase or situation that still has charge after the chorus ends.",
      prompt: "Write one line that feels unfinished in a useful way, then make the chorus return to it.",
    };
  }
  if (focus.includes("structure")) {
    return {
      anchor: title,
      move: "The lyric changes jobs by section: setup, pressure, release, then a return with new meaning.",
      why: "Structure feels musical when the words evolve, not just the drums and chords.",
      prompt: "Write the same title as a verse thought, a pre-chorus question, and a chorus answer.",
    };
  }
  if (focus.includes("groove") || focus.includes("bounce") || focus.includes("pocket") || focus.includes("rhythm")) {
    return {
      anchor: title,
      move: "The lyric is written as rhythm first, using phrase length, consonants, and pauses as part of the groove.",
      why: `${lane} records often become memorable because the words feel good in the body before they feel clever on paper.`,
      prompt: "Write four short phrases that answer the drums. Cut any word that makes the pocket stumble.",
    };
  }
  if (focus.includes("vocal") || focus.includes("performance")) {
    return {
      anchor: title,
      move: "The lyric leaves room for tone, breath, runs, ad-libs, or attitude to complete the meaning.",
      why: "A great vocal line is not only what is said; it is what the singer gets to perform between the words.",
      prompt: "Rewrite one line three ways: whispered, pleaded, and confidently thrown away. Keep the version with the clearest feeling.",
    };
  }
  if (focus.includes("sonic") || focus.includes("identity") || focus.includes("translation") || focus.includes("pressure")) {
    return {
      anchor: title,
      move: "The lyric and sound design point at the same identity, so the record feels like a world instead of a beat with words.",
      why: "Sonic identity sticks when the title, vocal posture, and production texture all describe the same character.",
      prompt: "Name the character the beat creates, then write three lines that only that character would say.",
    };
  }
  return {
    anchor: title,
    move: "The lyric turns the record's main feeling into a usable phrase, image, or perspective.",
    why: `${lane} songwriting works when technical choices serve a clear human moment.`,
    prompt: "Write one original line that captures the same craft move without borrowing the song's wording or story.",
  };
}

function lyricLensForSlot(pro, slot) {
  if (slot.lyricLens) return slot.lyricLens;
  const lane = lyricLaneForPro(pro);
  const lens = lyricLensByFocus(slot, lane);
  if (lane === "Afrobeats" && /groove|bounce|pocket|rhythm/i.test(slot.focus || "")) {
    return {
      anchor: slot.title,
      move: "The lyric works like percussion: short, open-voweled, and easy to place inside the bounce.",
      why: "For groove-first songs, the phrase has to travel through movement before it asks to be analyzed.",
      prompt: "Write a two-line hook with mostly open vowels. If it does not feel good looped over drums, simplify it.",
    };
  }
  if (lane === "R&B" && /vocal|performance|hook|concept/i.test(slot.focus || "")) {
    return {
      anchor: slot.title,
      move: "The lyric creates intimacy by giving the singer a specific emotional posture, not just a pretty melody.",
      why: "R&B lands when desire, regret, vulnerability, or seduction feels performable in the voice.",
      prompt: "Write one conversational line that sounds like it was said too close to the microphone.",
    };
  }
  if (lane === "Gospel" && /choir|testimony|praise|worship|hook|payoff/i.test(slot.focus || "")) {
    return {
      anchor: slot.title,
      move: "The lyric turns a personal truth into language a room can repeat together.",
      why: "Gospel writing needs spiritual clarity, communal response, and a phrase that can intensify through repetition.",
      prompt: "Write one testimony line, one choir answer, and one vamp phrase that can grow without changing the message.",
    };
  }
  if (lane === "Alternative" && /concept|structure|sonic|identity/i.test(slot.focus || "")) {
    return {
      anchor: slot.title,
      move: "The lyric uses a distinct angle or image so the texture feels intentional instead of vague.",
      why: "Alternative writing can be strange, but it still needs one concrete door the listener can enter.",
      prompt: "Write one unusual image, then attach it to a plain emotional truth.",
    };
  }
  return lens;
}

function normalizedCreditKey(value = "") {
  return String(value).toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function creditsForReferenceSlot(pro, slot) {
  const direct = referenceCredits[slot.id] || referenceCredits[normalizedCreditKey(slot.title)];
  if (direct) return direct;
  const titleKey = normalizedCreditKey(slot.title);
  const artistKey = normalizedCreditKey(slot.artist).split("-")[0] || "";
  const matchingStudy = caseStudies.find((study) => (
    normalizedCreditKey(study.title) === titleKey
    && normalizedCreditKey(study.artist).includes(artistKey)
  ));
  if (matchingStudy && caseCredits[matchingStudy.id]) return caseCredits[matchingStudy.id];
  return {
    producers: [pro.name],
    songwriters: ["Needs liner-note / rights-database verification."],
    recordingEngineering: ["Needs liner-note / rights-database verification."],
    mixEngineers: ["Needs liner-note / rights-database verification."],
    mastering: ["Needs liner-note / rights-database verification."],
    notes: "Credit shell added so this reference can be completed without changing the interface.",
    status: "pending",
  };
}

function renderSlotCreditGroup(label, values = []) {
  const list = Array.isArray(values) ? values.filter(Boolean) : [values].filter(Boolean);
  if (!list.length) return "";
  return `
    <article>
      <span>${escapeHtml(label)}</span>
      <p>${list.map(escapeHtml).join("<br>")}</p>
    </article>
  `;
}

function renderReferenceCredits(pro, slot) {
  const credits = creditsForReferenceSlot(pro, slot);
  const status = credits.status === "pending" ? "Needs verification" : credits.status === "partial" ? "Partial credits" : "Verified credits";
  return `
    <details class="slot-credits-details">
      <summary>
        <span>Credits Lens</span>
        <em>${escapeHtml(status)}</em>
      </summary>
      <div class="slot-credits-grid">
        ${renderSlotCreditGroup("Producer", credits.producers)}
        ${renderSlotCreditGroup("Songwriter", credits.songwriters)}
        ${renderSlotCreditGroup("Arranger", credits.arrangers)}
        ${renderSlotCreditGroup("Recording / engineering", credits.recordingEngineering)}
        ${renderSlotCreditGroup("Mix engineer", credits.mixEngineers)}
        ${renderSlotCreditGroup("Mastering", credits.mastering)}
      </div>
      ${credits.notes ? `<p class="slot-credits-note">${escapeHtml(credits.notes)}</p>` : ""}
    </details>
  `;
}

function renderSuggestedReferenceSlot(pro, slot) {
  const attachedReferences = streamRefsForSlot(pro.id, slot.id);
  const defaultReference = defaultReferenceForSlot(pro, slot);
  const hasDirectPlayer = attachedReferences.some((reference) => currentStreamEmbed(reference)?.embedUrl) || Boolean(defaultReference?.embedUrl);
  const slotLyricLens = lyricLensForSlot(pro, slot);
  const lyricLens = slotLyricLens
    ? `
      <div class="lyric-lens">
        <div class="lyric-lens-header">
          <span>Lyric Lens</span>
          ${slotLyricLens.anchor ? `<strong>${escapeHtml(slotLyricLens.anchor)}</strong>` : ""}
        </div>
        <div class="lyric-lens-grid">
          <article>
            <span>Move</span>
            <p>${escapeHtml(slotLyricLens.move)}</p>
          </article>
          <article>
            <span>Why It Lands</span>
            <p>${escapeHtml(slotLyricLens.why)}</p>
          </article>
          <article>
            <span>Write It</span>
            <p>${escapeHtml(slotLyricLens.prompt)}</p>
          </article>
        </div>
      </div>
    `
    : "";
  const searchLinks = providerLinksForSlot(slot)
    .map((link) => `<a class="ghost-button" href="${escapeHtml(link.url)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`)
    .join("");
  const playerMarkup = attachedReferences.length
    ? attachedReferences.map(renderStreamReferenceCard).join("")
    : defaultReference
      ? renderStreamReferenceCard(defaultReference)
      : "";
  const slotStatus = hasDirectPlayer ? "Direct player" : "Streaming links";
  const replaceControls = `
      <details class="slot-replace-details">
        <summary>${hasDirectPlayer ? "Use a different official link" : "Add direct embedded player"}</summary>
        <div class="slot-attach-row">
          <label>
            ${hasDirectPlayer ? "Replace player URL" : "Official streaming URL"}
            <input data-slot-url type="url" placeholder="${hasDirectPlayer ? "Optional: paste a different official link" : "Paste YouTube, Spotify, Apple Music, or SoundCloud URL"}" />
          </label>
          <label>
            Moment
            <input data-slot-time type="text" value="${escapeHtml(slot.timestamp)}" />
          </label>
          <button class="primary-action" type="button" data-stream-action="add-slot" data-slot-id="${escapeHtml(slot.id)}">
            <svg><use href="#icon-plus"></use></svg>
            Replace Player
          </button>
        </div>
      </details>
    `;

  return `
    <article class="suggested-slot" data-slot-card="${escapeHtml(slot.id)}">
      <div class="slot-main">
        <div>
          <div class="reference-meta">
            <span class="case-tag">${escapeHtml(slot.focus)}</span>
            <span class="tag">${escapeHtml(slot.timestamp)}</span>
          </div>
          <h3>${escapeHtml(slot.title)}</h3>
          <p>${escapeHtml(slot.artist)}</p>
        </div>
        <span class="slot-status ${hasDirectPlayer ? "is-ready" : "is-linked"}">${slotStatus}</span>
      </div>

      <div class="slot-study-prompt">
        <span>Listen for</span>
        <strong>${escapeHtml(slot.listenFor)}</strong>
        <p>${escapeHtml(slot.note)}</p>
      </div>

      ${lyricLens}

      ${renderReferenceCredits(pro, slot)}

      <div class="slot-provider-actions" aria-label="Open streaming provider searches">
        <span>Open on</span>
        <div class="slot-search-actions">${searchLinks}</div>
      </div>

      ${replaceControls}

      <div class="slot-player-stack">
        ${playerMarkup}
      </div>
    </article>
  `;
}

function renderStreamReferencePanel(pro) {
  const slots = suggestedSlotsForPro(pro.id);
  const references = streamRefsForPro(pro.id);
  const extraReferences = extraStreamRefsForPro(pro.id);
  const directSlotCount = slots.filter((slot) => streamRefsForSlot(pro.id, slot.id).some((reference) => currentStreamEmbed(reference)?.embedUrl) || streamUrlForSlot(slot)).length;
  const scoreLabel = slots.length ? `${slots.length}/${slots.length} linked | ${directSlotCount} direct` : `${references.length}`;
  const tagOptions = streamStudyTags.map((tag) => `<option>${tag}</option>`).join("");
  return `
    <section class="tool-panel stream-reference-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Streaming references</span>
          <h2>Listen first, then study the method</h2>
        </div>
        <span class="score-pill">${scoreLabel}</span>
      </div>

      <div class="listening-mode">
        <article>
          <span>1</span>
          <strong>Play the record</strong>
          <p>Start at the suggested moment and hear the songwriting move before reading more.</p>
        </article>
        <article>
          <span>2</span>
          <strong>Name the job</strong>
          <p>Decide whether the moment solves hook, groove, structure, concept, or sonic identity.</p>
        </article>
        <article>
          <span>3</span>
          <strong>Steal the principle</strong>
          <p>Save only the transferable move, not the artist's exact sound or context.</p>
        </article>
      </div>

      <div class="suggested-slot-grid">
        ${slots.length
          ? slots.map((slot) => renderSuggestedReferenceSlot(pro, slot)).join("")
          : `<article class="stream-empty"><strong>No suggested slots yet.</strong><p>Add any official streaming reference below.</p></article>`}
      </div>

      <div class="stream-form" aria-label="Add another streaming reference">
        <span class="eyebrow">Add another record</span>
        <div class="stream-form-grid">
          <label>
            Streaming URL
            <input id="streamUrlInput" type="url" placeholder="Spotify, Apple Music, SoundCloud, or YouTube link" />
          </label>
          <label>
            Record title
            <input id="streamTitleInput" type="text" placeholder="Artist - Song" />
          </label>
          <label>
            Moment
            <input id="streamTimeInput" type="text" placeholder="0:42" />
          </label>
          <label>
            Focus
            <select id="streamTagInput">${tagOptions}</select>
          </label>
        </div>
        <label>
          Study note
          <textarea id="streamNoteInput" rows="3" placeholder="What should a producer listen for here?"></textarea>
        </label>
        <div class="button-row">
          <button class="primary-action" type="button" data-stream-action="add">
            <svg><use href="#icon-plus"></use></svg>
            Add Embed
          </button>
        </div>
      </div>

      <div class="stream-reference-list">
        ${extraReferences.length
          ? extraReferences.map(renderStreamReferenceCard).join("")
          : ""}
      </div>
    </section>
  `;
}

function scrollToStreamingReferences() {
  const panel = document.querySelector(".stream-reference-panel");
  if (!panel) return;
  panel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function craftMoveIsBagged(proId) {
  return state.references.some((reference) => reference.kind === "craft-move" && reference.proId === proId);
}

function renderCraftLoop(pro) {
  const draft = state.craftDrafts[pro.id] || "";
  const bagged = craftMoveIsBagged(pro.id);
  return `
    <section class="tool-panel craft-loop" aria-label="Steal this move">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Steal this move</span>
          <h2>Make ${pro.name}'s move your own</h2>
        </div>
        <span class="craft-bag-status${bagged ? " is-bagged" : ""}">
          <svg><use href="#icon-bookmark"></use></svg>
          ${bagged ? "In your bag" : "Not bagged yet"}
        </span>
      </div>

      <ol class="craft-steps">
        <li class="craft-step">
          <span class="craft-step-num">1</span>
          <div class="craft-step-body">
            <span class="craft-step-label">Steal the move</span>
            <p>${pro.proMove}</p>
            <p class="craft-listen">Listen for &mdash; ${pro.listenFor[0]}.</p>
          </div>
        </li>
        <li class="craft-step">
          <span class="craft-step-num">2</span>
          <div class="craft-step-body">
            <span class="craft-step-label">Know why it works</span>
            <p>${pro.thesis}</p>
            <p class="craft-caveat">What you can&rsquo;t copy &mdash; ${pro.cannotCopy}</p>
          </div>
        </li>
        <li class="craft-step is-you">
          <span class="craft-step-num">3</span>
          <div class="craft-step-body">
            <span class="craft-step-label">Now you try &mdash; your song, your words</span>
            <p class="craft-prompt">${pro.drill}</p>
            <textarea class="craft-input" data-craft-input rows="4" placeholder="Write your version here. SongLab won't write this part for you &mdash; that's yours.">${escapeHtml(draft)}</textarea>
          </div>
        </li>
        <li class="craft-step">
          <span class="craft-step-num">4</span>
          <div class="craft-step-body">
            <span class="craft-step-label">Bag the trick</span>
            <p>Keep the move and your own take together. It&rsquo;s now a tool you can reuse on any song.</p>
            <button class="primary-action" type="button" data-pro-action="bag">
              <svg><use href="#icon-bookmark"></use></svg>
              ${bagged ? "Update my bag" : "Add to my bag"}
            </button>
          </div>
        </li>
      </ol>
    </section>
  `;
}

function saveCraftMoveToBag() {
  const pro = activeProPlaybook();
  const attempt = (state.craftDrafts[pro.id] || "").trim();
  if (!attempt) {
    showToast("Write your version first — that's the whole point.");
    const input = $(".craft-input");
    if (input) input.focus();
    return;
  }
  state.references = state.references.filter(
    (reference) => !(reference.kind === "craft-move" && reference.proId === pro.id),
  );
  state.references.unshift({
    kind: "craft-move",
    proId: pro.id,
    title: `${pro.name}: ${pro.method}`,
    use: pro.proMove,
    yours: attempt,
    replay: pro.drill,
    lane: pro.lane,
  });
  persistReferences();
  renderReferences();
  renderProDetail();
  showToast("Added to your bag of tricks.");
}

function renderProDetail() {
  const pro = activeProPlaybook();
  const bars = Array.from({ length: 18 }, (_, index) => 28 + Math.abs(Math.sin((index + pro.id.length) * 0.7)) * 68);
  $("#proDetail").innerHTML = `
    <section class="pro-spotlight">
      <div class="pro-copy">
        <span class="eyebrow">${pro.category} | ${pro.lane}</span>
        <h2>${pro.name}</h2>
        <h3>${pro.archetype}: ${pro.method}</h3>
        <p>${pro.thesis}</p>
        <div class="button-row">
          <button class="primary-action" type="button" data-pro-action="play">
            <svg><use href="#icon-play"></use></svg>
            Play Sketch
          </button>
          <button class="secondary-action" type="button" data-pro-action="listen">
            <svg><use href="#icon-headphones"></use></svg>
            Start Listening
          </button>
          <button class="secondary-action" type="button" data-pro-action="load-audio">
            <svg><use href="#icon-headphones"></use></svg>
            Load in Audio Lab
          </button>
          <button class="secondary-action" type="button" data-pro-action="save">
            <svg><use href="#icon-bookmark"></use></svg>
            Save Move
          </button>
        </div>
      </div>
      <div class="pro-audio-visual" aria-hidden="true">
        <div class="pro-bars">${bars.map((height) => `<i style="height:${height}%"></i>`).join("")}</div>
        <span>${pro.sketchName}</span>
      </div>
    </section>

    ${renderCraftLoop(pro)}

    ${renderStreamReferencePanel(pro)}

    <section class="genome-grid">
      <article class="tool-panel genome-card">
        <span class="eyebrow">Superpower</span>
        <strong>${pro.superpower}</strong>
      </article>
      <article class="tool-panel genome-card">
        <span class="eyebrow">Repeatable process</span>
        <strong>${pro.process}</strong>
      </article>
      <article class="tool-panel genome-card">
        <span class="eyebrow">What transfers</span>
        <strong>${pro.transfers}</strong>
      </article>
      <article class="tool-panel genome-card warning">
        <span class="eyebrow">Do not copy</span>
        <strong>${pro.cannotCopy}</strong>
      </article>
    </section>

    <section class="tool-panel os-card">
      <span class="eyebrow">Producer operating system</span>
      <strong>${pro.osMove}</strong>
    </section>

    <section class="tool-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">What to listen for</span>
          <h2>Three signals</h2>
        </div>
      </div>
      <div class="signal-grid">
        ${pro.listenFor.map((item) => `<span>${item}</span>`).join("")}
      </div>
    </section>

    <section class="tool-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Studio translation</span>
          <h2>How to apply it</h2>
        </div>
      </div>
      <div class="translation-grid">
        ${pro.breakdown
          .map((item, index) => `
            <article>
              <span>${index + 1}</span>
              <strong>${item}</strong>
            </article>
          `)
          .join("")}
      </div>
    </section>
  `;
}

function renderPros() {
  renderProFilters();
  renderProList();
  renderProDetail();
}

function noiseAt(index) {
  const x = Math.sin(index * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

function pulse(position, width = 0.12, decay = 16) {
  return position < width ? Math.exp(-position * decay) : 0;
}

function chordTone(frequencies, time, gain = 1) {
  return frequencies.reduce((sum, frequency, index) => sum + Math.sin(2 * Math.PI * frequency * time) * (gain / (index + 1.8)), 0);
}

function createWavBlobFromData(data, sampleRate) {
  const buffer = new ArrayBuffer(44 + data.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i += 1) view.setUint8(offset + i, string.charCodeAt(i));
  };
  writeString(0, "RIFF");
  view.setUint32(4, 36 + data.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, data.length * 2, true);
  let offset = 44;
  for (let i = 0; i < data.length; i += 1) {
    const sample = clamp(data[i], -1, 1);
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }
  return new Blob([view], { type: "audio/wav" });
}

function createProSketchBlob(pro) {
  const sampleRate = 44100;
  const duration = 15;
  const length = sampleRate * duration;
  const data = new Float32Array(length);
  const sketchSettings = {
    "engineered-hook": { bpm: 112, root: 196, swing: 0.02 },
    "collab-clarity": { bpm: 98, root: 174.6, swing: 0.025 },
    "artist-lift": { bpm: 92, root: 164.8, swing: 0.04 },
    "brand-world": { bpm: 74, root: 110, swing: 0.01 },
    "star-arc": { bpm: 86, root: 174.6, swing: 0.03 },
    chameleon: { bpm: 90, root: 146.8, swing: 0.05 },
    atmosphere: { bpm: 72, root: 130.8, swing: 0.02 },
    "rnb-craft": { bpm: 82, root: 146.8, swing: 0.055 },
    "hook-density": { bpm: 96, root: 185, swing: 0.035 },
    "commercial-bounce": { bpm: 102, root: 220, swing: 0.025 },
    "sonic-identity": { bpm: 88, root: 130.8, swing: 0.065 },
    "classic-rnb": { bpm: 78, root: 164.8, swing: 0.04 },
    "soul-groove": { bpm: 92, root: 146.8, swing: 0.07 },
    "global-groove": { bpm: 104, root: 196, swing: 0.06 },
    "minimal-groove": { bpm: 100, root: 174.6, swing: 0.075 },
    "melody-movement": { bpm: 106, root: 220, swing: 0.045 },
    "hybrid-pop": { bpm: 101, root: 185, swing: 0.052 },
    "groove-future": { bpm: 111, root: 146.8, swing: 0.09 },
    editor: { bpm: 72, root: 164.8, swing: 0.015 },
    curator: { bpm: 84, root: 196, swing: 0.035 },
    "emotional-experiment": { bpm: 70, root: 174.6, swing: 0.025 },
    "sonic-risk": { bpm: 94, root: 146.8, swing: 0.04 },
    "rock-dynamics": { bpm: 132, root: 164.8, swing: 0.01 },
    "sound-world": { bpm: 82, root: 146.8, swing: 0.055 },
    "genre-translator": { bpm: 96, root: 185, swing: 0.04 },
    culture: { bpm: 104, root: 220, swing: 0.03 },
    vision: { bpm: 88, root: 146.8, swing: 0.025 },
    standards: { bpm: 92, root: 130.8, swing: 0.015 },
    ecosystem: { bpm: 100, root: 196, swing: 0.045 },
  };
  const settings = sketchSettings[pro.sketch] || sketchSettings["engineered-hook"];
  const beat = 60 / settings.bpm;
  const root = settings.root;
  const chordSets = [
    [root, root * 1.25, root * 1.5, root * 2],
    [root * 0.84, root * 1.05, root * 1.26, root * 1.68],
    [root * 0.75, root * 0.94, root * 1.12, root * 1.5],
    [root * 0.89, root * 1.12, root * 1.33, root * 1.78],
  ];

  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const section = t / duration;
    const beatFloat = t / beat;
    const beatPosition = (beatFloat % 1 + settings.swing * Math.sin(Math.floor(beatFloat))) % 1;
    const beatIndex = Math.floor(beatFloat) % 4;
    const barIndex = Math.floor(beatFloat / 4);
    const chord = chordSets[barIndex % chordSets.length];
    const lift = section > 0.48 ? 1.28 : 0.72;
    const kick = pulse(beatPosition, 0.16, 18) * Math.sin(2 * Math.PI * (52 + beatPosition * 32) * t) * 0.38;
    const snare = (beatIndex === 1 || beatIndex === 3) ? pulse(beatPosition, 0.12, 22) * noiseAt(i) * 0.16 : 0;
    const hat = pulse((beatFloat * 2) % 1, 0.055, 34) * noiseAt(i + 300) * 0.075;
    let sample = 0;

    if (pro.sketch === "brand-world" || pro.sketch === "vision") {
      const bell = Math.sin(2 * Math.PI * (root * [2.4, 2.7, 1.8, 2.25][barIndex % 4]) * t) * pulse((beatFloat / 2) % 1, 0.35, 5) * 0.22;
      const sub = Math.sin(2 * Math.PI * (root * 0.5) * t) * (0.28 + 0.08 * Math.sin(t * 3));
      sample = kick * 0.7 + snare + hat * 0.45 + bell + sub;
    } else if (pro.sketch === "sonic-identity" || pro.sketch === "sonic-risk") {
      const weird = Math.sin(2 * Math.PI * (root * 3.05 + Math.sin(t * 24) * 18) * t) * pulse((beatFloat * 1.5) % 1, 0.22, 9) * 0.24;
      sample = kick * 0.55 + snare + hat + weird + chordTone(chord, t, 0.09);
    } else if (["rnb-craft", "classic-rnb", "soul-groove", "standards"].includes(pro.sketch)) {
      const rhodes = chordTone(chord, t, 0.16) * (0.45 + 0.55 * pulse((beatFloat / 2) % 1, 0.5, 2));
      const bass = Math.sin(2 * Math.PI * (chord[0] * 0.5 + [0, 7, 4, 11][beatIndex]) * t) * 0.18;
      const stack = Math.sin(2 * Math.PI * (chord[2] * lift) * t) * pulse((beatFloat / 4) % 1, 0.32, 4) * 0.12;
      sample = kick * 0.45 + snare * 0.65 + hat * 0.42 + rhodes + bass + stack;
    } else if (pro.sketch === "hook-density") {
      const motifPhase = (beatFloat * 2) % 1;
      const motifFreq = [root * 1.5, root * 1.5, root * 1.68, root * 1.25][Math.floor(beatFloat * 2) % 4];
      const motif = Math.sin(2 * Math.PI * motifFreq * t) * pulse(motifPhase, 0.38, 5) * 0.22;
      const answer = Math.sin(2 * Math.PI * (motifFreq * 1.5) * t) * pulse((motifPhase + 0.5) % 1, 0.22, 8) * 0.1;
      sample = kick * 0.45 + snare + hat * 0.65 + motif + answer + chordTone(chord, t, 0.07);
    } else if (["artist-lift", "star-arc", "rock-dynamics", "genre-translator"].includes(pro.sketch)) {
      const intimate = chordTone(chord, t, section < 0.45 ? 0.12 : 0.07);
      const wide = section > 0.48 ? chordTone(chord.map((f) => f * 2), t, 0.14) : 0;
      const tom = section > 0.38 && beatIndex === 3 ? pulse(beatPosition, 0.18, 12) * Math.sin(2 * Math.PI * 88 * t) * 0.18 : 0;
      sample = kick * (section > 0.45 ? 0.55 : 0.16) + snare * (section > 0.45 ? 0.9 : 0.2) + hat * (section > 0.45 ? 0.6 : 0.1) + intimate + wide + tom;
    } else if (["commercial-bounce", "ecosystem", "global-groove", "minimal-groove", "melody-movement", "hybrid-pop", "groove-future", "culture"].includes(pro.sketch)) {
      const pluck = Math.sin(2 * Math.PI * ([root * 2, root * 2.25, root * 1.5, root * 1.68][beatIndex]) * t) * pulse((beatFloat * 2) % 1, 0.18, 12) * 0.2;
      const shaker = pulse((beatFloat * 4) % 1, 0.04, 38) * noiseAt(i + 1400) * 0.05;
      const chant = ["ecosystem", "culture", "melody-movement"].includes(pro.sketch) ? Math.sin(2 * Math.PI * (root * 1.5) * t) * pulse((beatFloat / 2) % 1, 0.24, 9) * 0.13 : 0;
      sample = kick * 0.62 + snare * 0.72 + hat * 0.58 + shaker + pluck + chant + chordTone(chord, t, 0.055);
    } else if (["editor", "atmosphere", "curator", "sound-world", "emotional-experiment", "chameleon", "collab-clarity"].includes(pro.sketch)) {
      const pad = chordTone(chord, t, pro.sketch === "editor" ? 0.075 : 0.13);
      const texture = Math.sin(2 * Math.PI * (root * 2.01 + Math.sin(t * 3) * 7) * t) * pulse((beatFloat / 3) % 1, 0.5, 3) * 0.08;
      const softDrum = pro.sketch === "editor" ? 0 : kick * 0.18 + snare * 0.2 + hat * 0.18;
      sample = softDrum + pad + texture;
    } else {
      const hookNote = [root * 1.5, root * 1.68, root * 2, root * 1.68][Math.floor(beatFloat) % 4];
      const hook = Math.sin(2 * Math.PI * hookNote * t) * pulse(beatPosition, 0.42, 4.8) * (section > 0.35 ? 0.25 : 0.14);
      const liftPad = section > 0.45 ? chordTone(chord.map((f) => f * 2), t, 0.1) : 0;
      sample = kick * 0.5 + snare + hat * 0.7 + hook + liftPad + chordTone(chord, t, 0.06);
    }

    const fadeIn = Math.min(1, t / 0.05);
    const fadeOut = Math.min(1, (duration - t) / 0.28);
    data[i] = clamp(sample * fadeIn * fadeOut * 0.88, -0.95, 0.95);
  }

  return createWavBlobFromData(data, sampleRate);
}

async function playProSketch() {
  const pro = activeProPlaybook();
  const audio = $("#proAudioElement");
  if (state.proAudioUrl) URL.revokeObjectURL(state.proAudioUrl);
  state.proAudioUrl = URL.createObjectURL(createProSketchBlob(pro));
  audio.src = state.proAudioUrl;
  audio.load();
  try {
    await audio.play();
    showToast(`Playing ${pro.sketchName}.`);
  } catch {
    showToast("Click Play Sketch again if the browser blocked audio start.");
  }
}

async function loadProSketchIntoAudioLab() {
  const pro = activeProPlaybook();
  await loadAudioBlob(createProSketchBlob(pro), `${pro.name} - ${pro.sketchName}.wav`);
  setView("audio");
}

function saveProMoveToVault() {
  const pro = activeProPlaybook();
  state.references.unshift({
    title: `${pro.name}: ${pro.method}`,
    use: pro.proMove,
    replay: pro.drill,
    lane: pro.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Pro move saved to Reference Vault.");
}

function activeWorkshopModule() {
  const modules = activeWorkshopModules();
  return modules.find((module) => module.id === state.activeWorkshop) || modules[0];
}

function activeWorkshopModules() {
  const profile = activeGenreProfile();
  return workshopGenrePaths[state.lane] || workshopGenrePaths[profile.title] || workshopGenrePaths[profile.lane] || workshopModules;
}

function ensureActiveWorkshopModule() {
  const modules = activeWorkshopModules();
  if (!modules.some((module) => module.id === state.activeWorkshop)) {
    state.activeWorkshop = modules[0]?.id || workshopModules[0].id;
  }
  return modules;
}

function renderWorkshopSteps() {
  const modules = ensureActiveWorkshopModule();
  const profile = activeGenreProfile();
  const workshopName = state.lane || profile.title;
  const label = $("#workshopGenreLabel");
  const title = $("#workshopPathTitle");
  if (label) label.textContent = `${workshopName} workshop`;
  if (title) title.textContent = `${workshopName} competency path`;
  $("#workshopSteps").innerHTML = modules
    .map((module, index) => `
      <button class="workshop-step ${module.id === state.activeWorkshop ? "is-active" : ""}" type="button" data-workshop-step="${module.id}">
        <span>${index + 1}</span>
        <strong>${module.title}</strong>
        <small>${module.competency}</small>
      </button>
    `)
    .join("");
}

function renderWorkshopLesson() {
  const module = activeWorkshopModule();
  const modules = activeWorkshopModules();
  const profile = activeGenreProfile();
  const workshopName = state.lane || profile.title;
  const stepNumber = modules.findIndex((item) => item.id === module.id) + 1;
  const answered = state.workshopAnswers[module.id];
  const selected = Number.isInteger(answered) ? answered : null;
  $("#workshopLesson").innerHTML = `
    <div class="lesson-hero">
      <span class="eyebrow">${workshopName} | Step ${stepNumber} of ${modules.length}</span>
      <h2>${module.title}</h2>
      <p>${module.competency}</p>
    </div>

    <div class="lesson-contrast">
      <article class="contrast-card weak">
        <span class="eyebrow">Producer trap</span>
        <strong>${module.trap}</strong>
        <p>${module.weak}</p>
      </article>
      <article class="contrast-card strong">
        <span class="eyebrow">Songwriter move</span>
        <strong>${module.songwriterMove}</strong>
        <p>${module.strong}</p>
      </article>
    </div>

    <article class="why-card">
      <strong>Why this lands</strong>
      <p>${module.why}</p>
    </article>

    <div class="decision-block">
      <div>
        <span class="eyebrow">Writer's room call</span>
        <h3>${module.question}</h3>
      </div>
      <div class="choice-grid">
        ${module.choices
          .map((choice, index) => `
            <button class="choice-card ${selected === index ? "is-selected" : ""} ${selected === index && selected === module.correct ? "is-correct" : ""}" type="button" data-workshop-choice="${index}">
              <span>${index === 0 ? "A" : "B"}</span>
              <strong>${choice}</strong>
            </button>
          `)
          .join("")}
      </div>
      <div class="answer-feedback ${selected === null ? "" : "is-visible"}">
        <strong>${selected === null ? "Pick the stronger creative move" : selected === module.correct ? "Recommended move" : "Consider the other angle"}</strong>
        <p>${selected === null ? "This is a writer's-room judgment call: which option gives the artist more to perform?" : module.rationale}</p>
      </div>
    </div>

    <article class="drill-card">
      <span class="eyebrow">Do this on your loop</span>
      <p>${module.drill}</p>
    </article>
  `;
}

function renderWorkshop() {
  renderWorkshopSteps();
  renderWorkshopLesson();
  renderBlueprint();
}

function getBlueprintValues() {
  return {
    lane: $("#blueprintLane").value,
    genre: $("#blueprintGenre").value,
    rawIdea: $("#rawIdeaInput").value.trim(),
    situation: $("#situationInput").value.trim(),
    tension: $("#tensionInput").value.trim(),
    title: $("#blueprintTitle").value.trim() || "Untitled",
    hook: $("#blueprintHook").value.trim(),
    detail: $("#detailInput").value.trim(),
    replay: $("#replayInput").value.trim(),
    structure: $("#structureInput").value,
    productionRisk: $("#productionRiskInput").value,
  };
}

function scoreText(value, targetLength) {
  const words = value.split(/\s+/).filter(Boolean).length;
  return clamp(Math.round((words / targetLength) * 100), value ? 35 : 0, 100);
}

function scoreBlueprint(values) {
  const titleWords = values.title.split(/\s+/).filter(Boolean).length;
  const hookWords = values.hook.split(/\s+/).filter(Boolean).length;
  const hasBehavior = /\b(call|check|drive|wait|leave|text|look|come|go|keep|watch|hold|save|hide|show)\b/i.test(`${values.situation} ${values.tension} ${values.detail}`);
  const concept = Math.round((scoreText(values.situation, 8) + scoreText(values.tension, 7) + (hasBehavior ? 90 : 45)) / 3);
  const hook = clamp(100 - Math.abs(hookWords - 5) * 12 + (titleWords <= 4 ? 10 : -5), 30, 100);
  const lyrics = Math.round((scoreText(values.detail, 7) + (hasBehavior ? 88 : 48)) / 2);
  const structure = values.structure.includes("lift") || values.structure.includes("Bridge") || values.structure.includes("Vamp") ? 82 : 62;
  const production = values.productionRisk.includes("Too many") || values.productionRisk.includes("fight") ? 58 : 72;
  const replay = Math.round((scoreText(values.replay, 9) + hook) / 2);
  const overall = Math.round((concept + hook + lyrics + structure + production + replay) / 6);
  return { concept, hook, lyrics, structure, production, replay, overall };
}

function blueprintDiagnosis(scores) {
  const entries = [
    ["Concept", scores.concept, "Make the song one sentence with a person, behavior, and contradiction."],
    ["Hook", scores.hook, "Shorten the title phrase and test it at the start and end of the chorus."],
    ["Lyrics", scores.lyrics, "Add one object, place, or action the beat cannot communicate by itself."],
    ["Structure", scores.structure, "Give the second hook new information: harmony, silence, ad-lib, or lyric turn."],
    ["Production", scores.production, "Mute one impressive part during the title so the vocal becomes the event."],
    ["Replay", scores.replay, "Name the exact moment a listener would want to feel again."],
  ].sort((a, b) => a[1] - b[1]);
  return entries[0];
}

function buildBlueprint(values, scores) {
  const concept = `A ${values.genre} song about ${values.situation}, where ${values.tension}.`;
  const lyricBefore = values.rawIdea || "The loop feels emotional, but the song idea is not clear yet.";
  const lyricAfter = values.detail ? `${values.detail}, so the listener sees the emotion instead of being told.` : "Add one object or behavior so the listener can see the emotion.";
  const hookOptions = [
    `${values.hook}`,
    `${values.hook} / ${values.title}`,
    `${values.title} after one beat of silence`,
  ].filter(Boolean);
  const structureMap = values.structure === "Hook arrives first"
    ? ["Hook", "Verse", "Pre", "Hook", "Verse", "Hook", "Bridge", "Hook"]
    : values.structure === "Bridge strips down"
      ? ["Intro", "Verse", "Pre", "Hook", "Verse", "Hook", "Bridge down", "Final Hook"]
      : values.structure === "Vamp extends the emotional payoff"
        ? ["Intro", "Verse", "Hook", "Verse", "Hook", "Bridge", "Hook", "Vamp"]
        : ["Intro", "Verse", "Pre", "Hook", "Verse", "Pre", "Hook", "Bridge", "Hook"];
  const repair = blueprintDiagnosis(scores);
  return {
    values,
    scores,
    concept,
    lyricBefore,
    lyricAfter,
    hookOptions,
    structureMap,
    repair,
    productionMove: values.productionRisk.includes("Too many")
      ? "Remove one melodic or textural element under the title; bring it back as an answer after the vocal."
      : "Choose one core element, one support element, one ear-candy answer, and one transition moment.",
  };
}

function generateBlueprint() {
  const values = getBlueprintValues();
  const scores = scoreBlueprint(values);
  state.currentBlueprint = buildBlueprint(values, scores);
  const loopStatus = $("#loopStatus");
  if (loopStatus) loopStatus.textContent = scores.overall >= 78 ? "Song draft" : "Beat becoming a song";
  renderBlueprint();
  showToast("Blueprint scored.");
}

function renderBlueprint() {
  if (!state.currentBlueprint) {
    state.currentBlueprint = buildBlueprint(getBlueprintValues(), scoreBlueprint(getBlueprintValues()));
  }
  const blueprint = state.currentBlueprint;
  const scoreRows = [
    ["Concept", blueprint.scores.concept],
    ["Hook", blueprint.scores.hook],
    ["Lyrics", blueprint.scores.lyrics],
    ["Structure", blueprint.scores.structure],
    ["Production", blueprint.scores.production],
    ["Replay", blueprint.scores.replay],
  ];
  $("#blueprintPanel").innerHTML = `
    <section class="tool-panel blueprint-score-card">
      <div class="diagnosis-score" style="--score: ${blueprint.scores.overall * 3.6}deg">
        <div class="score-ring">${blueprint.scores.overall}</div>
        <div>
          <span class="status-pill">${blueprint.scores.overall >= 78 ? "Song-shaped" : "Needs sharper song focus"}</span>
          <h2>${blueprint.values.title}</h2>
          <p>${blueprint.concept}</p>
        </div>
      </div>
      <div class="score-breakdown">
        ${scoreRows
          .map((row) => `
            <div class="score-row">
              <span>${row[0]}</span>
              <div class="meter"><i style="width:${row[1]}%"></i></div>
              <strong>${row[1]}</strong>
            </div>
          `)
          .join("")}
      </div>
    </section>

    <section class="tool-panel blueprint-card">
      <span class="eyebrow">Before / after</span>
      <strong>Producer idea</strong>
      <p>${blueprint.lyricBefore}</p>
      <strong>Songwriter translation</strong>
      <p>${blueprint.lyricAfter}</p>
    </section>

    <section class="tool-panel blueprint-card">
      <span class="eyebrow">Hook tests</span>
      ${blueprint.hookOptions.map((hook) => `<p><strong>${hook}</strong></p>`).join("")}
    </section>

    <section class="tool-panel blueprint-card">
      <span class="eyebrow">Structure map</span>
      <div class="blueprint-structure">
        ${blueprint.structureMap.map((section) => `<span>${section}</span>`).join("")}
      </div>
    </section>

    <section class="tool-panel blueprint-card">
      <span class="eyebrow">Primary repair</span>
      <strong>${blueprint.repair[0]}</strong>
      <p>${blueprint.repair[2]}</p>
      <strong>Production move</strong>
      <p>${blueprint.productionMove}</p>
    </section>
  `;
}

function saveBlueprintToVault() {
  generateBlueprint();
  const blueprint = state.currentBlueprint;
  state.references.unshift({
    title: `${blueprint.values.title} blueprint`,
    use: blueprint.concept,
    replay: `Repair ${blueprint.repair[0]}: ${blueprint.repair[2]}`,
    lane: blueprint.values.genre,
  });
  persistReferences();
  renderReferences();
  showToast("Blueprint saved to Reference Vault.");
}

function sendBlueprintToDoctor() {
  generateBlueprint();
  const blueprint = state.currentBlueprint;
  $("#songTitle").value = blueprint.values.title;
  $("#conceptInput").value = blueprint.concept;
  $("#hookInput").value = blueprint.values.hook;
  $("#memoryInput").value = blueprint.values.replay;
  $("#stuckInput").value = blueprint.repair[0] === "Production" ? "Production crowds the vocal" : blueprint.repair[0] === "Hook" ? "No clear hook" : "Loop does not evolve";
  $("#clarityInput").value = Math.max(1, Math.round(blueprint.scores.concept / 10));
  $("#hookStrengthInput").value = Math.max(1, Math.round(blueprint.scores.hook / 10));
  $("#spaceInput").value = blueprint.scores.production < 65 ? "5" : "8";
  $("#payoffInput").value = Math.max(1, Math.round(blueprint.scores.replay / 10));
  ["clarityInput", "hookStrengthInput", "spaceInput", "payoffInput"].forEach((id) => {
    $(`[data-for="${id}"]`).textContent = $(`#${id}`).value;
  });
  setView("doctor");
  diagnoseSong();
}

function defaultCreationDraft() {
  return {
    beatUrl: "",
    beatName: "No beat loaded",
    loopOn: true,
    bpm: 92,
    createMode: "start",
    template: "pop-rnb",
    activeGenreProfile: "drill",
    title: "",
    tempoKey: "",
    concept: "",
    hook: "",
    freewrite: "",
    flowPromptIndex: 0,
    flowCaptures: [],
    sections: {},
    sectionBars: {},
  };
}

function creationAudioElement() {
  return $("#createBeatAudio");
}

function activeCreationTemplate() {
  return creationTemplates.find((template) => template.id === state.creation.template) || creationTemplates[0];
}

function activeWorkflowPreset() {
  return workflowPresets[state.lane] || workflowPresets["R&B"];
}

function activeEngineerLens() {
  return engineerGenreLenses[state.lane] || engineerGenreLenses["R&B"];
}

function syncEngineerMixStyleToWorkflow() {
  const mappedStyle = engineerMixStyleByWorkflow[state.lane];
  if (mappedStyle && mixGuideBenchmarks.some((item) => item.style === mappedStyle)) {
    state.activeMixGuideStyle = mappedStyle;
  }
}

function activeGenreProfile() {
  return genreProfiles.find((profile) => profile.id === state.creation.activeGenreProfile) || genreProfiles[0];
}

function syncProPlaybookToWorkflow() {
  const preset = activeWorkflowPreset();
  state.activeProFilter = preset.proFilter || "All";
  const visiblePros = visibleProPlaybooks();
  if (visiblePros.length && !visiblePros.some((pro) => pro.id === state.activePro)) {
    state.activePro = visiblePros[0].id;
  }
}

function applyWorkflowPreset(lane, { silent = false, rerender = true } = {}) {
  const preset = workflowPresets[lane] || workflowPresets["R&B"];
  state.lane = lane;
  applyWorkflowChrome();
  const sections = currentCreationSections();
  state.creation.sections = Object.keys(sections).length ? sections : (state.creation.sections || {});
  state.creation.template = preset.template;
  state.creation.activeGenreProfile = preset.profile;
  state.creation.flowPromptIndex = preset.flowStart;
  state.activeProFilter = preset.proFilter || "All";
  if (state.appMode === "engineer") syncEngineerMixStyleToWorkflow();
  const visiblePros = proPlaybooks.filter((pro) => state.activeProFilter === "All" || pro.category === state.activeProFilter);
  if (visiblePros.length) state.activePro = visiblePros[0].id;
  const laneSelect = $("#laneSelect");
  if (laneSelect) laneSelect.value = lane;
  persistCreationDraft();
  renderStudioFlow();
  renderAppModeChrome();
  renderPros();
  if (rerender) {
    if (state.activeView === "create") renderCreationRoom();
    if (state.activeView === "workshop") renderWorkshop();
    if (state.activeView === "dashboard") renderStudioFlow();
    if (state.activeView === "mixguide") renderMixGuide();
    if (state.activeView === "audio") updateAudioInterface();
  }
  if (!silent) showToast(`${lane} workflow loaded.`);
}

function currentCreationSections() {
  const sections = { ...(state.creation.sections || {}) };
  $$("[data-create-section]").forEach((field) => {
    sections[field.dataset.createSection] = field.value;
  });
  return sections;
}

function defaultBarsForSection(id, label) {
  const text = `${id} ${label}`.toLowerCase();
  if (text.includes("intro") || text.includes("outro")) return 4;
  if (text.includes("turnaround") || text.includes("post")) return 4;
  if (text.includes("pre") || text.includes("lift") || text.includes("build") || text.includes("tension")) return 8;
  if (text.includes("hook") || text.includes("chorus")) return 8;
  if (text.includes("bridge") || text.includes("break")) return 8;
  if (text.includes("vamp")) return 16;
  if (text.includes("verse")) return 16;
  return 8;
}

function currentCreationBars(template = activeCreationTemplate()) {
  const bars = { ...(state.creation.sectionBars || {}) };
  template.sections.forEach(([id, label]) => {
    const input = $(`[data-create-bars="${id}"]`);
    const value = input ? Number(input.value) : Number(bars[id]);
    bars[id] = Number.isFinite(value) && value > 0 ? Math.round(value) : defaultBarsForSection(id, label);
  });
  return bars;
}

function currentCreationBpm() {
  const bpmInput = $("#createBpm");
  const raw = bpmInput ? Number(bpmInput.value) : Number(state.creation.bpm);
  return Number.isFinite(raw) && raw > 0 ? Math.round(raw) : 92;
}

function creationTimingRows(template = activeCreationTemplate()) {
  const bars = currentCreationBars(template);
  let cursor = 1;
  return template.sections.map(([id, label, purpose, prompt]) => {
    const length = bars[id] || defaultBarsForSection(id, label);
    const row = {
      id,
      label,
      purpose,
      prompt,
      bars: length,
      start: cursor,
      end: cursor + length - 1,
    };
    cursor += length;
    return row;
  });
}

function secondsForBars(bars, bpm = currentCreationBpm()) {
  return Math.round((Number(bars) || 0) * (240 / bpm));
}

function getCreationValues() {
  return {
    title: $("#createTitle")?.value.trim() || "",
    tempoKey: $("#createTempoKey")?.value.trim() || "",
    bpm: currentCreationBpm(),
    concept: $("#createConcept")?.value.trim() || "",
    hook: $("#createHook")?.value.trim() || "",
    freewrite: $("#createFreewrite")?.value || "",
    template: state.creation.template,
    sections: currentCreationSections(),
    sectionBars: currentCreationBars(),
  };
}

function persistCreationDraft() {
  const payload = {
    ...state.creation,
    beatUrl: "",
  };
  localStorage.setItem("songlabCreationDraft", JSON.stringify(payload));
}

function loadCreationDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem("songlabCreationDraft"));
    state.creation = {
      ...defaultCreationDraft(),
      ...(saved || {}),
      beatUrl: "",
      beatName: "No beat loaded",
      flowCaptures: Array.isArray(saved?.flowCaptures) ? saved.flowCaptures : [],
      flowPromptIndex: Number.isFinite(saved?.flowPromptIndex) ? saved.flowPromptIndex : 0,
      bpm: Number.isFinite(Number(saved?.bpm)) ? Number(saved.bpm) : 92,
      sections: {
        ...(saved?.sections || {}),
      },
      sectionBars: {
        ...(saved?.sectionBars || {}),
      },
    };
  } catch {
    state.creation = defaultCreationDraft();
  }
}

function syncCreationDraft({ quiet = true } = {}) {
  state.creation = {
    ...state.creation,
    ...getCreationValues(),
  };
  persistCreationDraft();
  renderStudioFlow();
  updateCreationProgress();
  renderCreationCoach();
  const status = $("#createDraftStatus");
  if (status) status.textContent = quiet ? "Autosaved" : "Saved";
}

function applyCreationDraftToForm() {
  const fields = [
    ["createTitle", state.creation.title],
    ["createTempoKey", state.creation.tempoKey],
    ["createBpm", state.creation.bpm],
    ["createConcept", state.creation.concept],
    ["createHook", state.creation.hook],
    ["createFreewrite", state.creation.freewrite],
  ];
  fields.forEach(([id, value]) => {
    const element = $(`#${id}`);
    if (element) element.value = value || "";
  });
}

function renderCreationTemplates() {
  const active = activeCreationTemplate();
  $("#createTemplateTabs").innerHTML = `
    <article class="workflow-current-card">
      <span class="eyebrow">Current shape</span>
      <strong>${escapeHtml(active.label)}</strong>
      <p>${escapeHtml(active.promise)}</p>
    </article>
    <details class="compact-switcher">
      <summary>Change shape</summary>
      <div>
        ${creationTemplates
          .map((template) => `
            <button class="filter-chip ${template.id === state.creation.template ? "is-active" : ""}" type="button" data-create-template="${escapeHtml(template.id)}">
              ${escapeHtml(template.label)}
            </button>
          `)
          .join("")}
      </div>
    </details>
  `;
}

function renderGenreProfiles() {
  const tabs = $("#genreProfileTabs");
  const detail = $("#genreProfileDetail");
  if (!tabs || !detail) return;
  const profile = activeGenreProfile();
  const workflow = activeWorkflowPreset();
  tabs.innerHTML = `
    <article class="workflow-current-card">
      <span class="eyebrow">Workflow focus</span>
      <strong>${escapeHtml(state.lane)}</strong>
      <p>${workflow.focus.map(escapeHtml).join(" | ")}</p>
      <small>${escapeHtml(workflow.firstMove)}</small>
    </article>
    <details class="compact-switcher">
      <summary>Switch DNA</summary>
      <div>
        ${genreProfiles
          .map((item) => `
            <button class="filter-chip ${item.id === profile.id ? "is-active" : ""}" type="button" data-genre-profile="${escapeHtml(item.id)}">
              ${escapeHtml(item.title)}
            </button>
          `)
          .join("")}
      </div>
    </details>
  `;
  detail.innerHTML = `
    <section class="genre-profile-hero">
      <div>
        <span class="eyebrow">${escapeHtml(profile.scope)}</span>
        <h3>${escapeHtml(profile.title)}</h3>
        <p>${escapeHtml(profile.thesis)}</p>
      </div>
      <span class="status-pill">${escapeHtml(profile.tempo)}</span>
    </section>

    <div class="genre-profile-columns">
      <article>
        <span class="eyebrow">Songwriting priorities</span>
        ${profile.songwriting.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </article>
      <article>
        <span class="eyebrow">Production priorities</span>
        ${profile.production.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </article>
      <article>
        <span class="eyebrow">Common traps</span>
        ${profile.traps.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </article>
    </div>

    <div class="genre-substyle-grid">
      ${profile.substyles
        .map(([name, body]) => `
          <article>
            <strong>${escapeHtml(name)}</strong>
            <p>${escapeHtml(body)}</p>
          </article>
        `)
        .join("")}
    </div>

    <div class="genre-prompt-strip">
      ${profile.prompts.map((prompt) => `<span>${escapeHtml(prompt)}</span>`).join("")}
    </div>

    <div class="button-row">
      <button class="secondary-action" type="button" data-genre-action="seed-notebook">
        <svg><use href="#icon-pen"></use></svg>
        Seed Pad
      </button>
    </div>
  `;
}

function renderCreationStructure() {
  const template = activeCreationTemplate();
  const bpmInput = $("#createBpm");
  if (bpmInput) bpmInput.value = String(currentCreationBpm());
  const rows = creationTimingRows(template);
  const totalBars = rows.reduce((total, row) => total + row.bars, 0);
  const totalSeconds = secondsForBars(totalBars);
  const summary = $("#barTimingSummary");
  if (summary) {
    summary.innerHTML = `
      <strong>${totalBars} bars</strong>
      <span>${formatTime(totalSeconds)} at ${currentCreationBpm()} BPM</span>
    `;
  }
  const timeline = $("#barTimeline");
  if (timeline) {
    timeline.innerHTML = rows
      .map((row) => {
        const width = totalBars ? Math.max(7, (row.bars / totalBars) * 100) : 10;
        return `
          <button class="bar-timeline-segment" type="button" style="--segment-width:${width}%">
            <strong>${escapeHtml(row.label)}</strong>
            <span>${row.start}-${row.end}</span>
          </button>
        `;
      })
      .join("");
  }
  $("#createStructureMap").innerHTML = `
    ${rows
      .map((row, index) => `
        <article class="create-section-card">
          <div class="create-section-head">
            <span>${index + 1}</span>
            <div>
              <strong>${escapeHtml(row.label)}</strong>
              <p>${escapeHtml(row.purpose)}</p>
              <small>Bars ${row.start}-${row.end} | ${row.bars} bars | approx ${formatTime(secondsForBars(row.bars))}</small>
            </div>
          </div>
          <label class="bar-count-field">
            Bars
            <input data-create-bars="${escapeHtml(row.id)}" type="number" min="1" max="64" step="1" value="${row.bars}" />
          </label>
          <label>
            ${escapeHtml(row.prompt)}
            <textarea data-create-section="${escapeHtml(row.id)}" rows="3" placeholder="Write the move for this section...">${escapeHtml(state.creation.sections?.[row.id] || "")}</textarea>
          </label>
        </article>
      `)
      .join("")}
  `;
  updateCreationProgress();
}

function setActiveGenreProfile(profileId) {
  const profile = genreProfiles.find((item) => item.id === profileId);
  if (profile) {
    applyWorkflowPreset(profile.lane);
    return;
  }
  state.creation.activeGenreProfile = profileId;
  persistCreationDraft();
  renderCreationRoom();
}

function loadActiveGenreTemplate() {
  const profile = activeGenreProfile();
  applyWorkflowPreset(profile.lane);
}

function seedNotebookFromGenre() {
  const profile = activeGenreProfile();
  const concept = $("#createConcept");
  const hook = $("#createHook");
  const freewrite = $("#createFreewrite");
  if (concept && !concept.value.trim()) {
    concept.value = `A ${profile.title} song built around ${profile.songwriting[0].toLowerCase()} and ${profile.songwriting[1].toLowerCase()}.`;
  }
  if (hook && !hook.value.trim()) hook.value = profile.prompts[0];
  if (freewrite) {
    const addition = [
      `${profile.title} writing pass`,
      `- Core promise: ${profile.thesis}`,
      ...profile.prompts.map((prompt) => `- ${prompt}`),
    ].join("\n");
    freewrite.value = freewrite.value.trim() ? `${freewrite.value.trim()}\n\n${addition}` : addition;
  }
  syncCreationDraft({ quiet: false });
  showToast(`${profile.title} prompts added.`);
}

function creationWordCount(value) {
  return String(value || "").trim().split(/\s+/).filter(Boolean).length;
}

function updateCreationProgress() {
  const template = activeCreationTemplate();
  const sections = currentCreationSections();
  const filled = template.sections.filter(([id]) => String(sections[id] || "").trim()).length;
  const totalBars = creationTimingRows(template).reduce((total, row) => total + row.bars, 0);
  const score = $("#createStructureScore");
  if (score) score.textContent = `${filled}/${template.sections.length} | ${totalBars} bars`;
}

function renderCreationCoach() {
  const values = {
    ...state.creation,
    ...getCreationValues(),
  };
  const template = activeCreationTemplate();
  const workflow = activeWorkflowPreset();
  const sections = currentCreationSections();
  const filled = template.sections.filter(([id]) => String(sections[id] || "").trim()).length;
  const moves = [
    ["Workflow move", workflow.firstMove],
    values.concept
      ? ["Concept check", "Make sure the concept names a behavior, not just a mood."]
      : ["Concept first", "Write one sentence with person, setting, behavior, and contradiction."],
    values.hook
      ? ["Hook pressure", "Test the hook at the start, middle, and end of the chorus pocket."]
      : ["Hook target", "Before writing more lines, choose the title phrase the listener should remember."],
    creationWordCount(values.freewrite) > 35
      ? ["Refine pass", "Highlight the most conversational line and move it into the hook or verse."]
      : ["Mumble pass", "Let phonetics, vowel shape, and pocket come first. Clean lyrics after the loop feels alive."],
    filled >= Math.ceil(template.sections.length / 2)
      ? ["Section contrast", "Now make the second hook return with one new emotional or vocal detail."]
      : ["Structure pass", "Fill the next empty section with its job, not perfect lyrics yet."],
  ];
  $("#createCoachList").innerHTML = moves
    .map(([title, body]) => `
      <article>
        <span class="tag">${escapeHtml(title)}</span>
        <p>${escapeHtml(body)}</p>
      </article>
    `)
    .join("");
}

function activeCreateMode() {
  return createModes[state.creation.createMode] ? state.creation.createMode : "start";
}

function setCreateMode(mode, { silent = false } = {}) {
  state.creation.createMode = createModes[mode] ? mode : "start";
  persistCreationDraft();
  renderCreateRoute();
  if (!silent) showToast(`${createModes[state.creation.createMode].title}.`);
}

function renderCreateRoute() {
  const mode = activeCreateMode();
  const config = createModes[mode];
  const panels = new Set(config.panels);
  const grid = $("#createRoomGrid");
  const summary = $("#createRouteSummary");
  if (grid) {
    grid.dataset.createMode = mode;
    grid.dataset.workflow = workflowSlug();
    $$("[data-create-panel]").forEach((panel) => {
      panel.classList.toggle("is-create-active", panels.has(panel.dataset.createPanel));
    });
  }
  $("[data-create-mode]") && $$("[data-create-mode]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.createMode === mode);
  });
  if (summary) {
    summary.innerHTML = `
      <div>
        <span class="eyebrow">${escapeHtml(state.lane)} workflow</span>
        <strong>${escapeHtml(config.title)}</strong>
        <p>${escapeHtml(config.body)}</p>
      </div>
      <span>${escapeHtml(config.panels.length)} panels</span>
    `;
  }
}

function activeFlowPrompt() {
  const index = clamp(Number(state.creation.flowPromptIndex) || 0, 0, flowWritingPrompts.length - 1);
  return flowWritingPrompts[index] || flowWritingPrompts[0];
}

function renderFlowWriting() {
  const prompt = activeFlowPrompt();
  const promptCard = $("#flowPromptCard");
  const captureList = $("#flowCaptureList");
  const count = $("#flowCaptureCount");
  if (!promptCard || !captureList || !count) return;
  const captures = Array.isArray(state.creation.flowCaptures) ? state.creation.flowCaptures : [];
  count.textContent = `${captures.length} capture${captures.length === 1 ? "" : "s"}`;
  promptCard.innerHTML = `
    <span class="eyebrow">${escapeHtml(prompt.phase)}</span>
    <strong>${escapeHtml(prompt.title)}</strong>
    <p>${escapeHtml(prompt.prompt)}</p>
    <small>${escapeHtml(prompt.harvest)}</small>
  `;
  captureList.innerHTML = captures.length
    ? captures
        .slice()
        .reverse()
        .map((capture) => `
          <article>
            <div>
              <span class="tag">${escapeHtml(capture.prompt || "Flow capture")}</span>
              <span class="tag">${escapeHtml(capture.time || "free")}</span>
              <button class="flow-delete-button" type="button" data-flow-delete="${escapeHtml(capture.id)}">Remove</button>
            </div>
            <p>${escapeHtml(capture.text)}</p>
          </article>
        `)
        .join("")
    : `
      <article class="flow-empty-state">
        <span class="tag">No takes yet</span>
        <p>Run the beat. Save anything with pulse.</p>
      </article>
    `;
}

function shuffleFlowPrompt() {
  state.creation.flowPromptIndex = (Number(state.creation.flowPromptIndex) + 1) % flowWritingPrompts.length;
  persistCreationDraft();
  renderFlowWriting();
}

function captureFlowMoment() {
  const input = $("#flowCaptureInput");
  const text = input?.value.trim() || "";
  if (!text) {
    showToast("Write a phrase first.");
    return;
  }
  const audio = creationAudioElement();
  const prompt = activeFlowPrompt();
  const capture = {
    id: `flow-${Date.now()}`,
    prompt: prompt.phase,
    text,
    time: audio?.src ? formatTime(audio.currentTime || 0) : "free",
    createdAt: Date.now(),
  };
  state.creation.flowCaptures = [...(state.creation.flowCaptures || []), capture];
  if (input) input.value = "";
  persistCreationDraft();
  renderFlowWriting();
  showToast("Take saved.");
}

function flowCaptureTextBlock() {
  const captures = Array.isArray(state.creation.flowCaptures) ? state.creation.flowCaptures : [];
  if (!captures.length) return "";
  return [
    "Flow pass captures",
    ...captures.map((capture, index) => `${index + 1}. [${capture.prompt} | ${capture.time}] ${capture.text}`),
  ].join("\n");
}

function cleanLyricSeed(value, fallback = "this feeling") {
  return String(value || "")
    .replace(/[^\w\s'/-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 7)
    .join(" ")
    .trim() || fallback;
}

function lyricSuggestionContext() {
  const values = {
    ...state.creation,
    ...getCreationValues(),
  };
  const workflow = activeWorkflowPreset();
  const profile = activeGenreProfile();
  const captures = Array.isArray(state.creation.flowCaptures) ? state.creation.flowCaptures : [];
  const section = $("#lyricAiSection")?.value || "Hook";
  const tone = $("#lyricAiTone")?.value || "Intimate";
  const freewriteSource = /song sparks|make it yours|lyric starters|craft moves|delivery notes/i.test(values.freewrite || "")
    ? ""
    : values.freewrite;
  const rawCenter = values.concept || captures[0]?.text || values.hook || values.title || workflow.focus?.[0] || "the moment";
  const center = cleanLyricSeed(rawCenter, "the moment");
  const image = cleanLyricSeed(captures[captures.length - 1]?.text || freewriteSource || "", profile.songwriting?.[0] || "the room");
  const title = (values.hook || values.title || center.split(/\s+/).slice(0, 4).join(" ")).replace(/\s+/g, " ").trim();
  return {
    values,
    workflow,
    profile,
    captures,
    section,
    tone,
    center,
    image,
    title,
  };
}

function sectionLyricMoves(section) {
  const normalized = String(section || "").toLowerCase();
  if (normalized.includes("hook")) {
    return {
      job: "Make the title impossible to miss.",
      shape: "Short line, repeatable phrase, tiny twist on the third pass.",
    };
  }
  if (normalized.includes("verse")) {
    return {
      job: "Put the listener in a scene before explaining the feeling.",
      shape: "Concrete image, behavior, consequence.",
    };
  }
  if (normalized.includes("pre")) {
    return {
      job: "Raise pressure before the payoff.",
      shape: "Tighter rhythm, rising sentence, unfinished thought.",
    };
  }
  if (normalized.includes("bridge")) {
    return {
      job: "Change the angle without abandoning the concept.",
      shape: "Confession, reversal, or decision.",
    };
  }
  if (normalized.includes("vamp")) {
    return {
      job: "Give the room something to answer.",
      shape: "One chantable sentence with space for ad-libs.",
    };
  }
  return {
    job: "Support the lead vocal with personality.",
    shape: "Small reactions, breaths, tags, and call-backs.",
  };
}

function buildLyricSuggestions(context = lyricSuggestionContext()) {
  const { section, tone, center, image, title, workflow, profile, captures } = context;
  const focus = workflow.focus || ["clarity", "emotion", "replay"];
  const move = sectionLyricMoves(section);
  const toneMap = {
    Intimate: { light: "lamp-low", touch: "close to the chest", verb: "confess", delivery: "half-sung, almost private" },
    Bold: { light: "neon-bright", touch: "straight through the door", verb: "declare", delivery: "clear-eyed and front-footed" },
    Bitter: { light: "streetlight-cold", touch: "held behind the teeth", verb: "cut", delivery: "dry enough to sting" },
    Hopeful: { light: "morning-wide", touch: "turned toward the window", verb: "reach", delivery: "lighter each time it returns" },
    Seductive: { light: "velvet-low", touch: "close enough to blur", verb: "pull", delivery: "slow, warm, and controlled" },
    Reflective: { light: "rain-on-glass", touch: "older than the first draft", verb: "remember", delivery: "plainspoken, with room around the truth" },
    Cold: { light: "chrome-flat", touch: "untouched on the table", verb: "dismiss", delivery: "clipped, still, and unbothered" },
    Uplifted: { light: "choir-wide", touch: "hands open", verb: "release", delivery: "communal without getting vague" },
  };
  const genreWorlds = {
    "R&B": ["phone glow", "quiet hallway", "glass of water", "door left cracked"],
    "Soul": ["studio lamp", "church basement", "bass cabinet", "velvet booth"],
    "Neo-Soul": ["window plant", "vinyl crackle", "blue chord", "late train"],
    "Pop-R&B": ["mirror light", "rideshare window", "empty kitchen", "city rain"],
    "Pop": ["dashboard light", "crowded elevator", "last text", "bright chorus room"],
    "Dance-Pop": ["club mirror", "strobe pulse", "midnight sidewalk", "hands in the air"],
    "Singer-Songwriter Pop": ["coffee ring", "apartment key", "voice memo", "unmade bed"],
    "Alt-Pop": ["pink static", "cheap projector", "laundry light", "cracked phone"],
    "Hip-Hop": ["corner store", "rearview mirror", "chain flash", "late-night curb"],
    "Drill": ["block light", "cold stairwell", "sirens far off", "hoodie shadow"],
    "Country": ["porch light", "truck bench", "kitchen table", "dusty road"],
    "Gospel": ["open aisle", "choir riser", "Sunday coat", "morning hands"],
    "Alternative": ["bedroom wall", "feedback hum", "wet pavement", "paper moon"],
    "Rock & Roll": ["jukebox light", "dancehall floor", "chrome bumper", "school-night radio"],
    "Classic Rock": ["amp glow", "highway sign", "backstage stair", "vinyl sleeve"],
    "Punk Rock": ["basement wall", "ripped poster", "cheap amp", "sidewalk spit"],
    "Grunge": ["ceiling fan", "rain-soaked flannel", "dirty carpet", "basement bulb"],
    "Pop-Punk/Emo": ["locker note", "hoodie sleeve", "parking-lot light", "bedroom floor"],
  };
  const palette = toneMap[tone] || toneMap.Intimate;
  const lane = profile.title || profile.lane || "R&B";
  const world = genreWorlds[lane] || genreWorlds[profile.lane] || genreWorlds["R&B"];
  const worldIndex = Math.abs(`${center}${image}${title}`.length) % world.length;
  const object = world[worldIndex];
  const place = world[(worldIndex + 1) % world.length];
  const captureLine = cleanLyricSeed(captures[captures.length - 1]?.text, image);
  const hookTitle = title.replace(/\s+/g, " ").trim();
  const lines = [
    `Let the ${object} hold the scene while "${hookTitle}" arrives like something you tried not to say.`,
    `Put ${center} inside the ${place}; make the first line feel overheard, not announced.`,
    `Bring "${hookTitle}" back once cleaner, then once with a bruise on the last word.`,
    `Turn ${image} into action: one look, one reach, one door that does not fully close.`,
  ];
  const variations = [
    `Title mirror: sing "${hookTitle}" first as a secret, then as a decision.`,
    `Pocket carve: keep the strongest seven words and leave one beat of air after the emotional word.`,
    `Camera pass: trade one abstract feeling for something visible: ${object}, ${place}, or ${captureLine}.`,
  ];
  const performance = [
    `Delivery: ${palette.delivery}. Let the voice ${palette.verb} before the lyric explains.`,
    `Genre lens: ${profile.title} needs ${focus[0]} to be felt before ${focus[1]} starts sounding impressive.`,
    `Section job: ${move.job} ${move.shape}`,
  ];
  return {
    section,
    tone,
    lines,
    variations,
    performance,
  };
}

function renderLyricSuggestions(result = state.lastLyricSuggestions) {
  const output = $("#lyricSuggestionOutput");
  if (!output) return;
  if (!result) {
    output.innerHTML = `
      <span class="tag">Ready</span>
      <p>Start with a spark, then bend every word toward your own voice.</p>
    `;
    return;
  }
  output.innerHTML = `
    <div class="lyric-suggestion-meta">
      <span class="tag">${escapeHtml(result.section)}</span>
      <span class="tag">${escapeHtml(result.tone)}</span>
      <span class="tag">Voice sketch</span>
    </div>
    <div class="lyric-starter-note">
      <strong>Make it yours</strong>
      <p>Keep the image, pressure, or title move that feels alive. Rewrite anything that does not sound like your mouth.</p>
    </div>
    <div class="lyric-suggestion-grid">
      <article>
        <strong>Song Sparks</strong>
        ${result.lines.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </article>
      <article>
        <strong>Craft Moves</strong>
        ${result.variations.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </article>
      <article>
        <strong>Delivery Notes</strong>
        ${result.performance.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </article>
    </div>
  `;
}

function generateLyricIdeas() {
  state.lastLyricSuggestions = buildLyricSuggestions();
  renderLyricSuggestions();
  showToast("Lyric starters generated.");
}

function sendLyricIdeasToPad() {
  if (!state.lastLyricSuggestions) generateLyricIdeas();
  const result = state.lastLyricSuggestions;
  const freewrite = $("#createFreewrite");
  if (!freewrite || !result) return;
  const block = [
    `Song sparks - ${result.section} / ${result.tone}`,
    "Make it yours: Keep the living image, pressure, or title move. Rewrite the language until it sounds like your mouth.",
    "Song sparks:",
    ...result.lines.map((line) => `- ${line}`),
    "Craft moves:",
    ...result.variations.map((line) => `- ${line}`),
    "Delivery notes:",
    ...result.performance.map((line) => `- ${line}`),
  ].join("\n");
  freewrite.value = freewrite.value.trim() ? `${freewrite.value.trim()}\n\n${block}` : block;
  syncCreationDraft({ quiet: false });
  showToast("Lyric starters sent to pad.");
}

function sendFlowToNotebook() {
  const block = flowCaptureTextBlock();
  if (!block) {
    showToast("Save a few takes first.");
    return;
  }
  const freewrite = $("#createFreewrite");
  if (freewrite) {
    freewrite.value = freewrite.value.trim() ? `${freewrite.value.trim()}\n\n${block}` : block;
  }
  syncCreationDraft({ quiet: false });
  setCreateMode("write", { silent: true });
  showToast("Sent to pad.");
}

function distillFlowToStructure() {
  const captures = Array.isArray(state.creation.flowCaptures) ? state.creation.flowCaptures : [];
  if (!captures.length) {
    showToast("Save a take first.");
    return;
  }
  const template = activeCreationTemplate();
  const first = captures[0]?.text || "";
  const titleCandidate = captures.find((capture) => /title|hook|chorus/i.test(capture.prompt))?.text || first;
  const turnCandidate = captures.find((capture) => /turn|image|performance/i.test(capture.prompt))?.text || captures[captures.length - 1]?.text || first;
  const concept = $("#createConcept");
  const hook = $("#createHook");
  if (concept && !concept.value.trim()) concept.value = `A song built from this emotional center: ${first}`;
  if (hook && !hook.value.trim()) hook.value = titleCandidate.split(/\n/)[0].slice(0, 140);

  const sections = currentCreationSections();
  template.sections.forEach(([id, label]) => {
    const normalized = `${id} ${label}`.toLowerCase();
    if (sections[id]) return;
    if (normalized.includes("intro")) sections[id] = `Open with the world: ${first}`;
    else if (normalized.includes("hook") || normalized.includes("chorus")) sections[id] = `Center the repeatable phrase: ${titleCandidate}`;
    else if (normalized.includes("verse1") || normalized.includes("verse 1")) sections[id] = captures.slice(0, 2).map((capture) => capture.text).join("\n");
    else if (normalized.includes("verse2") || normalized.includes("verse 2")) sections[id] = captures.slice(2, 4).map((capture) => capture.text).join("\n") || `Reveal what changed: ${turnCandidate}`;
    else if (normalized.includes("bridge") || normalized.includes("turn") || normalized.includes("lift")) sections[id] = `Emotional turn: ${turnCandidate}`;
    else if (normalized.includes("outro") || normalized.includes("final")) sections[id] = `Return changed: ${titleCandidate}`;
  });
  state.creation.sections = sections;
  state.creation.concept = concept?.value || state.creation.concept;
  state.creation.hook = hook?.value || state.creation.hook;
  persistCreationDraft();
  renderStudioFlow();
  renderCreationStructure();
  renderCreationCoach();
  renderFlowWriting();
  setCreateMode("shape", { silent: true });
  const status = $("#createDraftStatus");
  if (status) status.textContent = "Saved";
  showToast("Shape drafted.");
}

function deleteFlowCapture(captureId) {
  state.creation.flowCaptures = (state.creation.flowCaptures || []).filter((capture) => capture.id !== captureId);
  persistCreationDraft();
  renderFlowWriting();
  showToast("Take removed.");
}

function recordingMimeType() {
  if (!window.MediaRecorder) return "";
  return ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"]
    .find((type) => window.MediaRecorder.isTypeSupported(type)) || "";
}

function setTakeRecorderStatus(label, hint) {
  const status = $("#takeRecorderStatus");
  const hintNode = $("#takeRecorderHint");
  if (status) status.textContent = label;
  if (hintNode && hint) hintNode.textContent = hint;
}

function updateTakeTimer() {
  const time = $("#takeRecordingTime");
  if (!time) return;
  if (!sketchRecorderState.startedAt) {
    time.textContent = "00:00";
    return;
  }
  time.textContent = formatTime(Math.max(0, (Date.now() - sketchRecorderState.startedAt) / 1000));
}

function stopTakeMeter() {
  if (sketchRecorderState.meterFrame) cancelAnimationFrame(sketchRecorderState.meterFrame);
  sketchRecorderState.meterFrame = null;
  const meter = $("#takeMeterBar");
  if (meter) meter.style.width = "0%";
  if (sketchRecorderState.audioContext) {
    sketchRecorderState.audioContext.close().catch(() => {});
  }
  sketchRecorderState.audioContext = null;
  sketchRecorderState.analyser = null;
  sketchRecorderState.meterData = null;
}

function startTakeMeter(stream) {
  stopTakeMeter();
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const meter = $("#takeMeterBar");
  if (!AudioContextClass || !meter) return;
  try {
    const audioContext = new AudioContextClass();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    sketchRecorderState.audioContext = audioContext;
    sketchRecorderState.analyser = analyser;
    sketchRecorderState.meterData = new Uint8Array(analyser.frequencyBinCount);
    const tick = () => {
      if (!sketchRecorderState.analyser || !sketchRecorderState.meterData) return;
      sketchRecorderState.analyser.getByteTimeDomainData(sketchRecorderState.meterData);
      const sum = sketchRecorderState.meterData.reduce((total, value) => {
        const centered = value - 128;
        return total + centered * centered;
      }, 0);
      const rms = Math.sqrt(sum / sketchRecorderState.meterData.length);
      meter.style.width = `${clamp(rms * 6, 3, 100)}%`;
      sketchRecorderState.meterFrame = requestAnimationFrame(tick);
    };
    tick();
  } catch {
    if (meter) meter.style.width = "0%";
  }
}

function updateSketchRecorderUI(isRecording = Boolean(sketchRecorderState.recorder)) {
  const start = $("#startSketchRecording");
  const stop = $("#stopSketchRecording");
  if (isRecording) {
    setTakeRecorderStatus("Recording", "Stay loose. Capture the feeling first; judge the take after playback.");
  } else if (sketchRecorderState.takes.length) {
    setTakeRecorderStatus("Take saved", "Load a take, play it back, add transcript notes, then grade the performance.");
  } else {
    setTakeRecorderStatus("Ready", "Arm the mic, play the beat, then catch the melody, flow, or delivery idea before editing it.");
  }
  if (start) start.disabled = isRecording;
  if (stop) stop.disabled = !isRecording;
  updateTakeTimer();
}

function speechRecognitionClass() {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function renderTranscriptStatus(stateName, detail) {
  const status = $("#transcriptStatus");
  if (!status) return;
  const label = status.querySelector("strong");
  status.dataset.state = stateName;
  if (label) label.textContent = detail;
}

function updateTranscriptAvailability() {
  sketchRecorderState.transcriptSupported = Boolean(speechRecognitionClass());
  renderTranscriptStatus(
    sketchRecorderState.transcriptSupported ? "ready" : "unsupported",
    sketchRecorderState.transcriptSupported ? "Live transcript available" : "Type transcript manually in this browser"
  );
}

function commitTranscript(interim = "") {
  const transcript = $("#takeTranscript");
  if (!transcript) return;
  const parts = [sketchRecorderState.transcriptBase, sketchRecorderState.transcriptFinal, interim]
    .map((part) => String(part || "").trim())
    .filter(Boolean);
  transcript.value = parts.join(parts.length > 1 ? "\n" : "");
  const take = sketchRecorderState.takes.find((item) => item.id === sketchRecorderState.currentTakeId);
  if (take) {
    take.transcript = transcript.value.trim();
    renderSketchTakes();
  }
}

function startSketchTranscription() {
  const Recognition = speechRecognitionClass();
  const transcript = $("#takeTranscript");
  if (!Recognition || !transcript) {
    updateTranscriptAvailability();
    return false;
  }
  const recognition = new Recognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  sketchRecorderState.transcriptBase = transcript.value.trim();
  sketchRecorderState.transcriptFinal = "";
  sketchRecorderState.transcriptActive = true;
  sketchRecorderState.transcriptRestarting = false;
  recognition.onresult = (event) => {
    let interim = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const result = event.results[index];
      const text = (result[0]?.transcript || "").replace(/\s+/g, " ").trim();
      if (!text) continue;
      if (result.isFinal) {
        sketchRecorderState.transcriptFinal = [sketchRecorderState.transcriptFinal, text].filter(Boolean).join(" ");
      } else {
        interim = [interim, text].filter(Boolean).join(" ");
      }
    }
    commitTranscript(interim);
    renderTranscriptStatus("active", interim ? "Listening and drafting words" : "Listening for words");
  };
  recognition.onerror = (event) => {
    const denied = event?.error === "not-allowed" || event?.error === "service-not-allowed";
    sketchRecorderState.transcriptActive = false;
    renderTranscriptStatus(denied ? "blocked" : "paused", denied ? "Transcript mic permission blocked" : "Transcript paused; type what you hear");
    if (denied) showToast("Speech recognition permission is blocked.");
    else showToast("Live transcript paused. Type the take if needed.");
  };
  recognition.onend = () => {
    sketchRecorderState.recognition = null;
    if (sketchRecorderState.recorder && sketchRecorderState.transcriptActive && !sketchRecorderState.transcriptRestarting) {
      sketchRecorderState.transcriptRestarting = true;
      window.setTimeout(() => {
        sketchRecorderState.transcriptRestarting = false;
        if (sketchRecorderState.recorder && !sketchRecorderState.recognition) startSketchTranscription();
      }, 350);
      return;
    }
    if (!sketchRecorderState.recorder && sketchRecorderState.transcriptSupported) {
      renderTranscriptStatus("ready", "Transcript captured");
    }
  };
  try {
    recognition.start();
    sketchRecorderState.recognition = recognition;
    renderTranscriptStatus("active", "Listening for words");
    return true;
  } catch {
    sketchRecorderState.transcriptActive = false;
    renderTranscriptStatus("paused", "Transcript could not start; type it manually");
    return false;
  }
}

function stopSketchTranscription() {
  sketchRecorderState.transcriptActive = false;
  if (!sketchRecorderState.recognition) return;
  try {
    sketchRecorderState.recognition.stop();
  } catch {
    // Browser speech recognition can throw if it already ended.
  }
  sketchRecorderState.recognition = null;
  renderTranscriptStatus(sketchRecorderState.transcriptSupported ? "ready" : "unsupported", sketchRecorderState.transcriptSupported ? "Transcript captured" : "Type transcript manually in this browser");
}

async function startSketchRecording() {
  if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
    setTakeRecorderStatus("Unavailable", "This browser session cannot access microphone recording. Try a secure localhost tab in Chrome or Safari.");
    showToast("This browser cannot record audio here.");
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
    });
    const mimeType = recordingMimeType();
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    sketchRecorderState.stream = stream;
    sketchRecorderState.recorder = recorder;
    sketchRecorderState.chunks = [];
    sketchRecorderState.startedAt = Date.now();
    if (sketchRecorderState.timerId) window.clearInterval(sketchRecorderState.timerId);
    sketchRecorderState.timerId = window.setInterval(updateTakeTimer, 250);
    updateTakeTimer();
    startTakeMeter(stream);
    recorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) sketchRecorderState.chunks.push(event.data);
    });
    recorder.addEventListener("stop", finishSketchRecording);
    recorder.start(500);
    const transcribing = startSketchTranscription();
    updateSketchRecorderUI(true);
    if (!transcribing) {
      renderTranscriptStatus(sketchRecorderState.transcriptSupported ? "paused" : "unsupported", sketchRecorderState.transcriptSupported ? "Transcript did not start; type what you hear" : "Live transcript unavailable here");
    }
    showToast(transcribing ? "Recording with live transcript." : "Recording. Transcript can be typed after.");
  } catch (error) {
    const denied = error?.name === "NotAllowedError" || error?.name === "SecurityError";
    setTakeRecorderStatus(denied ? "Mic blocked" : "Mic error", denied ? "Allow microphone access in the browser, then press Record again." : "The mic did not open. Check your input device and try again.");
    showToast(denied ? "Mic permission is needed to record." : "Could not start the mic.");
    const start = $("#startSketchRecording");
    const stop = $("#stopSketchRecording");
    if (start) start.disabled = false;
    if (stop) stop.disabled = true;
  }
}

function stopSketchRecording() {
  if (!sketchRecorderState.recorder) return;
  stopSketchTranscription();
  try {
    sketchRecorderState.recorder.stop();
  } catch {
    finishSketchRecording();
  }
}

function finishSketchRecording() {
  if (sketchRecorderState.timerId) window.clearInterval(sketchRecorderState.timerId);
  sketchRecorderState.timerId = null;
  stopTakeMeter();
  if (!sketchRecorderState.chunks.length) {
    sketchRecorderState.stream?.getTracks().forEach((track) => track.stop());
    sketchRecorderState.stream = null;
    sketchRecorderState.recorder = null;
    sketchRecorderState.startedAt = 0;
    updateSketchRecorderUI(false);
    return;
  }
  const mimeType = sketchRecorderState.recorder?.mimeType || recordingMimeType() || "audio/webm";
  const blob = new Blob(sketchRecorderState.chunks, { type: mimeType });
  const url = URL.createObjectURL(blob);
  const duration = Math.max(0, Math.round((Date.now() - sketchRecorderState.startedAt) / 1000));
  const take = {
    id: `sketch-${Date.now()}`,
    url,
    blob,
    duration,
    label: `Take ${sketchRecorderState.takes.length + 1}`,
    transcript: $("#takeTranscript")?.value.trim() || "",
    notes: $("#takeDeliveryNotes")?.value.trim() || "",
    createdAt: Date.now(),
  };
  sketchRecorderState.takes.unshift(take);
  sketchRecorderState.currentTakeId = take.id;
  const playback = $("#takePlayback");
  if (playback) playback.src = url;
  const current = $("#currentTakeName");
  if (current) current.textContent = `${take.label} | ${formatTime(duration)}`;
  sketchRecorderState.stream?.getTracks().forEach((track) => track.stop());
  sketchRecorderState.stream = null;
  sketchRecorderState.recorder = null;
  sketchRecorderState.chunks = [];
  sketchRecorderState.startedAt = 0;
  updateSketchRecorderUI(false);
  renderSketchTakes();
  showToast("Sketch recorded.");
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

const vocalLayeringGuides = {
  "Pop": {
    title: "Pop vocal architecture",
    thesis: "The lead vocal is the product. Every double, harmony, and ad-lib should make the title clearer, brighter, or more repeatable.",
    blueprint: [
      ["Lead", "Record instinct, clean pitch, and high-confidence passes. Comp for believable emotion first, then polish."],
      ["Doubles", "Tight doubles on the title, last line of the pre, and chorus entrances. Keep verses mostly single-lead."],
      ["Harmonies", "Use simple upper harmonies on payoff words. Save wide harmony stacks for the final chorus or post-hook."],
      ["Ad-libs", "Small tags after the title, not over it. Treat ad-libs like punctuation and section lift."],
      ["Performance", "Bright consonants, clean endings, controlled breath, and emotional clarity within the first line."],
    ],
    avoid: ["Stacking every line until the lead disappears", "Over-tuning a vulnerable lyric", "Ad-libs that compete with the title", "Wide chorus with no lead clarity"],
  },
  "Pop-R&B": {
    title: "Pop-R&B vocal architecture",
    thesis: "Pop-R&B needs pop-level hook clarity with R&B-level vocal feeling. The lead must feel human while the hook sounds expensive.",
    blueprint: [
      ["Lead", "Track a close emotional pass, a clean pop pass, and a more decorated R&B pass. Comp the line that sells the feeling fastest."],
      ["Doubles", "Use tight doubles on the hook title and soft shadow doubles on selected verse words."],
      ["Harmonies", "Add two-part harmony on resolutions, then widen backgrounds behind the final hook without masking consonants."],
      ["Ad-libs", "Answer the lead after hook phrases. Keep first-hook ad-libs restrained; let final-hook runs bloom."],
      ["Performance", "Blend intimacy and precision: conversational verses, lifted pre, open-throat hook, tasteful runs only where the melody resolves."],
    ],
    avoid: ["Pretty stacks with no memorable lead", "Runs before the listener knows the title", "Backgrounds louder than the emotional sentence", "Pop brightness that removes warmth"],
  },
  "Dance-Pop": {
    title: "Dance-pop vocal architecture",
    thesis: "The vocal has to cut through movement. Rhythm, clean edits, and hook timing matter more than vocal gymnastics.",
    blueprint: [
      ["Lead", "Record tight rhythmic passes and clean phrase endings for edits, chops, and drops."],
      ["Doubles", "Double chants, post-hook phrases, and pre-drop words. Keep them grid-tight."],
      ["Harmonies", "Use bright, simple harmony blocks for lift rather than complex movement."],
      ["Ad-libs", "Use hype tags, breath throws, and delayed answers in gaps before the drop."],
      ["Performance", "Energetic, clipped, and forward. The body should understand the phrase before the lyric gets clever."],
    ],
    avoid: ["Long runs that blur groove", "Wet vocals that smear the drop", "Stacks that weaken kick/bass authority", "Hook words hidden behind chops"],
  },
};

function activeVocalLayeringGuide() {
  return vocalLayeringGuides[state.lane] || vocalLayeringGuides[activeGenreProfile().title] || {
    title: `${state.lane} vocal architecture`,
    thesis: "Design the vocal stack around the genre's main promise. The lead carries meaning; layers create scale, response, and emotional lift.",
    blueprint: [
      ["Lead", "Record one instinct pass, one clarity pass, and one emotional exaggeration pass."],
      ["Doubles", "Double only the words that need memory, impact, or width."],
      ["Harmonies", "Add harmony where the melody resolves or the section needs a new color."],
      ["Ad-libs", "Use ad-libs to answer phrases, mark transitions, and intensify final sections."],
      ["Performance", "Make the performance match the concept before adding more layers."],
    ],
    avoid: ["Layers covering weak writing", "Stacks that hide the title", "Ad-libs without a section job", "Tuning that changes the emotion"],
  };
}

function renderVocalGuide() {
  const deck = $("#vocalGuideDeck");
  if (!deck) return;
  const guide = activeVocalLayeringGuide();
  deck.innerHTML = `
    <article class="vocal-guide-card">
      <div>
        <span class="eyebrow">${escapeHtml(state.lane)} guide</span>
        <strong>${escapeHtml(guide.title)}</strong>
        <p>${escapeHtml(guide.thesis)}</p>
      </div>
      <div class="vocal-guide-blueprint">
        ${guide.blueprint.map(([label, text]) => `
          <span>
            <b>${escapeHtml(label)}</b>
            ${escapeHtml(text)}
          </span>
        `).join("")}
      </div>
      <div class="vocal-guide-avoid">
        <b>Avoid</b>
        ${guide.avoid.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
      </div>
    </article>
  `;
}

function vocalPlanContext() {
  const values = {
    ...state.creation,
    ...getCreationValues(),
  };
  return {
    section: $("#vocalSection")?.value || "Hook",
    lead: $("#leadDelivery")?.value || "Close and intimate",
    stack: $("#stackStyle")?.value || "Doubles",
    harmony: $("#harmonyDensity")?.value || "Light",
    adlibs: $("#adlibIntensity")?.value || "Medium",
    emotion: $("#performanceEmotion")?.value || "Intimate",
    hook: values.hook || "the title phrase",
    concept: values.concept || "the central feeling",
    workflow: activeWorkflowPreset(),
    profile: activeGenreProfile(),
    guide: activeVocalLayeringGuide(),
  };
}

function sectionPerformanceJob(section) {
  const normalized = String(section || "").toLowerCase();
  if (normalized.includes("hook")) return "sell the title clearly enough that the listener can remember it after one pass";
  if (normalized.includes("verse")) return "make the story feel lived-in before the production gets bigger";
  if (normalized.includes("pre")) return "increase pressure and point every phrase toward the hook";
  if (normalized.includes("bridge")) return "change the emotional camera angle before the final return";
  if (normalized.includes("vamp")) return "turn repetition into release through response, stacks, and small variations";
  return "add personality around the lead without stealing focus from the main phrase";
}

function stackInstruction(style, section) {
  const normalized = String(style || "").toLowerCase();
  if (normalized.includes("no stack")) return "Keep one lead vocal. Use silence and automation instead of doubles.";
  if (normalized.includes("octave")) return "Add a quiet octave under the last half of the phrase, then mute it before the next section starts.";
  if (normalized.includes("call")) return "Record a response phrase after the lead line. Leave enough space for the answer to feel intentional.";
  if (normalized.includes("harmony")) return "Hold soft harmony pads under long notes. Keep consonants quiet so the lead stays readable.";
  if (normalized.includes("gang")) return "Stack 3-5 loose voices on the shortest repeatable phrase. Pan wide and keep it rhythmic.";
  if (normalized.includes("choir")) return "Build low, mid, and high answers. Save the widest stack for the final repeat.";
  return section === "Verse" ? "Use doubles only on punch words, not every bar." : "Double the title phrase, then remove doubles from the setup line.";
}

function harmonyInstruction(density, profile) {
  const normalized = String(density || "").toLowerCase();
  if (normalized.includes("none")) return "No harmony. Let tone, rhythm, and ad-libs create contrast.";
  if (normalized.includes("medium")) return "Add two-part harmony on the payoff phrase and one answering harmony after it.";
  if (normalized.includes("lush")) return "Use three-part harmony on sustained words, but keep the first entrance simple.";
  if (normalized.includes("final")) return "Keep early hooks narrow. Open the final hook with wide high and low support.";
  if (profile.lane === "Gospel") return "Use call-and-response harmony that sounds like the room can join.";
  return "Add one upper harmony only where the melody resolves.";
}

function adlibInstruction(intensity, emotion) {
  const normalized = String(intensity || "").toLowerCase();
  if (normalized.includes("none")) return "No ad-libs. Commit to a dry, exposed lead.";
  if (normalized.includes("low")) return "Use one breath, one tag, and one final answer. Keep everything behind the lead.";
  if (normalized.includes("high")) return `Run a separate ${emotion.toLowerCase()} ad-lib pass after the lead is locked. Keep only the lines that answer the hook.`;
  if (normalized.includes("final")) return "Save the biggest ad-libs for the final hook or vamp. Do not crowd the first hook.";
  return "Add ad-libs on section exits, not over the title phrase.";
}

function buildVocalPlan(context = vocalPlanContext()) {
  const focus = context.workflow.focus || ["clarity", "emotion", "replay"];
  const leadPasses = context.lead.toLowerCase().includes("rap")
    ? "Record one pocket pass for rhythm, one clarity pass for words, and one attitude pass for quotables."
    : "Record three leads: instinct, clean pitch, and emotional exaggeration. Comp the line that sounds most believable.";
  return {
    section: context.section,
    title: `${context.profile.title} ${context.section} vocal plan`,
    lead: [
      `Section job: ${sectionPerformanceJob(context.section)}.`,
      `Lead direction: ${context.lead}. Aim the performance at "${context.hook}".`,
      leadPasses,
    ],
    layers: [
      `Genre stack map: ${context.guide.title}. ${context.guide.thesis}`,
      `Stack style: ${context.stack}. ${stackInstruction(context.stack, context.section)}`,
      `Harmony: ${context.harmony}. ${harmonyInstruction(context.harmony, context.profile)}`,
      `Ad-libs: ${context.adlibs}. ${adlibInstruction(context.adlibs, context.emotion)}`,
    ],
    performance: [
      `Emotion: ${context.emotion}. The singer should perform the concept as ${context.concept}.`,
      `Genre lens: prioritize ${focus[0]}, ${focus[1]}, and ${focus[2] || "replay"}.`,
      "Final check: mute every layer once. If the lead stops communicating, rewrite or re-sing before adding more stacks.",
    ],
  };
}

function renderVocalPlan(plan = state.lastVocalPlan) {
  const output = $("#vocalPlanOutput");
  if (!output) return;
  if (!plan) {
    output.innerHTML = `
      <span class="tag">No plan yet</span>
      <p>Choose a section and performance direction, then design the vocal stack.</p>
    `;
    return;
  }
  output.innerHTML = `
    <div class="lyric-suggestion-meta">
      <span class="tag">${escapeHtml(plan.section)}</span>
      <span class="tag">${escapeHtml(plan.title)}</span>
    </div>
    <div class="vocal-plan-grid">
      <article>
        <strong>Lead Take</strong>
        ${plan.lead.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </article>
      <article>
        <strong>Layers</strong>
        ${plan.layers.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </article>
      <article>
        <strong>Performance</strong>
        ${plan.performance.map((line) => `<p>${escapeHtml(line)}</p>`).join("")}
      </article>
    </div>
  `;
}

function generateVocalPlan() {
  state.lastVocalPlan = buildVocalPlan();
  renderVocalPlan();
  showToast("Vocal plan designed.");
}

function vocalPlanTextBlock(plan = state.lastVocalPlan) {
  if (!plan) return "";
  return [
    plan.title,
    "Lead take:",
    ...plan.lead.map((line) => `- ${line}`),
    "Layers:",
    ...plan.layers.map((line) => `- ${line}`),
    "Performance:",
    ...plan.performance.map((line) => `- ${line}`),
  ].join("\n");
}

function sendVocalPlanToPad() {
  if (!state.lastVocalPlan) generateVocalPlan();
  const block = vocalPlanTextBlock();
  const freewrite = $("#createFreewrite");
  const notes = $("#takeDeliveryNotes");
  if (notes && block) notes.value = notes.value.trim() ? `${notes.value.trim()}\n\n${block}` : block;
  if (freewrite && block) freewrite.value = freewrite.value.trim() ? `${freewrite.value.trim()}\n\n${block}` : block;
  syncCreationDraft({ quiet: false });
  showToast("Vocal plan sent to pad.");
}

function gradeSketchPerformance() {
  const transcript = $("#takeTranscript")?.value.trim() || "";
  const notes = $("#takeDeliveryNotes")?.value.trim() || "";
  const hook = $("#createHook")?.value.trim() || "";
  const concept = $("#createConcept")?.value.trim() || "";
  const words = transcriptWords(transcript);
  const repeated = repeatedPhraseScore(words);
  const hookWords = new Set(transcriptWords(hook).filter((word) => word.length > 3));
  const hookHits = words.filter((word) => hookWords.has(word)).length;
  const activeTake = sketchRecorderState.takes.find((take) => take.id === sketchRecorderState.currentTakeId) || sketchRecorderState.takes[0];
  const duration = activeTake?.duration || 0;
  const scores = [
    Math.min(25, words.length * 0.8),
    Math.min(20, repeated * 6),
    hook ? Math.min(20, hookHits * 5) : 8,
    concept ? 15 : 6,
    notes ? 10 : 4,
    duration >= 20 ? 10 : Math.max(3, duration / 2),
  ];
  const total = Math.round(scores.reduce((sum, score) => sum + score, 0));
  const verdict = total >= 78 ? "Keep and refine" : total >= 58 ? "Good sketch, needs focus" : "Raw pass";
  const fixes = [];
  if (words.length < 25) fixes.push("Longer pass: get at least one full hook and one verse idea down.");
  if (repeated < 2) fixes.push("Repeat the strongest phrase until it starts acting like a hook.");
  if (hook && hookHits < 2) fixes.push("Put the hook target in the take more clearly.");
  if (!concept) fixes.push("Add a one-sentence concept before grading the next pass.");
  if (!notes) fixes.push("Add delivery notes: rushed, numb, cocky, intimate, strained, or too clean.");
  if (!fixes.length) fixes.push("Do one cleaner take and exaggerate the emotional turn.");
  renderTakeGrade({
    total: Math.min(total, 100),
    verdict,
    fixes,
    stats: `${words.length} words | repeat strength ${repeated} | hook hits ${hookHits} | ${duration || "no"} sec`,
  });
}

function renderTakeGrade(result) {
  const output = $("#takeGradeOutput");
  if (!output) return;
  output.innerHTML = `
    <span class="tag">${escapeHtml(result.verdict)}</span>
    <strong>${result.total}/100</strong>
    <p>${escapeHtml(result.stats)}</p>
    <ul>
      ${result.fixes.map((fix) => `<li>${escapeHtml(fix)}</li>`).join("")}
    </ul>
  `;
}

function sendTakeTranscriptToPad() {
  const transcript = $("#takeTranscript")?.value.trim() || "";
  const notes = $("#takeDeliveryNotes")?.value.trim() || "";
  if (!transcript && !notes) {
    showToast("Add a transcript or note first.");
    return;
  }
  const block = ["Recorded sketch", transcript && `Transcript: ${transcript}`, notes && `Delivery: ${notes}`].filter(Boolean).join("\n");
  const freewrite = $("#createFreewrite");
  if (freewrite) freewrite.value = freewrite.value.trim() ? `${freewrite.value.trim()}\n\n${block}` : block;
  syncCreationDraft({ quiet: false });
  setCreateMode("write", { silent: true });
  showToast("Take sent to pad.");
}

function renderSketchTakes() {
  const list = $("#takeList");
  if (!list) return;
  list.innerHTML = sketchRecorderState.takes.length
    ? sketchRecorderState.takes
        .map((take, index) => `
          <article class="${take.id === sketchRecorderState.currentTakeId ? "is-active" : ""}">
            <div>
              <span class="tag">${escapeHtml(take.label || `Take ${sketchRecorderState.takes.length - index}`)}</span>
              <span class="tag">${formatTime(take.duration)}</span>
              ${take.transcript ? `<span class="tag">Transcript</span>` : ""}
              ${take.notes ? `<span class="tag">Notes</span>` : ""}
            </div>
            <div class="take-card-actions">
              <button class="ghost-button" type="button" data-load-sketch-take="${escapeHtml(take.id)}">Load</button>
              <a class="ghost-button" href="${escapeHtml(take.url)}" download="${escapeHtml((take.label || "songlab-take").toLowerCase().replace(/[^a-z0-9]+/g, "-"))}.webm">Save</a>
              <button class="ghost-button" type="button" data-delete-sketch-take="${escapeHtml(take.id)}">Delete</button>
            </div>
          </article>
        `)
        .join("")
    : `<article class="take-empty-state"><span class="tag">No sketches yet</span><p>Record a rough vocal, melody, or flow pass.</p></article>`;
}

function loadSketchTake(takeId) {
  const take = sketchRecorderState.takes.find((item) => item.id === takeId);
  if (!take) return;
  sketchRecorderState.currentTakeId = take.id;
  const playback = $("#takePlayback");
  if (playback) playback.src = take.url;
  const current = $("#currentTakeName");
  if (current) current.textContent = `${take.label || "Loaded take"} | ${formatTime(take.duration)}`;
  const transcript = $("#takeTranscript");
  const notes = $("#takeDeliveryNotes");
  if (transcript) transcript.value = take.transcript || "";
  if (notes) notes.value = take.notes || "";
  renderSketchTakes();
  showToast("Take loaded.");
}

function deleteSketchTake(takeId) {
  const take = sketchRecorderState.takes.find((item) => item.id === takeId);
  if (take?.url) URL.revokeObjectURL(take.url);
  sketchRecorderState.takes = sketchRecorderState.takes.filter((item) => item.id !== takeId);
  if (sketchRecorderState.currentTakeId === takeId) {
    const next = sketchRecorderState.takes[0];
    sketchRecorderState.currentTakeId = next?.id || null;
    const playback = $("#takePlayback");
    const current = $("#currentTakeName");
    if (next) {
      if (playback) playback.src = next.url;
      if (current) current.textContent = `${next.label || "Loaded take"} | ${formatTime(next.duration)}`;
    } else {
      if (playback) playback.removeAttribute("src");
      if (current) current.textContent = "No take loaded";
    }
  }
  updateSketchRecorderUI(false);
  renderSketchTakes();
  showToast("Take deleted.");
}

function activeSketchTake() {
  return sketchRecorderState.takes.find((take) => take.id === sketchRecorderState.currentTakeId) || sketchRecorderState.takes[0] || null;
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error || new Error("Could not read audio."));
    reader.readAsDataURL(blob);
  });
}

function handleAnalysisAudioUpload(file) {
  const label = $("#analysisAudioName");
  if (!file) {
    state.analystAudio = null;
    if (label) label.textContent = "No audio selected";
    return;
  }
  state.analystAudio = {
    file,
    name: file.name || "uploaded-song",
    size: file.size || 0,
    mimeType: file.type || "application/octet-stream",
  };
  if (label) label.textContent = `${state.analystAudio.name} | ${(state.analystAudio.size / 1024 / 1024).toFixed(1)} MB`;
  showToast("Audio ready for analysis.");
}

async function checkAnalystHealth() {
  const status = $("#analystApiStatus");
  if (!status) return;
  try {
    const response = await fetch("/api/health", { cache: "no-store" });
    const data = await response.json();
    state.analystApiEnabled = Boolean(data.apiEnabled);
    status.textContent = data.apiEnabled ? "AI API ready" : "Local mode";
  } catch {
    state.analystApiEnabled = false;
    status.textContent = "Static mode";
  }
}

function analysisContextValues() {
  return {
    title: $("#createTitle")?.value.trim() || $("#songTitle")?.value.trim() || state.creation.title || "",
    concept: $("#analysisConceptInput")?.value.trim() || $("#createConcept")?.value.trim() || state.creation.concept || "",
    hook: $("#analysisHookInput")?.value.trim() || $("#createHook")?.value.trim() || state.creation.hook || "",
    genre: state.lane,
    notes: $("#takeDeliveryNotes")?.value.trim() || "",
  };
}

function renderSongAnalysis(analysis = state.songAnalysis) {
  const output = $("#analysisOutput");
  if (!output) return;
  if (!analysis) {
    output.innerHTML = `
      <article class="tool-panel analyst-empty">
        <span class="tag">No analysis yet</span>
        <p>Record a take in Create, paste your own lyrics, or add a transcript, then run the analyst.</p>
      </article>
    `;
    return;
  }
  const scoreRows = Object.entries(analysis.scores || {}).filter(([key]) => key !== "overall");
  output.innerHTML = `
    <section class="tool-panel analyst-score-card">
      <span class="eyebrow">${escapeHtml(analysis.mode === "ai" ? "AI-backed analysis" : "Local analysis")}</span>
      <div class="analyst-score-hero">
        <strong>${Math.round(analysis.scores?.overall || 0)}</strong>
        <span>overall</span>
      </div>
      <div class="analysis-score-grid">
        ${scoreRows.map(([key, value]) => `
          <article>
            <span>${escapeHtml(key)}</span>
            <strong>${Math.round(Number(value) || 0)}</strong>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="tool-panel analysis-section-map">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Song map</span>
          <h2>Elements the analyst hears</h2>
        </div>
      </div>
      ${(analysis.sections || []).map((section) => `
        <article>
          <span class="tag">${escapeHtml(section.start || "estimate")}</span>
          <strong>${escapeHtml(section.name || "Section")}</strong>
          <p>${escapeHtml(section.job || "")}</p>
          <small>${escapeHtml(section.notes || "")}</small>
        </article>
      `).join("")}
    </section>

    <section class="tool-panel analysis-repair-card">
      <div>
        <span class="eyebrow">Title candidates</span>
        <p>${(analysis.titleCandidates || []).map((item) => `<span class="tag">${escapeHtml(item)}</span>`).join(" ") || "No title candidate yet"}</p>
      </div>
      <div>
        <span class="eyebrow">Strengths</span>
        <ul>${(analysis.strengths || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div>
        <span class="eyebrow">Repairs</span>
        <ul>${(analysis.repairs || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </div>
      <div>
        <span class="eyebrow">Next take</span>
        <p>${escapeHtml(analysis.nextTakeDirection || "Record one more pass with a clearer emotional turn.")}</p>
      </div>
    </section>

    <section class="tool-panel analysis-transcript-card">
      <span class="eyebrow">Transcript</span>
      <p>${escapeHtml(analysis.transcript || "").replace(/\n/g, "<br />")}</p>
    </section>
  `;
}

async function runSongAnalysis() {
  const output = $("#analysisOutput");
  const button = $("#runSongAnalysis");
  const transcriptInput = $("#analysisTranscriptInput");
  const useCurrentTake = $("#analysisUseCurrentTake")?.checked;
  const ownsRights = $("#analysisOwnsRights")?.checked;
  const uploadedAudio = state.analystAudio?.file ? state.analystAudio : null;
  const take = !uploadedAudio && useCurrentTake ? activeSketchTake() : null;
  const transcript = transcriptInput?.value.trim() || $("#takeTranscript")?.value.trim() || take?.transcript || "";
  if (!ownsRights) {
    showToast("Confirm you own or have permission to analyze it.");
    return;
  }
  if (!transcript && !take?.blob && !uploadedAudio?.file) {
    showToast("Upload audio, record a take, or paste lyrics first.");
    return;
  }
  if (!state.analystApiEnabled && (uploadedAudio?.file || take?.blob) && !transcript) {
    if (output) {
      output.innerHTML = `
        <article class="tool-panel analyst-empty">
          <span class="tag">API key needed</span>
          <p>Uploaded or recorded audio needs AI transcription before it can be analyzed. Add <code>OPENAI_API_KEY</code> to <code>.env</code>, restart the SongLab server, or paste a transcript here for Local mode.</p>
        </article>
      `;
    }
    showToast("Audio transcription needs API mode.");
    return;
  }
  if (output) {
    output.innerHTML = `
      <article class="tool-panel analyst-empty">
        <span class="tag">Analyzing</span>
        <p>Listening for concept, hook, structure, replay value, and repair moves.</p>
      </article>
    `;
  }
  if (button) button.disabled = true;
  try {
    let audio = null;
    if (uploadedAudio?.file) {
      audio = {
        base64: await blobToBase64(uploadedAudio.file),
        mimeType: uploadedAudio.mimeType,
        filename: uploadedAudio.name,
      };
    } else if (take?.blob) {
      audio = {
        base64: await blobToBase64(take.blob),
        mimeType: take.blob.type || "audio/webm",
        filename: `${take.label || "songlab-take"}.webm`,
      };
    }
    const response = await fetch("/api/analyze-song", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ownsRights,
        transcript,
        audio,
        context: analysisContextValues(),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Song analysis failed.");
    state.songAnalysis = data.analysis;
    if (transcriptInput && data.analysis?.transcript) transcriptInput.value = data.analysis.transcript;
    renderSongAnalysis();
    showToast(data.apiEnabled ? "AI analysis complete." : "Local analysis complete.");
  } catch (error) {
    if (output) {
      output.innerHTML = `
        <article class="tool-panel analyst-empty">
          <span class="tag">Analysis issue</span>
          <p>${escapeHtml(error.message || "The analyst could not complete this pass.")}</p>
        </article>
      `;
    }
    showToast("Analysis could not complete.");
  } finally {
    if (button) button.disabled = false;
  }
}

function analysisTextBlock(analysis = state.songAnalysis) {
  if (!analysis) return "";
  return [
    `Song analysis | ${analysis.mode === "ai" ? "AI" : "local"} mode`,
    `Overall: ${Math.round(analysis.scores?.overall || 0)}/100`,
    "Scores:",
    ...Object.entries(analysis.scores || {}).map(([key, value]) => `- ${key}: ${Math.round(Number(value) || 0)}`),
    "Sections:",
    ...(analysis.sections || []).map((section) => `- ${section.name}: ${section.job}`),
    "Repairs:",
    ...(analysis.repairs || []).map((item) => `- ${item}`),
    `Next take: ${analysis.nextTakeDirection || ""}`,
  ].join("\n");
}

function sendAnalysisToPad() {
  const block = analysisTextBlock();
  if (!block) {
    showToast("Run analysis first.");
    return;
  }
  const freewrite = $("#createFreewrite");
  if (freewrite) freewrite.value = freewrite.value.trim() ? `${freewrite.value.trim()}\n\n${block}` : block;
  syncCreationDraft({ quiet: false });
  showToast("Analysis sent to pad.");
}

function sendAnalysisToDoctor() {
  const analysis = state.songAnalysis;
  if (!analysis) {
    showToast("Run analysis first.");
    return;
  }
  const context = analysisContextValues();
  $("#songTitle").value = context.title || analysis.titleCandidates?.[0] || "Analyzed song";
  $("#conceptInput").value = context.concept || analysis.strengths?.[0] || "Concept needs sharpening from the analysis.";
  $("#hookInput").value = context.hook || analysis.titleCandidates?.[0] || "";
  $("#memoryInput").value = analysis.titleCandidates?.[0] || context.hook || "the main hook and emotional turn";
  $("#stuckInput").value = (analysis.scores?.hook || 0) < 70 ? "No clear hook" : (analysis.scores?.structure || 0) < 70 ? "Loop does not evolve" : "Lyrics feel vague";
  $("#clarityInput").value = String(clamp(Math.round((analysis.scores?.concept || 50) / 10), 1, 10));
  $("#hookStrengthInput").value = String(clamp(Math.round((analysis.scores?.hook || 50) / 10), 1, 10));
  $("#spaceInput").value = String(clamp(Math.round((analysis.scores?.performance || 60) / 10), 1, 10));
  $("#payoffInput").value = String(clamp(Math.round((analysis.scores?.structure || 50) / 10), 1, 10));
  ["clarityInput", "hookStrengthInput", "spaceInput", "payoffInput"].forEach((id) => {
    $(`[data-for="${id}"]`).textContent = $(`#${id}`).value;
  });
  setView("doctor");
  diagnoseSong();
}

function updateCreationBeatUI() {
  const audio = creationAudioElement();
  const name = $("#createBeatName");
  const time = $("#createBeatTime");
  const play = $("#globalPlayPause");
  const loop = $("#globalLoopToggle");
  const loopStatus = $("#createLoopStatus");
  const seek = $("#globalSeek");
  const globalName = $("#globalTrackName");
  const globalTime = $("#globalTrackTime");
  if (!audio) return;
  const duration = audio.duration || 0;
  const trackName = state.creation.beatName || "No beat loaded";
  const hasGlobalAudio = Boolean(state.creation.beatUrl || audio.getAttribute("src")) && trackName !== "No beat loaded";
  document.body.classList.toggle("has-global-audio", hasGlobalAudio);
  const trackTime = `${formatTime(audio.currentTime || 0)} / ${formatTime(duration)}`;
  if (name) name.textContent = trackName;
  if (time) time.textContent = trackTime;
  if (globalName) globalName.textContent = trackName;
  if (globalTime) globalTime.textContent = trackTime;
  if (play) {
    play.innerHTML = audio.paused
      ? `<svg><use href="#icon-play"></use></svg>`
      : `<svg><use href="#icon-pause"></use></svg>`;
    play.setAttribute("aria-label", audio.paused ? "Play" : "Pause");
  }
  if (loop) {
    loop.classList.toggle("is-active", audio.loop);
    loop.setAttribute("aria-label", audio.loop ? "Loop on" : "Loop off");
  }
  if (loopStatus) loopStatus.textContent = audio.loop ? "Loop On" : "Loop Off";
  if (seek && document.activeElement !== seek) {
    seek.max = String(duration || 0);
    seek.value = String(audio.currentTime || 0);
  }
}

async function loadCreationBeat(file) {
  if (!file) return;
  if (state.creation.beatUrl) URL.revokeObjectURL(state.creation.beatUrl);
  const audio = creationAudioElement();
  state.creation.beatUrl = URL.createObjectURL(file);
  state.creation.beatName = file.name;
  audio.src = state.creation.beatUrl;
  audio.loop = state.creation.loopOn;
  audio.volume = 0.82;
  audio.load();
  persistCreationDraft();
  updateCreationBeatUI();
  try {
    await audio.play();
    showToast("Beat loaded and looping.");
  } catch {
    showToast("Beat loaded. Press Play Beat to start.");
  }
}

async function toggleCreationPlayback() {
  const audio = creationAudioElement();
  if (!audio.src) {
    showToast("Upload a beat first.");
    return;
  }
  if (audio.paused) {
    try {
      await audio.play();
    } catch {
      showToast("Click Play Beat again if playback was blocked.");
    }
  } else {
    audio.pause();
  }
  updateCreationBeatUI();
}

async function restartCreationBeat() {
  const audio = creationAudioElement();
  if (!audio.src) {
    showToast("Upload a beat first.");
    return;
  }
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch {
    showToast("Beat restarted. Press Play Beat to continue.");
  }
  updateCreationBeatUI();
}

function seekCreationBy(seconds) {
  const audio = creationAudioElement();
  if (!audio.src) {
    showToast("Upload a beat first.");
    return;
  }
  const duration = audio.duration || 0;
  audio.currentTime = clamp((audio.currentTime || 0) + seconds, 0, duration || Number.MAX_SAFE_INTEGER);
  updateCreationBeatUI();
}

function scrubCreationBeat(value) {
  const audio = creationAudioElement();
  if (!audio.src) return;
  audio.currentTime = clamp(Number(value) || 0, 0, audio.duration || 0);
  updateCreationBeatUI();
}

function setCreationPlaybackRate(value) {
  const audio = creationAudioElement();
  audio.playbackRate = Number(value) || 1;
  showToast(`Speed ${audio.playbackRate}x.`);
}

function toggleCreationLoop() {
  const audio = creationAudioElement();
  state.creation.loopOn = !state.creation.loopOn;
  audio.loop = state.creation.loopOn;
  persistCreationDraft();
  updateCreationBeatUI();
}

function applyCreationTemplate(templateId) {
  state.creation.sections = currentCreationSections();
  state.creation.template = templateId;
  persistCreationDraft();
  renderCreationRoom();
  showToast(`${activeCreationTemplate().label} structure loaded.`);
}

function saveCreationDraft() {
  syncCreationDraft({ quiet: false });
  showToast("Writing draft saved locally.");
}

function saveCreationToVault() {
  syncCreationDraft();
  setFlowFlag("hookSaved");
  const values = getCreationValues();
  const template = activeCreationTemplate();
  const sections = currentCreationSections();
  const filled = template.sections.filter(([id]) => String(sections[id] || "").trim()).length;
  state.references.unshift({
    title: `${values.title || "Untitled song"} writing draft`,
    use: values.concept || "Open writing draft in progress.",
    replay: `Hook: ${values.hook || "not set yet"} | ${template.label} structure ${filled}/${template.sections.length}`,
    lane: state.lane,
  });
  persistReferences();
  renderReferences();
  renderStudioFlow();
  showToast("Writing draft saved to Vault.");
}

function sendCreationToDoctor() {
  syncCreationDraft();
  const values = getCreationValues();
  const template = activeCreationTemplate();
  $("#songTitle").value = values.title || "Untitled song";
  $("#conceptInput").value = values.concept || "Open writing draft needs a sharper one-sentence concept.";
  $("#hookInput").value = values.hook || "";
  $("#memoryInput").value = values.hook || template.promise;
  $("#stuckInput").value = values.hook ? "Loop does not evolve" : "No clear hook";
  $("#clarityInput").value = values.concept ? "7" : "4";
  $("#hookStrengthInput").value = values.hook ? "7" : "3";
  $("#spaceInput").value = "7";
  $("#payoffInput").value = creationWordCount(values.freewrite) > 35 ? "6" : "4";
  ["clarityInput", "hookStrengthInput", "spaceInput", "payoffInput"].forEach((id) => {
    $(`[data-for="${id}"]`).textContent = $(`#${id}`).value;
  });
  setView("doctor");
  diagnoseSong();
}

function renderCreationRoom() {
  applyCreationDraftToForm();
  renderCreationTemplates();
  renderGenreProfiles();
  renderCreationStructure();
  renderCreationCoach();
  renderFlowWriting();
  renderVocalGuide();
  renderSketchTakes();
  if (typeof updateTranscriptAvailability === "function") updateTranscriptAvailability();
  renderCreateRoute();
  const audio = creationAudioElement();
  if (audio) audio.loop = state.creation.loopOn;
  updateCreationBeatUI();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function audioElement() {
  return $("#audioElement");
}

function currentAudioDuration() {
  const audio = audioElement();
  return audio.duration || state.audio.duration || 0;
}

function drawWaveform() {
  const canvas = $("#waveformCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const shellWidth = canvas.clientWidth || 900;
  const shellHeight = canvas.clientHeight || 208;
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(shellWidth * pixelRatio);
  canvas.height = Math.floor(shellHeight * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, shellWidth, shellHeight);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, shellWidth, shellHeight);
  ctx.strokeStyle = "#ecefe7";
  ctx.lineWidth = 1;
  for (let y = 24; y < shellHeight; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(shellWidth, y);
    ctx.stroke();
  }

  const audio = audioElement();
  const duration = currentAudioDuration();
  const progress = duration ? audio.currentTime / duration : 0;
  const peaks = state.audio.peaks.length
    ? state.audio.peaks
    : Array.from({ length: 96 }, (_, index) => 0.18 + Math.abs(Math.sin(index * 0.37)) * 0.55);
  const barWidth = Math.max(2, shellWidth / peaks.length - 1);
  const centerY = shellHeight / 2;

  peaks.forEach((peak, index) => {
    const x = (index / peaks.length) * shellWidth;
    const height = Math.max(3, peak * (shellHeight * 0.78));
    ctx.fillStyle = index / peaks.length <= progress ? "#f06543" : "#07847f";
    ctx.fillRect(x, centerY - height / 2, barWidth, height);
  });

  if (duration) {
    if (state.audio.loopOn) {
      const start = clamp(Number($("#loopStart").value) || 0, 0, duration);
      const end = clamp(Number($("#loopEnd").value) || duration, start, duration);
      const loopX = (start / duration) * shellWidth;
      const loopWidth = Math.max(2, ((end - start) / duration) * shellWidth);
      ctx.fillStyle = "rgba(183, 217, 104, 0.22)";
      ctx.fillRect(loopX, 0, loopWidth, shellHeight);
    }

    state.audio.markers.forEach((marker) => {
      const x = (marker.time / duration) * shellWidth;
      ctx.strokeStyle = marker.type === "Hook" ? "#f06543" : "#d7a84f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, shellHeight);
      ctx.stroke();
    });
  }
}

function updatePlayhead() {
  const duration = currentAudioDuration();
  const currentTime = audioElement().currentTime || 0;
  const percent = duration ? clamp(currentTime / duration, 0, 1) : 0;
  $("#playhead").style.left = `${percent * 100}%`;
  $("#trackTime").textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
}

function bpmReadout() {
  if (!state.audio.bpm) return "BPM --";
  const confidenceLabel = state.audio.bpmConfidence >= 0.72 ? "high" : state.audio.bpmConfidence >= 0.42 ? "medium" : "rough";
  const half = Math.round(state.audio.bpm / 2);
  const double = Math.round(state.audio.bpm * 2);
  const alt = half >= 60 ? ` / ${half} half` : double <= 190 ? ` / ${double} double` : "";
  return `${state.audio.bpm} BPM${alt} | ${confidenceLabel}`;
}

function buildPeaks(buffer, target = 180) {
  const data = buffer.getChannelData(0);
  const blockSize = Math.max(1, Math.floor(data.length / target));
  const peaks = [];
  for (let i = 0; i < target; i += 1) {
    let peak = 0;
    const start = i * blockSize;
    const end = Math.min(start + blockSize, data.length);
    for (let j = start; j < end; j += 1) {
      peak = Math.max(peak, Math.abs(data[j]));
    }
    peaks.push(Math.pow(peak, 0.72));
  }
  const maxPeak = Math.max(...peaks, 0.1);
  return peaks.map((peak) => peak / maxPeak);
}

function normalizeBpm(bpm) {
  let normalized = Number(bpm) || 0;
  while (normalized < 70) normalized *= 2;
  while (normalized > 180) normalized /= 2;
  return normalized;
}

function estimateBpm(buffer) {
  const sampleRate = buffer.sampleRate;
  const channel = buffer.getChannelData(0);
  const analysisSeconds = Math.min(buffer.duration, 45);
  const frameSize = 1024;
  const hopSize = 512;
  const totalSamples = Math.min(channel.length, Math.floor(analysisSeconds * sampleRate));
  const energies = [];

  for (let start = 0; start + frameSize < totalSamples; start += hopSize) {
    let sum = 0;
    for (let i = 0; i < frameSize; i += 1) {
      const sample = channel[start + i];
      sum += sample * sample;
    }
    energies.push(Math.sqrt(sum / frameSize));
  }

  if (energies.length < 16) return { bpm: null, confidence: 0 };

  const novelty = energies.map((energy, index) => Math.max(0, energy - (energies[index - 1] || 0)));
  const mean = novelty.reduce((sum, value) => sum + value, 0) / novelty.length;
  const centered = novelty.map((value) => Math.max(0, value - mean * 0.72));
  const framesPerSecond = sampleRate / hopSize;
  let best = { bpm: null, score: 0 };

  for (let bpm = 60; bpm <= 190; bpm += 1) {
    const lag = Math.round((60 / bpm) * framesPerSecond);
    if (lag < 2 || lag >= centered.length) continue;
    let score = 0;
    for (let index = lag; index < centered.length; index += 1) {
      score += centered[index] * centered[index - lag];
      const halfLag = Math.round(lag / 2);
      if (halfLag > 1 && index >= halfLag) score += centered[index] * centered[index - halfLag] * 0.22;
      const doubleLag = lag * 2;
      if (index >= doubleLag) score += centered[index] * centered[index - doubleLag] * 0.18;
    }
    if (score > best.score) best = { bpm, score };
  }

  const normalized = best.bpm ? normalizeBpm(best.bpm) : null;
  const energy = centered.reduce((sum, value) => sum + value, 0) || 1;
  const confidence = Math.max(0, Math.min(1, best.score / (energy * energy * 0.015)));
  return {
    bpm: normalized ? Math.round(normalized) : null,
    confidence,
  };
}

async function analyzeAudioBuffer(arrayBuffer) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    showToast("This browser cannot draw the waveform.");
    return;
  }
  const context = new AudioContextClass();
  const buffer = await context.decodeAudioData(arrayBuffer.slice(0));
  state.audio.duration = buffer.duration;
  state.audio.peaks = buildPeaks(buffer);
  const tempo = estimateBpm(buffer);
  state.audio.bpm = tempo.bpm;
  state.audio.bpmConfidence = tempo.confidence;
  if (context.close) await context.close();
}

function getSavedAudioMap(trackName) {
  try {
    const saved = JSON.parse(localStorage.getItem("songlabAudioMap"));
    return saved?.trackName === trackName ? saved.markers : null;
  } catch {
    return null;
  }
}

function persistAudioMap() {
  localStorage.setItem(
    "songlabAudioMap",
    JSON.stringify({
      trackName: state.audio.trackName,
      markers: state.audio.markers,
    }),
  );
}

function seedMarkers(duration, trackName) {
  const saved = getSavedAudioMap(trackName);
  if (saved?.length) {
    state.audio.markers = saved;
    state.audio.markerSeed = Math.max(...saved.map((marker) => marker.id || 0), 0) + 1;
    return;
  }
  state.audio.markers = starterMarkers.map(([type, ratio, note]) => ({
    id: state.audio.markerSeed++,
    type,
    time: Number((ratio * duration).toFixed(1)),
    note,
  }));
}

function markerSummary() {
  if (!state.audio.markers.length) return "No markers yet.";
  return state.audio.markers
    .slice(0, 6)
    .map((marker) => `${formatTime(marker.time)} ${marker.type}`)
    .join(" | ");
}

function renderMarkers() {
  $("#markerCount").textContent = state.audio.markers.length;
  $("#markerList").innerHTML = state.audio.markers.length
    ? state.audio.markers
        .map((marker) => `
          <article class="marker-card">
            <span class="marker-time">${formatTime(marker.time)}</span>
            <div>
              <strong>${marker.type}</strong>
              <p>${marker.note || "No note yet."}</p>
              <div class="marker-actions">
                <button type="button" data-seek-marker="${marker.id}">Seek</button>
                <button type="button" data-loop-marker="${marker.id}">Loop</button>
                <button type="button" data-delete-marker="${marker.id}">Delete</button>
              </div>
            </div>
          </article>
        `)
        .join("")
    : `<article class="marker-card"><span class="marker-time">0:00</span><div><strong>No markers</strong><p>Load audio and mark the sections that matter.</p></div></article>`;
  drawWaveform();
}

function activeGuidePrompt() {
  const duration = currentAudioDuration();
  const currentRatio = duration ? audioElement().currentTime / duration : 0;
  return guidePrompts.reduce((active, prompt) => (currentRatio >= prompt.ratio ? prompt : active), guidePrompts[0]);
}

function renderGuide() {
  const guide = activeGuidePrompt();
  $("#guideTitle").textContent = guide.title;
  $("#guidePrompt").textContent = guide.prompt;
  $("#guideStage").textContent = formatTime(audioElement().currentTime || 0);
}

function updateAudioInterface() {
  const audio = audioElement();
  const duration = currentAudioDuration();
  $("#trackName").textContent = state.audio.trackName;
  const bpm = $("#trackBpm");
  if (bpm) bpm.textContent = bpmReadout();
  $("#playPause").innerHTML = audio.paused
    ? `<svg><use href="#icon-play"></use></svg> Play`
    : `<svg><use href="#icon-pause"></use></svg> Pause`;
  $("#loopToggle").innerHTML = `<svg><use href="#icon-repeat"></use></svg> ${state.audio.loopOn ? "Loop On" : "Loop Off"}`;
  $("#loopEnd").max = duration || "";
  updatePlayhead();
  renderGuide();
  drawWaveform();
  renderSessionStrip();
}

async function loadAudioBlob(blob, name) {
  if (state.audio.audioUrl) URL.revokeObjectURL(state.audio.audioUrl);
  const audio = audioElement();
  const url = URL.createObjectURL(blob);
  state.audio.audioUrl = url;
  state.audio.trackName = name;
  state.audio.bpm = null;
  state.audio.bpmConfidence = 0;
  audio.src = url;
  audio.load();
  $("#trackName").textContent = name;
  showToast("Audio loaded.");
  try {
    await analyzeAudioBuffer(await blob.arrayBuffer());
    seedMarkers(state.audio.duration, name);
    $("#loopStart").value = "0";
    $("#loopEnd").value = Math.min(8, Math.max(1, Math.floor(state.audio.duration))).toString();
    renderMarkers();
    updateAudioInterface();
  } catch {
    state.audio.peaks = [];
    state.audio.markers = [];
    state.audio.bpm = null;
    state.audio.bpmConfidence = 0;
    showToast("Audio loaded, but waveform analysis failed.");
    updateAudioInterface();
  }
}

async function loadAudioFile(file) {
  if (!file) return;
  await loadAudioBlob(file, file.name);
}

function createDemoGrooveBlob() {
  const sampleRate = 44100;
  const duration = 28;
  const length = sampleRate * duration;
  const data = new Float32Array(length);
  const bpm = 94;
  const beat = 60 / bpm;
  for (let i = 0; i < length; i += 1) {
    const t = i / sampleRate;
    const beatPosition = (t % beat) / beat;
    const beatIndex = Math.floor(t / beat) % 4;
    const barIndex = Math.floor(t / (beat * 4));
    const kick = beatPosition < 0.18 ? Math.sin(2 * Math.PI * (56 + 18 * beatPosition) * t) * Math.exp(-beatPosition * 18) : 0;
    const snare = (beatIndex === 1 || beatIndex === 3) && beatPosition < 0.14 ? (Math.random() * 2 - 1) * Math.exp(-beatPosition * 20) * 0.34 : 0;
    const hat = beatPosition < 0.06 ? (Math.random() * 2 - 1) * Math.exp(-beatPosition * 35) * 0.13 : 0;
    const bassNote = [55, 65.4, 73.4, 49][barIndex % 4];
    const bass = Math.sin(2 * Math.PI * bassNote * t) * 0.16 * (0.65 + Math.sin(t * 2.1) * 0.15);
    const keys = Math.sin(2 * Math.PI * (220 + (barIndex % 2) * 55) * t) * 0.045 * (0.5 + Math.sin(t * 0.7) * 0.5);
    data[i] = clamp(kick * 0.55 + snare + hat + bass + keys, -0.95, 0.95);
  }

  const buffer = new ArrayBuffer(44 + data.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset, string) => {
    for (let i = 0; i < string.length; i += 1) view.setUint8(offset + i, string.charCodeAt(i));
  };
  writeString(0, "RIFF");
  view.setUint32(4, 36 + data.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, data.length * 2, true);
  let offset = 44;
  for (let i = 0; i < data.length; i += 1) {
    const sample = clamp(data[i], -1, 1);
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += 2;
  }
  return new Blob([view], { type: "audio/wav" });
}

async function loadDemoGroove() {
  await loadAudioBlob(createDemoGrooveBlob(), "SongLab demo groove.wav");
}

async function togglePlayback() {
  const audio = audioElement();
  if (!audio.src) {
    showToast("Load audio first.");
    return;
  }
  if (audio.paused) {
    try {
      await audio.play();
    } catch {
      showToast("Playback needs a browser gesture.");
    }
  } else {
    audio.pause();
  }
  updateAudioInterface();
}

function seekBy(seconds) {
  const audio = audioElement();
  const duration = currentAudioDuration();
  if (!duration) return;
  audio.currentTime = clamp(audio.currentTime + seconds, 0, duration);
  updateAudioInterface();
}

function seekTo(seconds) {
  const audio = audioElement();
  const duration = currentAudioDuration();
  if (!duration) return;
  audio.currentTime = clamp(seconds, 0, duration);
  updateAudioInterface();
}

function toggleLoop() {
  state.audio.loopOn = !state.audio.loopOn;
  updateAudioInterface();
}

function setLoopFromPlayhead() {
  const duration = currentAudioDuration();
  if (!duration) {
    showToast("Load audio first.");
    return;
  }
  const start = clamp(audioElement().currentTime, 0, duration);
  const end = clamp(start + 8, 0, duration);
  $("#loopStart").value = start.toFixed(1);
  $("#loopEnd").value = end.toFixed(1);
  state.audio.loopOn = true;
  updateAudioInterface();
}

function addAudioMarker() {
  const duration = currentAudioDuration();
  if (!duration) {
    showToast("Load audio first.");
    return;
  }
  const marker = {
    id: state.audio.markerSeed++,
    type: $("#markerType").value,
    time: Number(audioElement().currentTime.toFixed(1)),
    note: $("#markerNote").value.trim(),
  };
  state.audio.markers.push(marker);
  state.audio.markers.sort((a, b) => a.time - b.time);
  persistAudioMap();
  renderMarkers();
  showToast(`${marker.type} marker added at ${formatTime(marker.time)}.`);
}

function loopMarker(markerId) {
  const markers = state.audio.markers.sort((a, b) => a.time - b.time);
  const index = markers.findIndex((marker) => marker.id === markerId);
  if (index < 0) return;
  const start = markers[index].time;
  const next = markers[index + 1]?.time;
  const end = next || Math.min(start + 8, currentAudioDuration());
  $("#loopStart").value = start.toFixed(1);
  $("#loopEnd").value = end.toFixed(1);
  state.audio.loopOn = true;
  seekTo(start);
  updateAudioInterface();
}

function deleteMarker(markerId) {
  state.audio.markers = state.audio.markers.filter((marker) => marker.id !== markerId);
  persistAudioMap();
  renderMarkers();
}

function saveAudioMapToVault() {
  if (!state.audio.trackName || state.audio.trackName === "No track loaded") {
    showToast("Load audio first.");
    return;
  }
  const guide = activeGuidePrompt();
  state.references.unshift({
    title: `${state.audio.trackName} song map`,
    use: `${markerSummary()}${state.audio.bpm ? ` | ${state.audio.bpm} BPM estimate` : ""}`,
    replay: guide.prompt,
    lane: state.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Audio map saved to Reference Vault.");
}

function sendAudioMapToDoctor() {
  if (!state.audio.trackName || state.audio.trackName === "No track loaded") {
    showToast("Load audio first.");
    return;
  }
  $("#songTitle").value = state.audio.trackName.replace(/\.[^/.]+$/, "");
  $("#memoryInput").value = `${markerSummary()}${state.audio.bpm ? ` | ${state.audio.bpm} BPM estimate` : ""}`;
  $("#stuckInput").value = state.audio.markers.some((marker) => marker.type === "Too Crowded") ? "Production crowds the vocal" : "Loop does not evolve";
  $("#spaceInput").value = state.audio.markers.some((marker) => marker.type === "Vocal Space") ? "8" : "6";
  $("#payoffInput").value = state.audio.markers.some((marker) => marker.type === "Energy Lift") ? "6" : "4";
  $(`[data-for="spaceInput"]`).textContent = $("#spaceInput").value;
  $(`[data-for="payoffInput"]`).textContent = $("#payoffInput").value;
  setView("doctor");
  diagnoseSong();
}

function renderQueue() {
  const shuffled = [...queueItems].sort(() => Math.random() - 0.5).slice(0, 4);
  $("#queueList").innerHTML = shuffled
    .map((item, index) => `
      <article class="queue-card">
        <span class="queue-index">${index + 1}</span>
        <div>
          <strong>${item[0]}</strong>
          <p>${item[1]}</p>
        </div>
        <button class="icon-button queue-jump" type="button" aria-label="Open Song Doctor" data-view-jump="doctor">
          <svg><use href="#icon-play"></use></svg>
        </button>
      </article>
    `)
    .join("");
}

function renderPillars() {
  $("#pillarGrid").innerHTML = pillarData
    .map((pillar) => `
      <article class="pillar-card">
        <span>${pillar[2]}</span>
        <strong>${pillar[0]}</strong>
        <div class="mini-meter" aria-label="${pillar[0]} score ${pillar[1]} percent">
          <i style="width: ${pillar[1]}%"></i>
        </div>
      </article>
    `)
    .join("");
}

function loadFlowState() {
  try {
    state.flow = {
      ...state.flow,
      ...(JSON.parse(localStorage.getItem("songlabFlowState")) || {}),
    };
  } catch {
    state.flow = { doctorRan: false, studyOpened: false, hookSaved: false };
  }
}

function persistFlowState() {
  localStorage.setItem("songlabFlowState", JSON.stringify(state.flow));
}

function setFlowFlag(key) {
  if (state.flow[key]) return;
  state.flow[key] = true;
  persistFlowState();
  renderStudioFlow();
}

function creationSummary() {
  const sections = Object.values(state.creation.sections || {}).filter((value) => String(value || "").trim()).length;
  const hasConcept = Boolean(String(state.creation.concept || "").trim());
  const hasHook = Boolean(String(state.creation.hook || "").trim());
  const hasWriting = creationWordCount(state.creation.freewrite) > 20 || sections > 0 || hasConcept || hasHook;
  return { sections, hasConcept, hasHook, hasWriting, readyForDoctor: hasConcept && hasHook };
}

function engineerFlowGateData() {
  const hasAudio = Boolean(state.audio?.audioUrl || (state.audio?.trackName && state.audio.trackName !== "No track loaded") || state.audio?.fileName);
  const markerCount = state.audio?.markers?.length || 0;
  const vaultSaved = state.references.length > sampleReferences.length;
  const hasAnalysis = Boolean(state.songAnalysis?.transcript || state.songAnalysis?.scores || state.songAnalysis?.summary);
  const lens = activeEngineerLens();
  return [
    {
      id: "engineer-intake",
      view: "audio",
      label: "Intake",
      title: "Prep the session",
      body: `Collect the rough, stems, tempo, key, references, lyric sheet, sample rate, deliverables, and the ${state.lane} emotional target.`,
      complete: hasAudio,
      locked: false,
      action: hasAudio ? "Review Audio" : "Load Audio",
    },
    {
      id: "engineer-recording",
      view: "mixguide",
      label: "Recording",
      title: "Capture the source",
      body: lens.capture,
      complete: state.flow.engineerRecording,
      locked: false,
      action: "Set Chain",
    },
    {
      id: "engineer-edit",
      view: "analyst",
      label: "Edit",
      title: "Clean without flattening",
      body: "Comp the best moments, remove noise and clicks, tune with intention, align timing, and keep the pocket alive.",
      complete: hasAnalysis,
      locked: !hasAudio,
      action: "Analyze Take",
    },
    {
      id: "engineer-balance",
      view: "audio",
      label: "Balance",
      title: "Build the static mix",
      body: `Set faders, pan, polarity, vocal level, drum weight, and low-end relationship around the ${state.lane} benchmark before chasing plugin moves.`,
      complete: markerCount >= 2,
      locked: !hasAudio,
      action: "Mark Moments",
    },
    {
      id: "engineer-mix",
      view: "mixguide",
      label: "Mix",
      title: "Shape tone, dynamics, and space",
      body: lens.mix,
      complete: state.flow.engineerMix,
      locked: !hasAudio,
      action: "Open Mix Guide",
    },
    {
      id: "engineer-vocals",
      view: "mixguide",
      label: "Vocal Polish",
      title: "Tune, stack, and automate",
      body: "Dial pitch correction, de-essing, doubles, harmonies, ad-libs, breaths, throws, and lead vocal automation.",
      complete: state.flow.engineerVocals,
      locked: !hasAudio,
      action: "Vocal Chain",
    },
    {
      id: "engineer-master",
      view: "mixguide",
      label: "Master",
      title: "Print for translation",
      body: lens.master,
      complete: state.flow.engineerMaster,
      locked: !hasAudio,
      action: "Master Check",
    },
    {
      id: "engineer-delivery",
      view: "vault",
      label: "Delivery",
      title: "Export the package",
      body: lens.deliverable,
      complete: vaultSaved,
      locked: !hasAudio,
      action: "Save Lane",
    },
  ];
}

function producerFlowGateData() {
  const hasAudio = Boolean(state.audio?.audioUrl || (state.audio?.trackName && state.audio.trackName !== "No track loaded") || state.creation?.beatUrl);
  const markerCount = state.audio?.markers?.length || 0;
  const creation = creationSummary();
  const vaultSaved = state.references.length > sampleReferences.length;
  return [
    {
      id: "producer-load",
      view: "audio",
      label: "Playback",
      title: "Load the beat",
      body: "Get the loop or rough into the player, check tempo, and listen for the part that already feels like a record.",
      complete: hasAudio,
      locked: false,
      action: hasAudio ? "Map Audio" : "Load Audio",
    },
    {
      id: "producer-map",
      view: "audio",
      label: "Arrangement",
      title: "Mark the moments",
      body: "Tag intro, vocal space, energy lift, hook payoff, drop, and any section that gets too crowded.",
      complete: markerCount >= 2,
      locked: !hasAudio,
      action: "Add Markers",
    },
    {
      id: "producer-model",
      view: "pros",
      label: "Reference",
      title: "Choose the record model",
      body: "Study one producer or case study for the groove, sonic identity, hook support, or negative-space move.",
      complete: state.flow.studyOpened,
      locked: false,
      action: "Study",
    },
    {
      id: "producer-shape",
      view: "create",
      label: "Song Shape",
      title: "Make the beat serve the vocal",
      body: creation.hasWriting ? "Use the draft to decide what to mute, widen, thin, or lift." : "Turn the loop into section jobs before adding more sounds.",
      complete: creation.sections >= 2 || creation.hasHook,
      locked: false,
      action: "Shape",
    },
    {
      id: "producer-vault",
      view: "vault",
      label: "Catalog",
      title: "Save the production move",
      body: "Archive the transferable decision: drum pocket, bass behavior, vocal space, transition, or hook support.",
      complete: vaultSaved,
      locked: false,
      action: "Save",
    },
  ];
}

function artistFlowGateData() {
  const creation = creationSummary();
  const takeCount = Array.isArray(sketchRecorderState?.takes) ? sketchRecorderState.takes.length : 0;
  const hasTranscript = Boolean($("#takeTranscript")?.value.trim() || sketchRecorderState?.takes?.some((take) => take.transcript));
  return [
    {
      id: "artist-record",
      view: "create",
      label: "Record",
      title: "Capture a rough take",
      body: "Loop the beat and record melody, flow, or a messy performance before editing the idea.",
      complete: takeCount > 0,
      locked: false,
      action: "Record",
    },
    {
      id: "artist-review",
      view: "create",
      label: "Playback",
      title: "Listen back and choose",
      body: "Find the line, pocket, or tone worth keeping. Do not judge the whole song yet.",
      complete: hasTranscript,
      locked: takeCount === 0,
      action: "Review",
    },
    {
      id: "artist-write",
      view: "create",
      label: "Write",
      title: "Turn the take into a hook",
      body: creation.hasHook ? "Hook target found. Tighten the words around what sounded natural." : "Pull the best phrase into the notebook and make it repeatable.",
      complete: creation.hasHook,
      locked: false,
      action: "Write",
    },
    {
      id: "artist-design",
      view: "create",
      label: "Performance",
      title: "Design the vocal stack",
      body: "Choose lead delivery, doubles, harmony, ad-libs, and the emotion for the next take.",
      complete: Boolean(state.lastVocalPlan),
      locked: false,
      action: "Vocal Plan",
    },
    {
      id: "artist-doctor",
      view: "doctor",
      label: "Tighten",
      title: "Check what still does not land",
      body: "Use Song Doctor after the performance gives you a real concept and hook to judge.",
      complete: state.flow.doctorRan,
      locked: !creation.hasHook,
      action: "Doctor",
    },
  ];
}

function flowGateData() {
  if (state.appMode === "engineer") return engineerFlowGateData();
  if (state.appMode === "producer") return producerFlowGateData();
  if (state.appMode === "artist") return artistFlowGateData();
  const creation = creationSummary();
  const vaultSaved = state.references.length > sampleReferences.length;
  return [
    {
      id: "create",
      view: "create",
      label: "Create",
      title: "Loop a beat and write",
      body: creation.hasWriting ? "Draft in motion. Tighten the concept, hook, or section notes." : "Start with a beat, a title phrase, and a messy writing page.",
      complete: creation.readyForDoctor && creation.sections >= 1,
      locked: false,
      action: creation.hasWriting ? "Keep Writing" : "Start",
    },
    {
      id: "doctor",
      view: "doctor",
      label: "Diagnose",
      title: "Run the song doctor",
      body: creation.readyForDoctor ? "Test whether the song idea is doing enough work." : "Unlock this by adding a concept and hook target in Create.",
      complete: state.flow.doctorRan,
      locked: !creation.readyForDoctor,
      action: "Doctor It",
    },
    {
      id: "study",
      view: "pros",
      label: "Study",
      title: "Steal a pro principle",
      body: state.flow.doctorRan ? "Compare your weak point with a producer playbook and listen first." : "Unlock after the first diagnosis so studying has a target.",
      complete: state.flow.studyOpened,
      locked: !state.flow.doctorRan,
      action: "Open Playbook",
    },
    {
      id: "hooks",
      view: "hooks",
      label: "Hooks",
      title: "Pressure-test options",
      body: state.flow.studyOpened ? "Generate hook variants and score what actually sticks." : "Unlock after studying one pro method or case.",
      complete: state.flow.hookSaved,
      locked: !state.flow.studyOpened,
      action: "Sprint",
    },
    {
      id: "vault",
      view: "vault",
      label: "Vault",
      title: "Save the move",
      body: state.flow.hookSaved ? "Archive the transferable move and keep building your catalog." : "Unlock after saving a hook brief or writing draft.",
      complete: vaultSaved,
      locked: !state.flow.hookSaved,
      action: "Review",
    },
  ];
}

function isViewAvailable(view) {
  const nav = $$("[data-view]").find((button) => button.dataset.view === view);
  return !nav || !nav.hidden;
}

function renderStudioFlow() {
  const list = $("#flowGateList");
  const score = $("#flowScore");
  if (!list || !score) return;
  const eyebrow = $("#flowPanelEyebrow");
  const title = $("#flowPanelTitle");
  if (eyebrow) eyebrow.textContent = state.appMode === "engineer" ? "Engineer studio flow" : "Guided studio flow";
  if (title) title.textContent = state.proficiency === "starter"
    ? "One simple step"
    : state.proficiency === "simple" ? "Three simple steps"
    : state.appMode === "engineer" ? "Record, mix, master, deliver" : "Do the next useful thing";
  const allGates = flowGateData().filter((gate) => isViewAvailable(gate.view));
  const gates = state.proficiency === "starter" ? allGates.slice(0, 1) : state.proficiency === "simple" ? allGates.slice(0, 3) : allGates;
  const completed = gates.filter((gate) => gate.complete).length;
  score.textContent = `${completed}/${gates.length}`;
  const firstOpen = gates.find((gate) => !gate.complete && !gate.locked)?.id;
  list.innerHTML = gates
    .map((gate, index) => {
      const isLocked = gate.locked && !gate.complete;
      const status = gate.complete ? "Complete" : isLocked ? "Locked" : gate.id === firstOpen ? "Next" : "Ready";
      const classes = [
        "flow-gate-card",
        gate.complete ? "is-complete" : "",
        isLocked ? "is-locked" : "",
        gate.id === firstOpen ? "is-next" : "",
      ].filter(Boolean).join(" ");
      const bodyText = state.appMode === "engineer"
        ? gate.body
        : gate.complete ? "Done. Keep moving." : status === "Next" ? "Your next best move." : isLocked ? "Unlock through the prior step." : gate.body;
      return `
        <article class="${classes}">
          <div class="flow-gate-index">
            <span>${index + 1}</span>
            <small>${status}</small>
          </div>
          <div>
            <span class="eyebrow">${gate.label}</span>
            <strong>${gate.title}</strong>
            <p>${escapeHtml(bodyText)}</p>
          </div>
          <button class="${isLocked ? "ghost-button" : "secondary-action"}" type="button" data-view-jump="${gate.view}" ${isLocked ? "disabled" : ""}>
            ${gate.action}
          </button>
        </article>
      `;
    })
    .join("");
}

function renderCaseFilters() {
  const filters = ["All", ...new Set(caseStudies.map((item) => item.lane))];
  $("#caseFilters").innerHTML = filters
    .map((filter) => `
      <button class="filter-chip ${state.activeFilter === filter ? "is-active" : ""}" type="button" data-filter="${filter}">
        ${filter}
      </button>
    `)
    .join("");
}

function renderCaseList() {
  const visible = caseStudies.filter((item) => state.activeFilter === "All" || item.lane === state.activeFilter);
  if (!visible.some((item) => item.id === state.activeCase)) {
    state.activeCase = visible[0]?.id || caseStudies[0].id;
  }
  $("#caseList").innerHTML = visible
    .map((study) => `
      <button class="case-card ${state.activeCase === study.id ? "is-active" : ""}" type="button" data-case="${study.id}">
        <div class="case-card-top">
          <strong>${study.producer}</strong>
          <span class="case-tag">${study.lane}</span>
        </div>
        <span class="case-record">${study.title} | ${study.artist}</span>
        <p>${study.problem}</p>
      </button>
    `)
    .join("");
}

function activeCaseStudy() {
  return caseStudies.find((item) => item.id === state.activeCase) || caseStudies[0];
}

function roleForSection(section) {
  if (section === "hook" || section === "outro") return "hook";
  if (section === "verse" || section === "intro") return "verse";
  if (section === "lift" || section === "vamp" || section === "break") return "lift";
  if (section === "bridge") return "bridge";
  return "";
}

function renderCreditGroup(label, values = []) {
  const list = Array.isArray(values) ? values.filter(Boolean) : [values].filter(Boolean);
  if (!list.length) return "";
  return `
    <article>
      <span>${escapeHtml(label)}</span>
      <p>${list.map(escapeHtml).join("<br>")}</p>
    </article>
  `;
}

function renderCaseCredits(study) {
  const credits = caseCredits[study.id];
  if (!credits) return "";
  return `
    <section class="tool-panel case-credits-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Credits lens</span>
          <h2>Who made the record</h2>
        </div>
      </div>
      <div class="credits-grid">
        ${renderCreditGroup("Producer", credits.producers)}
        ${renderCreditGroup("Songwriter", credits.songwriters)}
        ${renderCreditGroup("Arranger", credits.arrangers)}
        ${renderCreditGroup("Recording / engineering", credits.recordingEngineering)}
        ${renderCreditGroup("Mix engineer", credits.mixEngineers)}
        ${renderCreditGroup("Mastering", credits.mastering)}
      </div>
      ${credits.notes ? `<p class="credits-note">${escapeHtml(credits.notes)}</p>` : ""}
    </section>
  `;
}

function renderCaseDetail() {
  const study = activeCaseStudy();
  const alternatives = study.alternatives || [];
  const whyMatter = study.whyMatter || [];
  const structure = study.structure || [];
  const anatomy = study.anatomy || [];
  const lessons = study.lessons || [];
  const productionLessons = study.productionLessons || [];
  const exercise = study.exercise || {};
  const waveHeights = [32, 68, 42, 90, 54, 76, 45, 82, 36];
  const exerciseRows = [
    ["Superpower", exercise.superpower || study.archetype],
    ["Best-performing record", exercise.bestRecord || study.title],
    ["Song structure", exercise.structureMap || "Map the intro, verse, lift, hook, and payoff moments while listening."],
    ["Hook architecture", exercise.hookArchitecture || study.hook],
    ["Emotional arc", exercise.emotionalArc || study.concept],
    ["Production decisions", exercise.productionDecisions || "Name the arrangement decisions that make the song easier to replay."],
    ["Transfer to your music", exercise.transfer || "Copy the principle, not the exact surface sound."],
  ];
  $("#caseDetail").innerHTML = `
    <div class="case-hero">
      <div class="case-hero-copy">
        <span class="eyebrow">${study.producer} | ${study.archetype}</span>
        <h2>${study.title}</h2>
        <div class="case-hero-meta">
          <span>${study.artist}</span>
          <span>${study.lane}</span>
          ${alternatives.length ? `<span>Alt: ${alternatives.join(", ")}</span>` : ""}
        </div>
        <p>${study.concept}</p>
        <span class="status-pill">Replay driver: ${study.replay}</span>
        <div class="button-row">
          <button class="primary-action" type="button" data-case-action="save">
            <svg><use href="#icon-bookmark"></use></svg>
            Save Study
          </button>
          <button class="secondary-action" type="button" data-case-action="open-pro">
            <svg><use href="#icon-award"></use></svg>
            Open Pro Playbook
          </button>
        </div>
      </div>
      <div class="case-visual" aria-hidden="true">
        ${study.artistImageUrl && study.producerImageUrl ? `
          <div class="case-people-row">
            ${identityVisual({ name: study.artist, kicker: "Artist", imageUrl: study.artistImageUrl, className: "case-person-visual" })}
            ${identityVisual({ name: study.producer, kicker: "Producer", imageUrl: study.producerImageUrl, className: "case-person-visual" })}
          </div>
        ` : ""}
        <div class="wave-lines">${waveHeights.map((height) => `<i style="height:${height}%"></i>`).join("")}</div>
        <div class="case-record-badge">
          <span>Representative hit</span>
          <strong>${study.title}</strong>
        </div>
      </div>
    </div>

    ${renderCaseCredits(study)}

    <section class="tool-panel hit-primer">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Why this record matters</span>
          <h2>Commercial result, songwriting lesson, producer move</h2>
        </div>
      </div>
      <div class="primer-grid">
        ${whyMatter.map((item) => `<article><span class="tag">Signal</span><p>${item}</p></article>`).join("")}
      </div>
    </section>

    <section class="tool-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Arrangement map</span>
          <h2>Structure pressure points</h2>
        </div>
      </div>
      <div class="timeline" aria-label="Song structure timeline">
        ${structure.map((part) => `<span title="${part}" data-role="${roleForSection(part)}"></span>`).join("")}
      </div>
      <div class="timeline-legend">
        <span data-role="verse">Intro / verse</span>
        <span data-role="lift">Lift / break</span>
        <span data-role="hook">Hook / outro</span>
        <span data-role="bridge">Bridge</span>
      </div>
    </section>

    <section class="case-grid anatomy-grid">
      ${anatomy.map((item) => `
        <article class="diagnosis-card anatomy-card">
          <span class="eyebrow">${item[0]}</span>
          <p>${item[1]}</p>
        </article>
      `).join("")}
    </section>

    <section class="case-grid lesson-grid">
      <article class="tool-panel">
        <span class="eyebrow">Key songwriting lessons</span>
        <div class="study-list">
          ${lessons.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
      <article class="tool-panel">
        <span class="eyebrow">Production lessons</span>
        <div class="study-list">
          ${productionLessons.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </article>
      <article class="tool-panel takeaway-card">
        <span class="eyebrow">Takeaway</span>
        <strong>${study.takeaway}</strong>
      </article>
    </section>

    <section class="tool-panel final-exercise-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Final exercise</span>
          <h2>Build your producer operating system</h2>
        </div>
      </div>
      <div class="exercise-map">
        ${exerciseRows.map((row) => `
          <article>
            <span>${row[0]}</span>
            <strong>${row[1]}</strong>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCases() {
  renderCaseFilters();
  renderCaseList();
  renderCaseDetail();
}

function activeRiskStudy() {
  return creativeRiskStudies.find((study) => study.id === state.activeRisk) || creativeRiskStudies[0];
}

function renderRiskFilters() {
  const filters = ["All", ...new Set(creativeRiskStudies.map((study) => study.lane))];
  const container = $("#riskFilters");
  if (!container) return;
  container.innerHTML = filters
    .map((filter) => `
      <button class="filter-chip ${state.activeRiskFilter === filter ? "is-active" : ""}" type="button" data-risk-filter="${escapeHtml(filter)}">
        ${escapeHtml(filter)}
      </button>
    `)
    .join("");
}

function renderRiskList() {
  const container = $("#riskList");
  if (!container) return;
  const visible = creativeRiskStudies.filter((study) => state.activeRiskFilter === "All" || study.lane === state.activeRiskFilter);
  if (!visible.some((study) => study.id === state.activeRisk)) {
    state.activeRisk = visible[0]?.id || creativeRiskStudies[0].id;
  }
  container.innerHTML = visible
    .map((study) => `
      <button class="case-card ${study.id === state.activeRisk ? "is-active" : ""}" type="button" data-risk="${escapeHtml(study.id)}">
        <span>${escapeHtml(study.riskType)}</span>
        <strong>${escapeHtml(study.title)}</strong>
        <small>${escapeHtml(study.artist)} | ${escapeHtml(study.year)}</small>
      </button>
    `)
    .join("");
}

function renderRiskDetail() {
  const container = $("#riskDetail");
  if (!container) return;
  const study = activeRiskStudy();
  const listenLinks = [
    ["Spotify", `https://open.spotify.com/search/${encodeURIComponent(`${study.artist} ${study.title}`)}`],
    ["Apple", `https://music.apple.com/us/search?term=${encodeURIComponent(`${study.artist} ${study.title}`)}`],
    ["YouTube", `https://www.youtube.com/results?search_query=${encodeURIComponent(`${study.artist} ${study.title}`)}`],
  ];
  container.innerHTML = `
    <div class="case-hero risk-case-hero">
      <div class="case-hero-copy">
        <span class="eyebrow">${escapeHtml(study.riskType)} | ${escapeHtml(study.lane)}</span>
        <h2>${escapeHtml(study.title)}</h2>
        <div class="case-hero-meta">
          <span>${escapeHtml(study.artist)}</span>
          <span>${escapeHtml(study.year)}</span>
          <span>${escapeHtml(study.producer)}</span>
        </div>
        <p>${escapeHtml(study.risk)}</p>
        <div class="risk-listen-links" aria-label="Open this record">
          <span>Listen</span>
          ${listenLinks.map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`).join("")}
        </div>
        <span class="status-pill">Copy the principle, not the costume.</span>
        <div class="button-row">
          <button class="primary-action" type="button" data-risk-action="challenge">
            <svg><use href="#icon-pen"></use></svg>
            Try This Risk
          </button>
          <button class="secondary-action" type="button" data-risk-action="save">
            <svg><use href="#icon-bookmark"></use></svg>
            Save Risk
          </button>
        </div>
      </div>
      <div class="risk-visual" aria-hidden="true">
        <span>${escapeHtml(study.riskType)}</span>
        <strong>${escapeHtml(study.year)}</strong>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>

    <section class="case-grid risk-diagnosis-grid">
      <article class="diagnosis-card">
        <span class="eyebrow">Why it should have failed</span>
        <p>${escapeHtml(study.whyItShouldFail)}</p>
      </article>
      <article class="diagnosis-card">
        <span class="eyebrow">Why it worked anyway</span>
        <p>${escapeHtml(study.whyItWorked)}</p>
      </article>
      <article class="diagnosis-card">
        <span class="eyebrow">What can be copied</span>
        <p>${escapeHtml(study.copiedPrinciple)}</p>
      </article>
      <article class="diagnosis-card">
        <span class="eyebrow">What cannot be copied</span>
        <p>${escapeHtml(study.cannotCopy)}</p>
      </article>
    </section>

    <section class="case-grid lesson-grid risk-lesson-grid">
      <article class="tool-panel">
        <span class="eyebrow">Risk lessons</span>
        <div class="study-list">
          ${study.lessons.map((lesson) => `<span>${escapeHtml(lesson)}</span>`).join("")}
        </div>
      </article>
      <article class="tool-panel">
        <span class="eyebrow">Production moves</span>
        <div class="study-list">
          ${study.productionMoves.map((move) => `<span>${escapeHtml(move)}</span>`).join("")}
        </div>
      </article>
      <article class="tool-panel takeaway-card">
        <span class="eyebrow">Studio prompt</span>
        <strong>${escapeHtml(study.studioPrompt)}</strong>
      </article>
    </section>
  `;
}

function renderRiskLab() {
  renderRiskFilters();
  renderRiskList();
  renderRiskDetail();
}

function sessionFamilies() {
  return ["All", ...new Set(sessionPlayers.map((player) => player.family))];
}

function renderSessionGreats() {
  const filters = $("#sessionFilters");
  const grid = $("#sessionPlayerGrid");
  const collectives = $("#sessionCollectiveGrid");
  if (!filters || !grid || !collectives) return;
  const visiblePlayers = sessionPlayers.filter((player) => state.activeSessionFilter === "All" || player.family === state.activeSessionFilter);
  const count = $("#sessionGreatsCount");
  if (count) count.textContent = String(visiblePlayers.length);
  filters.innerHTML = sessionFamilies()
    .map((family) => `
      <button class="${state.activeSessionFilter === family ? "is-active" : ""}" data-session-filter="${escapeHtml(family)}" type="button">
        ${escapeHtml(family)}
      </button>
    `)
    .join("");
  grid.innerHTML = visiblePlayers
    .map((player) => `
      <article class="session-player-card">
        <div class="session-player-top">
          <span class="case-tag">${escapeHtml(player.family)}</span>
          <span class="tag">${escapeHtml(player.era)}</span>
        </div>
        <div>
          <h3>${escapeHtml(player.name)}</h3>
          <strong>${escapeHtml(player.role)}</strong>
        </div>
        <p>${escapeHtml(player.superpower)}</p>
        <dl>
          <div>
            <dt>Signature move</dt>
            <dd>${escapeHtml(player.signatureMove)}</dd>
          </div>
          <div>
            <dt>Study records</dt>
            <dd>${player.study.map(escapeHtml).join(" | ")}</dd>
          </div>
          <div>
            <dt>Steal this</dt>
            <dd>${escapeHtml(player.steal)}</dd>
          </div>
        </dl>
      </article>
    `)
    .join("");
  collectives.innerHTML = sessionCollectives
    .map((collective) => `
      <article class="session-collective-card">
        <span>${escapeHtml(collective.city)}</span>
        <h3>${escapeHtml(collective.name)}</h3>
        <p>${escapeHtml(collective.lesson)}</p>
        <small>${collective.study.map(escapeHtml).join(" | ")}</small>
      </article>
    `)
    .join("");
}

function activeMixBenchmark() {
  return mixGuideBenchmarks.find((item) => item.style === state.activeMixGuideStyle) || mixGuideBenchmarks[0];
}

function uniqueSortedValues(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => String(a).localeCompare(String(b)));
}

function optionListHtml(values, selectedValue) {
  return ["All", ...values]
    .map((value) => `<option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(value)}</option>`)
    .join("");
}

function activeEngineerStudyProfiles(activeStyle = state.activeMixGuideStyle) {
  const laneMatches = engineerStudyProfiles.filter((profile) => profile.lanes.includes(activeStyle) || profile.lanes.includes(state.lane));
  if (laneMatches.length) return laneMatches.slice(0, 6);
  const family = activeMixBenchmark()?.family || "";
  const broadMatches = engineerStudyProfiles.filter((profile) => profile.lanes.some((lane) => lane.includes(family) || family.includes(lane)));
  return (broadMatches.length ? broadMatches : engineerStudyProfiles).slice(0, 6);
}

function renderMixGuide() {
  const list = $("#mixGuideStyleList");
  const detail = $("#mixGuideDetail");
  const fundamentals = $("#mixFundamentalsGrid");
  if (!list || !detail) return;
  const active = activeMixBenchmark();
  const engineerLens = state.appMode === "engineer" ? activeEngineerLens() : null;
  const engineerPros = state.appMode === "engineer" ? activeEngineerStudyProfiles(active.style) : [];
  if (fundamentals) {
    fundamentals.innerHTML = mixGuideFundamentals
      .map((item) => `
        <article class="tool-panel mix-fundamental-card">
          <div class="mix-fundamental-head">
            <span class="case-tag">${escapeHtml(item.tag)}</span>
            <h3>${escapeHtml(item.title)}</h3>
          </div>
          <p>${escapeHtml(item.purpose)}</p>
          <div class="signal-chain">
            ${item.chain.map((step) => `<span>${escapeHtml(step)}</span>`).join("")}
          </div>
          <ul>
            ${item.moves.map((move) => `<li>${escapeHtml(move)}</li>`).join("")}
          </ul>
          <strong>${escapeHtml(item.warning)}</strong>
        </article>
      `)
      .join("");
  }
  list.innerHTML = mixGuideBenchmarks
    .map((item) => `
      <button class="${item.style === active.style ? "is-active" : ""}" data-mix-style="${escapeHtml(item.style)}" type="button">
        <span>${escapeHtml(item.family)}</span>
        <strong>${escapeHtml(item.style)}</strong>
      </button>
    `)
    .join("");
  detail.innerHTML = `
    <section class="tool-panel mix-benchmark-hero">
      <span class="case-tag">${escapeHtml(active.family)}</span>
      <h2>${escapeHtml(active.style)}</h2>
      <p>${escapeHtml(active.target)}</p>
    </section>
    ${engineerLens ? `
      <section class="tool-panel engineer-lane-brief">
        <div>
          <span class="eyebrow">${escapeHtml(state.lane)} engineer lens</span>
          <h3>What changes in this genre</h3>
        </div>
        <dl>
          <div>
            <dt>Recording</dt>
            <dd>${escapeHtml(engineerLens.capture)}</dd>
          </div>
          <div>
            <dt>Mixing</dt>
            <dd>${escapeHtml(engineerLens.mix)}</dd>
          </div>
          <div>
            <dt>Mastering</dt>
            <dd>${escapeHtml(engineerLens.master)}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>${escapeHtml(engineerLens.deliverable)}</dd>
          </div>
        </dl>
      </section>
    ` : ""}
    ${engineerPros.length ? `
      <section class="tool-panel engineer-pro-study">
        <div class="panel-heading">
          <div>
            <span class="eyebrow">Study the engineers</span>
            <h3>${escapeHtml(active.style)} sound professionals</h3>
          </div>
          <span class="score-pill">${engineerPros.length}</span>
        </div>
        <div class="engineer-pro-grid">
          ${engineerPros.map((pro) => `
            <article class="engineer-pro-card">
              <div class="engineer-pro-card-top">
                <span class="case-tag">${escapeHtml(pro.role)}</span>
                <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(`${pro.name} mixing engineering interview`)}" target="_blank" rel="noreferrer" aria-label="Search ${escapeHtml(pro.name)} interviews">Search</a>
              </div>
              <h4>${escapeHtml(pro.name)}</h4>
              <p>${escapeHtml(pro.focus)}</p>
              <dl>
                <div>
                  <dt>Study</dt>
                  <dd>${pro.study.map(escapeHtml).join(" | ")}</dd>
                </div>
                <div>
                  <dt>Copy</dt>
                  <dd>${escapeHtml(pro.copy)}</dd>
                </div>
              </dl>
            </article>
          `).join("")}
        </div>
      </section>
    ` : ""}
    <section class="mix-benchmark-grid">
      ${[
        ["Vocal", active.vocal],
        ["Low End", active.lowEnd],
        ["Drums", active.drums],
        ["Space", active.space],
        ["Dynamics", active.dynamics],
      ].map(([label, value]) => `
        <article class="tool-panel mix-benchmark-card">
          <span class="eyebrow">${escapeHtml(label)}</span>
          <p>${escapeHtml(value)}</p>
        </article>
      `).join("")}
    </section>
    <section class="mix-benchmark-bottom">
      <article class="tool-panel mix-check-card">
        <span class="eyebrow">Reference checks</span>
        <ul>
          ${active.checks.map((check) => `<li>${escapeHtml(check)}</li>`).join("")}
        </ul>
      </article>
      <article class="tool-panel mix-check-card danger">
        <span class="eyebrow">Common failure points</span>
        <ul>
          ${active.commonIssues.map((issue) => `<li>${escapeHtml(issue)}</li>`).join("")}
        </ul>
      </article>
    </section>
  `;
}

function saveRiskStudyToVault() {
  const study = activeRiskStudy();
  state.references.unshift({
    title: `Creative risk: ${study.artist} - ${study.title}`,
    use: study.copiedPrinciple,
    replay: study.whyItWorked,
    lane: study.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Creative risk saved to Vault.");
}

function sendRiskToCreationRoom() {
  const study = activeRiskStudy();
  state.creation.concept = study.studioPrompt;
  state.creation.freewrite = `Creative risk study: ${study.artist} - ${study.title}\nRisk: ${study.risk}\nPrinciple: ${study.copiedPrinciple}\nStudio prompt: ${study.studioPrompt}`;
  persistCreationDraft();
  setView("create");
  setCreateMode("flow", { silent: true });
  renderCreationRoom();
  showToast("Risk challenge loaded into Create.");
}

function saveCaseStudyToVault() {
  const study = activeCaseStudy();
  state.references.unshift({
    title: `${study.producer}: ${study.title}`,
    use: study.exercise.transfer,
    replay: study.replay,
    lane: study.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Hit anatomy study saved to Vault.");
}

function openCaseProducerPlaybook() {
  const study = activeCaseStudy();
  const proExists = proPlaybooks.some((pro) => pro.id === study.proId);
  if (proExists) {
    state.activePro = study.proId;
    state.activeProFilter = "All";
  }
  setView("pros");
  renderPros();
}

function getDoctorValues() {
  return {
    title: $("#songTitle").value.trim() || "Untitled idea",
    concept: $("#conceptInput").value.trim(),
    hook: $("#hookInput").value.trim(),
    memory: $("#memoryInput").value.trim(),
    stuck: $("#stuckInput").value,
    clarity: Number($("#clarityInput").value),
    hookStrength: Number($("#hookStrengthInput").value),
    space: Number($("#spaceInput").value),
    payoff: Number($("#payoffInput").value),
  };
}

function doctorBand(score) {
  if (score >= 8) return "Healthy";
  if (score >= 6) return "Watch";
  if (score >= 4) return "Weak";
  return "Critical";
}

function doctorPillars(values) {
  const profile = activeGenreProfile();
  const workflow = activeWorkflowPreset();
  return [
    {
      id: "concept",
      label: "Concept",
      score: values.clarity,
      route: "write",
      action: "Sharpen concept",
      why: "The listener needs a simple emotional contract before production details matter.",
      diagnosis: values.concept
        ? `The concept exists, but it needs a sharper person, situation, and turn for ${profile.title}.`
        : "There is not enough concept yet to tell the vocal, lyric, and arrangement what to serve.",
      repair: "Rewrite the idea as: person + setting + behavior + contradiction.",
      prompt: `In one sentence: who is singing, what are they doing, and what feeling are they hiding?`,
    },
    {
      id: "hook",
      label: "Hook",
      score: values.hookStrength,
      route: "hooks",
      action: "Sprint hooks",
      why: "A strong record gives the listener a handle: title, melody, chant, phrase, or sonic moment.",
      diagnosis: values.hook
        ? `"${values.hook}" is the current memory candidate. It needs placement, repetition, and contrast.`
        : "There is no clear hook target, so the song can drift even if the beat feels good.",
      repair: "Write three hook placements: opening line, last line, and answer phrase.",
      prompt: `Make the hook shorter, more speakable, and easier to repeat in the ${workflow.mood}.`,
    },
    {
      id: "production",
      label: "Vocal Space",
      score: values.space,
      route: "audio",
      action: "Map audio",
      why: "A beat becomes a record when the most memorable vocal words have room to land.",
      diagnosis: values.space >= 7
        ? "The vocal space rating is healthy, but check whether the hook word is protected."
        : "The production may be competing with the vocal instead of framing it.",
      repair: "Mute or thin one element during the title phrase, then add ear candy after the phrase ends.",
      prompt: "Find the busiest two bars and decide what should be removed while the lead vocal speaks.",
    },
    {
      id: "payoff",
      label: "Payoff",
      score: values.payoff,
      route: "shape",
      action: "Shape sections",
      why: "The song needs a reason to keep listening after the loop is understood.",
      diagnosis: values.payoff >= 7
        ? "The payoff may work, but the final return still needs one new detail."
        : "The chorus or main section is not yet paying off the setup strongly enough.",
      repair: "Create a pre-hook lift, drum drop, harmony entrance, or lyric flip before the title returns.",
      prompt: "What changes right before the chorus so the title feels inevitable?",
    },
  ].sort((a, b) => a.score - b.score);
}

function doctorClassification(score, lowestScore) {
  if (score >= 82 && lowestScore >= 6) return "Record-ready direction";
  if (score >= 65) return "Song draft";
  if (score >= 48) return "Strong beat, unclear song";
  return "Loop needing a song idea";
}

function doctorRewriteMoves(values) {
  const hook = values.hook || "the title phrase";
  const memory = values.memory || "one thing the listener can repeat";
  return [
    ["Concept rewrite", values.concept ? `Make this more behavioral: ${values.concept}` : "Write the concept before touching the beat again."],
    ["Hook architecture", `Place "${hook}" once early, once as the payoff, and once as a response or ad-lib.`],
    ["Memory test", `After one listen, the listener should remember ${memory}. Remove anything that competes with that.`],
    ["Arrangement fix", "Create one eight-bar contrast: fewer drums, new bass movement, harmony entrance, or a vocal-only bar."],
  ];
}

function doctorRepairRoutes(pillars) {
  const primary = pillars[0];
  const routes = [
    {
      route: primary.route,
      label: primary.action,
      title: `Fix ${primary.label}`,
      body: primary.repair,
    },
    {
      route: "record",
      label: "Design vocal",
      title: "Performance pass",
      body: "Use Vocal Designer to decide lead delivery, stack density, harmony, and ad-lib strategy.",
    },
    {
      route: "pros",
      label: "Study a pro",
      title: "Reference repair",
      body: "Open a producer playbook and compare your weak point against a proven record system.",
    },
  ];
  if (!routes.some((item) => item.route === "hooks")) {
    routes.splice(1, 0, {
      route: "hooks",
      label: "Generate hooks",
      title: "Hook alternatives",
      body: "Create multiple title, melodic, rhythmic, and sonic hook options before committing.",
    });
  }
  return routes.slice(0, 4);
}

function routeDoctorRepair(route) {
  if (route === "flow" || route === "write" || route === "shape" || route === "record") {
    setView("create");
    setCreateMode(route, { silent: true });
    showToast(`${createModes[route].title}.`);
    return;
  }
  if (route === "hooks") {
    setView("hooks");
    renderHookSprint();
    showToast("Hook Sprint opened.");
    return;
  }
  if (route === "audio") {
    setView("audio");
    updateAudioInterface();
    showToast("Audio Lab opened.");
    return;
  }
  if (route === "pros") {
    setView("pros");
    renderPros();
    showToast("Pro Playbook opened.");
  }
}

function diagnoseSong(event, markProgress = true) {
  if (event) event.preventDefault();
  if (markProgress) setFlowFlag("doctorRan");
  const values = getDoctorValues();
  const profile = activeGenreProfile();
  const workflow = activeWorkflowPreset();
  const textBonus = Math.min(10, values.concept.length / 14) + Math.min(10, values.hook.length / 8);
  const score = Math.round(((values.clarity + values.hookStrength + values.space + values.payoff) / 40) * 78 + textBonus);
  const clampedScore = Math.max(22, Math.min(96, score));
  const pillars = doctorPillars(values);
  const primary = pillars[0];
  const classification = doctorClassification(clampedScore, primary.score);
  const rewriteMoves = doctorRewriteMoves(values);
  const repairRoutes = doctorRepairRoutes(pillars);
  const loopStatus = $("#loopStatus");
  if (loopStatus) loopStatus.textContent = classification;
  $("#diagnosisOutput").innerHTML = `
    <div class="diagnosis-score" style="--score: ${clampedScore * 3.6}deg">
      <div class="score-ring">${clampedScore}</div>
      <div>
        <span class="status-pill">${classification}</span>
        <h2>${values.title}</h2>
        <p>${values.concept || "Add a concept before judging the production."}</p>
        <small>${escapeHtml(profile.title)} lens | ${escapeHtml(workflow.mood)} | Stuck point: ${escapeHtml(values.stuck)}</small>
      </div>
    </div>

    <section class="doctor-section">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Primary diagnosis</span>
          <h2>${escapeHtml(primary.label)} is the first repair</h2>
        </div>
        <span class="score-pill">${doctorBand(primary.score)}</span>
      </div>
      <p>${escapeHtml(primary.diagnosis)}</p>
      <div class="doctor-prescription">
        <strong>${escapeHtml(primary.repair)}</strong>
        <span>${escapeHtml(primary.prompt)}</span>
      </div>
    </section>

    <section class="doctor-pillar-grid">
      ${pillars.map((pillar) => `
        <article class="diagnosis-card doctor-pillar-card" data-band="${doctorBand(pillar.score).toLowerCase()}">
          <div>
            <span class="tag">${escapeHtml(doctorBand(pillar.score))}</span>
            <strong>${escapeHtml(pillar.label)}</strong>
          </div>
          <b>${pillar.score}/10</b>
          <p>${escapeHtml(pillar.why)}</p>
        </article>
      `).join("")}
    </section>

    <section class="doctor-section">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Rewrite moves</span>
          <h2>Concrete fixes for the next pass</h2>
        </div>
      </div>
      <div class="doctor-rewrite-grid">
        ${rewriteMoves.map(([title, body]) => `
          <article class="diagnosis-card">
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(body)}</p>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="doctor-section">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">Repair paths</span>
          <h2>Go fix the weak point</h2>
        </div>
      </div>
      <div class="doctor-route-grid">
        ${repairRoutes.map((route) => `
          <article>
            <strong>${escapeHtml(route.title)}</strong>
            <p>${escapeHtml(route.body)}</p>
            <button class="secondary-action" type="button" data-doctor-route="${escapeHtml(route.route)}">${escapeHtml(route.label)}</button>
          </article>
        `).join("")}
      </div>
    </section>

    <section class="doctor-section doctor-session-plan">
      <span class="eyebrow">15-minute prescription</span>
      <ol>
        <li>Spend five minutes solving only ${escapeHtml(primary.label.toLowerCase())}.</li>
        <li>Do one rough vocal pass before changing the beat again.</li>
        <li>Play it back once and ask whether the listener remembers ${escapeHtml(values.memory || values.hook || "one clear thing")}.</li>
      </ol>
    </section>
  `;
}

function renderHookSprint() {
  const concept = $("#hookConcept").value.trim() || "the emotional contradiction";
  const type = $("#hookType").value;
  const seeds = hookSeeds[type];
  $("#hookOptions").innerHTML = seeds
    .map((seed, index) => `
      <article class="hook-card">
        <span class="tag">${type} option ${index + 1}</span>
        <strong>${seed}</strong>
        <p>Concept lens: ${concept}</p>
        <p>Rule: write it once simple, once conversational, once more extreme.</p>
      </article>
    `)
    .join("");
  renderBench(seeds, type);
}

function renderBench(seeds, type) {
  $("#benchList").innerHTML = seeds
    .map((seed, index) => {
      const key = `${type}-${index}`;
      return `
        <article class="bench-card">
          <strong>Option ${index + 1}</strong>
          <p>${seed}</p>
          <div class="score-buttons" data-score-key="${key}">
            ${[1, 2, 3].map((score) => `
              <button class="${state.benchScores[key] === score ? "is-selected" : ""}" type="button" data-score="${score}">
                ${score}
              </button>
            `).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function saveHookBrief() {
  const type = $("#hookType").value;
  const concept = $("#hookConcept").value.trim() || "Untitled hook brief";
  setFlowFlag("hookSaved");
  state.references.unshift({
    title: `${type} hook brief`,
    use: concept,
    replay: hookSeeds[type][0],
    lane: state.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Hook brief saved to Reference Vault.");
}

function glossaryCategories() {
  return ["All", ...new Set(allGlossaryTerms().map((item) => item.category))];
}

function allGlossaryTerms() {
  return glossaryTerms;
}

function glossaryMatchesSearch(item, query) {
  if (!query) return true;
  return [item.term, item.category, item.definition, item.listen, item.why]
    .join(" ")
    .toLowerCase()
    .includes(query);
}

function glossarySectionCount(section, visibleTerms = []) {
  if (section === "terms") return visibleTerms.length;
  if (section === "sound") {
    return soundGenomeTools.filter((tool) => state.activeSoundFamily === "All" || tool.family === state.activeSoundFamily).length;
  }
  if (section === "acoustics") {
    return acousticDesignLessons.filter((lesson) => state.activeAcousticTopic === "All" || lesson.topic === state.activeAcousticTopic).length;
  }
  if (section === "gear") return gearHeadGallery.length;
  if (section === "signature") return producerSignatureSounds.length;
  return 0;
}

function renderGlossaryIndex(visibleTerms = []) {
  const buttons = $$("[data-glossary-section]");
  const panels = $$("[data-glossary-panel]");
  const count = $("#glossaryCount");
  const label = $("#glossaryCountLabel");
  const labels = {
    terms: "terms shown",
    sound: "tools shown",
    acoustics: "lessons shown",
    gear: "gear studies",
    signature: "sound maps",
  };
  buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.glossarySection === state.activeGlossarySection);
  });
  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.glossaryPanel === state.activeGlossarySection);
  });
  if (count) count.textContent = String(glossarySectionCount(state.activeGlossarySection, visibleTerms));
  if (label) label.textContent = labels[state.activeGlossarySection] || "items loaded";
}

function renderGlossaryFilters() {
  const filters = $("#glossaryFilters");
  if (!filters) return;
  filters.innerHTML = glossaryCategories()
    .map((category) => `
      <button class="${state.activeGlossaryFilter === category ? "is-active" : ""}" data-glossary-filter="${category}" type="button">
        ${category}
      </button>
    `)
    .join("");
}

function renderGlossary() {
  const results = $("#glossaryResults");
  if (!results) return;
  const query = state.glossarySearch.trim().toLowerCase();
  const visibleTerms = allGlossaryTerms().filter((item) => {
    const categoryMatch = state.activeGlossaryFilter === "All" || item.category === state.activeGlossaryFilter;
    return categoryMatch && glossaryMatchesSearch(item, query);
  });

  renderGlossaryFilters();
  renderGlossaryIndex(visibleTerms);
  results.innerHTML = visibleTerms.length
    ? visibleTerms.map((item) => `
      <article class="glossary-card">
        <div class="glossary-card-head">
          <span class="case-tag">${item.category}</span>
          <h3>${item.term}</h3>
        </div>
        <p>${item.definition}</p>
        <dl>
          <div>
            <dt>Listen for</dt>
            <dd>${item.listen}</dd>
          </div>
          <div>
            <dt>Why it matters</dt>
            <dd>${item.why}</dd>
          </div>
        </dl>
      </article>
    `).join("")
    : `
      <article class="tool-panel glossary-empty">
        <span class="eyebrow">No match</span>
        <h2>Try a broader word.</h2>
        <p>Search for a craft area like rhythm, hook, harmony, vocal, replay, or business.</p>
      </article>
    `;
}

function soundGenomeFamilies() {
  return ["All", ...new Set(soundGenomeTools.map((tool) => tool.family))];
}

function acousticTopics() {
  return ["All", ...new Set(acousticDesignLessons.map((lesson) => lesson.topic))];
}

function renderAcousticDesign() {
  const filters = $("#acousticTopicFilters");
  const grid = $("#acousticDesignGrid");
  const count = $("#acousticDesignCount");
  if (!filters || !grid) return;
  const visibleLessons = acousticDesignLessons.filter((lesson) => state.activeAcousticTopic === "All" || lesson.topic === state.activeAcousticTopic);
  if (count) count.textContent = `${visibleLessons.length} lessons`;
  if (state.activeGlossarySection === "acoustics") renderGlossaryIndex();
  filters.innerHTML = acousticTopics()
    .map((topic) => `
      <button class="${state.activeAcousticTopic === topic ? "is-active" : ""}" data-acoustic-topic="${escapeHtml(topic)}" type="button">
        ${escapeHtml(topic)}
      </button>
    `)
    .join("");
  grid.innerHTML = visibleLessons
    .map((lesson) => `
      <article class="acoustic-design-card">
        <div class="acoustic-design-head">
          <span class="case-tag">${escapeHtml(lesson.topic)}</span>
        </div>
        <h3>${escapeHtml(lesson.concept)}</h3>
        <dl>
          <div>
            <dt>What to hear</dt>
            <dd>${escapeHtml(lesson.hear)}</dd>
          </div>
          <div>
            <dt>Producer move</dt>
            <dd>${escapeHtml(lesson.producerMove)}</dd>
          </div>
          <div>
            <dt>Try this</dt>
            <dd>${escapeHtml(lesson.tryIt)}</dd>
          </div>
        </dl>
      </article>
    `)
    .join("");
}

function renderSoundGenome() {
  const filters = $("#soundGenomeFilters");
  const grid = $("#soundGenomeGrid");
  const signatureGrid = $("#signatureSoundGrid");
  const gearGrid = $("#gearHeadsGrid");
  if (!filters || !grid || !signatureGrid || !gearGrid) return;
  const visibleTools = soundGenomeTools.filter((tool) => state.activeSoundFamily === "All" || tool.family === state.activeSoundFamily);
  const count = $("#soundGenomeCount");
  if (count) count.textContent = `${visibleTools.length} tools`;
  if (state.activeGlossarySection === "sound") renderGlossaryIndex();
  filters.innerHTML = soundGenomeFamilies()
    .map((family) => `
      <button class="${state.activeSoundFamily === family ? "is-active" : ""}" type="button" data-sound-family="${escapeHtml(family)}">
        ${escapeHtml(family)}
      </button>
    `)
    .join("");
  grid.innerHTML = visibleTools
    .map((tool) => `
      <article class="sound-tool-card">
        <div>
          <span class="case-tag">${escapeHtml(tool.family)}</span>
          <span class="tag">${escapeHtml(tool.era)}</span>
        </div>
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.note)}</p>
        <dl>
          <div>
            <dt>Defined</dt>
            <dd>${tool.defined.map(escapeHtml).join(", ")}</dd>
          </div>
          <div>
            <dt>Emotional jobs</dt>
            <dd>${tool.jobs.map(escapeHtml).join(", ")}</dd>
          </div>
          <div>
            <dt>Study</dt>
            <dd>${tool.study.map(escapeHtml).join(", ")}</dd>
          </div>
        </dl>
      </article>
    `)
    .join("");
  gearGrid.innerHTML = gearHeadGallery
    .map((gear) => `
      <article class="gear-head-card">
        <div class="gear-image-frame" data-gear-name="${escapeHtml(gear.name)}">
          <img src="${escapeHtml(gear.imageUrl)}" alt="${escapeHtml(gear.name)}" loading="eager" onerror="this.closest('.gear-image-frame').classList.add('is-missing'); this.remove();" />
          <span>${escapeHtml(gear.name)}</span>
        </div>
        <div class="gear-head-copy">
          <span class="case-tag">${escapeHtml(gear.type)}</span>
          <h3>${escapeHtml(gear.name)}</h3>
          <p>${escapeHtml(gear.fingerprint)}</p>
          <strong>${escapeHtml(gear.whyCare)}</strong>
          <div class="gear-record-list">
            <span>Heard on / study</span>
            ${gear.heardOn.map((song) => `<em>${escapeHtml(song)}</em>`).join("")}
          </div>
        </div>
      </article>
    `)
    .join("");
  signatureGrid.innerHTML = producerSignatureSounds
    .map((item) => `
      <article class="signature-sound-card">
        <div class="signature-sound-head">
          <span class="case-tag">${escapeHtml(item.lane || "Signature")}</span>
        </div>
        <strong>${escapeHtml(item.producer)}</strong>
        <p>${item.signature.map(escapeHtml).join(" | ")}</p>
        <span>${escapeHtml(item.lesson)}</span>
      </article>
    `)
    .join("");
}

function loadReferences() {
  try {
    state.references = JSON.parse(localStorage.getItem("songlabReferences")) || sampleReferences;
  } catch {
    state.references = sampleReferences;
  }
}

function persistReferences() {
  localStorage.setItem("songlabReferences", JSON.stringify(state.references));
  renderStudioFlow();
}

function renderReferences() {
  $("#referenceBoard").innerHTML = state.references
    .map((reference) => {
      const isCraft = reference.kind === "craft-move";
      return `
      <article class="reference-card${isCraft ? " is-craft" : ""}">
        <strong>${reference.title}</strong>
        <p>${reference.use}</p>
        ${
          isCraft && reference.yours
            ? `<div class="reference-yours">
                 <span class="eyebrow">Your version</span>
                 <p>${escapeHtml(reference.yours)}</p>
               </div>`
            : `<p>${reference.replay}</p>`
        }
        <div class="reference-meta">
          <span class="case-tag">${reference.lane}</span>
          <span class="tag">${isCraft ? "Your move" : "Replay study"}</span>
        </div>
      </article>
    `;
    })
    .join("");
}

function addReference(event) {
  event.preventDefault();
  const title = $("#refTitle").value.trim();
  const use = $("#refUse").value.trim();
  const replay = $("#refReplay").value.trim();
  if (!title || !use || !replay) {
    showToast("Add a title, use case, and replay reason.");
    return;
  }
  state.references.unshift({ title, use, replay, lane: state.lane });
  persistReferences();
  renderReferences();
  event.target.reset();
  showToast("Reference added.");
}

function loadStreamRefs() {
  try {
    const references = JSON.parse(localStorage.getItem("songlabStreamRefs"));
    state.streamRefs = Array.isArray(references) ? references.map(normalizedStreamReference) : [];
    if (Array.isArray(references)) persistStreamRefs();
  } catch {
    state.streamRefs = [];
  }
}

function persistStreamRefs() {
  localStorage.setItem("songlabStreamRefs", JSON.stringify(state.streamRefs));
}

function createStreamRefId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `stream-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function addStreamReference() {
  const url = $("#streamUrlInput")?.value.trim();
  const title = $("#streamTitleInput")?.value.trim();
  const timestamp = $("#streamTimeInput")?.value.trim();
  const tag = $("#streamTagInput")?.value || "Hook";
  const note = $("#streamNoteInput")?.value.trim();

  if (!url) {
    showToast("Paste a streaming URL first.");
    return;
  }

  let streamEmbed;
  try {
    streamEmbed = buildStreamEmbed(url, timestamp);
  } catch {
    showToast("Use a valid http(s) streaming link.");
    return;
  }

  const reference = {
    id: createStreamRefId(),
    proId: state.activePro,
    url,
    title: title || `${streamEmbed.providerLabel} reference`,
    timestamp: timestamp || (streamEmbed.seconds ? formatTime(streamEmbed.seconds) : ""),
    seconds: streamEmbed.seconds,
    tag,
    note,
    provider: streamEmbed.provider,
    providerLabel: streamEmbed.providerLabel,
    embedUrl: streamEmbed.embedUrl,
    playerType: streamEmbed.playerType,
    height: streamEmbed.height,
    createdAt: Date.now(),
  };

  state.streamRefs.unshift(reference);
  persistStreamRefs();
  renderProDetail();
  showToast(streamEmbed.embedUrl ? "Streaming player added." : "Reference saved as a link.");
}

function addSuggestedStreamReference(slotId) {
  const pro = activeProPlaybook();
  const slot = suggestedSlotById(pro.id, slotId);
  const card = $$("[data-slot-card]").find((element) => element.dataset.slotCard === slotId);
  const url = card?.querySelector("[data-slot-url]")?.value.trim();
  const timestamp = card?.querySelector("[data-slot-time]")?.value.trim() || slot?.timestamp || "";

  if (!slot || !card) {
    showToast("Reference slot was not found.");
    return;
  }

  if (!url) {
    showToast("Paste an official streaming URL for this record.");
    return;
  }

  let streamEmbed;
  try {
    streamEmbed = buildStreamEmbed(url, timestamp);
  } catch {
    showToast("Use a valid http(s) streaming link.");
    return;
  }

  const reference = {
    id: createStreamRefId(),
    proId: pro.id,
    slotId: slot.id,
    url,
    title: `${slot.artist} - ${slot.title}`,
    timestamp: timestamp || (streamEmbed.seconds ? formatTime(streamEmbed.seconds) : ""),
    seconds: streamEmbed.seconds,
    tag: slot.focus,
    note: slot.note,
    provider: streamEmbed.provider,
    providerLabel: streamEmbed.providerLabel,
    embedUrl: streamEmbed.embedUrl,
    playerType: streamEmbed.playerType,
    height: streamEmbed.height,
    createdAt: Date.now(),
  };

  state.streamRefs.unshift(reference);
  persistStreamRefs();
  renderProDetail();
  showToast(`${slot.title} player attached.`);
}

function deleteStreamReference(referenceId) {
  state.streamRefs = state.streamRefs.filter((reference) => reference.id !== referenceId);
  persistStreamRefs();
  renderProDetail();
  showToast("Streaming reference removed.");
}

function saveStreamReferenceToVault(referenceId) {
  const reference = state.streamRefs.find((item) => item.id === referenceId);
  if (!reference) return;
  const pro = proPlaybooks.find((item) => item.id === reference.proId) || activeProPlaybook();
  const moment = reference.timestamp ? ` at ${reference.timestamp}` : "";
  state.references.unshift({
    title: `${reference.title} | ${pro.name}`,
    use: `${reference.tag}${moment}: ${reference.note || pro.listenFor[0]}`,
    replay: `${pro.archetype}: ${pro.proMove}`,
    lane: pro.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Reference saved to Vault.");
}

function saveDefaultSuggestedSlotToVault(slotId) {
  const pro = activeProPlaybook();
  const slot = suggestedSlotById(pro.id, slotId);
  if (!slot) return;
  const moment = slot.timestamp ? ` at ${slot.timestamp}` : "";
  state.references.unshift({
    title: `${slot.artist} - ${slot.title} | ${pro.name}`,
    use: `${slot.focus}${moment}: ${slot.note}`,
    replay: `${pro.archetype}: ${slot.listenFor}`,
    lane: pro.lane,
  });
  persistReferences();
  renderReferences();
  showToast("Curated reference saved to Vault.");
}

function bindEvents() {
  document.body.addEventListener("click", (event) => {
    const appModeButton = event.target.closest("[data-app-mode]");
    if (appModeButton) {
      setAppMode(appModeButton.dataset.appMode);
      return;
    }

    const openViewButton = event.target.closest("[data-open-view]");
    if (openViewButton) {
      if (openViewButton.dataset.openCreateMode) {
        state.creation.createMode = openViewButton.dataset.openCreateMode;
        persistCreationDraft();
      }
      if (openViewButton.dataset.openGlossarySection) {
        state.activeGlossarySection = openViewButton.dataset.openGlossarySection;
      }
      if (openViewButton.dataset.openView === "pros") syncProPlaybookToWorkflow();
      setView(openViewButton.dataset.openView);
      if (openViewButton.dataset.openView === "glossary") {
        renderGlossary();
        renderSoundGenome();
        renderAcousticDesign();
      }
      if (openViewButton.dataset.openView === "create") renderCreationRoom();
      return;
    }

    const viewButton = event.target.closest("[data-view], [data-view-jump]");
    if (viewButton) {
      const targetView = viewButton.dataset.view || viewButton.dataset.viewJump;
      if (targetView === "pros") syncProPlaybookToWorkflow();
      setView(targetView);
      return;
    }

    const doctorRouteButton = event.target.closest("[data-doctor-route]");
    if (doctorRouteButton) {
      routeDoctorRepair(doctorRouteButton.dataset.doctorRoute);
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      state.activeFilter = filterButton.dataset.filter;
      renderCases();
      return;
    }

    const caseButton = event.target.closest("[data-case]");
    if (caseButton) {
      state.activeCase = caseButton.dataset.case;
      renderCaseList();
      renderCaseDetail();
      return;
    }

    const caseAction = event.target.closest("[data-case-action]");
    if (caseAction) {
      const action = caseAction.dataset.caseAction;
      if (action === "save") saveCaseStudyToVault();
      if (action === "open-pro") openCaseProducerPlaybook();
      return;
    }

    const riskFilterButton = event.target.closest("[data-risk-filter]");
    if (riskFilterButton) {
      state.activeRiskFilter = riskFilterButton.dataset.riskFilter;
      renderRiskLab();
      return;
    }

    const sessionFilterButton = event.target.closest("[data-session-filter]");
    if (sessionFilterButton) {
      state.activeSessionFilter = sessionFilterButton.dataset.sessionFilter;
      renderSessionGreats();
      return;
    }

    const riskButton = event.target.closest("[data-risk]");
    if (riskButton) {
      state.activeRisk = riskButton.dataset.risk;
      renderRiskList();
      renderRiskDetail();
      return;
    }

    const riskAction = event.target.closest("[data-risk-action]");
    if (riskAction) {
      const action = riskAction.dataset.riskAction;
      if (action === "save") saveRiskStudyToVault();
      if (action === "challenge") sendRiskToCreationRoom();
      return;
    }

    const proButton = event.target.closest("[data-pro]");
    if (proButton) {
      state.activePro = proButton.dataset.pro;
      renderPros();
      return;
    }

    const proFilterButton = event.target.closest("[data-pro-filter]");
    if (proFilterButton) {
      state.activeProFilter = proFilterButton.dataset.proFilter;
      renderPros();
      return;
    }

    const glossarySectionButton = event.target.closest("[data-glossary-section]");
    if (glossarySectionButton) {
      state.activeGlossarySection = glossarySectionButton.dataset.glossarySection;
      renderGlossary();
      renderSoundGenome();
      renderAcousticDesign();
      return;
    }

    const glossaryFilterButton = event.target.closest("[data-glossary-filter]");
    if (glossaryFilterButton) {
      state.activeGlossaryFilter = glossaryFilterButton.dataset.glossaryFilter;
      renderGlossary();
      return;
    }

    const soundFamilyButton = event.target.closest("[data-sound-family]");
    if (soundFamilyButton) {
      state.activeSoundFamily = soundFamilyButton.dataset.soundFamily;
      renderSoundGenome();
      return;
    }

    const acousticTopicButton = event.target.closest("[data-acoustic-topic]");
    if (acousticTopicButton) {
      state.activeAcousticTopic = acousticTopicButton.dataset.acousticTopic;
      renderAcousticDesign();
      return;
    }

    const mixStyleButton = event.target.closest("[data-mix-style]");
    if (mixStyleButton) {
      state.activeMixGuideStyle = mixStyleButton.dataset.mixStyle;
      renderMixGuide();
      return;
    }

    const proAction = event.target.closest("[data-pro-action]");
    if (proAction) {
      const action = proAction.dataset.proAction;
      if (action === "play") playProSketch();
      if (action === "listen") scrollToStreamingReferences();
      if (action === "load-audio") loadProSketchIntoAudioLab();
      if (action === "save") saveProMoveToVault();
      if (action === "bag") saveCraftMoveToBag();
      return;
    }

    const streamAction = event.target.closest("[data-stream-action]");
    if (streamAction) {
      const action = streamAction.dataset.streamAction;
      const referenceId = streamAction.dataset.streamId;
      if (action === "add") addStreamReference();
      if (action === "add-slot") addSuggestedStreamReference(streamAction.dataset.slotId);
      if (action === "delete") deleteStreamReference(referenceId);
      if (action === "vault") saveStreamReferenceToVault(referenceId);
      if (action === "vault-default") saveDefaultSuggestedSlotToVault(streamAction.dataset.slotId);
      return;
    }

    const creationTemplateButton = event.target.closest("[data-create-template]");
    if (creationTemplateButton) {
      applyCreationTemplate(creationTemplateButton.dataset.createTemplate);
      return;
    }

    const createModeButton = event.target.closest("[data-create-mode]");
    if (createModeButton) {
      setCreateMode(createModeButton.dataset.createMode);
      return;
    }

    const genreProfileButton = event.target.closest("[data-genre-profile]");
    if (genreProfileButton) {
      setActiveGenreProfile(genreProfileButton.dataset.genreProfile);
      return;
    }

    const genreAction = event.target.closest("[data-genre-action]");
    if (genreAction) {
      const action = genreAction.dataset.genreAction;
      if (action === "load-template") loadActiveGenreTemplate();
      if (action === "seed-notebook") seedNotebookFromGenre();
      return;
    }

    const flowDelete = event.target.closest("[data-flow-delete]");
    if (flowDelete) {
      deleteFlowCapture(flowDelete.dataset.flowDelete);
      return;
    }

    const loadSketchButton = event.target.closest("[data-load-sketch-take]");
    if (loadSketchButton) {
      loadSketchTake(loadSketchButton.dataset.loadSketchTake);
      return;
    }

    const deleteSketchButton = event.target.closest("[data-delete-sketch-take]");
    if (deleteSketchButton) {
      deleteSketchTake(deleteSketchButton.dataset.deleteSketchTake);
      return;
    }

    const workshopStep = event.target.closest("[data-workshop-step]");
    if (workshopStep) {
      state.activeWorkshop = workshopStep.dataset.workshopStep;
      renderWorkshop();
      return;
    }

    const workshopChoice = event.target.closest("[data-workshop-choice]");
    if (workshopChoice) {
      state.workshopAnswers[state.activeWorkshop] = Number(workshopChoice.dataset.workshopChoice);
      renderWorkshopLesson();
      return;
    }

    const scoreButton = event.target.closest(".score-buttons button");
    if (scoreButton) {
      const group = scoreButton.closest(".score-buttons");
      state.benchScores[group.dataset.scoreKey] = Number(scoreButton.dataset.score);
      renderHookSprint();
      return;
    }

    const seekMarkerButton = event.target.closest("[data-seek-marker]");
    if (seekMarkerButton) {
      const marker = state.audio.markers.find((item) => item.id === Number(seekMarkerButton.dataset.seekMarker));
      if (marker) seekTo(marker.time);
      return;
    }

    const loopMarkerButton = event.target.closest("[data-loop-marker]");
    if (loopMarkerButton) {
      loopMarker(Number(loopMarkerButton.dataset.loopMarker));
      return;
    }

    const deleteMarkerButton = event.target.closest("[data-delete-marker]");
    if (deleteMarkerButton) {
      deleteMarker(Number(deleteMarkerButton.dataset.deleteMarker));
    }
  });

  document.body.addEventListener("input", (event) => {
    if (event.target.matches("[data-craft-input]")) {
      state.craftDrafts[activeProPlaybook().id] = event.target.value;
    }
    const sectionField = event.target.closest("[data-create-section]");
    if (sectionField) {
      state.creation.sections[sectionField.dataset.createSection] = sectionField.value;
      syncCreationDraft();
    }
    const barField = event.target.closest("[data-create-bars]");
    if (barField) {
      state.creation.sectionBars[barField.dataset.createBars] = Number(barField.value) || 1;
      syncCreationDraft();
      renderCreationStructure();
    }
    if (event.target.id === "createBpm") {
      state.creation.bpm = currentCreationBpm();
      syncCreationDraft();
      renderCreationStructure();
    }
    if (event.target.id === "takeTranscript" || event.target.id === "takeDeliveryNotes") {
      const take = sketchRecorderState.takes.find((item) => item.id === sketchRecorderState.currentTakeId);
      if (take) {
        take.transcript = $("#takeTranscript")?.value.trim() || "";
        take.notes = $("#takeDeliveryNotes")?.value.trim() || "";
        renderSketchTakes();
      }
    }
  });

  $("#laneSelect").addEventListener("change", (event) => {
    applyWorkflowPreset(event.target.value);
  });
  $("#proficiencySelect").addEventListener("change", (event) => {
    setProficiency(event.target.value);
  });

  $("#shuffleQueue").addEventListener("click", renderQueue);
  $("#generateBlueprint").addEventListener("click", generateBlueprint);
  $("#saveBlueprint").addEventListener("click", saveBlueprintToVault);
  $("#sendBlueprintDoctor").addEventListener("click", sendBlueprintToDoctor);
  [
    "blueprintLane",
    "blueprintGenre",
    "rawIdeaInput",
    "situationInput",
    "tensionInput",
    "blueprintTitle",
    "blueprintHook",
    "detailInput",
    "replayInput",
    "structureInput",
    "productionRiskInput",
  ].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => {
      state.currentBlueprint = buildBlueprint(getBlueprintValues(), scoreBlueprint(getBlueprintValues()));
      renderBlueprint();
    });
  });
  [
    "createTitle",
    "createTempoKey",
    "createConcept",
    "createHook",
    "createFreewrite",
  ].forEach((id) => {
    $(`#${id}`).addEventListener("input", () => syncCreationDraft());
  });
  $("#createBeatInput").addEventListener("change", (event) => loadCreationBeat(event.target.files[0]));
  $("#globalPlayPause").addEventListener("click", toggleCreationPlayback);
  $("#globalBackFive").addEventListener("click", () => seekCreationBy(-5));
  $("#globalForwardFive").addEventListener("click", () => seekCreationBy(5));
  $("#globalLoopToggle").addEventListener("click", toggleCreationLoop);
  $("#saveCreationDraft").addEventListener("click", saveCreationDraft);
  $("#sendCreationDoctor").addEventListener("click", sendCreationToDoctor);
  $("#saveCreationVault").addEventListener("click", saveCreationToVault);
  $("#generateLyricIdeas").addEventListener("click", generateLyricIdeas);
  $("#sendLyricIdeasToPad").addEventListener("click", sendLyricIdeasToPad);
  $("#flowCaptureMoment").addEventListener("click", captureFlowMoment);
  $("#flowShufflePrompt").addEventListener("click", shuffleFlowPrompt);
  $("#flowSendToNotebook").addEventListener("click", sendFlowToNotebook);
  $("#flowDistillStructure").addEventListener("click", distillFlowToStructure);
  $("#startSketchRecording").addEventListener("click", startSketchRecording);
  $("#stopSketchRecording").addEventListener("click", stopSketchRecording);
  $("#sendTakeTranscript").addEventListener("click", sendTakeTranscriptToPad);
  $("#gradeSketchTake").addEventListener("click", gradeSketchPerformance);
  $("#runSongAnalysis").addEventListener("click", runSongAnalysis);
  $("#sendAnalysisDoctor").addEventListener("click", sendAnalysisToDoctor);
  $("#sendAnalysisPad").addEventListener("click", sendAnalysisToPad);
  $("#analysisAudioInput").addEventListener("change", (event) => handleAnalysisAudioUpload(event.target.files[0]));
  $("#generateVocalPlan").addEventListener("click", generateVocalPlan);
  $("#sendVocalPlanToPad").addEventListener("click", sendVocalPlanToPad);
  $("#globalSeek").addEventListener("input", (event) => scrubCreationBeat(event.target.value));
  creationAudioElement().addEventListener("loadedmetadata", updateCreationBeatUI);
  creationAudioElement().addEventListener("play", updateCreationBeatUI);
  creationAudioElement().addEventListener("pause", updateCreationBeatUI);
  creationAudioElement().addEventListener("ended", updateCreationBeatUI);
  creationAudioElement().addEventListener("timeupdate", updateCreationBeatUI);
  $("#audioFileInput").addEventListener("change", (event) => loadAudioFile(event.target.files[0]));
  $("#loadDemoGroove").addEventListener("click", loadDemoGroove);
  $("#playPause").addEventListener("click", togglePlayback);
  $("#backFive").addEventListener("click", () => seekBy(-5));
  $("#forwardFive").addEventListener("click", () => seekBy(5));
  $("#loopToggle").addEventListener("click", toggleLoop);
  $("#setLoopFromPlayhead").addEventListener("click", setLoopFromPlayhead);
  $("#addMarker").addEventListener("click", addAudioMarker);
  $("#saveAudioMap").addEventListener("click", saveAudioMapToVault);
  $("#sendMapToDoctor").addEventListener("click", sendAudioMapToDoctor);
  $("#volumeControl").addEventListener("input", (event) => {
    audioElement().volume = Number(event.target.value);
  });
  $("#waveformCanvas").addEventListener("click", (event) => {
    const duration = currentAudioDuration();
    if (!duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    seekTo(((event.clientX - rect.left) / rect.width) * duration);
  });
  $("#loopStart").addEventListener("change", updateAudioInterface);
  $("#loopEnd").addEventListener("change", updateAudioInterface);
  audioElement().addEventListener("loadedmetadata", updateAudioInterface);
  audioElement().addEventListener("play", updateAudioInterface);
  audioElement().addEventListener("pause", updateAudioInterface);
  audioElement().addEventListener("ended", updateAudioInterface);
  audioElement().addEventListener("timeupdate", () => {
    const audio = audioElement();
    const duration = currentAudioDuration();
    const loopStart = Number($("#loopStart").value) || 0;
    const loopEnd = Number($("#loopEnd").value) || duration;
    if (state.audio.loopOn && duration && loopEnd > loopStart && audio.currentTime >= loopEnd) {
      audio.currentTime = loopStart;
    }
    updatePlayhead();
    renderGuide();
    drawWaveform();
  });
  $("#doctorForm").addEventListener("submit", diagnoseSong);
  $("#generateHooks").addEventListener("click", renderHookSprint);
  $("#saveHookBrief").addEventListener("click", saveHookBrief);
  $("#glossarySearch").addEventListener("input", (event) => {
    state.glossarySearch = event.target.value;
    renderGlossary();
  });
  $("#referenceForm").addEventListener("submit", addReference);
  $("#saveSession").addEventListener("click", () => showToast("Session saved locally."));

  $$(".diagnostic-slider").forEach((slider) => {
    slider.addEventListener("input", () => {
      $(`[data-for="${slider.id}"]`).textContent = slider.value;
    });
  });
}

function init() {
  loadAppMode();
  loadProficiency();
  loadReferences();
  loadStreamRefs();
  loadCreationDraft();
  loadFlowState();
  bindEvents();
  renderAppModeChrome();
  state.creation.createMode = activeAppMode().createMode;
  applyWorkflowPreset(activeAppMode().workflow, { silent: true, rerender: false });
  renderQueue();
  renderPillars();
  renderStudioFlow();
  renderPros();
  renderWorkshop();
  renderCreationRoom();
  renderSongAnalysis();
  checkAnalystHealth();
  updateTranscriptAvailability();
  renderCases();
  renderRiskLab();
  renderSessionGreats();
  renderMixGuide();
  renderHookSprint();
  renderGlossary();
  renderSoundGenome();
  renderAcousticDesign();
  renderReferences();
  renderMarkers();
  updateAudioInterface();
  updateCreationBeatUI();
  diagnoseSong(null, false);
}

init();
