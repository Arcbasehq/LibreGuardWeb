import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Download from "./pages/Download";
import Docs from "./pages/Docs";
import Changelog from "./pages/Changelog";
import Roadmap from "./pages/Roadmap";
import FilterLists from "./pages/FilterLists";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
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
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />
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
