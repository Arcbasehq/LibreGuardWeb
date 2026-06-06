import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faRocket,
  faSliders,
  faFilter,
  faTerminal,
  faQuestion,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const sections: {
  icon: IconDefinition;
  title: string;
  desc: string;
  links: string[];
}[] = [
  {
    icon: faRocket,
    title: "Getting started",
    desc: "Install LibreGuard and confirm it's filtering in under five minutes.",
    links: ["Installation", "First-run checklist", "Verifying it works"],
  },
  {
    icon: faSliders,
    title: "Configuration",
    desc: "Tune blocking strength, schedules, and per-site behaviour.",
    links: ["Settings reference", "Allowlisting sites", "Schedules"],
  },
  {
    icon: faFilter,
    title: "Filter lists",
    desc: "Subscribe to community lists or author your own rules.",
    links: ["Subscribing", "Rule syntax", "Writing custom rules"],
  },
  {
    icon: faShieldHalved,
    title: "Per-site control",
    desc: "Tune blocking strength and exceptions for individual sites.",
    links: ["Allowlisting a site", "Blocking strength", "Element picker"],
  },
  {
    icon: faTerminal,
    title: "CLI & automation",
    desc: "Drive LibreGuard from scripts and CI.",
    links: ["Command reference", "Config files", "Updating lists"],
  },
  {
    icon: faQuestion,
    title: "Troubleshooting",
    desc: "Fix the handful of things that occasionally break.",
    links: ["A site won't load", "Reporting false positives", "Logs"],
  },
];

export default function Docs() {
  return (
    <>
      <SEO
        title="Documentation"
        description="Complete LibreGuard documentation: installation guides, configuration, filter list subscriptions, custom rule syntax, per-site allowlisting, troubleshooting, and CLI automation."
        path="/docs"
      />
      <PageHero
        kicker="Documentation"
        title={
          <>
            Set it up, tune it, <em>master it</em>.
          </>
        }
        lede="Practical guides for every platform, from a two-minute install to writing your own filter rules."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <article key={s.title} className="card card--hover flex flex-col p-7">
              <span className="feature__icon">
                <FontAwesomeIcon icon={s.icon} />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{s.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-soft">
                {s.desc}
              </p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                {s.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-soft transition-colors hover:text-mint"
                    >
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-[0.6rem] text-mute"
                      />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:px-8">
          <h2 className="display text-[1.8rem]">Can't find an answer?</h2>
          <p className="mt-3 text-soft">
            Ask the community or open an issue on{" "}
            <Link to="/support" className="tlink">
              the support page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
