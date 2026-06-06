import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faArrowRight,
  faGauge,
  faGear,
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo-text.svg";
import Button from "./Button";
import { useAuth } from "../lib/auth";

const navLinks: { label: string; to: string }[] = [
  { label: "Features", to: "/features" },
  { label: "Download", to: "/download" },
  { label: "Docs", to: "/docs" },
  { label: "Roadmap", to: "/roadmap" },
];

function UserAvatar({ email, avatarUrl }: { email: string; avatarUrl?: string }) {
  const initials = email.split("@")[0].slice(0, 2).toUpperCase();
  const [broken, setBroken] = useState(false);

  if (avatarUrl && !broken) {
    return (
      <img
        src={avatarUrl}
        alt={email}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="h-9 w-9 rounded-full border border-line-strong object-cover"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-mint/15 text-xs font-semibold text-mint">
      {initials}
    </div>
  );
}

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="nav-blur sticky top-0 z-50 border-b border-line">
      <div className="mx-auto flex h-[75px] max-w-6xl items-center gap-9 px-6 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={Logo}
            alt="LibreGuard"
            className="h-14 w-auto rounded-lg object-contain"
          />
        </Link>

        <div className="mr-auto hidden items-center gap-9 text-sm text-soft md:flex">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `navlink hover:text-ink ${isActive ? "text-ink" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="navlink hover:text-ink"
          >
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <div ref={ref} className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80"
              >
                <UserAvatar
                  email={user.email!}
                  avatarUrl={user.user_metadata?.avatar_url ?? user.user_metadata?.picture}
                />
              </button>

              {open && (
                <div className="dropdown-enter absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-line-strong bg-card p-1 shadow-xl">
                  <div className="border-b border-line px-3 py-2.5">
                    <p className="truncate text-sm text-ink">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/dashboard");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-soft transition-colors hover:bg-surface"
                  >
                    <FontAwesomeIcon icon={faGauge} className="w-4 text-mute" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/settings");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-soft transition-colors hover:bg-surface"
                  >
                    <FontAwesomeIcon icon={faGear} className="w-4 text-mute" />
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);
                      signOut();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-soft transition-colors hover:bg-surface"
                  >
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      className="w-4 text-mute"
                    />
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="secondary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="text-xs"
                />
                Log in
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="primary"
                size="sm"
                className="group hidden sm:inline-flex"
              >
                Get started
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs transition-transform group-hover:translate-x-0.5"
                />
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <div ref={menuRef} className="relative md:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong text-soft transition-colors hover:text-ink"
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="text-sm" />
            </button>

            {menuOpen && (
              <div className="dropdown-enter absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-line-strong bg-card p-1 shadow-xl">
                {navLinks.map(({ label, to }) => (
                  <NavLink
                    key={label}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface ${
                        isActive ? "text-ink" : "text-soft"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-soft transition-colors hover:bg-surface"
                >
                  GitHub
                </a>
                {!user && (
                  <div className="mt-1 border-t border-line pt-1">
                    <button
                      onClick={() => { setMenuOpen(false); navigate("/login"); }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-soft transition-colors hover:bg-surface"
                    >
                      <FontAwesomeIcon icon={faArrowRightToBracket} className="w-4 text-mute" />
                      Log in
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); navigate("/register"); }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-mint transition-colors hover:bg-surface"
                    >
                      <FontAwesomeIcon icon={faArrowRight} className="w-4" />
                      Get started
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
