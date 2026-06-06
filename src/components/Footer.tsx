import { Link } from "react-router-dom";
import Logo from "../assets/logo-text.svg";

type FooterLink = { label: string; to?: string; href?: string };

const columns: { h: string; l: FooterLink[] }[] = [
  {
    h: "Product",
    l: [
      { label: "Features", to: "/features" },
      { label: "Download", to: "/download" },
      { label: "Changelog", to: "/changelog" },
      { label: "Roadmap", to: "/roadmap" },
    ],
  },
  {
    h: "Resources",
    l: [
      { label: "Docs", to: "/docs" },
      { label: "Filter lists", to: "/filter-lists" },
      { label: "Support", to: "/support" },
      { label: "Status", to: "/status" },
    ],
  },
  {
    h: "Project",
    l: [
      { label: "GitHub", href: "https://github.com" },
      { label: "License", to: "/license" },
      { label: "Privacy", to: "/privacy" },
      { label: "Contribute", to: "/contribute" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={Logo} alt="LibreGuard" className="h-22 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              A lightweight, privacy-first blocker that keeps your browsing
              fast, clean, and under your control.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.h}>
                <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-mute">
                  {col.h}
                </h4>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {col.l.map((item) => (
                    <li key={item.label}>
                      {item.to ? (
                        <Link
                          to={item.to}
                          className="text-soft transition-colors hover:text-ink"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-soft transition-colors hover:text-ink"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-mute sm:flex-row">
          <span>
            &copy; 2026 LibreGuard — released under the GNU GPL v3.0 License.
          </span>
          <span>Made for people who'd rather not be the product.</span>
        </div>
      </div>
    </footer>
  );
}
