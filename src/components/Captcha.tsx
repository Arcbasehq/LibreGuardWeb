import { forwardRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

/* Official hCaptcha test sitekey — passes on localhost, always verifies.
   Real sitekey rejects localhost, so use the test key in dev. */
const TEST_SITE_KEY = "10000000-ffff-ffff-ffff-000000000001";
const siteKey = import.meta.env.DEV
  ? TEST_SITE_KEY
  : import.meta.env.VITE_HCAPTCHA_SITE_KEY || TEST_SITE_KEY;

type Props = {
  onVerify: (token: string) => void;
  onExpire?: () => void;
};

/* Forwards a ref to the underlying widget so callers can `.resetCaptcha()`
   after a submit — tokens are single-use. */
const Captcha = forwardRef<HCaptcha, Props>(function Captcha(
  { onVerify, onExpire },
  ref,
) {
  return (
    <div className="flex justify-center">
      <HCaptcha
        ref={ref}
        sitekey={siteKey}
        theme="dark"
        onVerify={onVerify}
        onExpire={onExpire}
      />
    </div>
  );
});

export default Captcha;
