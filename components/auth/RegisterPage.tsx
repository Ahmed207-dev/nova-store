"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";

const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      },
    );
    if (res.status === 200) {
      alert("regiser sucess");
      router.replace("/log-in");
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-8 bg-slate-900/80 border border-slate-800/80 p-8 rounded-2xl ">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Welcome To Simple Auth
          </h2>
          <p className="text-sm text-slate-400">
            Please enter your credentials to sign up
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-300"
              htmlFor="text"
            >
              UserName
            </label>
            <input
              id="text"
              type="text"
              required
              value={userName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserName(e.target.value)
              }
              placeholder="UserName"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-300"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="name@example.com"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label
              className="block text-sm font-medium text-slate-300"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                placeholder="••••••••"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 pr-11 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end text-xs sm:text-sm">
            <Link
              href="/Forgot-password"
              className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl font-semibold text-white/79 border flex justify-center items-center gap-2 p-2 duration-300 hover:text-white/50 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 pt-2 flex justify-center gap-2">
          have an account?
          <Link
            href="/log-in"
            className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
          >
            Log in now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
