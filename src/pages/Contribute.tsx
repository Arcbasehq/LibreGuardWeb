import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFilter,
  faLanguage,
  faBug,
  faBook,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import PageHero from "../components/PageHero";
import Button from "../components/Button";

const ways: { icon: IconDefinition; title: string; desc: string }[] = [
  { icon: faCode, title: "Write code", desc: "Pick up a good-first-issue or propose a feature. PRs welcome." },
  { icon: faFilter, title: "Curate filter rules", desc: "Improve detection and cut false positives in the lists." },
  { icon: faLanguage, title: "Translate", desc: "Help bring LibreGuard to more languages." },
  { icon: faBug, title: "Report bugs", desc: "Clear, reproducible reports are worth their weight in gold." },
  { icon: faBook, title: "Improve docs", desc: "Fix a typo or write the guide you wish existed." },
];

const steps: string[] = [
  "Fork the repository and clone it locally",
  "Run the dev build and make your change",
  "Open a pull request describing what and why",
  "A maintainer reviews — usually within a few days",
];

export default function Contribute() {
  return (
    <>
      <PageHero
        kicker="Contribute"
        title={
          <>
            Built by people who <em>care</em>. Including you.
          </>
        }
        lede="LibreGuard is community-run. Every rule, fix, and translation comes from someone who wanted the web a little quieter."
      >
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <Button variant="primary" className="group">
            Start on GitHub
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </a>
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <p className="kicker">Ways to help</p>
        <h2 className="display mt-4 text-[2rem] sm:text-[2.5rem]">
          No contribution too small.
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <article key={w.title} className="card card--hover flex flex-col p-7">
              <span className="feature__icon">
                <FontAwesomeIcon icon={w.icon} />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">{w.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-soft">
                {w.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-panel">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <p className="kicker">Your first PR</p>
          <h2 className="display mt-4 text-[2rem]">Four steps, start to merge.</h2>
          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="feature__icon shrink-0 font-display text-mint">
                  {i + 1}
                </span>
                <span className="pt-2 text-soft">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
