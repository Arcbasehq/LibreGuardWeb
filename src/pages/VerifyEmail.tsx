import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSpinner } from "@fortawesome/free-solid-svg-icons";
import SEO from "../components/SEO";
import Button from "../components/Button";
import { supabase } from "../lib/supabase";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleResend() {
    if (!email) return;
    setResending(true);
    setMessage("");
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
    });
    setResending(false);
    setMessage(error ? "Failed to resend. Try again." : "Verification email sent!");
  }

  return (
    <>
      <SEO
        title="Verify your email"
        description="Check your email for the verification link."
        path="/verify-email"
      />
      <section className="border-b border-line bg-panel">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
          <div className="reveal d1 mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint/15">
              <FontAwesomeIcon icon={faEnvelope} className="text-2xl text-mint" />
            </div>
            <p className="kicker">Check your inbox</p>
            <h1 className="display mt-5 text-[2.6rem] leading-[1.04] sm:text-[3.3rem]">
              Verify your email
            </h1>
            <p className="mt-4 text-[1.08rem] leading-relaxed text-soft">
              We sent a verification link to{email ? ` ` : ""}
              {email && <strong className="text-ink">{email}</strong>}.
              Click the link in the email to activate your account.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="reveal d2 mx-auto max-w-md text-center">
          <Button
            variant="secondary"
            className="w-full justify-center"
            disabled={resending || !email}
            onClick={handleResend}
          >
            {resending ? (
              <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Sending…</>
            ) : (
              "Resend verification email"
            )}
          </Button>
          {message && (
            <p className="mt-4 text-sm text-mint">{message}</p>
          )}
          <p className="mt-8 text-sm text-mute">
            <Link to="/login" className="tlink text-mint">
              Back to login
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
