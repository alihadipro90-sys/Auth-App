import { useState } from "react";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import Field from "../components/Field";
import { useAuth } from "../hooks/authContext";
import { useUsers } from "../hooks/useUsers";
import ApiErrorState from "../components/ApiErrorState";

export default function Users() {
  const { user } = useAuth();
  const { users, error, loading, reload, createUser, updateUser, deleteUser } = useUsers();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const filtered = users.filter((item) =>
    `${item.name} ${item.email}`.toLowerCase().includes(query.toLowerCase()),
  );
  async function save(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      editing?._id ? await updateUser(editing._id, data) : await createUser(data);
      setEditing(null);
    } catch { /* The hook exposes the server error in the page state. */ }
  }
  if (loading) return <div className="neo rounded-2xl bg-(--surface) p-12 text-center text-sm font-semibold text-(--muted)">Loading members...</div>;
  if (error && users.length === 0) return <ApiErrorState message={error} onRetry={reload} />;
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-lg text-sm leading-6 text-(--muted)">
          Manage identity, role access, and workspace membership from one place.
        </p>
        {user?.role === "Admin" && (
          <button
            className="neo-button flex items-center justify-center gap-2 rounded-xl bg-(--ink) px-4 py-3 text-sm font-bold text-white"
            onClick={() => setEditing({})}
          >
            <Plus size={17} /> Add member
          </button>
        )}
      </div>
      {error && (
        <p className="mb-4 rounded-xl bg-[#fff0eb] px-4 py-3 text-sm font-semibold text-(--accent)">
          {error}
        </p>
      )}
      <div className="neo rounded-2xl bg-(--surface) p-4 sm:p-6">
        <div className="neo-inset mb-5 flex max-w-sm items-center gap-3 rounded-xl bg-(--surface) px-4 py-2">
          <Search size={17} className="text-(--muted)" />
          <input
            className="w-full border-0 bg-transparent py-1 text-sm outline-none"
            placeholder="Search members"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-left text-sm">
            <thead className="border-b border-(--line) text-xs uppercase tracking-wider text-(--muted)">
              <tr>
                <th className="pb-3 font-semibold">Member</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Joined</th>
                <th className="pb-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  className="border-b border-(--line) last:border-0"
                  key={item._id}
                >
                  <td className="py-4">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-(--muted)">{item.email}</p>
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-[#dfe3e9] px-3 py-1 text-xs font-bold">
                      {item.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-semibold text-[#32725e]">
                      ● {item.status}
                    </span>
                  </td>
                  <td className="py-4 text-(--muted)">{item.joined}</td>
                  <td className="py-4 text-right">
                    {user?.role === "Admin" && (
                      <span className="inline-flex gap-1">
                        <button
                          className="icon-button"
                          title="Edit member"
                          onClick={() => setEditing(item)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="icon-button text-(--accent)"
                          title="Delete member"
                          onClick={() => deleteUser(item._id).catch(() => {})}
                        >
                          <Trash2 size={16} />
                        </button>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editing && (
        <div className="fixed inset-0 z-10 grid place-items-center bg-(--ink)/20 px-5">
          <form
            className="neo w-full max-w-md rounded-2xl bg-(--surface) p-7"
            onSubmit={save}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {editing._id ? "Edit member" : "Add member"}
              </h2>
              <button
                type="button"
                className="icon-button"
                onClick={() => setEditing(null)}
                aria-label="Close"
              >
                <X size={19} />
              </button>
            </div>
            <div className="grid gap-4">
              <Field
                label="Name"
                name="name"
                defaultValue={editing.name || ""}
                required
              />
              <Field
                label="Email"
                name="email"
                type="email"
                defaultValue={editing.email || ""}
                required
              />
              <label className="grid gap-2 text-sm font-semibold">
                Role
                <select
                  className="neo-inset rounded-xl border-0 bg-(--surface) px-4 py-3 outline-none"
                  name="role"
                  defaultValue={editing.role || "Viewer"}
                >
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </label>
              <button className="neo-button mt-2 rounded-xl bg-(--accent) px-5 py-3 font-bold text-white">
                Save member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
