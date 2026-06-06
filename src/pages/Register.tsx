import { useState, useId, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import type HCaptcha from "@hcaptcha/react-hcaptcha";
import SEO from "../components/SEO";
import Button from "../components/Button";
import AuthLayout from "../components/AuthLayout";
import Captcha from "../components/Captcha";
import GoogleButton from "../components/GoogleButton";
import { useAuth } from "../lib/auth";

export default function Register() {
  const emailId = useId();
  const passId = useId();
  const confirmId = useId();
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const captchaRef = useRef<HCaptcha>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }

    setSubmitting(true);
    const { error: err } = await signUp(email, password, captchaToken);
    setSubmitting(false);
    captchaRef.current?.resetCaptcha();
    setCaptchaToken("");
    if (err) {
      setError(err);
    } else {
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    }
  }

  const field =
    "w-full rounded-xl border border-line-strong bg-card px-10 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-mute/50 focus:border-mint/50 focus:ring-1 focus:ring-mint/30";

  return (
    <>
      <SEO title="Sign up" description="Create a LibreGuard account." path="/register" />
      <AuthLayout
        kicker="Account"
        title="Create your account"
        subtitle="Sync settings across devices and get priority support."
      >
        <GoogleButton label="Sign up with Google" />

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
            <label htmlFor={passId} className="mb-2 block text-sm font-medium text-soft">
              Password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-mute"
              />
              <input
                id={passId}
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor={confirmId} className="mb-2 block text-sm font-medium text-soft">
              Confirm password
            </label>
            <div className="relative">
              <FontAwesomeIcon
                icon={faLock}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-mute"
              />
              <input
                id={confirmId}
                type="password"
                required
                minLength={6}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
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
            {submitting ? "Creating account…" : "Create account"}
            {!submitting && <FontAwesomeIcon icon={faArrowRight} className="text-xs" />}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-mute">
          Already have an account?{" "}
          <Link to="/login" className="tlink text-mint">
            Log in
          </Link>
        </p>
      </AuthLayout>
    </>
  );
}
