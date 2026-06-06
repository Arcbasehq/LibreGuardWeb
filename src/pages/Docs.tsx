import { useState, useEffect, useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faSliders,
  faFilter,
  faTerminal,
  faQuestion,
  faShieldHalved,
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SEO from "../components/SEO";

type Topic = {
  id: string;
  title: string;
};

type Section = {
  icon: IconDefinition;
  title: string;
  topics: Topic[];
};

const sections: Section[] = [
  {
    icon: faRocket,
    title: "Getting started",
    topics: [
      { id: "installation", title: "Installation" },
      { id: "first-run", title: "First-run checklist" },
      { id: "verify", title: "Verifying it works" },
    ],
  },
  {
    icon: faSliders,
    title: "Configuration",
    topics: [
      { id: "settings", title: "Settings reference" },
      { id: "allowlist", title: "Allowlisting sites" },
      { id: "schedules", title: "Schedule blocking" },
    ],
  },
  {
    icon: faFilter,
    title: "Filter lists",
    topics: [
      { id: "subscribing", title: "Subscribing to lists" },
      { id: "syntax", title: "Rule syntax" },
      { id: "custom-rules", title: "Writing custom rules" },
    ],
  },
  {
    icon: faShieldHalved,
    title: "Per-site control",
    topics: [
      { id: "allowlist-site", title: "Allowlisting a site" },
      { id: "strength", title: "Blocking strength" },
      { id: "picker", title: "Element picker" },
    ],
  },
  {
    icon: faTerminal,
    title: "CLI & automation",
    topics: [
      { id: "commands", title: "Command reference" },
      { id: "config-files", title: "Config files" },
      { id: "update-lists", title: "Updating lists" },
    ],
  },
  {
    icon: faQuestion,
    title: "Troubleshooting",
    topics: [
      { id: "site-wont-load", title: "A site won't load" },
      { id: "false-positives", title: "Reporting false positives" },
      { id: "logs", title: "Logs & debugging" },
    ],
  },
];

const allTopics = sections.flatMap((s) => s.topics);
const defaultTopic = allTopics[0].id;

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-line bg-[#0e120f] p-4 text-sm leading-relaxed text-[#d4e0d3]">
      <code>{children}</code>
    </pre>
  );
}

function InlineCode({ children }: { children: string }) {
  return (
    <code className="rounded-md border border-line bg-[#0e120f] px-1.5 py-0.5 text-[0.85em] text-mint">
      {children}
    </code>
  );
}

function H3({ children }: { children: string }) {
  return (
    <h3 className="mt-8 mb-3 text-[1.1rem] font-semibold text-ink">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 leading-relaxed text-soft">{children}</p>;
}

function Ul({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mb-4 ml-5 list-disc space-y-1.5 text-soft">{children}</ul>
  );
}

function Ol({ children }: { children: React.ReactNode }) {
  return (
    <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-soft">{children}</ol>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-mint/20 bg-mint/[0.06] px-4 py-3 text-sm text-soft">
      {children}
    </div>
  );
}

const content: Record<string, { title: string; body: React.ReactNode }> = {
  installation: {
    title: "Installation",
    body: (
      <>
        <P>
          LibreGuard is available for Chromium-based browsers and Firefox.
          Choose your platform below.
        </P>

        <H3>Chrome / Brave / Edge</H3>
        <P>Install the extension from the Chrome Web Store:</P>
        <Ol>
          <li>Visit the LibreGuard listing on the Chrome Web Store.</li>
          <li>
            Click <strong>Add to Chrome</strong>.
          </li>
          <li>
            In the dialog, review the permissions and click{" "}
            <strong>Add extension</strong>.
          </li>
          <li>
            The LibreGuard icon appears in your toolbar. Click it to open the
            panel.
          </li>
        </Ol>
        <Note>
          Brave users: LibreGuard layers on top of Brave's built-in shields. You
          can use both simultaneously, or disable Brave Shields for sites where
          you want finer control via LibreGuard.
        </Note>

        <H3>Firefox</H3>
        <P>
          The Firefox add-on is currently in review. Once approved, install it
          from the Firefox Add-ons store:
        </P>
        <Ol>
          <li>Go to the LibreGuard listing on Firefox Add-ons.</li>
          <li>
            Click <strong>Add to Firefox</strong>.
          </li>
          <li>
            Review the permissions and click <strong>Add</strong>.
          </li>
        </Ol>

        <H3>Sideloading (advanced)</H3>
        <P>
          Download the <InlineCode>.crx</InlineCode> file from the download page
          and drag it into <InlineCode>chrome://extensions</InlineCode> with
          Developer mode enabled.
        </P>
        <Code>{`# Download the extension
curl -LO https://libreguard.org/libreguard.crx

# Open chrome://extensions, enable Developer mode,
# then drag the .crx file into the window.`}</Code>
      </>
    ),
  },

  "first-run": {
    title: "First-run checklist",
    body: (
      <>
        <P>
          After installation, run through these steps to make sure everything is
          set up correctly.
        </P>

        <Ul>
          <li>
            <strong>Pin the extension</strong> — click the puzzle icon in Chrome
            and pin LibreGuard so the icon stays visible.
          </li>
          <li>
            <strong>Open the panel</strong> — click the LibreGuard icon to see
            the dashboard. It shows blocked counts and quick toggles.
          </li>
          <li>
            <strong>Choose your filter lists</strong> — by default a core set is
            enabled. Add more from the Filter Lists tab.
          </li>
          <li>
            <strong>Visit a test page</strong> — go to a site with ads (e.g., a
            news site). Ads should be missing. The icon badge updates in real
            time.
          </li>
          <li>
            <strong>Adjust per-site settings</strong> — if a site breaks, click
            the icon and toggle blocking down or allowlist the site.
          </li>
        </Ul>

        <Note>
          LibreGuard works immediately — no restart or browser reload needed. If
          you don't see changes, try refreshing the page.
        </Note>
      </>
    ),
  },

  verify: {
    title: "Verifying it works",
    body: (
      <>
        <P>Confirm LibreGuard is actively filtering traffic:</P>

        <Ul>
          <li>
            <strong>Icon badge</strong> — the toolbar icon shows a real-time
            count of blocked requests on the current page. It updates as new
            pages load.
          </li>
          <li>
            <strong>Panel stats</strong> — click the icon to open the panel. The
            "Blocked" section shows totals for the current page and session.
          </li>
          <li>
            <strong>Visual test</strong> — visit a site known for ads (e.g.,
            cnn.com, youtube.com). Banners, pre-rolls, and in-page promos should
            be absent.
          </li>
          <li>
            <strong>Element picker</strong> — right-click any element on a page
            and select "Block element with LibreGuard" to verify the picker
            fires.
          </li>
        </Ul>

        <H3>Using browser dev tools</H3>
        <P>
          Open DevTools (<InlineCode>F12</InlineCode>) and check the Network
          tab. Requests to known ad/tracker domains (e.g.,{" "}
          <InlineCode>doubleclick.net</InlineCode>,{" "}
          <InlineCode>google-analytics.com</InlineCode>) should not appear.
        </P>
        <Code>{`// Example domains that should be blocked
doubleclick.net
googlesyndication.com
google-analytics.com
facebook.net/tr`}</Code>
      </>
    ),
  },

  settings: {
    title: "Settings reference",
    body: (
      <>
        <P>
          LibreGuard's settings panel gives you fine-grained control over
          blocking behavior. Here's what every option does.
        </P>

        <H3>General</H3>
        <Ul>
          <li>
            <strong>Enable blocking</strong> — master toggle. Disabling this
            pauses all filtering without removing the extension.
          </li>
          <li>
            <strong>Show badge count</strong> — show or hide the blocked-request
            count on the toolbar icon.
          </li>
          <li>
            <strong>Auto-update lists</strong> — filter lists refresh
            automatically every 24 hours when enabled.
          </li>
        </Ul>

        <H3>Blocking levels</H3>
        <P>Each site can be set to one of four blocking levels:</P>
        <Ul>
          <li>
            <strong>Full</strong> — block ads, trackers, and malicious domains.
            Default for new sites.
          </li>
          <li>
            <strong>Balanced</strong> — block trackers and malware only. Ads may
            still appear.
          </li>
          <li>
            <strong>Minimal</strong> — block only known malware domains. Ads and
            most trackers pass through.
          </li>
          <li>
            <strong>Disabled</strong> — no filtering on this site.
          </li>
        </Ul>

        <H3>Advanced</H3>
        <Ul>
          <li>
            <strong>Custom rules</strong> — raw editor for adding adblock-format
            rules manually.
          </li>
          <li>
            <strong>Import / Export</strong> — download your entire config as
            JSON or restore from a backup.
          </li>
          <li>
            <strong>Reset to defaults</strong> — clears all custom rules and
            per-site overrides.
          </li>
        </Ul>
      </>
    ),
  },

  allowlist: {
    title: "Allowlisting sites",
    body: (
      <>
        <P>If LibreGuard breaks a site, you can allowlist it in two clicks:</P>

        <Ol>
          <li>Click the LibreGuard icon in the toolbar.</li>
          <li>
            Toggle the <strong>Blocking</strong> switch to off.
          </li>
          <li>
            Optionally choose a timeout (e.g., 10 seconds, 1 minute,
            permanently).
          </li>
        </Ol>

        <P>
          To manage allowlisted sites, open the panel and go to{" "}
          <strong>Per-site</strong>. You'll see a list of all sites you've
          customized. From there you can remove them or adjust the blocking
          level.
        </P>

        <Note>
          Allowlisting is per-site, not per-page. Once you allowlist{" "}
          <InlineCode>example.com</InlineCode>, all pages on that domain inherit
          the setting.
        </Note>
      </>
    ),
  },

  schedules: {
    title: "Schedule blocking",
    body: (
      <>
        <P>
          Schedule blocking lets you automatically disable filtering during
          specific hours — useful for sites that require ad views for content
          access.
        </P>

        <H3>Creating a schedule</H3>
        <Ol>
          <li>
            Open the panel and go to <strong>Settings &gt; Schedules</strong>.
          </li>
          <li>
            Click <strong>Add schedule</strong>.
          </li>
          <li>Pick the site, time range, and days of the week.</li>
          <li>
            Click <strong>Save</strong>. The schedule activates immediately.
          </li>
        </Ol>

        <H3>Use cases</H3>
        <Ul>
          <li>
            <strong>News sites</strong> — disable blocking for 60 seconds while
            the page loads, then re-enable.
          </li>
          <li>
            <strong>Streaming</strong> — some streamers require ads to play.
            Schedule around your watch time.
          </li>
          <li>
            <strong>Work hours</strong> — disable blocking on work-related sites
            during business hours.
          </li>
        </Ul>
      </>
    ),
  },

  subscribing: {
    title: "Subscribing to lists",
    body: (
      <>
        <P>
          LibreGuard ships with a curated set of filter lists. You can subscribe
          to more at any time.
        </P>

        <H3>Built-in lists</H3>
        <Ul>
          <li>
            <strong>Base</strong> — core ad and tracker blocking. Always
            enabled.
          </li>
          <li>
            <strong>Malware</strong> — known phishing, scam, and malware
            domains.
          </li>
          <li>
            <strong>Annoyances</strong> — cookie banners, newsletter popups,
            social widgets.
          </li>
          <li>
            <strong>Privacy</strong> — analytics, fingerprinting, and tracking
            scripts.
          </li>
        </Ul>

        <H3>Subscribing to a third-party list</H3>
        <Ol>
          <li>Find a filter list URL (e.g., from filterlists.com).</li>
          <li>
            Open LibreGuard panel → <strong>Filter Lists</strong> →{" "}
            <strong>Add</strong>.
          </li>
          <li>
            Paste the URL and click <strong>Subscribe</strong>.
          </li>
          <li>The list downloads and activates within seconds.</li>
        </Ol>

        <Code>{`# Example: subscribe via URL
https://someone.github.io/filter-lists/blocklist.txt

# LibreGuard supports AdBlock Plus syntax lists
# and uBlock Origin compatibility mode.`}</Code>
      </>
    ),
  },

  syntax: {
    title: "Rule syntax",
    body: (
      <>
        <P>
          LibreGuard uses the standard AdBlock filter syntax. Here's a quick
          reference.
        </P>

        <H3>Basic rules</H3>
        <Code>{`// Block a specific domain
||example.com^

// Block a specific URL path
||example.com/ads/*

// Block by file extension
||example.com$image

// Block all scripts from a domain
||example.com$script`}</Code>

        <H3>Exception rules</H3>
        <Code>{`// Allow a specific subdomain
@@||cdn.example.com^

// Allow a specific script
@@||example.com/analytics.js$script`}</Code>

        <H3>Cosmetic rules</H3>
        <Code>{`// Hide a specific element
example.com##.ad-banner

// Hide an element by ID
example.com###sidebar-ad

// Hide generic elements
example.com##div[class*="ad-"]`}</Code>

        <Note>
          Rules are case-insensitive by default. Use{" "}
          <InlineCode>$match-case</InlineCode> to make a rule case-sensitive.
        </Note>
      </>
    ),
  },

  "custom-rules": {
    title: "Writing custom rules",
    body: (
      <>
        <P>
          You can write your own rules to block content that the built-in lists
          miss.
        </P>

        <H3>Where to write rules</H3>
        <P>
          Open the panel → <strong>Settings</strong> →{" "}
          <strong>Custom rules</strong>. Rules are saved automatically as you
          type.
        </P>

        <H3>Finding elements to block</H3>
        <P>
          Use the element picker: right-click any element on a page and select{" "}
          <strong>Block element with LibreGuard</strong>. This generates a
          cosmetic rule and adds it to your custom list.
        </P>

        <H3>Rule testing</H3>
        <P>
          After adding a rule, reload the page to see the effect. If the element
          is still visible, inspect the page source and refine the selector:
        </P>
        <Code>{`// Too broad — may hide more than intended
example.com##div

// Better — target a specific class
example.com##.sponsored-content

// Best — combine selectors
example.com##div[data-ad-id]:not(.legitimate)`}</Code>

        <Note>
          Custom rules take priority over built-in lists. Use{" "}
          <InlineCode>@@</InlineCode> exception rules to override a list rule
          without disabling the whole list.
        </Note>
      </>
    ),
  },

  "allowlist-site": {
    title: "Allowlisting a site",
    body: (
      <>
        <P>
          When LibreGuard breaks a site, allowlisting it disables filtering
          entirely for that domain.
        </P>

        <H3>Quick allowlist</H3>
        <Ol>
          <li>Click the LibreGuard icon.</li>
          <li>
            Set the blocking toggle to <strong>Off</strong>.
          </li>
          <li>
            Choose <strong>Permanently</strong> or a timed duration.
          </li>
        </Ol>

        <H3>Managing allowlisted sites</H3>
        <P>
          Go to <strong>Per-site</strong> in the panel to see all customized
          sites. From there you can:
        </P>
        <Ul>
          <li>
            Remove a site from the allowlist (reverts to default blocking).
          </li>
          <li>Change the blocking level instead of fully allowlisting.</li>
          <li>Clear all per-site overrides at once.</li>
        </Ul>

        <Note>
          Allowlisting only applies to the exact domain. Subdomains like{" "}
          <InlineCode>blog.example.com</InlineCode> are not affected unless you
          allowlist <InlineCode>*.example.com</InlineCode>.
        </Note>
      </>
    ),
  },

  strength: {
    title: "Blocking strength",
    body: (
      <>
        <P>
          Each site has a blocking strength level that controls how aggressively
          LibreGuard filters requests.
        </P>

        <H3>Levels</H3>
        <Ul>
          <li>
            <strong>Full</strong> — blocks ads, trackers, analytics, malware,
            and annoyances. Best for most sites.
          </li>
          <li>
            <strong>Balanced</strong> — blocks trackers and malware, allows
            non-intrusive ads. Useful for sites that break under full blocking.
          </li>
          <li>
            <strong>Minimal</strong> — blocks only known malware domains. Lets
            everything else through.
          </li>
          <li>
            <strong>Disabled</strong> — no filtering at all. Equivalent to
            allowlisting.
          </li>
        </Ul>

        <H3>Changing strength</H3>
        <P>
          Click the LibreGuard icon → click the site name at the top → select a
          level from the dropdown. Changes apply immediately without a page
          reload.
        </P>
      </>
    ),
  },

  picker: {
    title: "Element picker",
    body: (
      <>
        <P>
          The element picker lets you block any visible element on a page by
          clicking it.
        </P>

        <H3>Using the picker</H3>
        <Ol>
          <li>Right-click the element you want to block.</li>
          <li>
            Select <strong>Block element with LibreGuard</strong>.
          </li>
          <li>Highlights appear around the element. Click it to confirm.</li>
          <li>A cosmetic rule is generated and added to your custom rules.</li>
        </Ol>

        <H3>Tips</H3>
        <Ul>
          <li>
            The picker highlights elements as you hover. Click the right one.
          </li>
          <li>
            Use the <strong>Preview</strong> button to see the page without the
            element before committing.
          </li>
          <li>
            The rule is saved locally and applies on every visit to that site.
          </li>
        </Ul>
      </>
    ),
  },

  commands: {
    title: "Command reference",
    body: (
      <>
        <P>
          LibreGuard includes a command-line tool for scripting and automation.
          Run <InlineCode>libreguard --help</InlineCode> to see all options.
        </P>

        <Code>{`# Basic usage
libreguard --help
libreguard --version

# Manage filter lists
libreguard lists update
libreguard lists add --url <url>
libreguard lists remove <name>

# Configuration
libreguard config show
libreguard config set <key> <value>
libreguard config export > backup.json
libreguard config import < backup.json

# Status
libreguard status
libreguard stats --site example.com`}</Code>

        <H3>Exit codes</H3>
        <Ul>
          <li>
            <InlineCode>0</InlineCode> — success
          </li>
          <li>
            <InlineCode>1</InlineCode> — general error
          </li>
          <li>
            <InlineCode>2</InlineCode> — invalid arguments
          </li>
          <li>
            <InlineCode>3</InlineCode> — permission denied
          </li>
        </Ul>
      </>
    ),
  },

  "config-files": {
    title: "Config files",
    body: (
      <>
        <P>
          LibreGuard stores configuration in a JSON file. You can edit it
          directly or use the CLI.
        </P>

        <H3>Location</H3>
        <Code>{`# Linux
~/.config/libreguard/config.json

# macOS
~/Library/Application Support/LibreGuard/config.json

# Windows
%APPDATA%\\LibreGuard\\config.json`}</Code>

        <H3>Example config</H3>
        <Code>{`{
  "blocking": {
    "defaultLevel": "full",
    "showBadge": true,
    "autoUpdate": true
  },
  "lists": [
    "base",
    "malware",
    "annoyances",
    "privacy"
  ],
  "sites": {
    "example.com": "balanced",
    "ads.example.com": "disabled"
  },
  "customRules": [
    "||spam-tracker.com^",
    "example.com##.promo-bar"
  ]
}`}</Code>

        <Note>
          Editing the config file while LibreGuard is running is safe — changes
          are picked up on the next event cycle.
        </Note>
      </>
    ),
  },

  "update-lists": {
    title: "Updating lists",
    body: (
      <>
        <P>
          Filter lists update frequently as new ads and trackers appear. Keep
          yours current.
        </P>

        <H3>Automatic updates</H3>
        <P>
          With <strong>Auto-update</strong> enabled (default), LibreGuard checks
          for list updates every 24 hours. No action needed.
        </P>

        <H3>Manual update</H3>
        <P>Run this command to force an update immediately:</P>
        <Code>{`libreguard lists update`}</Code>
        <P>
          Or click <strong>Update now</strong> in the panel under Filter Lists.
        </P>

        <H3>Checking list status</H3>
        <Code>{`# Show all lists and their last update time
libreguard lists status

# Example output
  base          ✓  2026-06-05 14:30  42,301 rules
  malware       ✓  2026-06-05 14:30  8,102 rules
  annoyances    ✓  2026-06-05 14:30  3,215 rules
  custom-list   ✗  never subscribed`}</Code>
      </>
    ),
  },

  "site-wont-load": {
    title: "A site won't load",
    body: (
      <>
        <P>If a site breaks or won't load, try these steps in order:</P>

        <Ol>
          <li>
            <strong>Toggle blocking off</strong> — click the icon and turn
            blocking off for the site. Reload.
          </li>
          <li>
            <strong>Check the logs</strong> — open the panel and review the
            request log. Look for incorrectly blocked resources.
          </li>
          <li>
            <strong>Disable custom rules</strong> — temporarily disable your
            custom rules in Settings to see if one is too aggressive.
          </li>
          <li>
            <strong>Pause the extension</strong> — use the master toggle in
            Settings to disable all filtering. If the site loads, the issue is
            rule-related.
          </li>
          <li>
            <strong>Try another browser</strong> — isolate whether the issue is
            browser-specific.
          </li>
        </Ol>

        <P>
          If the site loads when LibreGuard is disabled but you can't find the
          culprit rule, report it so the list maintainers can fix it.
        </P>
      </>
    ),
  },

  "false-positives": {
    title: "Reporting false positives",
    body: (
      <>
        <P>
          A false positive is when LibreGuard blocks something it shouldn't —
          like a legitimate script or image.
        </P>

        <H3>How to report</H3>
        <Ol>
          <li>
            Identify the blocked URL. Check the panel's request log to see what
            was blocked.
          </li>
          <li>Copy the full URL of the blocked resource.</li>
          <li>
            Open an issue on the filter list repository or LibreGuard's GitHub.
          </li>
          <li>
            Include the site URL, the blocked resource URL, and a screenshot if
            possible.
          </li>
        </Ol>

        <H3>Quick fix while you wait</H3>
        <P>Add an exception rule to your custom rules:</P>
        <Code>{`@@||legitimate-cdn.com/script.js$script`}</Code>
        <P>
          This overrides the built-in list for that specific resource without
          disabling protection for the rest of the site.
        </P>
      </>
    ),
  },

  logs: {
    title: "Logs & debugging",
    body: (
      <>
        <P>
          LibreGuard keeps detailed logs of all filtered requests. Use them to
          debug issues or audit what's being blocked.
        </P>

        <H3>Accessing logs</H3>
        <P>
          Open the panel → <strong>Logs</strong>. You'll see a real-time feed of
          blocked requests with these columns:
        </P>
        <Ul>
          <li>
            <strong>Time</strong> — when the request was intercepted.
          </li>
          <li>
            <strong>Type</strong> — script, image, stylesheet, fetch, etc.
          </li>
          <li>
            <strong>Domain</strong> — the blocked domain.
          </li>
          <li>
            <strong>Rule</strong> — which rule triggered the block.
          </li>
          <li>
            <strong>Source</strong> — the page that initiated the request.
          </li>
        </Ul>

        <H3>Exporting logs</H3>
        <Code>{`# Export logs to a file
libreguard logs export > libreguard-export.json

# Filter by domain
libreguard logs --domain doubleclick.net

# Show only errors
libreguard logs --level error`}</Code>

        <Note>
          Logs are ephemeral and stored in memory. Export them if you need to
          share them for debugging.
        </Note>
      </>
    ),
  },
};

export default function Docs() {
  const searchId = useId();
  const [active, setActive] = useState(defaultTopic);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onHash = () => {
      const id = location.hash.replace("#", "");
      if (id && content[id]) setActive(id);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const filtered = search
    ? allTopics.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  const topic = content[active] ?? content[defaultTopic];

  return (
    <>
      <SEO
        title="Documentation"
        description="Complete LibreGuard documentation: installation, configuration, filter lists, custom rules, CLI, and troubleshooting."
        path="/docs"
      />
      <div className="flex">
        {/* Sidebar toggle (mobile) */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-mint text-mint-ink shadow-lg md:hidden"
        >
          <FontAwesomeIcon
            icon={sidebarOpen ? faXmark : faBars}
            className="text-lg"
          />
        </button>

        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-canvas/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 z-40 h-full w-[280px] shrink-0 overflow-y-auto border-r border-line bg-panel pt-[75px] transition-transform duration-200 md:sticky md:top-[75px] md:block md:h-[calc(100vh-75px)] md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-mute"
              />
              <input
                id={searchId}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search docs…"
                className="w-full rounded-lg border border-line-strong bg-card py-2 pl-8 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-mute/50 focus:border-mint/50"
              />
            </div>
          </div>

          <nav className="px-3 pb-8">
            {(filtered ?? allTopics).length === 0 && (
              <p className="px-2 text-sm text-mute">No results found.</p>
            )}
            {filtered
              ? filtered.map((t) => (
                  <a
                    key={t.id}
                    href={`#${t.id}`}
                    onClick={() => {
                      setActive(t.id);
                      setSearch("");
                      setSidebarOpen(false);
                    }}
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      active === t.id
                        ? "bg-mint/10 text-mint"
                        : "text-soft hover:bg-surface hover:text-ink"
                    }`}
                  >
                    {t.title}
                  </a>
                ))
              : sections.map((s) => (
                  <div key={s.title} className="mb-5">
                    <div className="mb-1 flex items-center gap-2 px-3 py-1">
                      <FontAwesomeIcon
                        icon={s.icon}
                        className="w-3.5 text-xs text-mute"
                      />
                      <span className="text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-mute">
                        {s.title}
                      </span>
                    </div>
                    {s.topics.map((t) => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        onClick={() => {
                          setActive(t.id);
                          setSidebarOpen(false);
                        }}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                          active === t.id
                            ? "bg-mint/10 text-mint"
                            : "text-soft hover:bg-surface hover:text-ink"
                        }`}
                      >
                        {t.title}
                      </a>
                    ))}
                  </div>
                ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0 flex-1 px-8 md:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl py-12 pb-24">
          <h1 className="display text-[2rem] text-ink">{topic.title}</h1>
          <div className="mt-6">{topic.body}</div>

          {/* Prev / Next */}
          <div className="mt-16 flex items-center justify-between border-t border-line pt-8">
            {(() => {
              const idx = allTopics.findIndex((t) => t.id === active);
              const prev = allTopics[idx - 1];
              const next = allTopics[idx + 1];
              return (
                <>
                  <div>
                    {prev && (
                      <a
                        href={`#${prev.id}`}
                        className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-mint"
                      >
                        <FontAwesomeIcon
                          icon={faRocket}
                          className="rotate-180 text-[0.6rem] text-mute"
                        />
                        {prev.title}
                      </a>
                    )}
                  </div>
                  <div className="text-right">
                    {next && (
                      <a
                        href={`#${next.id}`}
                        className="inline-flex items-center gap-2 text-sm text-soft transition-colors hover:text-mint"
                      >
                        {next.title}
                        <FontAwesomeIcon
                          icon={faRocket}
                          className="text-[0.6rem] text-mute"
                        />
                      </a>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
          </div>
        </main>
      </div>
    </>
  );
}
