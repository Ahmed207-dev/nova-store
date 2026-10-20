"use client";
import { FaBars } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
type Data_type = {
  username: string;
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const PathName = usePathname();
  const isActive = (path: string) =>
    PathName === path
      ? "text-cyan-400 hover:text-cyan-400 transition-colors"
      : "text-slate-300 hover:text-cyan-400 transition-colors";

  const router = useRouter();

  const User =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const Data: Data_type = User ? JSON.parse(User) : null;

  const HandleLogOut = () => {
    const isConform = window.confirm("Are You Sure Log Out?");
    if (!isConform) {
      return;
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    router.refresh();
    router.replace("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className=" rounded-xl bg-Gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white text-lg font-bold ">
              NovaStore
            </span>
            <span className="text-2xl font-black tracking-tight bg-Gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              DevBrand
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className={isActive("/")}>
                Home
              </Link>
              <Link href="/artcale" className={isActive("/artcale")}>
                artcale
              </Link>
              <Link href="/cart" className={isActive("/cart")}>
                cart
              </Link>

              <Link href="/proudct" className={isActive("/proudct")}>
                proudct
              </Link>
            </div>

            {token ? (
              <div
                className="flex items-center gap-1 text-white cursor-pointer "
                onClick={() => setDropDown(!dropDown)}
              >
                <h1 className="relative">{Data.username}</h1>
                <span>
                  <IoMdArrowDropdown />
                </span>
                {dropDown && (
                  <div className="absolute top-16 bg-white/20 p-4 flex items-center gap-2 flex-col">
                    <Link
                      className="text-sm duration-300 hover:bg-white/10 p-1"
                      href={`/profile`}
                    >
                      Profile
                    </Link>
                    <button
                      className="text-red-400 duration-300 hover:bg-white/10 p-1 text-sm  cursor-pointer"
                      onClick={HandleLogOut}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
                <Link
                  href="/log-in"
                  className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 focus:outline-none transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <IoIosCloseCircle size={25} /> : <FaBars size={25} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 ">
          <Link
            onClick={() => setIsOpen(false)}
            href="/"
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Home
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            href="/artcale"
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            artcale
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/proudct"
            className="block px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
          >
            proudct
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/cart"
            className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800 border-b border-b-white/10"
          >
            cart
          </Link>
          {token ? (
            <div className="flex items-center gap-5 text-white">
              <h1 onClick={() => setIsOpen(false)}>{Data.username} </h1>
              <Link
                className="text-sm duration-300 hover:bg-white/10 p-1"
                href={`/profile`}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                className="bg-red-500 p-2 rounded-lg text-sm cursor-pointer"
                onClick={HandleLogOut}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-800">
              <Link
                href="/log-in"
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                Login
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                href="/register"
                className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-slate-800/60 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
export default Navbar;
