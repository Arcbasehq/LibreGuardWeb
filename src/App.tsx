import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Download from "./pages/Download";
import Docs from "./pages/Docs";
import Changelog from "./pages/Changelog";
import Roadmap from "./pages/Roadmap";
import FilterLists from "./pages/FilterLists";
import Support from "./pages/Support";
import Status from "./pages/Status";
import License from "./pages/License";
import Privacy from "./pages/Privacy";
import Contribute from "./pages/Contribute";
import NotFound from "./pages/NotFound";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="download" element={<Download />} />
        <Route path="docs" element={<Docs />} />
        <Route path="changelog" element={<Changelog />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="filter-lists" element={<FilterLists />} />
        <Route path="support" element={<Support />} />
        <Route path="status" element={<Status />} />
        <Route path="license" element={<License />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="contribute" element={<Contribute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
