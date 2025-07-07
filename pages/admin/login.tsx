import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input
        className="input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
    </div>
  );
}
