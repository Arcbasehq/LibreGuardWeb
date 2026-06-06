import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/internet.png";
import chromeLogo from "../assets/chrome.png";
import firefoxLogo from "../assets/firefox.png";
import edgeLogo from "../assets/edge.png";
import braveLogo from "../assets/brave.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookOpen,
  faShield,
  faBolt,
  faLock,
  faCode,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Button from "../components/Button";
import SEO from "../components/SEO";

const platforms = ["Chrome", "Firefox", "Edge", "Brave"] as const;
type Platform = (typeof platforms)[number];

const platformLogo: Record<Platform, string> = {
  Chrome: chromeLogo,
  Firefox: firefoxLogo,
  Edge: edgeLogo,
  Brave: braveLogo,
};

const released: Record<Platform, boolean> = {
  Chrome: true,
  Brave: true,
  Firefox: false,
  Edge: true,
};

const platformCopy: Record<Platform, string> = {
  Chrome:
    "A featherweight extension that intercepts ads, trackers, and malicious scripts before they ever run — install it in two clicks from the Chrome Web Store.",
  Firefox:
    "A signed add-on for Firefox desktop and Android is in review — same filtering, same speed, fully on-device. Coming soon.",
  Edge: "Sideload the same CRX via edge://extensions or install from the Edge Add-ons store — no difference in speed or coverage.",
  Brave:
    "Layers on top of Brave's built-in shields for finer control and custom rule sets, on any Chromium browser.",
};

const features: { icon: IconDefinition; title: string; desc: string }[] = [
  {
    icon: faShield,
    title: "Stop unwanted ads at the source",
    desc: "Filter traffic before it reaches your devices and remove advertising from websites, apps, games, and streaming platforms using customizable rule sets.",
  },
  {
    icon: faBolt,
    title: "Reduce tracking across the web",
    desc: "Block analytics systems, trackers, and other background scripts that collect behavioral data while you browse, helping keep your activity more private.",
  },
  {
    icon: faLock,
    title: "Control access to unsafe content",
    desc: "LibreGuard never phones home. There is no account, no telemetry, no profile of you anywhere.",
  },
  {
    icon: faCode,
    title: "Open, end to end",
    desc: "Every line is auditable. Read it, fork it, or ship a patch — there is no hidden behaviour to find.",
  },
];

export default function Home() {
  const [platform, setPlatform] = useState<Platform>("Chrome");

  return (
    <>
      <SEO
        title="Privacy-first ad blocker"
        description="LibreGuard blocks ads, trackers, and malware at the network level across 330K+ domains. No telemetry, no account, no data ever leaves your device. Free and open source."
        path="/"
        ogType="website"
      />
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:px-8 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="kicker reveal d1">Privacy, quietly enforced</p>

            <h1 className="display reveal d2 mt-6 text-[2.9rem] sm:text-[3.6rem] lg:text-[4.4rem]">
              Browse the web
              <br />
              like nobody's <em>watching</em>.
            </h1>

            <p className="reveal d3 mt-7 max-w-lg text-[1.08rem] leading-relaxed text-soft">
              LibreGuard strips out ads, trackers, and malicious requests before
              they reach you. Fast, private, open source — and entirely yours.
            </p>

            <div className="reveal d4 mt-9 flex flex-wrap items-center gap-3">
              <Button
                as={Link}
                to="/download"
                variant="primary"
                className="group"
              >
                Get started
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>
              <Button
                as={Link}
                to="/docs"
                variant="secondary"
                className="group"
              >
                <FontAwesomeIcon
                  icon={faBookOpen}
                  className="text-xs text-mint transition-transform duration-200 group-hover:-translate-y-px"
                />
                Read the docs
              </Button>
            </div>

            <div className="reveal d5 mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
              {["Free forever", "No account", "No telemetry"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-mint/80"
                  />
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal d3 relative">
            <div className="grid aspect-[5/4] place-items-center p-10">
              <img
                src={heroImg}
                alt="LibreGuard shielding your connection"
                className="w-70 drop-shadow-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats strip ─────────────────────────────────────── */}
      <section className="border-y border-line bg-panel">
        <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-line px-6 sm:px-8">
          {[
            { val: "330k+", label: "Domains blocked, updated daily" },
            { val: "<5ms", label: "Latency added per request" },
            { val: "100%", label: "Open source, GNU GPL v3.0 licensed" },
          ].map(({ val, label }) => (
            <div key={label} className="px-4 py-12 text-center sm:px-8">
              <div className="display text-4xl text-ink sm:text-5xl">{val}</div>
              <div className="mt-2 text-sm text-mute">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="max-w-2xl">
          <p className="kicker">What you get</p>
          <h2 className="display mt-4 text-[2.2rem] sm:text-[2.7rem]">
            Protection that stays out of the way.
          </h2>
          <p className="mt-4 text-[1.05rem] text-soft">
            No dashboards to babysit, no rules to write. LibreGuard works the
            moment it's installed.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((f) => (
            <article key={f.title} className="feature flex flex-col p-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="feature__icon">
                  <FontAwesomeIcon icon={f.icon} />
                </span>
                <h3 className="text-3xl font-semibold text-ink">{f.title}</h3>
              </div>
              <p className="text-md leading-relaxed text-soft">{f.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Button as={Link} to="/features" variant="ghost" className="group">
            See everything it blocks
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </section>

      {/* ── How it works (platform switch) ──────────────────── */}
      <section id="how" className="border-y border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <p className="kicker">Every browser you use</p>
              <h2 className="display mt-4 text-[2.2rem] sm:text-[2.7rem]">
                One extension, every browser.
              </h2>
            </div>
            <div className="seg">
              {platforms.map((p) => (
                <button
                  key={p}
                  data-active={platform === p}
                  onClick={() => setPlatform(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-8 sm:flex-row sm:items-center">
            <img
              key={platform}
              src={platformLogo[platform]}
              alt={`${platform} logo`}
              className={`reveal h-20 w-20 shrink-0 sm:h-24 sm:w-24 ${
                released[platform] ? "" : "opacity-40"
              }`}
            />
            <div>
              {!released[platform] && (
                <span className="badge mb-3">Coming soon</span>
              )}
              <p className="max-w-xl text-[1.25rem] leading-relaxed text-soft">
                {platformCopy[platform]}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Button as={Link} to="/download" variant="secondary">
              {released[platform] ? `Set up on ${platform}` : "See all browsers"}
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-28 text-center sm:px-8">
        <p className="kicker">Take back the page</p>
        <h2 className="display mx-auto mt-5 max-w-2xl text-[2.6rem] sm:text-[3.4rem]">
          Quiet the web in
          <br className="hidden sm:block" /> under a minute.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-soft">
          No account, no tracking, no catch. Install it and forget it.
        </p>
        <div className="mt-9 flex justify-center gap-3">
          <Button as={Link} to="/download" variant="primary">
            Download free
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Button>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Button variant="secondary">View on GitHub</Button>
          </a>
        </div>
      </section>
    </>
  );
}
