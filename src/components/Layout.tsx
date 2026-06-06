import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  return (
    <div className="relative min-h-screen bg-canvas text-soft">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
