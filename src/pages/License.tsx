import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import PageHero from "../components/PageHero";
import Button from "../components/Button";

const freedoms: { title: string; desc: string }[] = [
  { title: "Use it for anything", desc: "Personal, commercial, at any scale — no permission needed." },
  { title: "Study how it works", desc: "The complete source is yours to read and inspect." },
  { title: "Share copies", desc: "Redistribute it to anyone, freely." },
  { title: "Improve and release", desc: "Modify it and share your version under the same license." },
];

export default function License() {
  return (
    <>
      <PageHero
        kicker="License"
        title={
          <>
            Free as in <em>freedom</em>.
          </>
        }
        lede="LibreGuard is released under the GNU General Public License v3.0 — copyleft, so it stays open for everyone downstream."
      />

      <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {freedoms.map((f) => (
            <div key={f.title} className="card p-6">
              <FontAwesomeIcon icon={faCircleCheck} className="text-mint" />
              <h3 className="mt-3 font-semibold text-ink">{f.title}</h3>
              <p className="mt-1 text-sm text-soft">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="card mt-8 p-7">
          <h2 className="display text-xl text-ink">The one obligation</h2>
          <p className="mt-3 text-soft">
            If you distribute LibreGuard — modified or not — you must pass on the
            same freedoms: provide the source and keep it under the GPL v3.0.
            That's what keeps it free for the next person.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noreferrer">
              <Button variant="primary">Read the full license</Button>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Button variant="secondary">View source</Button>
            </a>
          </div>
        </div>

        <p className="mt-8 text-sm text-mute">
          &copy; 2026 LibreGuard contributors. GNU GPL v3.0. This summary is not
          legal advice; the license text governs.
        </p>
      </section>
    </>
  );
}
