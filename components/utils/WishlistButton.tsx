"use client";

import { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

type Data_type = {
  username: string;
  documentId: string;
};

interface WishlistButtonProps {
  id: string;
  initialWishlistId?: string | null;
  initialAdd?: boolean;
  onRemove?: () => void;
}

const WishlistButton = ({
  id,
  initialWishlistId = null,
  initialAdd = false,
  onRemove,
}: WishlistButtonProps) => {
  const [add, setAdd] = useState(initialAdd || !!initialWishlistId);
  const [wishlistId, setWishlistId] = useState<string | null>(
    initialWishlistId,
  );

  useEffect(() => {
    if (initialWishlistId) {
      setWishlistId(initialWishlistId);
      setAdd(true);
      return;
    }

    const checkIsWishlisted = async () => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const userRaw =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const user: Data_type | null = userRaw ? JSON.parse(userRaw) : null;

      if (!token || !user?.documentId || !id) {
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/wishlists?filters[users_permissions_user][documentId][$eq]=${user.documentId}&filters[proudct][documentId][$eq]=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) return;
        const data = await res.json();
        if (data?.data && data.data.length > 0) {
          setAdd(true);
          setWishlistId(data.data[0].documentId);
        }
      } catch (error) {
        console.error("Error checking wishlist state:", error);
      }
    };

    checkIsWishlisted();
  }, [id, initialWishlistId]);

  const HandleClick = async () => {
    const User =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const Data: Data_type = User ? JSON.parse(User) : null;

    try {
      if (!token) {
        alert("Log In First");
      }
      if (!add) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/wishlists?populate=*`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              data: { users_permissions_user: Data?.documentId, proudct: id },
            }),
          },
        );

        if (!res.ok) return;
        if (res.status === 201) alert("Added To wishlist");

        const data = await res.json();
        setWishlistId(data.data.documentId);
        setAdd(true);
      } else {
        if (!wishlistId) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/wishlists/${wishlistId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) return;
        if (res.status === 204) alert("Deleted From wishlist");

        setWishlistId(null);
        setAdd(false);

        if (onRemove) onRemove();
      }
    } catch (error) {
      console.error("Execution error:", error);
    }
  };

  return (
    <div>
      {add ? (
        <div className="cursor-pointer">
          <FaHeart className="text-red-600" size={24} onClick={HandleClick} />
        </div>
      ) : (
        <div className="cursor-pointer">
          <CiHeart size={28} onClick={HandleClick} />
        </div>
      )}
    </div>
  );
};

export default WishlistButton;
