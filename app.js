const examples = {
  sd3: {
    model: "SD3-Medium",
    title: "A photo of a dog",
    description: "Six matched initial noises are shown for DMD, GAD, DP-DMD, and DMD + ReSeed.",
    image: "assets/sd3-dog.webp",
    width: 1800,
    height: 575,
    top: 59,
    columnsPerMethod: 2,
    rowsPerMethod: 3,
    methods: ["DMD", "GAD", "DP-DMD", "DMD + ReSeed"],
    groups: [[363, 346], [727, 346], [1091, 346], [1455, 345]],
    caption: "All six matched examples are shown."
  },
  sd35: {
    model: "SD3.5-Medium",
    title: "A photo of a cat",
    description: "Six matched initial noises are shown for DMD, GAD, DP-DMD, and DMD + ReSeed.",
    image: "assets/sd35-cat.webp",
    width: 1800,
    height: 575,
    top: 59,
    columnsPerMethod: 2,
    rowsPerMethod: 3,
    methods: ["DMD", "GAD", "DP-DMD", "DMD + ReSeed"],
    groups: [[363, 345], [728, 344], [1091, 346], [1455, 345]],
    caption: "All six matched examples are shown."
  },
  flux: {
    model: "FLUX.1-dev",
    title: "A cat resting on an open laptop",
    description: "Six matched initial noises are shown for SenseFlow and SenseFlow + ReSeed.",
    image: "assets/flux-cat.webp",
    width: 1800,
    height: 593,
    top: 0,
    columnsPerMethod: 3,
    rowsPerMethod: 3,
    methods: ["SenseFlow", "SenseFlow + ReSeed"],
    groups: [[601, 596], [1207, 593]],
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
    const [groupStart, groupWidth] = item.groups[methodIndex];
    const tileWidth = groupWidth / item.columnsPerMethod;
    const tileHeight = (item.height - item.top) / item.rowsPerMethod;
    const section = document.createElement("section");
    section.className = "image-method-row" + (methodIndex === item.methods.length - 1 ? " image-method-row-ours" : "");
    const heading = document.createElement("h4");
    heading.textContent = method;
    section.append(heading);
    const strip = document.createElement("div");
    strip.className = "image-strip";
    for (let index = 0; index < 6; index++) {
      const column = index % item.columnsPerMethod;
      const row = Math.floor(index / item.columnsPerMethod);
      const x = groupStart + column * tileWidth;
      const y = item.top + row * tileHeight;
      const frame = document.createElement("div");
      frame.className = "image-tile";
      frame.style.aspectRatio = `${tileWidth} / ${tileHeight}`;
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = `${item.model} ${method}, matched example ${index + 1}: ${item.title}`;
      image.loading = "lazy";
      image.decoding = "async";
      image.style.width = `${100 * item.width / tileWidth}%`;
      image.style.left = `${-100 * x / tileWidth}%`;
      image.style.top = `${-100 * y / tileHeight}%`;
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
