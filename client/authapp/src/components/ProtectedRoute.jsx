import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/authContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="grid min-h-screen place-items-center bg(--surface) text-sm font-semibold text-(--muted)">
        Checking your session...
      </div>
    );
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
