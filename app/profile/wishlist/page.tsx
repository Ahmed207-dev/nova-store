"use client";

import { useEffect, useState } from "react";
import UserProudctWishlist, {
  UserProudctWishlistType,
} from "@/components/user/UserProudctWishlist";

const WishlistPage = () => {
  const [products, setProducts] = useState<UserProudctWishlistType[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
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
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/wishlists?filters[users_permissions_user][documentId][$eq]=${userData.documentId}&populate=proudct`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.ok) {
          const result = await res.json();
          setProducts(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <UserProudctWishlist
              key={item.documentId}
              item={item}
              onRemove={(deletedId) => {
                setProducts((prev) =>
                  prev.filter((p) => p.documentId !== deletedId),
                );
              }}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-400">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
