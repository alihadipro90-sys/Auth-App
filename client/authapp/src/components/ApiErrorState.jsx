import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ApiErrorState({ message, onRetry }) {
  return (
    <section className="neo mx-auto max-w-xl rounded-2xl bg-(--surface) p-8 text-center sm:p-12">
      <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-[#fff0eb] text-(--accent)">
        <AlertTriangle size={26} />
      </span>
      <h2 className="mb-3 text-2xl font-bold">
        We could not load this workspace
      </h2>
      <p className="mx-auto mb-7 max-w-md text-sm leading-6 text-(--muted)">
        {message}
      </p>
      <button
        className="neo-button mx-auto flex items-center gap-2 rounded-xl bg-(--ink) px-5 py-3 text-sm font-bold text-white"
        onClick={onRetry}
      >
        <RefreshCw size={17} /> Try again
      </button>
    </section>
  );
}
