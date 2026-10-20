import { FaHeart, FaShoppingBag } from "react-icons/fa";
import Link from "next/link";

const GetlengthProudcts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/wishlists`,
  );
  const data = await res.json();
  return data.data.length;
};
const GetlengthOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`);
  const data = await res.json();
  return data.data.length;
};

const UserActivityCards = async () => {
  const [lengthProudcts, lengthOrders] = await Promise.all([
    GetlengthProudcts(),
    GetlengthOrders(),
  ]);
  return (
    <div className="bg-slate-950 text-slate-100 flex flex-col gap-4 w-full">
      <Link
        href="/profile/wishlist"
        className="w-full bg-slate-800/40 border border-slate-700/60 backdrop-blur-md rounded-2xl p-5 flex items-center justify-between shadow-lg hover:border-slate-500 transition-all duration-300 cursor-pointer hover:scale-[1.01]"
      >
        <div>
          <p className="text-sm font-medium text-slate-400">Wishlist</p>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            {lengthProudcts || 0}
          </h2>
        </div>
        <div className="bg-pink-500/10 border border-pink-500/20 p-3.5 rounded-xl text-pink-400">
          <FaHeart size={22} />
        </div>
      </Link>

      <Link
        href="/profile/order"
        className="w-full bg-slate-800/40 border border-slate-700/60 rounded-2xl p-5 flex items-center justify-between shadow-lg hover:border-slate-500 transition-all duration-300 cursor-pointer hover:scale-[1.01]"
      >
        <div>
          <p className="text-sm font-medium text-slate-400">Orders</p>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            {lengthOrders || 0}
          </h2>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/20 p-3.5 rounded-xl text-indigo-400">
          <FaShoppingBag size={22} />
        </div>
      </Link>
    </div>
  );
};

export default UserActivityCards;
