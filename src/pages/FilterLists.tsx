import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const lists: {
  name: string;
  desc: string;
  rules: string;
  on: boolean;
}[] = [
  { name: "LibreGuard Base", desc: "Core ads and trackers. Always recommended.", rules: "62,400", on: true },
  { name: "Privacy & Tracking", desc: "Analytics, beacons, and fingerprinting scripts.", rules: "41,900", on: true },
  { name: "Malware & Phishing", desc: "Known scam, malware, and phishing hosts.", rules: "18,200", on: true },
  { name: "Annoyances", desc: "Cookie banners, newsletter popups, in-page nags.", rules: "12,750", on: false },
  { name: "Social widgets", desc: "Embedded share buttons and social trackers.", rules: "3,480", on: false },
  { name: "Regional — EU", desc: "Region-specific ad networks across Europe.", rules: "9,120", on: false },
];

export default function FilterLists() {
  return (
    <>
      <PageHero
        kicker="Filter lists"
        title={
          <>
            The lists doing the <em>heavy lifting</em>.
          </>
        }
        lede="Curated, updated daily, and entirely optional. Turn on what you need, leave the rest off."
      />

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
        <div className="card overflow-hidden">
          {lists.map((l, i) => (
            <div
              key={l.name}
              className={`flex items-center justify-between gap-4 p-6 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-semibold text-ink">{l.name}</h3>
                  {l.on && <span className="badge badge--mint"><span className="dot" />Default</span>}
                </div>
                <p className="mt-1 text-sm text-soft">{l.desc}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="display text-lg text-ink">{l.rules}</div>
                <div className="text-xs text-mute">rules</div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-soft">
          Want to publish your own?{" "}
          <Link to="/docs" className="tlink">
            See the rule syntax guide
          </Link>
          .
        </p>
      </section>
    </>
  );
}
