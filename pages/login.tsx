import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../components/Spinner";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/account/orders");
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold">Login</h1>
      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn-primary flex justify-center"
        onClick={submit}
        disabled={loading}
      >
        {loading ? <Spinner /> : "Login"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      <p className="text-sm">
        New here?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Create an account
        </a>
      </p>
    </div>
  );
}
