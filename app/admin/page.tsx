"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Order = {
    id: string;
    name: string;
    phone: string;
    address: string;
    video_url: string;
    product: string;
    status: string;
    created_at: string;
};

export default function AdminPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        const { data } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setOrders(data);
        setLoading(false);
    };

    const router = useRouter();

    useEffect(() => {
        const auth = localStorage.getItem("admin");
        if (!auth) {
            router.push("/admin/login");
        }
        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);



    const updateStatus = async (id: string, status: string) => {
        await supabase.from("orders").update({ status }).eq("id", id);
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusColor = (status: string) => {
        if (status === "pending") return "bg-yellow-500 text-black";
        if (status === "processing") return "bg-blue-500 text-white";
        if (status === "delivered") return "bg-green-500 text-black";
        return "bg-gray-500";
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white p-6">

            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard 📊</h1>
                <p className="text-gray-400">Manage all QR Mug orders</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

                <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/10">
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <h2 className="text-2xl font-bold">{orders.length}</h2>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-gray-400 text-sm">Pending</p>
                    <h2 className="text-2xl font-bold text-yellow-400">
                        {orders.filter(o => o.status === "pending").length}
                    </h2>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-gray-400 text-sm">Processing</p>
                    <h2 className="text-2xl font-bold text-blue-400">
                        {orders.filter(o => o.status === "processing").length}
                    </h2>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-gray-400 text-sm">Delivered</p>
                    <h2 className="text-2xl font-bold text-green-400">
                        {orders.filter(o => o.status === "delivered").length}
                    </h2>
                </div>

            </div>
            {/* ORDERS */}
            {loading ? (
                <p>Loading orders...</p>
            ) : (
                <div className="grid gap-6">

                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md"
                        >

                            {/* TOP INFO */}
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-semibold text-lg">{order.name}</h3>

                                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </div>

                            <p className="text-gray-400 text-sm">📞 {order.phone}</p>
                            <p className="text-gray-400 text-sm">📍 {order.address}</p>
                            <p className="text-gray-400 text-sm">📦 {order.product}</p>

                            <a
                                href={order.video_url}
                                target="_blank"
                                className="text-blue-400 text-sm underline block mt-2"
                            >
                                Watch Video
                            </a>

                            {/* ACTIONS */}
                            <div className="flex gap-2 mt-4 flex-wrap">

                                <button
                                    onClick={() => updateStatus(order.id, "pending")}
                                    className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm"
                                >
                                    Pending
                                </button>

                                <button
                                    onClick={() => updateStatus(order.id, "processing")}
                                    className="px-3 py-1 bg-blue-500 rounded-full text-sm"
                                >
                                    Processing
                                </button>

                                <button
                                    onClick={() => updateStatus(order.id, "delivered")}
                                    className="px-3 py-1 bg-green-500 text-black rounded-full text-sm"
                                >
                                    Delivered
                                </button>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </main>
    );
}