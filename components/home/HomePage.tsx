import Image from "next/image";
import Hero from "@/public/swello-5A7qZIO7u64-unsplash.jpg";
import ArticalesPage from "./Articales";
import { Suspense } from "react";
import Proudcts from "./Proudcts";

function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100 flex flex-col justify-between">
      <main>
        <div className="flex justify-center items-center gap-6 py-2 my-2 flex-col md:flex-row mb-5">
          <div>
            <h1 className="text-xl md:text-4xl font-bold my-2 w-100 p-2">
              Build, Scale & Master{" "}
              <span className="underline">Modern Web Apps</span>
            </h1>
            <p className="text-gray-400 w-100 my-2">
              Explore in-depth articles, tutorials, and best practices on
              Next.js 15, Strapi 5, and modern full-stack architecture.
            </p>
          </div>
          <div className="relative">
            <Image
              className="rounded-2xl shadow-2xl border border-slate-800 w-100 md:w-150 object-cover"
              src={Hero}
              alt="Hero"
            />
          </div>
        </div>
        <Suspense fallback={`Loading...`}>
          <ArticalesPage />
        </Suspense>
        <Suspense fallback={`Loading...`}>
          <Proudcts />
        </Suspense>
      </main>
    </div>
  );
}
export default HomePage;
