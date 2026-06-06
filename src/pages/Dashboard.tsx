import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightToBracket,
  faGear,
  faList,
  faLock,
  faBookOpen,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import SEO from "../components/SEO";
import Button from "../components/Button";
import { useAuth } from "../lib/auth";
import RemoteControl from "../components/RemoteControl";

const resources = [
  { icon: faSliders, label: "Account settings", to: "/settings" },
  { icon: faList, label: "Filter lists", to: "/filter-lists" },
  { icon: faBookOpen, label: "Documentation", to: "/docs" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Dashboard() {
  const { user, loading, signOut } = useAuth();

  return (
    <>
      <SEO
        title="Dashboard"
        description="Manage your LibreGuard account and control your protection from one place."
        path="/dashboard"
      />
      {loading ? (
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="flex items-center justify-center py-16 text-mute">
            Loading…
          </div>
        </section>
      ) : !user ? (
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="reveal d2 mx-auto max-w-md text-center">
            <span className="feature__icon mx-auto mb-4">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <h2 className="display text-[2rem] text-ink">Not signed in</h2>
            <p className="mt-3 text-soft">
              Log in to control your extension and manage your account.
            </p>
            <div className="mt-7 flex justify-center gap-3">
              <Button as={Link} to="/login" variant="primary">
                Log in
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </Button>
              <Button as={Link} to="/register" variant="secondary">
                Sign up
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-5xl px-6 py-10 sm:px-8">
          <div className="mb-8">
            <p className="kicker">Dashboard</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink">
              Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""}.
            </h1>
          </div>

          {/* ── Identity bar (supporting context) ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
            <div className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint/15 text-sm font-semibold text-mint">
                {user.email!.split("@")[0].slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{user.email}</p>
                <p className="text-xs text-mute">
                  Member since {user.created_at ? formatDate(user.created_at) : "today"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button as={Link} to="/settings" variant="ghost" size="sm">
                <FontAwesomeIcon icon={faGear} className="text-xs" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <FontAwesomeIcon icon={faArrowRightToBracket} className="text-xs" />
                Sign out
              </Button>
            </div>
          </div>

          {/* ── Primary: protection control center (dominant) ── */}
          <div className="mt-8">
            <RemoteControl />
          </div>

          {/* ── Tertiary: resources (demoted utility nav) ── */}
          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wide text-mute">Resources</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {resources.map((r) => (
                <Link
                  key={r.label}
                  to={r.to}
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-3.5 py-2 text-sm text-soft transition-colors hover:border-mint/40 hover:text-ink"
                >
                  <FontAwesomeIcon icon={r.icon} className="text-xs text-mute" />
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
