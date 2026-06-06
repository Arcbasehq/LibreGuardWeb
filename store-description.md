# LibreGuard — Browse the web like nobody's watching.

A fast, open-source ad and tracker blocker that protects your privacy without collecting any data.

**How it works**

LibreGuard blocks ads, trackers, and malicious domains at the network layer using Chrome and Firefox's declarativeNetRequest API. Requests are intercepted before they ever leave your browser — no JavaScript injection, no slow per-request processing, no data collection.

At build time, LibreGuard compiles 300,000+ domains from trusted, community-maintained filter lists into efficient static rules that ship with the extension.

**Features**

- Blocks 300K+ ad, tracking, malware, phishing, and scam domains
- Network-level blocking — faster and more private than script-based blockers
- Per-site allowlist to disable blocking on specific sites
- Toolbar badge shows blocked requests per page
- Custom cosmetic filter support for hiding page elements
- Filter list auto-updates (refresh any list to get latest rules)
- No account, no telemetry, no profile — nothing leaves your device

**Filter list sources**
- BlockList Project (ads, tracking, malware, phishing, fraud, scam)
- EasyList + EasyPrivacy
- Peter Lowe's Ad Server List

**Private by design**

LibreGuard doesn't collect, store, or transmit any personal data. All settings are stored locally in your browser. The extension never phones home. Source code is available under the GNU GPL v3.0.

**Permissions explained**
- `declarativeNetRequest` — block network requests at the browser level
- `storage` — save your settings locally
- `activeTab` / `tabs` — show blocked request counts per page
- `webNavigation` — track blocked counts across page loads
- `<all_urls>` — block ads on every site you visit

## Links

- Homepage: https://libreguard.org
- Source code: https://github.com/libreguard/libreguard
- Report issues: https://github.com/libreguard/libreguard/issues
- Privacy policy: https://libreguard.org/privacy
- License: GNU GPL v3.0
