import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children, eyebrow, title, detail }) {
  return (
    <main className="grid min-h-screen place-items-center bg-(--surface) px-5 py-10">
      <section className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <span className="neo grid h-11 w-11 place-items-center rounded-xl bg-(--accent) text-white">
            <ShieldCheck size={23} />
          </span>
          <div>
            <p className="font-bold">northstar</p>
            <p className="text-[10px] uppercase tracking-[.22em] text-(--muted)">
              control room
            </p>
          </div>
        </div>
        <div className="neo rounded-3xl bg-(--surface) p-7 sm:p-9">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-(--accent)">
            {eyebrow}
          </p>
          <h1 className="mb-2 text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mb-8 text-sm leading-6 text-(--muted)">{detail}</p>
          {children}
        </div>
      </section>
    </main>
  );
}
