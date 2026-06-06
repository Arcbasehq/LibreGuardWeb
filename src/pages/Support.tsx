import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faComments,
  faBug,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const channels: {
  icon: IconDefinition;
  title: string;
  desc: string;
  cta: string;
  to?: string;
  href?: string;
}[] = [
  {
    icon: faBook,
    title: "Read the docs",
    desc: "Most questions are answered in the setup and configuration guides.",
    cta: "Browse documentation",
    to: "/docs",
  },
  {
    icon: faComments,
    title: "Ask the community",
    desc: "Discussions, tips, and help from other LibreGuard users.",
    cta: "Open the forum",
    href: "https://github.com",
  },
  {
    icon: faBug,
    title: "Report a bug",
    desc: "Found a broken site or a false positive? File it on the tracker.",
    cta: "Open an issue",
    href: "https://github.com",
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is LibreGuard really free?",
    a: "Yes — free forever, no paid tier, and open source under the GNU GPL v3.0. There is nothing to upsell.",
  },
  {
    q: "Does it collect any data?",
    a: "No. There is no account, no telemetry, and no phone-home. Your settings live only on your device.",
  },
  {
    q: "A website broke. What do I do?",
    a: "Allowlist the site from the toolbar, or report the false positive so we can fix the rule for everyone.",
  },
  {
    q: "How are filter lists updated?",
    a: "Lists refresh automatically on a daily cycle. You can also trigger an update manually at any time.",
  },
];

export default function Support() {
  return (
    <>
      <SEO
        title="Support"
        description="LibreGuard help and support. Browse documentation, ask the community, report bugs, or find answers to frequently asked questions."
        path="/support"
      />
      <PageHero
        kicker="Support"
        title={
          <>
            Stuck? <em>We've got you.</em>
          </>
        }
        lede="Start with the docs, lean on the community, or file an issue — whichever fits the problem."
      />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => {
            const inner = (
              <article className="card card--hover flex h-full flex-col p-7">
                <span className="feature__icon">
                  <FontAwesomeIcon icon={c.icon} />
                </span>
                <h3 className="mt-4 text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-soft">
                  {c.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-mint">
                  {c.cta}
                  <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem]" />
                </span>
              </article>
            );
            return c.to ? (
              <Link key={c.title} to={c.to}>
                {inner}
              </Link>
            ) : (
              <a key={c.title} href={c.href} target="_blank" rel="noreferrer">
                {inner}
              </a>
            );
          })}
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <p className="kicker">Common questions</p>
          <h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
            Quick answers.
          </h2>
          <div className="mt-10 divide-y divide-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                  {f.q}
                  <span className="text-mint transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
