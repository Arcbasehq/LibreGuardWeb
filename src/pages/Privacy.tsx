import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import PageHero from "../components/PageHero";

const never = [
  "Create an account or profile for you",
  "Send your browsing history anywhere",
  "Include analytics or telemetry",
  "Sell, share, or broker any data",
  "Embed third-party trackers in the app",
];

const always = [
  "Keep your settings on your own device",
  "Fetch filter lists over plain, anonymous requests",
  "Ship every line as auditable open source",
  "Let you export or wipe local data anytime",
];

export default function Privacy() {
  return (
    <>
      <PageHero
        kicker="Privacy"
        title={
          <>
            The shortest privacy policy <em>you'll ever read</em>.
          </>
        }
        lede="LibreGuard is a privacy tool. Collecting your data would defeat the entire point — so we don't."
      />

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card p-7">
            <h2 className="display text-xl text-ink">What we never do</h2>
            <ul className="mt-5 space-y-3">
              {never.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-soft">
                  <FontAwesomeIcon icon={faXmark} className="mt-1 text-mute" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-7">
            <h2 className="display text-xl text-ink">What we always do</h2>
            <ul className="mt-5 space-y-3">
              {always.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-soft">
                  <FontAwesomeIcon icon={faCheck} className="mt-1 text-mint" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card mt-8 p-7">
          <h2 className="display text-xl text-ink">In plain terms</h2>
          <p className="mt-3 text-soft">
            We can't lose, leak, or hand over data we never collect. Because the
            source is open, you don't have to take our word for it — you can read
            exactly what the app does and verify these claims yourself.
          </p>
        </div>

        <p className="mt-8 text-sm text-mute">Last updated May 2026.</p>
      </section>
    </>
  );
}
