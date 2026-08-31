import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, LogOut, ShieldCheck, UsersRound } from "lucide-react";
import { useAuth } from "../hooks/authContext";

export default function AppShell() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const title = location.pathname === "/users" ? "Users" : "Overview";
  return (
    <div className="min-h-screen bg-(--surface) lg:flex">
      <aside className="flex w-full flex-col border-b border-(--line) px-5 py-5 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:px-6 lg:py-8">
        <div className="mb-8 flex items-center justify-between lg:mb-16">
          <div className="flex items-center gap-3">
            <span className="neo flex h-10 w-10 items-center justify-center rounded-xl bg-(--accent) text-white">
              <ShieldCheck size={21} />
            </span>
            <div>
              <p className="font-bold tracking-tight">northstar</p>
              <p className="text-[10px] uppercase tracking-[.22em] text-(--muted)">
                control room
              </p>
            </div>
          </div>
          <button
            className="icon-button lg:hidden"
            aria-label="Sign out"
            onClick={logout}
          >
            <LogOut size={18} />
          </button>
        </div>
        <nav className="flex gap-2 lg:grid lg:gap-3">
          <NavLink className="nav-link" to="/dashboard">
            <LayoutDashboard size={18} />
            Overview
          </NavLink>
          <NavLink className="nav-link" to="/users">
            <UsersRound size={18} />
            Users
          </NavLink>
        </nav>
        <div className="mt-auto hidden border-t border-(--line) pt-5 lg:block">
          <div className="mb-5 flex items-center gap-3">
            <div className="avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{user?.name}</p>
              <p className="truncate text-xs text-(--muted)">
                {user?.email}
              </p>
            </div>
          </div>
          <button className="nav-link w-full" onClick={logout}>
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-5 py-7 sm:px-8 lg:px-14 lg:py-12">
        <header className="mb-10 flex items-start justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[.24em] text-(--accent)">
              Workspace / 2026
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text(--muted)">{user?.role} access</p>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
