import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "./Header";
import Footer from "./Footer";

/* Reset scroll on every route change (anchors on the home page excepted). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.classList.remove("page-enter");
    void ref.current?.offsetWidth; /* force reflow */
    ref.current?.classList.add("page-enter");
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-canvas text-soft">
      <Analytics />
      <ScrollToTop />
      <Header />
      <div ref={ref} className="page-enter">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
