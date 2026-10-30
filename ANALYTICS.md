# Private visitor statistics

Status: configured for the production project page with the site token supplied by the owner. The statistics are available through the owner's signed-in Cloudflare Web Analytics account. No analytics request is made if the token is cleared.

## Setup and configuration

1. Sign into your own [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Open **Web Analytics**, choose **Add a site**, and enter the hostname `twwinde.github.io` (without a protocol or path).
3. Choose the manual JavaScript installation for a site not proxied through Cloudflare. Keep the site in your own account; do not grant other people dashboard access.
4. Open **Manage site** and copy its JavaScript snippet. Use the **site token** inside `data-cf-beacon`, not an account API key or password.
5. Put that site token in the `cloudflare-web-analytics-token` meta tag in `index.html`, and publish the change.
6. Visit the project page and then open the site's Web Analytics dashboard. Data may take a few minutes to appear.

The dashboard provides page views, visits, country, referring site, and browser/device breakdowns. Country is an approximate network-derived location, not GPS or a street address. Cloudflare's visit metric does not identify individual people.

Only this project's HTTPS production pages load the beacon. Local previews, other domains, and unrelated paths are excluded. The loader respects Do Not Track and Global Privacy Control. Statistics can therefore omit visits whose browsers block analytics or request not to be tracked.

No counter, map, analytics dashboard, account credentials, or private statistics are embedded in the public page. The statistics are viewed in the signed-in Cloudflare dashboard. The site token and analytics script remain visible in the public page source, as expected for client-side web analytics; they do not grant access to the dashboard.

To disable analytics, clear the meta tag's token and publish again.

Official documentation:
- [Setup for sites not proxied through Cloudflare](https://developers.cloudflare.com/web-analytics/get-started/)
- [Available dimensions, including visitor country](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/)
- [Data collection and metrics](https://developers.cloudflare.com/web-analytics/data-metrics/)
