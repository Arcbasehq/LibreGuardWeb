import { type FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faComments,
  faBug,
  faArrowRight,
  faPaperPlane,
  faCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";

const W3W_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

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
    a: "No. There is no account, no telemetry, and no phone-home. Your settings live only on your device in chrome.storage.local.",
  },
  {
    q: "How does blocking work under the hood?",
    a: "LibreGuard uses Chrome's Declarative Net Request API (DNR). Two static rulesets (block_ads_1, block_ads_2) ship with the extension, and dynamic rules are generated from filter lists at update time — no JavaScript executes on pages.",
  },
  {
    q: "Which filter lists are included?",
    a: "Five lists are enabled by default: BlockList Project – Ads, BlockList Project – Tracking, BlockList Project – Malware, EasyList, and EasyPrivacy. You can toggle each from the Filters tab in options, or add custom subscription URLs.",
  },
  {
    q: "A website broke. What do I do?",
    a: "Click the toolbar icon and allowlist the domain from the popup. That creates a DNR allow rule with priority 10 that bypasses all filter rules on that site. If the breakage is a false positive for everyone, open an issue on GitHub.",
  },
  {
    q: "What is cosmetic filtering?",
    a: "Besides network-level blocking, LibreGuard hides ~40 common ad containers via CSS selectors (e.g. div[class*='ad'], iframe[src*='doubleclick']). You can add your own custom selectors in the General tab of options.",
  },
  {
    q: "How do I use the element picker?",
    a: "Right-click a page and select 'Block element with LibreGuard', or activate the picker from the popup. Hover to highlight an element and click to add a CSS selector to your custom filters.",
  },
  {
    q: "How are filter lists updated?",
    a: "Lists refresh automatically every 24 hours. Each list is capped at 500 dynamic rules with up to 200 domains per rule (100k domains max). You can also trigger a manual refresh from the Filters tab. The badge shows the blocked count for the current page.",
  },
  {
    q: "Where are my statistics stored?",
    a: "Your block count, whitelist, and settings are saved in chrome.storage.local — they persist across browser restarts and are never sent anywhere. The popup shows today's count and a cumulative total.",
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

      {/* ── Support channels ── */}
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

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 sm:px-8 lg:grid-cols-2">
          {/* ── Contact form ── */}
          <div>
            <p className="kicker">Get in touch</p>
            <h2 className="display mt-4 text-[2rem] sm:text-[2.4rem]">
              Send us a message.
            </h2>
            <p className="mt-4 text-soft">
              We'll get back to you within 24 hours. All fields are required
              unless marked optional.
            </p>
            <ContactForm />
          </div>
          {/* ── FAQ ── */}
          <div>
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
            </div>{" "}
            {/* ── /faq-inner ── */}
          </div>{" "}
          {/* ── /faq-column ── */}
        </div>{" "}
        {/* ── /grid ── */}
      </section>
    </>
  );
}

/* ───────────────────────────────────────────── */
/*  Contact form (Web3Forms)                     */
/* ───────────────────────────────────────────── */

type FormStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!W3W_KEY) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: W3W_KEY,
          name,
          email,
          subject: subject || "(no subject)",
          message,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  if (!W3W_KEY) {
    return (
      <div className="mt-8 flex items-start gap-3 rounded-xl border border-line-strong bg-card p-5">
        <FontAwesomeIcon
          icon={faTriangleExclamation}
          className="mt-0.5 text-mint"
        />
        <div>
          <p className="font-medium text-ink">Form not configured</p>
          <p className="mt-1 text-sm text-soft">
            Set{" "}
            <code className="rounded bg-canvas px-1.5 py-0.5 text-xs text-mint">
              VITE_WEB3FORMS_ACCESS_KEY
            </code>{" "}
            in your environment to enable the contact form.
          </p>
        </div>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink placeholder:text-mute focus:border-mint focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <input
        className={input}
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className={input}
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className={input}
        placeholder="Subject (optional)"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        className={`${input} min-h-[120px] resize-y`}
        placeholder="How can we help?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn--primary inline-flex w-full items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === "sending" ? (
          "Sending…"
        ) : (
          <>
            Send message
            <FontAwesomeIcon icon={faPaperPlane} className="text-[0.75rem]" />
          </>
        )}
      </button>

      {status === "success" && (
        <div className="flex items-center gap-2 text-sm text-mint-deep">
          <FontAwesomeIcon icon={faCheck} />
          Message sent successfully — we'll reply within 24 hours.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          Something went wrong. Please try again or email us directly.
        </div>
      )}
    </form>
  );
}
