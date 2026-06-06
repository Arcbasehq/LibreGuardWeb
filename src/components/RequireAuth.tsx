import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";

/* Guards authed-only pages. While the session is resolving we render nothing;
   once resolved, a missing user (incl. after logout) is redirected home. */
export default function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}
