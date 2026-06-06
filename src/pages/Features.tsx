import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faShield,
  faBolt,
  faLock,
  faCode,
  faEyeSlash,
  faGlobe,
  faFilter,
  faFeather,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import Button from "../components/Button";

const groups: {
  kicker: string;
  title: string;
  items: { icon: IconDefinition; title: string; desc: string }[];
}[] = [
  {
    kicker: "Blocking",
    title: "What gets stopped",
    items: [
      {
        icon: faShield,
        title: "Display & video ads",
        desc: "Banners, pre-rolls, interstitials, and in-feed promos removed across sites, apps, and streaming platforms.",
      },
      {
        icon: faEyeSlash,
        title: "Trackers & beacons",
        desc: "Analytics pixels, fingerprinting scripts, and silent background calls that build a profile of you.",
      },
      {
        icon: faGlobe,
        title: "Malicious domains",
        desc: "Known phishing, scam, and malware hosts cut off before a single byte loads.",
      },
    ],
  },
  {
    kicker: "Control",
    title: "Yours to shape",
    items: [
      {
        icon: faFilter,
        title: "Custom rule sets",
        desc: "Subscribe to community lists or write your own rules. Allowlist anything, anytime.",
      },
      {
        icon: faSliders,
        title: "Per-site control",
        desc: "Dial blocking up or down for any individual site, or allowlist it with one click from the toolbar.",
      },
      {
        icon: faLock,
        title: "Zero telemetry",
        desc: "No account, no phone-home, no profile. Settings live on your device, full stop.",
      },
    ],
  },
  {
    kicker: "Built right",
    title: "Engineering you can trust",
    items: [
      {
        icon: faFeather,
        title: "Featherweight",
        desc: "Under 5ms added per request and a tiny memory footprint, even on old hardware.",
      },
      {
        icon: faBolt,
        title: "Fast pages",
        desc: "Killing ad payloads means less to download — pages load lighter and quicker.",
      },
      {
        icon: faCode,
        title: "Fully open source",
        desc: "Every line auditable under the GNU GPL v3.0. Read it, fork it, ship a patch.",
      },
    ],
  },
];

export default function Features() {
  return (
    <>
      <SEO
        title="Features"
        description="Everything LibreGuard blocks: display and video ads, trackers, beacons, malicious domains, phishing sites, and unwanted scripts — all with zero telemetry and a featherweight footprint."
        path="/features"
      />
      <PageHero
        kicker="Features"
        title={
          <>
            Everything LibreGuard <em className="not-italic text-mint">blocks</em>{" "}
            — and everything it doesn't touch.
          </>
        }
        lede="A complete picture of what runs under the hood: aggressive on ads and trackers, deliberately hands-off with your data."
      >
        <Button as={Link} to="/download" variant="primary" className="group">
          Get LibreGuard
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform duration-200 group-hover:translate-x-1"
          />
        </Button>
      </PageHero>

      {groups.map((g, gi) => (
        <section
          key={g.title}
          className={
            gi % 2 === 1
              ? "border-y border-line bg-panel"
              : ""
          }
        >
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <p className="kicker">{g.kicker}</p>
            <h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
              {g.title}
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((it) => (
                <article key={it.title} className="card card--hover flex flex-col p-7">
                  <span className="feature__icon">
                    <FontAwesomeIcon icon={it.icon} />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-soft">
                    {it.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-24 text-center sm:px-8">
        <p className="kicker">Convinced?</p>
        <h2 className="display mx-auto mt-5 max-w-xl text-[2.2rem] sm:text-[2.9rem]">
          Set it up once. Forget it forever.
        </h2>
        <div className="mt-9 flex justify-center gap-3">
          <Button as={Link} to="/download" variant="primary">
            Download free
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Button>
          <Button as={Link} to="/docs" variant="secondary">
            Read the docs
          </Button>
        </div>
      </section>
    </>
  );
}
