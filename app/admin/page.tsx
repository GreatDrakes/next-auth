"use client";
import { useSession, signOut } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <p className="mt-2">
        Hello, <strong>{session?.user?.name}</strong> — you have admin access.
      </p>
      <p className="mt-1">Your roles: {session?.user?.roles?.join(", ") || "none"}</p>

      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
}
