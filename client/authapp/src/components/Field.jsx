export default function Field({ label, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-(--ink)">
      <span>{label}</span>
      <input
        className="neo-inset w-full rounded-xl border-0 bg-(--surface) px-4 py-3 text-sm font-normal outline-none transition focus:ring-2 focus:ring(--accent)/50"
        {...props}
      />
    </label>
  );
}
