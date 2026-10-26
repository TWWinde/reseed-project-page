const imageMethods = [
  { name: "DMD", folder: "dmd" },
  { name: "GAD", folder: "gad" },
  { name: "DP-DMD", folder: "dpdmd" },
  { name: "DMD + ReSeed", folder: "reseed" }
];

const imageExamples = [
  { model: "SD3-Medium", title: "A photo of a backpack", slug: "sd3-backpack", seedSuffixes: [0, 1, 2, 3, 4, 6, 7, 9, 11], methods: imageMethods },
  { model: "SD3-Medium", title: "A photo of a dog", slug: "sd3-dog", seedSuffixes: [0, 1, 2, 3, 4, 5, 7, 9, 11], methods: imageMethods },
  { model: "SD3-Medium", title: "A photo of a couch", slug: "sd3-couch", seedSuffixes: [0, 2, 3, 4, 5, 7, 8, 10, 11], methods: imageMethods },
  { model: "SD3-Medium", title: "A photo of a handbag", slug: "sd3-handbag", seedSuffixes: [0, 1, 2, 3, 4, 5, 6, 9, 10], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a coffee mug", slug: "sd35-mug", seedSuffixes: [0, 1, 3, 4, 5, 7, 9, 10, 11], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a table lamp", slug: "sd35-lamp", seedSuffixes: [0, 1, 2, 3, 6, 7, 8, 9, 10], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a cat", slug: "sd35-cat", seedSuffixes: [0, 2, 3, 5, 7, 8, 9, 10, 11], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a teddy bear", slug: "sd35-teddy", seedSuffixes: [0, 1, 3, 5, 7, 8, 9, 10, 11], methods: imageMethods },
  {
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
];

function renderGallery(item) {
  const selectedSeeds = item.seedSuffixes;
  const count = selectedSeeds?.length ?? 6;
  const gallery = document.createElement("section");
  gallery.className = "gallery-display";
  gallery.setAttribute("aria-labelledby", `gallery-title-${item.slug}`);
  gallery.innerHTML = `<div class="gallery-meta"><div><span class="gallery-model"></span><h3 id="gallery-title-${item.slug}"></h3></div><p class="gallery-description"></p></div><div class="image-matrix-scroll" role="region" tabindex="0"><div class="image-matrix"><div class="image-seed-headings" aria-hidden="true"></div><div class="gallery-matrix"></div></div></div><div class="gallery-footer"><span class="gallery-caption"></span></div>`;
  gallery.classList.add(count === 9 ? "gallery-nine" : "gallery-six");
  gallery.querySelector(".image-matrix-scroll").setAttribute("aria-label", `${item.model}: ${item.title}; ${item.methods.length} image methods across ${count} matched initial noises`);
  gallery.querySelector(".gallery-model").textContent = item.model;
  gallery.querySelector("h3").textContent = item.title;
  gallery.querySelector(".gallery-description").textContent = item.description ?? "Nine curated matched initial noises across DMD, GAD, DP-DMD, and DMD + ReSeed.";
  gallery.querySelector(".gallery-caption").textContent = item.caption ?? "Nine of 12 matched seeds, selected for ReSeed image quality and variety.";
  const headings = gallery.querySelector(".image-seed-headings");
  for (let index = 0; index < count; index++) {
    const heading = document.createElement("span");
    heading.textContent = `Sample ${index + 1}`;
    headings.append(heading);
  }
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
    for (let index = 0; index < count; index++) {
      const frame = document.createElement("div");
      frame.className = "image-tile";
      const image = document.createElement("img");
      image.src = selectedSeeds
        ? `assets/gallery-curated/${item.slug}/${method.folder}/seed-20261025${String(selectedSeeds[index]).padStart(2, "0")}.webp`
        : `assets/gallery/${item.slug}/${method.folder}/sample-${index}.png`;
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
  gallery.querySelector(".gallery-matrix").append(...rows);
  return gallery;
}

document.getElementById("gallery-results").replaceChildren(
  ...imageExamples.map(renderGallery)
);

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
