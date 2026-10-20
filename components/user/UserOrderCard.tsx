import { FiPackage } from "react-icons/fi";

export interface OrderType {
  documentId: string;
  total: number;
  createdAt?: string;
  status?: string;
}

interface ComponentProps {
  item: OrderType;
}

const UserOrderCard = ({ item }: ComponentProps) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-2xl flex flex-col justify-between gap-4 shadow-lg hover:border-slate-700 transition-all duration-200">
      <div className="flex justify-between items-center pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
            <FiPackage size={20} />
          </div>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 capitalize">
          {item.status || "Pending"}
        </span>
      </div>

      <div className="flex justify-end items-center">
        <div className="text-right">
          <p className="text-xs text-slate-400">Total Amount</p>
          <p className="text-xl font-extrabold text-indigo-400">
            ${item.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
