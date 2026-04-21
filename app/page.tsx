import Link from "next/link";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-pink-600 blur-[150px] opacity-30 rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600 blur-[120px] opacity-20 rounded-full" />

      {/* HERO */}
      <section className="relative z-10 text-center px-6 pt-28 pb-20">
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Turn Your Memories Into <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Premium Gifts
          </span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
          Create QR video mugs, frames, cushions & more — personalized gifts your loved ones will never forget.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link href="/product/qr-mug">
            <button className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
              Create QR Mug 🎁
            </button>
          </Link>

          <Link href="/order">
            <button className="px-6 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              Order Now
            </button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-12">
          How It Works ⚡
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Upload your video or photo",
            "Generate QR instantly",
            "We print & deliver your gift"
          ].map((step, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center">
              <h3 className="font-semibold text-lg mb-2">Step {i + 1}</h3>
              <p className="text-gray-400">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-6 py-16 relative z-10">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Our Products 🛍️
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {products.map((product) => (
            <div
              key={product.id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:scale-105 transition"
            >

              <img
                src={product.image}
                alt={product.name}
                className="rounded-xl mb-4 h-48 w-full object-cover"
              />

              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-400 mt-2">{product.description}</p>

              <p className="mt-3 font-bold">{product.price}</p>

                {/* BUTTON LOGIC */}
        {product.slug === "qr-mug" ? (
          <Link href="/product/qr-mug">
            <button className="mt-3 w-full bg-white text-black py-2 rounded">
              Customize
            </button>
          </Link>
        ) : (
          <Link href={`/order?product=${product.name}`}>
            <button className="mt-3 w-full bg-white/10 border border-white/20 py-2 rounded">
              Order Now
            </button>
          </Link>
        )}

            </div>
          ))}

        </div>
      </section>

      {/* FEATURE HIGHLIGHT (QR MUG) */}
      <section className="px-6 py-20 text-center relative z-10">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-pink-500/20 to-purple-500/20 p-10 rounded-3xl border border-white/10">

          <h2 className="text-3xl font-bold mb-4">
            Our Best Seller 🔥
          </h2>

          <p className="text-gray-300 mb-6">
            QR Video Mug — scan and relive memories anytime. Perfect for birthdays, anniversaries & surprises.
          </p>

          <Link href="/product/qr-mug">
            <button className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition">
              Try QR Mug Now
            </button>
          </Link>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 relative z-10">
        <h2 className="text-3xl font-bold">
          Ready to Surprise Someone? 🎉
        </h2>

        <p className="text-gray-400 mt-3">
          Start creating your personalized gift today
        </p>

        <Link href="/product/qr-mug">
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Niman Prints • All rights reserved
      </footer>

    </main>
  );
}