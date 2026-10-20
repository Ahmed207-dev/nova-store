"use client";

import Link from "next/link";
import { BiErrorCircle } from "react-icons/bi";
import { FiHome, FiRotateCcw } from "react-icons/fi";

interface ErrorProps {
  error: Error;
  reset?: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center items-center p-4">
      <div className="max-w-md w-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl rounded-2xl p-8 text-center shadow-2xl shadow-red-950/20 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mb-5 shadow-inner">
          <BiErrorCircle size={36} />
        </div>

        {/* العنوان */}
        <h1 className="text-2xl font-extrabold text-white tracking-tight mb-2">
          Something Went Wrong!
        </h1>

        {/* تفاصيل الخطأ */}
        <div className="bg-slate-950/70 border border-red-500/20 rounded-xl p-3.5 mb-6 text-left">
          <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
            Error Details
          </p>
          <p className="text-sm text-slate-300 font-mono  line-clamp-3">
            {error?.message || "An unexpected error occurred."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {reset && (
            <button
              onClick={() => reset()}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2.5 px-4 rounded-xl border border-slate-700 transition-all duration-200 active:scale-95 text-sm cursor-pointer"
            >
              <FiRotateCcw size={16} />
              Try Again
            </button>
          )}

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-red-600/25 transition-all duration-200 active:scale-95 text-sm"
          >
            <FiHome size={16} />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
