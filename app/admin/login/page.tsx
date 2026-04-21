export const dynamic = "force-dynamic";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "amit2648") {
      localStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10 w-[300px]">

        <h1 className="text-xl font-bold mb-4">Admin Login</h1>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 bg-black border border-white/10 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-2 rounded"
        >
          Login
        </button>

      </div>
    </main>
  );
}