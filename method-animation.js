const animation = document.getElementById("method-animation");

if (animation) {
  const stageButtons = [...animation.querySelectorAll("[data-animation-stage]")];
  const toggle = document.getElementById("animation-toggle");
  const replay = document.getElementById("animation-replay");
  const caption = document.getElementById("animation-caption");
  const captions = [
    "From the same initial noise and prompt, the frozen teacher supplies an endpoint for the first student interval. Its displacement gives the target average velocity.",
    "The student backbone stays frozen. Training changes only the small residual biases β so its first-step velocity matches the fixed teacher target.",
    "At inference, the learned bias is active in step 1. Steps 2–4 use the original student, with no teacher call or extra denoising step."
  ];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let stage = 0;
  let playing = !reducedMotion.matches;
  let inView = false;
  let timer = null;

  function showStage(next) {
    stage = next;
    animation.dataset.stage = String(stage);
    caption.textContent = captions[stage];
    for (const button of stageButtons) {
      const active = Number(button.dataset.animationStage) === stage;
      button.classList.toggle("is-current", active);
      button.setAttribute("aria-pressed", String(active));
    }
  }

  function syncPlayback() {
    window.clearInterval(timer);
    timer = null;
    const running = playing && inView && !document.hidden && !reducedMotion.matches;
    animation.classList.toggle("is-playing", running);
    toggle.disabled = reducedMotion.matches;
    toggle.textContent = reducedMotion.matches ? "Motion off" : playing ? "Pause" : "Play";
    toggle.setAttribute("aria-label", reducedMotion.matches ? "Animation disabled by reduced motion setting" : playing ? "Pause animation" : "Play animation");
    if (running) timer = window.setInterval(() => showStage((stage + 1) % captions.length), 4700);
  }

  for (const button of stageButtons) {
    button.addEventListener("click", () => {
      showStage(Number(button.dataset.animationStage));
      playing = false;
      syncPlayback();
    });
  }
  toggle.addEventListener("click", () => {
    playing = !playing;
    syncPlayback();
  });
  replay.addEventListener("click", () => {
    showStage(0);
    playing = !reducedMotion.matches;
    syncPlayback();
  });
  document.addEventListener("visibilitychange", syncPlayback);
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) playing = false;
    syncPlayback();
  });
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    syncPlayback();
  }, { threshold: 0.2 }).observe(animation);
  showStage(0);
  syncPlayback();
}
