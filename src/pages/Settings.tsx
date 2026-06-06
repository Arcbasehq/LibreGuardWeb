import { type FormEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFloppyDisk,
  faCircleExclamation,
  faCheck,
  faEye,
  faEyeSlash,
  faTriangleExclamation,
  faLaptop,
  faClock,
  faRightFromBracket,
  faSpinner,
  faShieldHalved,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import type { Factor } from "@supabase/supabase-js";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";

type Section = "profile" | "password" | "twofactor" | "notifications" | "sessions" | "danger";

const sections: { id: Section; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "password", label: "Password" },
  { id: "twofactor", label: "Two-factor" },
  { id: "notifications", label: "Notifications" },
  { id: "sessions", label: "Sessions" },
  { id: "danger", label: "Danger zone" },
];

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-card px-4 py-2.5 text-sm text-ink placeholder:text-mute focus:border-mint focus:outline-none transition-colors"
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <FontAwesomeIcon icon={faCircleExclamation} className="text-[0.6rem]" />
          {error}
        </p>
      )}
    </div>
  );
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function Settings() {
  const { user, signOutOthers } = useAuth();
  const [section, setSection] = useState<Section>("profile");

  /* ── Profile state ── */
  const [name, setName] = useState("");
  const [email] = useState(user?.email ?? "");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileStatus, setProfileStatus] = useState<"idle" | "saved" | "error">("idle");
  const [profileError, setProfileError] = useState("");

  /* ── Password state ── */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwStatus, setPwStatus] = useState<"idle" | "saved" | "error">("idle");
  const [showPw, setShowPw] = useState(false);

  /* ── Notification toggles ── */
  const [notifyUpdates, setNotifyUpdates] = useState(true);
  const [notifyTips, setNotifyTips] = useState(false);
  const [notifySecurity, setNotifySecurity] = useState(true);
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifStatus, setNotifStatus] = useState<"idle" | "saved" | "error">("idle");

  /* ── Two-factor (TOTP) ── */
  const [factors, setFactors] = useState<Factor[]>([]);
  const [factorsLoading, setFactorsLoading] = useState(true);
  const [enroll, setEnroll] = useState<{ id: string; qr: string; secret: string } | null>(null);
  const [totpCode, setTotpCode] = useState("");
  const [totpError, setTotpError] = useState("");
  const [totpBusy, setTotpBusy] = useState(false);

  /* ── Sessions ── */
  const [signedOutOthers, setSignedOutOthers] = useState(false);
  const [signingOutOthers, setSigningOutOthers] = useState(false);

  /* ── Danger ── */
  const [confirmDelete, setConfirmDelete] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  /* Load profile name + notification prefs from user_metadata */
  useEffect(() => {
    if (!user) return;
    setName(user.user_metadata?.full_name ?? "");
    const prefs = user.user_metadata?.notifications;
    if (prefs) {
      setNotifyUpdates(prefs.updates ?? true);
      setNotifyTips(prefs.tips ?? false);
      setNotifySecurity(prefs.security ?? true);
    }
  }, [user]);

  async function handleProfileSave(e: FormEvent) {
    e.preventDefault();
    setProfileSaving(true);
    setProfileStatus("idle");
    setProfileError("");
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } });
    if (error) {
      setProfileError(error.message);
      setProfileStatus("error");
    } else {
      setProfileStatus("saved");
      setTimeout(() => setProfileStatus("idle"), 2500);
    }
    setProfileSaving(false);
  }

  async function handlePasswordSave(e: FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwStatus("idle");
    if (newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwSaving(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) {
      setPwError(error.message);
      setPwStatus("error");
    } else {
      setPwStatus("saved");
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      setTimeout(() => setPwStatus("idle"), 2500);
    }
    setPwSaving(false);
  }

  async function handleNotifSave() {
    setNotifSaving(true);
    setNotifStatus("idle");
    const { error } = await supabase.auth.updateUser({
      data: {
        notifications: { updates: notifyUpdates, tips: notifyTips, security: notifySecurity },
      },
    });
    if (error) {
      setNotifStatus("error");
    } else {
      setNotifStatus("saved");
      setTimeout(() => setNotifStatus("idle"), 2500);
    }
    setNotifSaving(false);
  }

  /* Load enrolled MFA factors */
  async function loadFactors() {
    setFactorsLoading(true);
    const { data } = await supabase.auth.mfa.listFactors();
    setFactors(data?.totp ?? []);
    setFactorsLoading(false);
  }
  useEffect(() => {
    loadFactors();
  }, []);

  async function handleEnrollTotp() {
    setTotpError("");
    setTotpBusy(true);
    const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" });
    setTotpBusy(false);
    if (error) {
      setTotpError(error.message);
      return;
    }
    setEnroll({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
    setTotpCode("");
  }

  async function handleVerifyTotp(e: FormEvent) {
    e.preventDefault();
    if (!enroll) return;
    setTotpError("");
    setTotpBusy(true);
    const { error } = await supabase.auth.mfa.challengeAndVerify({
      factorId: enroll.id,
      code: totpCode,
    });
    setTotpBusy(false);
    if (error) {
      setTotpError(error.message);
      setTotpCode("");
      return;
    }
    setEnroll(null);
    setTotpCode("");
    await loadFactors();
  }

  async function handleCancelEnroll() {
    if (enroll) await supabase.auth.mfa.unenroll({ factorId: enroll.id }).catch(() => {});
    setEnroll(null);
    setTotpCode("");
    setTotpError("");
  }

  async function handleRemoveFactor(factorId: string) {
    setTotpBusy(true);
    await supabase.auth.mfa.unenroll({ factorId });
    setTotpBusy(false);
    await loadFactors();
  }

  const navClass = (id: Section) =>
    `w-full rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
      section === id
        ? "bg-mint/10 font-medium text-mint"
        : "text-soft hover:text-ink hover:bg-surface"
    }`;

  const card = "rounded-xl border border-line bg-card p-6 sm:p-7";

  return (
    <>
      <SEO
        title="Settings"
        description="Manage your LibreGuard account settings, password, and notifications."
        path="/settings"
      />
      <PageHero
        kicker="Settings"
        title="Manage your account."
        lede="Update your profile, change your password, and configure notification preferences."
        compact
      />

      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav className="space-y-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={navClass(s.id)}
              >
                {s.label}
              </button>
            ))}
            <div className="pt-4">
              <Button
                as={Link}
                to="/dashboard"
                variant="ghost"
                size="sm"
                className="w-full"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                Back to dashboard
              </Button>
            </div>
          </nav>

          <div>
            {section === "profile" && (
              <form onSubmit={handleProfileSave} className={card}>
                <h2 className="text-xl font-semibold text-ink">Profile</h2>
                <p className="mt-1 text-sm text-mute">
                  Your account details are shared across all LibreGuard services.
                </p>
                <div className="mt-6 space-y-4">
                  <Input label="Display name" value={name} onChange={setName} placeholder="Your name" />
                  <Input label="Email" value={email} onChange={() => {}} type="email" />
                  <p className="text-xs text-mute">Email changes are handled through your auth provider.</p>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button type="submit" variant="primary" size="sm" disabled={profileSaving}>
                    {profileSaving ? (
                      <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Saving…</>
                    ) : (
                      <><FontAwesomeIcon icon={faFloppyDisk} className="text-xs" /> Save changes</>
                    )}
                  </Button>
                  {profileStatus === "saved" && (
                    <span className="flex items-center gap-1.5 text-sm text-mint">
                      <FontAwesomeIcon icon={faCheck} className="text-xs" /> Saved
                    </span>
                  )}
                  {profileStatus === "error" && (
                    <span className="flex items-center gap-1.5 text-sm text-red-500">
                      <FontAwesomeIcon icon={faCircleExclamation} className="text-xs" /> {profileError}
                    </span>
                  )}
                </div>
              </form>
            )}

            {section === "password" && (
              <form onSubmit={handlePasswordSave} className={card}>
                <h2 className="text-xl font-semibold text-ink">Password</h2>
                <p className="mt-1 text-sm text-mute">Use a strong, unique password.</p>
                <div className="mt-6 space-y-4">
                  <Input label="Current password" value={currentPw} onChange={setCurrentPw} type={showPw ? "text" : "password"} />
                  <div className="relative">
                    <Input label="New password" value={newPw} onChange={setNewPw} type={showPw ? "text" : "password"} />
                    <button type="button" onClick={() => setShowPw((v) => !v)} className="absolute right-3 top-[38px] text-mute hover:text-ink transition-colors">
                      <FontAwesomeIcon icon={showPw ? faEyeSlash : faEye} className="text-sm" />
                    </button>
                  </div>
                  <Input label="Confirm new password" value={confirmPw} onChange={setConfirmPw} type={showPw ? "text" : "password"} error={pwError} />
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button type="submit" variant="primary" size="sm" disabled={pwSaving}>
                    {pwSaving ? (
                      <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Updating…</>
                    ) : (
                      <><FontAwesomeIcon icon={faFloppyDisk} className="text-xs" /> Update password</>
                    )}
                  </Button>
                  {pwStatus === "saved" && (
                    <span className="flex items-center gap-1.5 text-sm text-mint">
                      <FontAwesomeIcon icon={faCheck} className="text-xs" /> Password updated
                    </span>
                  )}
                </div>
              </form>
            )}

            {section === "twofactor" && (
              <div className={card}>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint/10 text-mint">
                    <FontAwesomeIcon icon={faShieldHalved} />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-ink">Two-factor authentication</h2>
                    <p className="mt-1 text-sm text-mute">
                      Add a time-based one-time code (TOTP) from an authenticator app for an extra layer of security.
                    </p>
                  </div>
                </div>

                {/* Enrolled factors */}
                <div className="mt-6 space-y-3">
                  {factorsLoading ? (
                    <p className="flex items-center gap-2 text-sm text-mute">
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs" /> Loading…
                    </p>
                  ) : factors.length === 0 && !enroll ? (
                    <p className="text-sm text-mute">No authenticator app is set up yet.</p>
                  ) : (
                    factors.map((f) => (
                      <div key={f.id} className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                          <FontAwesomeIcon icon={faShieldHalved} className="text-sm" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-ink">{f.friendly_name || "Authenticator app"}</p>
                          <p className="mt-0.5 text-xs text-mint">Active · TOTP</p>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          disabled={totpBusy}
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                          onClick={() => handleRemoveFactor(f.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-xs" /> Remove
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                {/* Enrollment flow */}
                {enroll ? (
                  <form onSubmit={handleVerifyTotp} className="mt-6 rounded-xl border border-line bg-surface p-5">
                    <p className="text-sm font-medium text-ink">Scan this QR code</p>
                    <p className="mt-1 text-xs text-mute">
                      Open your authenticator app (Google Authenticator, 1Password, Authy…) and scan the code, then enter the 6-digit code below.
                    </p>
                    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                      <img
                        src={enroll.qr}
                        alt="TOTP QR code"
                        className="h-44 w-44 rounded-lg border border-line bg-white p-2"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-mute">Or enter this key manually:</p>
                        <code className="mt-1 block break-all rounded-lg border border-line bg-card px-3 py-2 text-xs text-ink">
                          {enroll.secret}
                        </code>
                        <div className="mt-4">
                          <Input
                            label="Verification code"
                            value={totpCode}
                            onChange={(v) => setTotpCode(v.replace(/\D/g, "").slice(0, 6))}
                            placeholder="123456"
                            error={totpError}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <Button type="submit" variant="primary" size="sm" disabled={totpBusy || totpCode.length !== 6}>
                        {totpBusy ? (
                          <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Verifying…</>
                        ) : (
                          <><FontAwesomeIcon icon={faCheck} className="text-xs" /> Verify & enable</>
                        )}
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={handleCancelEnroll} disabled={totpBusy}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="mt-6 border-t border-line pt-6">
                    <Button variant="primary" size="sm" disabled={totpBusy} onClick={handleEnrollTotp}>
                      {totpBusy ? (
                        <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Setting up…</>
                      ) : (
                        <><FontAwesomeIcon icon={faPlus} className="text-xs" /> Add authenticator app</>
                      )}
                    </Button>
                    {totpError && (
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
                        <FontAwesomeIcon icon={faCircleExclamation} className="text-[0.6rem]" /> {totpError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {section === "notifications" && (
              <div className={card}>
                <h2 className="text-xl font-semibold text-ink">Notifications</h2>
                <p className="mt-1 text-sm text-mute">Choose which updates you'd like to receive via email.</p>
                <div className="mt-6 space-y-1 divide-y divide-line">
                  {[
                    { key: "updates" as const, label: "Product updates", desc: "New features, filter list improvements, and release notes.", checked: notifyUpdates, set: setNotifyUpdates },
                    { key: "tips" as const, label: "Tips & best practices", desc: "Guides on getting the most out of LibreGuard.", checked: notifyTips, set: setNotifyTips },
                    { key: "security" as const, label: "Security alerts", desc: "Important security notices and account activity.", checked: notifySecurity, set: setNotifySecurity },
                  ].map((item) => (
                    <label key={item.key} className="flex items-start gap-4 py-4 first:pt-0">
                      <div className="relative mt-0.5 flex h-5 w-10 shrink-0 cursor-pointer items-center">
                        <input type="checkbox" checked={item.checked} onChange={() => item.set(!item.checked)} className="peer sr-only" />
                        <span className="block h-5 w-10 rounded-full bg-mute/30 transition-colors peer-checked:bg-mint" />
                        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-all peer-checked:translate-x-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink">{item.label}</p>
                        <p className="mt-0.5 text-xs text-mute">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <Button variant="primary" size="sm" disabled={notifSaving} onClick={handleNotifSave}>
                    {notifSaving ? (
                      <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Saving…</>
                    ) : (
                      <><FontAwesomeIcon icon={faFloppyDisk} className="text-xs" /> Save preferences</>
                    )}
                  </Button>
                  {notifStatus === "saved" && (
                    <span className="flex items-center gap-1.5 text-sm text-mint">
                      <FontAwesomeIcon icon={faCheck} className="text-xs" /> Saved
                    </span>
                  )}
                  {notifStatus === "error" && (
                    <span className="flex items-center gap-1.5 text-sm text-red-500">
                      <FontAwesomeIcon icon={faCircleExclamation} className="text-xs" /> Failed to save
                    </span>
                  )}
                </div>
              </div>
            )}

            {section === "sessions" && (
              <div className={card}>
                <h2 className="text-xl font-semibold text-ink">Sessions</h2>
                <p className="mt-1 text-sm text-mute">Devices and browsers where you are signed in.</p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/10 text-mint">
                      <FontAwesomeIcon icon={faLaptop} className="text-sm" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-ink">{navigator.platform || "Browser"}</p>
                        <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[0.65rem] font-medium text-mint">Current</span>
                      </div>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-mute">
                        <FontAwesomeIcon icon={faClock} className="text-[0.55rem]" />
                        {user?.last_sign_in_at ? `Last active ${timeAgo(user.last_sign_in_at)}` : "Active now"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border-t border-line pt-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={signingOutOthers}
                    onClick={async () => {
                      setSigningOutOthers(true);
                      await signOutOthers();
                      setSignedOutOthers(true);
                      setSigningOutOthers(false);
                      setTimeout(() => setSignedOutOthers(false), 3000);
                    }}
                  >
                    {signingOutOthers ? (
                      <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Signing out…</>
                    ) : (
                      <><FontAwesomeIcon icon={faRightFromBracket} className="text-xs" /> Sign out of all other devices</>
                    )}
                  </Button>
                  {signedOutOthers && (
                    <span className="ml-3 inline-flex items-center gap-1.5 text-sm text-mint">
                      <FontAwesomeIcon icon={faCheck} className="text-xs" /> Other sessions signed out
                    </span>
                  )}
                </div>
              </div>
            )}

            {section === "danger" && (
              <div className={card}>
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-ink">Danger zone</h2>
                    <p className="mt-1 text-sm text-mute">Once you delete your account, there is no going back. Please be certain.</p>
                  </div>
                </div>
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                  <p className="text-sm font-medium text-ink">Delete your account</p>
                  <p className="mt-1 text-xs text-mute">
                    This permanently deletes your account, your profile data, and revokes all access. Extension data on your devices will not be affected.
                  </p>
                  {deleteError && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
                      <FontAwesomeIcon icon={faCircleExclamation} className="text-[0.6rem]" />
                      {deleteError}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-3">
                    <input
                      className="w-full max-w-xs rounded-lg border border-red-500/30 bg-card px-4 py-2 text-sm text-ink placeholder:text-mute focus:border-red-500 focus:outline-none transition-colors"
                      placeholder='Type "delete" to confirm'
                      value={confirmDelete}
                      onChange={(e) => setConfirmDelete(e.target.value)}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={confirmDelete !== "delete" || deleting}
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 disabled:opacity-40"
                      onClick={async () => {
                        setDeleting(true);
                        setDeleteError("");
                        try {
                          const { error } = await supabase.rpc("delete_user");
                          if (error) throw error;
                          await supabase.auth.signOut().catch(() => {});
                          window.location.href = "/";
                        } catch (err) {
                          setDeleteError(
                            "Account deletion is not available directly. Please email support@libreguard.app to request deletion.",
                          );
                        }
                        setDeleting(false);
                      }}
                    >
                      {deleting ? (
                        <><FontAwesomeIcon icon={faSpinner} className="text-xs animate-spin" /> Deleting…</>
                      ) : (
                        "Delete account"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
