const examples = {
  sd3: {
    model: "SD3-Medium",
    title: "A photo of a dog",
    description: "Teacher, four-step DMD, GAD, DP-DMD and DMD + ReSeed, arranged in matched-noise columns.",
    image: "assets/sd3-dog.webp",
    width: 1800,
    height: 575,
    alt: "Matched-noise SD3-Medium dog grids comparing teacher, DMD, GAD, DP-DMD, and ReSeed.",
    caption: "The same prompt and six initial noises are used for each method."
  },
  sd35: {
    model: "SD3.5-Medium",
    title: "A photo of a cat",
    description: "Matched-seed samples from the teacher, four-step DMD, GAD, DP-DMD and the frozen DMD student with ReSeed.",
    image: "assets/sd35-cat.webp",
    width: 1800,
    height: 575,
    alt: "Matched-noise SD3.5-Medium cat grids comparing teacher, distilled students, and ReSeed.",
    caption: "Five methods share the same six initial noises."
  },
  flux: {
    model: "FLUX.1-dev",
    title: "A cat resting on an open laptop",
    description: "The FLUX.1-dev teacher, four-step SenseFlow student and the same student with ReSeed.",
    image: "assets/flux-cat.webp",
    width: 1800,
    height: 593,
    alt: "Nine matched-seed laptop-cat generations for FLUX.1-dev teacher, SenseFlow, and ReSeed.",
    caption: "Each method uses the same nine initial noises."
  }
};

const tabs = [...document.querySelectorAll("[data-gallery]")];
const fields = {
  model: document.getElementById("gallery-model"),
  title: document.getElementById("gallery-title"),
  description: document.getElementById("gallery-description"),
  image: document.getElementById("gallery-image"),
  link: document.getElementById("gallery-link"),
  caption: document.getElementById("gallery-caption")
};

for (const tab of tabs) {
  tab.addEventListener("click", () => {
    const item = examples[tab.dataset.gallery];
    if (!item) return;
    fields.model.textContent = item.model;
    fields.title.textContent = item.title;
    fields.description.textContent = item.description;
    fields.image.src = item.image;
    fields.image.alt = item.alt;
    fields.image.width = item.width;
    fields.image.height = item.height;
    fields.link.href = item.image;
    fields.caption.textContent = item.caption;
    for (const button of tabs) {
      const active = button === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }
  });
}

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
