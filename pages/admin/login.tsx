import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
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
  };

  return (
    <div className="max-w-sm mx-auto p-4 space-y-2">
      <h1 className="text-xl font-bold">Admin Login</h1>
      <input
        className="border p-2 w-full"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={submit}
      >
        Login
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
