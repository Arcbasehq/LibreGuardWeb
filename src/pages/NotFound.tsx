import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center sm:px-8">
      <p className="kicker">Error 404</p>
      <h1 className="display mt-5 text-[4rem] leading-none text-ink sm:text-[6rem]">
        Nothing <em>here</em>.
      </h1>
      <p className="mt-5 max-w-sm text-soft">
        This page got blocked, moved, or never existed. Let's get you back to
        something real.
      </p>
      <div className="mt-9 flex gap-3">
        <Button as={Link} to="/" variant="primary">
          Back home
        </Button>
        <Button as={Link} to="/docs" variant="secondary">
          Read the docs
        </Button>
      </div>
    </section>
  );
}
