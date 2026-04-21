"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function OrderClient() {
 const searchParams = useSearchParams();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    video_url: "",
    product: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ AUTO-FILL FROM URL
  useEffect(() => {
    const product = searchParams.get("product");
    const video = searchParams.get("video");

    if (product) {
      setForm((prev) => ({ ...prev, product }));
    }

    if (video) {
      setForm((prev) => ({ ...prev, video_url: video }));
    }
  }, [searchParams]);

  // 🚀 SUBMIT ORDER
  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("orders").insert([
      {
        name: form.name,
        phone: form.phone,
        address: form.address,
        video_url: form.video_url,
        product: form.product || "QR Mug",
        status: "pending",
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Order failed");
    } else {
      setSuccess(true);
    }
  };

  // 🎉 SUCCESS SCREEN
  if (success) {
    const message = `New Order:
Name: ${form.name}
Phone: ${form.phone}
Product: ${form.product || "QR Mug"}
Address: ${form.address}
Video: ${form.video_url}`;

    const whatsappURL = `https://wa.me/9779844042407?text=${encodeURIComponent(message)}`;

    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

        <div className="text-center bg-white/5 border border-white/10 p-10 rounded-2xl">

          <h1 className="text-2xl font-bold text-green-400">
            Order Placed Successfully 🎉
          </h1>

          <p className="text-gray-400 mt-2">
            Product: {form.product || "QR Mug"}
          </p>

          <a href={whatsappURL} target="_blank">
            <button className="mt-6 bg-green-500 px-6 py-3 rounded-full text-black font-semibold">
              Confirm on WhatsApp 📲
            </button>
          </a>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Complete Your Order 🛒</h1>
        <p className="text-gray-400">
          Product: <span className="text-white">{form.product || "QR Mug"}</span>
        </p>
      </div>

      {/* FORM */}
      <div className="space-y-4 bg-white/5 border border-white/10 p-6 rounded-2xl">

        <input
          placeholder="Your Name"
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Delivery Address"
          className="w-full p-3 bg-black border border-white/10 rounded-lg"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Video URL (optional)"
          value={form.video_url}
          readOnly
          className="w-full p-3 bg-black border border-white/10 rounded-lg text-gray-400"
        />

        {/* ORDER BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </main>
  );
}