"use client";

import { useEffect, useState } from "react";
import UserOrderCard, { OrderType } from "@/components/user/UserOrderCard";

const OrdersPage = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const userRaw =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const userData = userRaw ? JSON.parse(userRaw) : null;

      if (!userData?.documentId || !token) {
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders?filters[users_permissions_user][documentId][$eq]=${userData.documentId}&sort=createdAt:desc`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          const result = await res.json();
          setOrders(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((item) => (
            <UserOrderCard key={item.documentId} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-slate-400">You have no orders yet.</p>
      )}
    </div>
  );
};

export default OrdersPage;
