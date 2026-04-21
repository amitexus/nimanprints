import { products } from "@/data/products";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: any) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) return notFound();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-400 mt-2">{product.description}</p>
      <p className="mt-4 text-xl font-bold">{product.price}</p>
    </main>
  );
}