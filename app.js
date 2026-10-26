const examples = {
  sd3: {
    model: "SD3-Medium",
    title: "A photo of a dog",
    description: "Six matched initial noises are shown for DMD, GAD, DP-DMD, and DMD + ReSeed.",
    slug: "sd3",
    methods: [
      { name: "DMD", folder: "dmd" },
      { name: "GAD", folder: "gad" },
      { name: "DP-DMD", folder: "dpdmd" },
      { name: "DMD + ReSeed", folder: "reseed" }
    ],
    caption: "All six matched examples are shown."
  },
  sd35: {
    model: "SD3.5-Medium",
    title: "A photo of a cat",
    description: "Six matched initial noises are shown for DMD, GAD, DP-DMD, and DMD + ReSeed.",
    slug: "sd35",
    methods: [
      { name: "DMD", folder: "dmd" },
      { name: "GAD", folder: "gad" },
      { name: "DP-DMD", folder: "dpdmd" },
      { name: "DMD + ReSeed", folder: "reseed" }
    ],
    caption: "All six matched examples are shown."
  },
  flux: {
    model: "FLUX.1-dev",
    title: "A photo of a cat",
    description: "Six matched initial noises are shown for SenseFlow and SenseFlow + ReSeed.",
    slug: "flux",
    methods: [
      { name: "SenseFlow", folder: "senseflow" },
      { name: "SenseFlow + ReSeed", folder: "reseed" }
    ],
    caption: "Six of the nine matched examples are shown."
  }
};

const tabs = [...document.querySelectorAll("[data-gallery]")];
const fields = {
  model: document.getElementById("gallery-model"),
  title: document.getElementById("gallery-title"),
  description: document.getElementById("gallery-description"),
  matrix: document.getElementById("gallery-matrix"),
  caption: document.getElementById("gallery-caption")
};

function renderGallery(item) {
  fields.model.textContent = item.model;
  fields.title.textContent = item.title;
  fields.description.textContent = item.description;
  fields.caption.textContent = item.caption;
  const rows = [];
  for (let methodIndex = 0; methodIndex < item.methods.length; methodIndex++) {
    const method = item.methods[methodIndex];
    const section = document.createElement("section");
    section.className = "image-method-row" + (methodIndex === item.methods.length - 1 ? " image-method-row-ours" : "");
    const heading = document.createElement("h4");
    heading.textContent = method.name;
    section.append(heading);
    const strip = document.createElement("div");
    strip.className = "image-strip";
    for (let index = 0; index < 6; index++) {
      const frame = document.createElement("div");
      frame.className = "image-tile";
      const image = document.createElement("img");
      image.src = `assets/gallery/${item.slug}/${method.folder}/sample-${index}.png`;
      image.alt = `${item.model} ${method.name}, matched example ${index + 1}: ${item.title}`;
      image.loading = "lazy";
      image.decoding = "async";
      image.width = 1024;
      image.height = 1024;
      frame.append(image);
      strip.append(frame);
    }
    section.append(strip);
    rows.push(section);
  }
  fields.matrix.replaceChildren(...rows);
}

for (const tab of tabs) {
  tab.addEventListener("click", () => {
    const item = examples[tab.dataset.gallery];
    if (!item) return;
    renderGallery(item);
    for (const button of tabs) {
      const active = button === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
  });
}
renderGallery(examples.sd3);

const videoPrompts = {
  a_latte_art: {
    title: "A barista pours latte art into a cappuccino",
    source: "71-prompt study · prompt 22"
  },
  b_ceramic_plant_pot: {
    title: "An elegant ceramic plant pot and hanging plant",
    source: "320-prompt VBench subset · prompt 184"
  },
  c_sparklers: {
    title: "A young boy lights sparklers at twilight",
    source: "71-prompt study · prompt 14"
  },
  d_wooden_pathway: {
    title: "Scenic view from a wooden pathway",
    source: "320-prompt VBench subset · prompt 265"
  }
};

const promptButtons = [...document.querySelectorAll("[data-video-prompt]")];
const videoSeeds = [0, 2, 4, 6, 7];
const methodNames = { dmd2: "DMD2", dfd: "DFD", reseed_300: "DMD2 plus ReSeed" };
for (const strip of document.querySelectorAll("[data-video-strip]")) {
  for (const seed of videoSeeds) {
    const player = document.createElement("video");
    player.dataset.videoMethod = strip.dataset.videoStrip;
    player.dataset.videoSeed = String(seed);
    player.controls = true;
    player.muted = true;
    player.loop = true;
    player.playsInline = true;
    player.preload = "metadata";
    player.setAttribute("aria-label", `${methodNames[strip.dataset.videoStrip]}, seed ${seed}, selected prompt`);
    strip.append(player);
  }
}
const videoPlayers = [...document.querySelectorAll("[data-video-method]")];
const playAll = document.getElementById("play-all-videos");
let activePrompt = "a_latte_art";

function updateVideos() {
  const prompt = videoPrompts[activePrompt];
  document.getElementById("video-prompt-title").textContent = prompt.title;
  document.getElementById("video-prompt-source").textContent = prompt.source;
  for (const player of videoPlayers) {
    player.pause();
    const seed = player.dataset.videoSeed.padStart(3, "0");
    player.src = `assets/wan/${activePrompt}_seed_${seed}_${player.dataset.videoMethod}.mp4`;
    player.load();
  }
  playAll.textContent = "Play all 15 videos";
  for (const button of promptButtons) {
    const active = button.dataset.videoPrompt === activePrompt;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

for (const button of promptButtons) {
  button.addEventListener("click", () => {
    activePrompt = button.dataset.videoPrompt;
    updateVideos();
  });
}
playAll?.addEventListener("click", () => {
  const playing = videoPlayers.some((player) => !player.paused);
  if (playing) {
    videoPlayers.forEach((player) => player.pause());
    playAll.textContent = "Play all 15 videos";
  } else {
    videoPlayers.forEach((player) => {
      player.currentTime = 0;
      player.play().catch(() => {});
    });
    playAll.textContent = "Pause all 15 videos";
  }
});

updateVideos();

const copyButton = document.getElementById("copy-citation");
copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(document.getElementById("bibtex").textContent.trim());
    copyButton.textContent = "Copied";
    window.setTimeout(() => { copyButton.textContent = "Copy BibTeX"; }, 2200);
  } catch {
    copyButton.textContent = "Select text to copy";
  }
});
