import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, LoaderCircle } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Field from "../components/Field";
import { useAuth } from "../hooks/authContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (!form.email || !form.password)
      return setError("Enter your email and password.");
    setError("");
    try {
      await login(form);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message);
    }
  }
  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Sign in to your workspace"
      detail="Your team’s work, permissions, and people in one calm control room."
    >
      <form className="grid gap-5" onSubmit={submit}>
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
          placeholder="••••••••"
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
              Enter workspace <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>
      <p className="mt-7 text-center text-sm text-(--muted)">
        New to northstar?{" "}
        <Link className="font-bold text(--accent)" to="/register">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
