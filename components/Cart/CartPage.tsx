"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";

interface CartItem {
  documentId: string;
  quantity: string;
  proudct: {
    title: string;
    price: string;
    description: string;
  };
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const Data = async () => {
    try {
      const userRaw =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!userRaw || !token) {
        return;
      }

      const userdata = JSON.parse(userRaw);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/carts?populate=*&filters[users_permissions_user][documentId][$eq]=${userdata?.documentId}`, //
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed To Cart: ${res.status}`);
      }

      const data = await res.json();
      console.log(data.data);
      setCartItems(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Data();
  }, []);

  const HandleDelete = async (id: string) => {
    const isConfirmed = window.confirm(`Are You sure You Delete?`);

    if (!isConfirmed) return;
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/carts/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Failed To Cart: ${res.status}`);
      }
      if (res.status === 204) {
        alert("Delete Sucess");
        setCartItems((prev) => prev.filter((item) => item.documentId !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAll = async () => {
    if (cartItems?.length === 0) {
      alert("No Data To Delete");
      return;
    }
    const isConfirmed = window.confirm(`Are You sure You Delete?`);

    if (!isConfirmed) return;
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      await Promise.all(
        cartItems.map((item) =>
          fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/carts/${item.documentId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          ),
        ),
      );
      setCartItems([]);
      alert("Cart Cleared Successfully!");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart");
    }
  };
  const total = cartItems.reduce((acc: any, cur) => {
    return acc + Number(cur.proudct?.price || 0);
  }, 0);
  if (typeof window !== "undefined") {
    localStorage.setItem("total", String(total));
  }
  return (
    <div className="min-h-screen bg-[#070a13] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline space-x-3 mb-8 ">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <span className="text-gray-400 text-lg">
            ({cartItems?.length} Items)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-2 space-y-4 bg-[#111726] border border-gray-800 rounded-xl p-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.documentId}
                  className="bg-[#111726] border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:border-gray-700"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div>
                      <h3 className="font-semibold text-lg text-white">
                        {item.proudct.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-1">
                        {item.proudct.description}
                      </p>
                      <p className="text-base font-medium text-white">
                        ${item.proudct.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <button
                      className="text-red-500 cursor-pointer"
                      onClick={() => HandleDelete(item.documentId)}
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-center">No proudct</h1>
            )}

            <div className="pt-4 flex justify-between">
              <Link
                href="/proudct"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium transition"
              >
                <FiArrowLeft size={16} />
                Continue Shopping
              </Link>
              <button
                className="bg-red-600 p-2 rounded-lg cursor-pointer duration-300 hover:bg-red-400"
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          </div>

          <div className="bg-[#111726] border border-gray-800 rounded-2xl p-6 h-fit shadow-xl flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-6 text-white">Price</h2>

            <div className="flex justify-between items-center text-lg font-bold mb-6 text-white">
              <span>
                Total : <span className="text-indigo-500">{total} $</span>
              </span>
            </div>

            <Link
              href={`/checkout`}
              className="w-full bg-indigo-600 hover:opacity-90 text-white font-semibold py-3 rounded-xl shadow-lg transition duration-200 flex justify-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
