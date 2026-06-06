import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faChrome,
  faFirefoxBrowser,
  faEdge,
  faBrave,
} from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import PageHero from "../components/PageHero";
import Button from "../components/Button";

const builds: {
  icon: IconDefinition;
  name: string;
  meta: string;
  note: string;
  cta: string;
  primary?: boolean;
  released?: boolean;
  url?: string;
}[] = [
  {
    icon: faChrome,
    name: "Chrome",
    meta: "v0.1.0 · Manifest V3",
    note: "Also works on any Chromium browser like Vivaldi and Opera.",
    cta: "Add to Chrome",
    primary: true,
    released: true,
    url: "/libreguard.crx",
  },
  {
    icon: faBrave,
    name: "Brave",
    meta: "v0.1.0 · Manifest V3",
    note: "Pairs with Brave's shields for finer, per-site control.",
    cta: "Add to Brave",
    released: true,
    url: "/libreguard.crx",
  },
  {
    icon: faFirefoxBrowser,
    name: "Firefox",
    meta: "v0.1.0 · signed add-on",
    note: "Firefox desktop and Firefox for Android. Download the XPI and install via about:addons.",
    cta: "Download XPI",
    released: true,
    url: "/libreguard.xpi",
  },
  {
    icon: faEdge,
    name: "Edge",
    meta: "v0.1.0 · Manifest V3",
    note: "Also works on Edge and any Chromium browser — same CRX, sideload via edge://extensions.",
    cta: "Add to Edge",
    released: true,
    url: "/libreguard.crx",
  },
];

export default function Download() {
  return (
    <>
      <PageHero
        kicker="Download"
        title={
          <>
            Pick your platform. <em>Done in a minute.</em>
          </>
        }
        lede="Free and open source — no tiers, no upsell, no account. Live on Chrome and Brave today, with more browsers on the way."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {builds.map((b) => (
            <article
              key={b.name}
              className={`card flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between ${
                b.released ? "card--hover" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`feature__icon h-12 w-12 text-2xl ${
                    b.released ? "" : "opacity-40"
                  }`}
                >
                  <FontAwesomeIcon icon={b.icon} />
                </span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-semibold text-ink">{b.name}</h3>
                    {!b.released && <span className="badge">Coming soon</span>}
                  </div>
                  <p className="mt-0.5 text-sm text-mute">{b.meta}</p>
                  <p className="mt-1 text-sm text-soft">{b.note}</p>
                </div>
              </div>
              {b.released ? (
                <a href={b.url!} download className="no-underline">
                  <Button
                    variant={b.primary ? "primary" : "secondary"}
                    className="group shrink-0 whitespace-nowrap"
                  >
                    {b.cta}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-xs transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Button>
                </a>
              ) : (
                <Button
                  variant="secondary"
                  disabled
                  className="shrink-0 cursor-not-allowed opacity-50"
                >
                  {b.cta}
                </Button>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mute">
          {["No account", "No telemetry", "GNU GPL v3.0"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="text-mint/80" />
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="kicker">Building from source?</p>
              <h2 className="display mt-3 text-[1.8rem]">
                Clone, build, and ship your own.
              </h2>
              <p className="mt-3 text-soft">
                Every release is reproducible. Grab the source, verify the
                checksums, and run it yourself.
              </p>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="secondary">View on GitHub</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center sm:px-8">
        <p className="text-soft">
          Not sure where to start?{" "}
          <Link to="/docs" className="tlink">
            Read the setup guide
          </Link>
          .
        </p>
      </section>
    </>
  );
}
