"use client";

import { useState } from "react";
import QRCode from "qrcode";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function QRMug() {
  const [video, setVideo] = useState<File | null>(null);
  const [qr, setQr] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUploadAndQR = async () => {
    if (!video) {
      alert("Please upload a video");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${video.name}`;

      // Upload to Supabase
      const { error } = await supabase.storage
        .from("videos")
        .upload(fileName, video);

      if (error) throw error;

      // Get public URL
      const { data } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      const url = data.publicUrl;
      setVideoURL(url);

      // Generate QR
      const qrCode = await QRCode.toDataURL(url);
      setQr(qrCode);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">QR Video Mug 🎁</h1>
        <p className="text-gray-400 mt-1">
          Upload video → Generate QR → Print on mug
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
        
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          className="mb-4 text-sm"
        />

        <button
          onClick={handleUploadAndQR}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          {loading ? "Generating..." : "Generate QR Code"}
        </button>

      </div>

      {/* QR RESULT */}
      {qr && (
        <div className="mt-10 text-center animate-fade-in">

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl inline-block backdrop-blur-md">
            <p className="text-gray-300 mb-3">Your QR Code</p>
            <img src={qr} alt="QR Code" className="w-48 mx-auto" />
          </div>

          {/* VIDEO PREVIEW LINK */}
          <div className="mt-4">
            <a
              href={videoURL}
              target="_blank"
              className="text-blue-400 underline text-sm"
            >
              Preview Video
            </a>
          </div>

          {/* 🔥 CONTINUE TO ORDER BUTTON (IMPORTANT FEATURE) */}
          <div className="mt-8">
            <Link href={`/order?video=${encodeURIComponent(videoURL)}`}>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transition shadow-lg">
                Continue to Order →
              </button>
            </Link>
          </div>

        </div>
      )}

    </main>
  );
}