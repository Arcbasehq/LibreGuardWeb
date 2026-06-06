import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/logo-text.svg";
import Button from "./Button";

const navLinks: { label: string; to: string }[] = [
  { label: "Features", to: "/features" },
  { label: "Download", to: "/download" },
  { label: "Docs", to: "/docs" },
  { label: "Roadmap", to: "/roadmap" },
];

export default function Header() {
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
          <Button
            as={Link}
            to="/download"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
