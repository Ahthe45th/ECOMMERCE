import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password }),
    });
    if (res.ok) {
      router.push("/account/orders");
    } else {
      const text = await res.text();
      setError(text);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 space-y-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold">Sign Up</h1>
      <input
        className="input"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn-success" onClick={submit}>
        Sign Up
      </button>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
