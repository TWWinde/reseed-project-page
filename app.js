const imageMethods = [
  { name: "DMD", folder: "dmd" },
  { name: "GAD", folder: "gad" },
  { name: "DP-DMD", folder: "dpdmd" },
  { name: "DMD + ReSeed", folder: "reseed" }
];

const fluxObjectPrompts = [
  {
    "title": "a photo of a car",
    "slug": "flux-car"
  },
  {
    "title": "a photo of a couch",
    "slug": "flux-couch"
  },
  {
    "title": "a photo of a chair",
    "slug": "flux-chair"
  },
  {
    "title": "a photo of a coffee mug",
    "slug": "flux-coffee-mug"
  },
  {
    "title": "a photo of a table lamp",
    "slug": "flux-table-lamp"
  },
  {
    "title": "a photo of a candle",
    "slug": "flux-candle"
  },
  {
    "title": "a photo of a fire hydrant",
    "slug": "flux-fire-hydrant"
  }
];

const imageExamples = [
  { model: "SD3-Medium", title: "A photo of a backpack", slug: "sd3-backpack", seedSuffixes: [0, 1, 2, 3, 4, 6, 7, 9, 11], methods: imageMethods },
  { model: "SD3-Medium", title: "A photo of a dog", slug: "sd3-dog", seedSuffixes: [0, 1, 2, 3, 4, 5, 7, 9, 11], methods: imageMethods },
  { model: "SD3-Medium", title: "A photo of a couch", slug: "sd3-couch", seedSuffixes: [0, 2, 3, 4, 5, 7, 9, 10, 11], methods: imageMethods },
  { model: "SD3-Medium", title: "A photo of a handbag", slug: "sd3-handbag", seedSuffixes: [0, 11, 2, 3, 4, 5, 6, 9, 10], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a coffee mug", slug: "sd35-mug", seedSuffixes: [0, 1, 3, 4, 5, 7, 9, 10, 11], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a table lamp", slug: "sd35-lamp", seedSuffixes: [0, 1, 2, 3, 6, 7, 8, 9, 10], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a cat", slug: "sd35-cat", seedSuffixes: [0, 2, 3, 5, 7, 8, 9, 10, 11], methods: imageMethods },
  { model: "SD3.5-Medium", title: "A photo of a teddy bear", slug: "sd35-teddy", seedSuffixes: [0, 1, 3, 5, 7, 8, 9, 10, 11], methods: imageMethods },
  ...fluxObjectPrompts.map(item => ({
    ...item,
    model: "FLUX.1-dev",
    seedSuffixes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    methods: [
      { name: "SenseFlow", folder: "senseflow" },
      { name: "SenseFlow + ReSeed", folder: "reseed" }
    ]
  })),
  {
    model: "FLUX.1-dev",
    title: "a photo of bird",
    slug: "flux-bird",
    seedSuffixes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    methods: [
      { name: "SenseFlow", folder: "senseflow" },
      { name: "SenseFlow + ReSeed", folder: "reseed" }
    ]
  },
  {
    model: "FLUX.1-dev",
    title: "a photo of horse",
    slug: "flux-horse",
    seedSuffixes: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    methods: [
      { name: "SenseFlow", folder: "senseflow" },
      { name: "SenseFlow + ReSeed", folder: "reseed" }
    ]
  },
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
  if (item.description) {
    gallery.querySelector(".gallery-description").textContent = item.description;
  } else {
    gallery.querySelector(".gallery-description").remove();
  }
  if (item.caption) {
    gallery.querySelector(".gallery-caption").textContent = item.caption;
  } else {
    gallery.querySelector(".gallery-footer").remove();
  }
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

const selectedVideoPrompts = {
  "selected_prompt_000": {
    "title": "a black dog wearing halloween costume",
    "source": "VBench \u00b7 prompt 0"
  },
  "selected_prompt_009": {
    "title": "a squirrel eating nuts",
    "source": "VBench \u00b7 prompt 9"
  },
  "selected_prompt_018": {
    "title": "white rabbit near the fence",
    "source": "VBench \u00b7 prompt 18"
  },
  "selected_prompt_020": {
    "title": "close up of wolf",
    "source": "VBench \u00b7 prompt 20"
  },
  "selected_prompt_027": {
    "title": "video of parrots perched on bird stand",
    "source": "VBench \u00b7 prompt 27"
  },
  "selected_prompt_037": {
    "title": "koala eating leaves from a branch",
    "source": "VBench \u00b7 prompt 37"
  },
  "selected_prompt_052": {
    "title": "a pancake tower with chocolate syrup and strawberries on top",
    "source": "VBench \u00b7 prompt 52"
  },
  "selected_prompt_106": {
    "title": "fresh salmon salad on a plate",
    "source": "VBench \u00b7 prompt 106"
  },
  "selected_prompt_211": {
    "title": "beautiful flower decoration",
    "source": "VBench \u00b7 prompt 211"
  },
  "selected_prompt_224": {
    "title": "bamboo leaves backlit by the sun",
    "source": "VBench \u00b7 prompt 224"
  },
  "selected_prompt_229": {
    "title": "variety of succulent plants on a garden",
    "source": "VBench \u00b7 prompt 229"
  },
  "selected_prompt_233": {
    "title": "tall forest trees on a misty morning",
    "source": "VBench \u00b7 prompt 233"
  },
  "selected_prompt_255": {
    "title": "mountain view",
    "source": "VBench \u00b7 prompt 255"
  },
  "selected_prompt_256": {
    "title": "waterfalls in between mountain",
    "source": "VBench \u00b7 prompt 256"
  },
  "selected_prompt_267": {
    "title": "drone footage of waves crashing on beach shore",
    "source": "VBench \u00b7 prompt 267"
  },
  "selected_prompt_268": {
    "title": "a scenic view of the golden hour at norway",
    "source": "VBench \u00b7 prompt 268"
  }
};

const videoSeeds = [0, 1, 2, 3, 4, 5, 6, 7];
const videoMethods = [
  { id: "dmd2", name: "DMD2" },
  { id: "dfd", name: "DFD" },
  { id: "reseed_300", name: "DMD2 + ReSeed" }
];

// Load video metadata near the viewport while keeping every prompt visible.
const videoLoader = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const player = entry.target;
      player.preload = "metadata";
      if (player.paused && player.readyState === 0) player.load();
      videoLoader.unobserve(player);
    }
  }, { rootMargin: "1000px 0px" })
  : null;

function renderVideoPrompt(slug, prompt) {
  const seeds = prompt.seeds ?? videoSeeds;
  const videoCount = seeds.length * videoMethods.length;
  const group = document.createElement("section");
  group.className = "video-prompt-group" + (seeds.length === 1 ? " video-single-seed" : "");
  group.setAttribute("aria-labelledby", `video-title-${slug}`);
  group.innerHTML = `<div class="video-selection"><div><h4 id="video-title-${slug}"></h4></div><button class="button video-play-group" type="button">Play all ${videoCount} videos</button></div><div class="video-matrix-scroll" role="region" tabindex="0"><div class="video-matrix"></div></div>`;
  group.querySelector("h4").textContent = prompt.title;
  group.querySelector(".video-matrix-scroll").setAttribute("aria-label", `${prompt.title}: three methods across ${seeds.length} matched initial ${seeds.length === 1 ? "noise" : "noises"}`);
  const matrix = group.querySelector(".video-matrix");
  for (const method of videoMethods) {
    const row = document.createElement("section");
    row.className = "video-method-row" + (method.id === "reseed_300" ? " video-method-row-ours" : "");
    const title = document.createElement("h5");
    title.textContent = method.name;
    row.append(title);
    const strip = document.createElement("div");
    strip.className = "video-strip";
    for (const seed of seeds) {
      const player = document.createElement("video");
      const filename = `${slug}_seed_${String(seed).padStart(3, "0")}_${method.id}`;
      player.src = `assets/wan/${filename}.mp4`;
      player.dataset.videoMethod = method.id;
      player.dataset.videoSeed = String(seed);
      player.controls = true;
      player.muted = true;
      player.loop = true;
      player.playsInline = true;
      player.preload = videoLoader ? "none" : "metadata";
      if (videoLoader) videoLoader.observe(player);
      player.setAttribute("aria-label", `${method.name}, seed ${seed}: ${prompt.title}`);
      strip.append(player);
    }
    row.append(strip);
    matrix.append(row);
  }
  const players = [...group.querySelectorAll("video")];
  const button = group.querySelector(".video-play-group");
  const updateButton = () => {
    button.textContent = players.some(player => !player.paused) ? `Pause all ${videoCount} videos` : `Play all ${videoCount} videos`;
  };
  players.forEach(player => {
    player.addEventListener("play", updateButton);
    player.addEventListener("pause", updateButton);
  });
  button.addEventListener("click", () => {
    if (players.some(player => !player.paused)) {
      players.forEach(player => player.pause());
    } else {
      players.forEach(player => {
        player.currentTime = 0;
        player.play().catch(() => {});
      });
    }
  });
  return group;
}

document.getElementById("video-prompt-results").replaceChildren(
  ...Object.entries(videoPrompts).map(([slug, prompt]) => renderVideoPrompt(slug, prompt))
);

document.getElementById("selected-video-results").replaceChildren(
  ...Object.entries(selectedVideoPrompts).map(([slug, prompt]) => renderVideoPrompt(slug, prompt))
);

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
