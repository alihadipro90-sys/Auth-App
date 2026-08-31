import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Field from "../components/Field";
import { useAuth } from "../hooks/authContext";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (Object.values(form).some((value) => !value))
      return setError("Complete all fields to continue.");
    setError("");
    try {
      await register(form);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  }
  return (
    <AuthLayout
      eyebrow="Start here"
      title="Build your command center"
      detail="Create an admin workspace with secure, role-aware access for your whole team."
    >
      <form className="grid gap-5" onSubmit={submit}>
        <Field
          label="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Alex Mason"
        />
        <Field
          label="Work email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@company.com"
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="At least 8 characters"
        />
        {error && (
          <p className="text-sm font-semibold text-(--accent)">{error}</p>
        )}
        <button
          className="neo-button flex items-center justify-center gap-2 rounded-xl bg-(--accent) px-5 py-3 font-bold text-white"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <>
              Create workspace <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-(--muted)">
        Already have access?{" "}
        <Link className="font-bold text(--accent)" to="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
