import { useState, useId, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faLock, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import SEO from "../components/SEO";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import Captcha from "../components/Captcha";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

export default function Login() {
  const emailId = useId();
  const passId = useId();
  const codeId = useId();
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ── Second factor (TOTP) ── */
  const [mfaFactorId, setMfaFactorId] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }

    setSubmitting(true);
    const { error: err } = await signIn(email, password, captchaToken);
    captchaRef.current?.resetCaptcha();
    setCaptchaToken("");
    if (err) {
      setSubmitting(false);
      setError(err);
      return;
    }

    /* Password OK — does this account require a second factor? */
    const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (aal && aal.nextLevel === "aal2" && aal.nextLevel !== aal.currentLevel) {
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const totp = factors?.totp?.[0];
      setSubmitting(false);
      if (totp) {
        setMfaFactorId(totp.id);
        return; /* switch to code-entry view */
      }
    }

    setSubmitting(false);
    navigate("/");
  }

  async function handleMfaSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await supabase.auth.mfa.challengeAndVerify({
      factorId: mfaFactorId,
      code: mfaCode,
    });
    setSubmitting(false);
    if (err) {
      setError(err.message);
      setMfaCode("");
    } else {
      navigate("/");
    }
  }

  const field =
    "w-full rounded-xl border border-line-strong bg-card px-10 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-mute/50 focus:border-mint/50 focus:ring-1 focus:ring-mint/30";

  /* ── TOTP challenge view ── */
  if (mfaFactorId) {
    return (
      <>
        <SEO title="Two-factor" description="Verify your identity." path="/login" />
        <AuthLayout
          kicker="Security"
          title="Two-factor"
          subtitle="Enter the 6-digit code from your authenticator app."
        >
          <form onSubmit={handleMfaSubmit} className="flex flex-col gap-5">
            {error && (
              <div className="rounded-xl border border-[#f87171]/30 bg-[#f87171]/10 px-4 py-3 text-sm text-[#f87171]">
                {error}
              </div>
            )}

            <div>
              <label htmlFor={codeId} className="mb-2 block text-sm font-medium text-soft">
                Authentication code
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-mute"
                />
                <input
                  id={codeId}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className={`${field} tracking-[0.4em]`}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={submitting || mfaCode.length !== 6}
            >
              {submitting ? "Verifying…" : "Verify"}
              {!submitting && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
            </Button>
          </form>
        </AuthLayout>
      </>
    );
  }

  return (
    <>
      <SEO title="Log in" description="Log in to your LibreGuard account." path="/login" />
      <AuthLayout kicker="Account" title="Welcome back" subtitle="Log in to manage your settings.">
        <GoogleButton label="Continue with Google" />

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-line" />
          <span className="text-xs uppercase tracking-wider text-mute">or</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="rounded-xl border border-[#f87171]/30 bg-[#f87171]/10 px-4 py-3 text-sm text-[#f87171]">
              {error}
            </div>
          )}

          <div>
            <label htmlFor={emailId} className="mb-2 block text-sm font-medium text-soft">
              Email
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-mute"
              />
              <input
                id={emailId}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={field}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor={passId} className="block text-sm font-medium text-soft">
                Password
              </label>
            </div>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-mute"
              />
              <input
                id={passId}
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className={field}
              />
            </div>
          </div>

          <Captcha
            ref={captchaRef}
            onVerify={setCaptchaToken}
            onExpire={() => setCaptchaToken("")}
          />

          <Button type="submit" variant="primary" className="w-full justify-center" disabled={submitting}>
            {submitting ? "Logging in…" : "Log in"}
            {!submitting && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-mute">
          Don't have an account?{" "}
          <Link to="/register" className="tlink text-mint">
            Sign up
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
