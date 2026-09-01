import {
  Activity,
  ArrowUpRight,
  LockKeyhole,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { useAuth } from "../hooks/authContext";

const stats = [
  { label: "Total members", value: "24", change: "+12%", icon: UsersRound },
  { label: "Active today", value: "18", change: "+08%", icon: Activity },
  {
    label: "Verified accounts",
    value: "21",
    change: "+04%",
    icon: UserRoundCheck,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="animate-[fade-in_.4s_ease-out]">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-sm text-(--muted)">
            Good morning, {user?.name}.
          </p>
          <h2 className="text-xl font-bold">
            Here’s the pulse of your workspace.
          </h2>
        </div>
        <span className="hidden items-center gap-2 rounded-full bg-[#dcefe8] px-3 py-2 text-xs font-bold text-[#32725e] sm:flex">
          <LockKeyhole size={14} /> Protected session
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <article
            className="neo rounded-2xl bg-(--surface) p-5"
            key={label}
          >
            <div className="mb-7 flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-(--surface) text-(--accent) shadow-[inset_3px_3px_6px_#cbd0d8,inset_-3px_-3px_6px_#fff]">
                <Icon size={19} />
              </span>
              <span className="text-xs font-bold text-[#32725e]">{change}</span>
            </div>
            <p className="text-sm text-(--muted)">{label}</p>
            <p className="mt-1 text-3xl font-bold">{value}</p>
          </article>
        ))}
      </div>
      <section className="neo mt-7 rounded-2xl bg-(--surface) p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-(--accent)">
              Access health of App
            </p>
            <h3 className="mt-2 text-xl font-bold">
              Permissions are in good shape
            </h3>
          </div>
          <ArrowUpRight className="text-(--muted)" size={20} />
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-3xl font-bold">87%</p>
            <p className="mt-1 text-sm text-(--muted)">MFA adoption</p>
          </div>
          <div>
            <p className="text-3xl font-bold">04</p>
            <p className="mt-1 text-sm text-(--muted)">Pending invites</p>
          </div>
          <div>
            <p className="text-3xl font-bold">02</p>
            <p className="mt-1 text-sm text-(--muted)">Roles configured</p>
          </div>
        </div>
      </section>
    </div>
  );
}
