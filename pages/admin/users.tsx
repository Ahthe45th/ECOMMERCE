import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface User { username: string }

export default function ManageUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const load = async () => {
    const res = await fetch('/api/admin/users');
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => { load(); }, []);

  const addUser = async () => {
    await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    setUsername('');
    setPassword('');
    load();
  };

  const removeUser = async (name: string) => {
    await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: name }),
    });
    load();
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">Manage Admin Users</h1>
      <div className="space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border p-2 w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addUser}>
          Add User
        </button>
      </div>
      <ul className="space-y-1">
        {users.map(u => (
          <li key={u.username} className="flex justify-between border p-2">
            {u.username}
            <button className="text-red-600" onClick={() => removeUser(u.username)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
