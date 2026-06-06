import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved, faBolt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo-text.svg";

const perks = [
  { icon: faShieldHalved, title: "Block trackers everywhere", body: "Network-level filtering across every app and tab." },
  { icon: faBolt, title: "Faster, lighter browsing", body: "Fewer requests, less data, snappier pages." },
  { icon: faGlobe, title: "Synced across devices", body: "One account, your settings everywhere." },
];

export default function AuthLayout({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-[calc(100svh-75px)] lg:grid-cols-2">
      {/* ── Brand panel ─────────────────────────────────────── */}
      <aside className="auth-brand relative hidden overflow-hidden border-r border-line lg:flex lg:flex-col">
        <div className="relative z-10 flex h-full flex-col justify-between p-12 xl:p-16">
          <Link to="/" className="inline-flex">
            <img src={Logo} alt="LibreGuard" className="h-14 w-auto object-contain" />
          </Link>

          <div className="reveal d1 max-w-md">
            <h2 className="display text-[2.6rem] leading-[1.05] xl:text-[3.1rem]">
              Privacy that just <em>works</em>.
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-soft">
              Open-source protection that blocks trackers, ads, and malware before
              they ever reach you.
            </p>

            <ul className="mt-10 flex flex-col gap-5">
              {perks.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <span className="feature__icon mt-0.5 shrink-0 bg-mint/10">
                    <FontAwesomeIcon icon={p.icon} />
                  </span>
                  <div>
                    <p className="font-medium text-ink">{p.title}</p>
                    <p className="text-sm text-soft">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-mute">© {new Date().getFullYear()} LibreGuard · Free &amp; open source</p>
        </div>
      </aside>

      {/* ── Form panel ──────────────────────────────────────── */}
      <main className="flex items-center justify-center bg-canvas px-6 py-16 sm:px-10">
        <div className="reveal d2 w-full max-w-sm">
          <div className="mb-8">
            <p className="kicker">{kicker}</p>
            <h1 className="display mt-4 text-[2.4rem] leading-[1.05]">{title}</h1>
            <p className="mt-3 text-soft">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
