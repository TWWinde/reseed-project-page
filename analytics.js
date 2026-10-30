(() => {
  "use strict";

  // The Cloudflare site token is public embed configuration, not an account API key.
  const token = document.querySelector('meta[name="cloudflare-web-analytics-token"]')?.content.trim();
  if (!token) return;

  // Keep previews, forks, and unrelated pages out of this site's statistics.
  const projectPath = location.pathname === "/reseed-project-page" || location.pathname.startsWith("/reseed-project-page/");
  if (location.protocol !== "https:" || location.hostname !== "twwinde.github.io" || !projectPath) return;
  if (navigator.globalPrivacyControl === true || navigator.doNotTrack === "1" || window.doNotTrack === "1") return;
  if (document.querySelector('script[src^="https://static.cloudflareinsights.com/beacon.min.js"]')) return;

  const beacon = document.createElement("script");
  beacon.type = "module";
  beacon.async = true;
  beacon.src = "https://static.cloudflareinsights.com/beacon.min.js";
  beacon.setAttribute("data-cf-beacon", JSON.stringify({ token }));
  document.head.append(beacon);
})();
