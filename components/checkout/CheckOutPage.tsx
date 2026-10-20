"use client";

import { FiTruck, FiLock, FiCheckCircle } from "react-icons/fi";

type Data_type = {
  username: string;
  documentId: string;
};

const CheckOutPage = () => {
  const User =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const total =
    typeof window !== "undefined" ? localStorage.getItem("total") : null;
  const userData: Data_type = User ? JSON.parse(User) : null;

  const onSubmit = async () => {
    if (Number(total) === 0) {
      alert("No Orders");
      return;
    }
    if (!token || !userData?.documentId) {
      alert("Please log in first");
      return;
    }

    try {
      const resOrder = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              users_permissions_user: userData.documentId,
              total: Number(total) || 0,
            },
          }),
        },
      );

      if (!resOrder.ok) {
        const err = await resOrder.json();
        console.error("Order Failed:", err);
        alert("Failed to place order");
        return;
      } else if (resOrder.ok) {
        localStorage.removeItem("total");
        window.location.replace("/profile/order");
      }

      const resCart = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/carts?filters[users_permissions_user][documentId][$eq]=${userData.documentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (resCart.ok) {
        const cartData = await resCart.json();
        const cartItems = cartData.data || [];

        await Promise.all(
          cartItems.map((item: { documentId: string }) =>
            fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/carts/${item.documentId}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
          ),
        );
      }
      alert("Order Placed Successfully");
    } catch (error) {
      console.error("Execution Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Checkout
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Confirm your order details to proceed with delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* قسم طريقة الدفع والتوصيل */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-6 pb-3 border-b border-slate-800">
                <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                  <FiTruck size={20} />
                </div>
                <h2 className="text-xl font-bold text-white">Payment Method</h2>
              </div>

              {/* كارت الدفع عند الاستلام فقط */}
              <div className="p-5 rounded-xl border border-indigo-500/50 bg-indigo-500/10 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl">
                    <FiTruck size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-white">
                      Cash on Delivery
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pay in cash when your order arrives at your doorstep.
                    </p>
                  </div>
                </div>
                <FiCheckCircle size={22} className="text-indigo-400 shrink-0" />
              </div>
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl p-6 shadow-xl sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6 pb-3 border-b border-slate-800">
                Order Summary
              </h2>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">
                    ${total || 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-emerald-400">Free</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold text-white">\$0.00</span>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                  <span className="text-base font-bold text-white">Total</span>
                  <span className="text-2xl font-extrabold text-indigo-400">
                    ${total || 0}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                onClick={onSubmit}
              >
                <FiLock size={18} />
                <span>Place Order</span>
              </button>

              <p className="text-xs text-slate-500 text-center mt-4 flex items-center justify-center gap-1">
                <FiLock size={12} /> Encrypted & Secure Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
