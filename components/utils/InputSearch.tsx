"use client";

import { useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    router.push(`/proudct?${params.toString()}`);
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => handleSearch(e.target.value)}
      className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-slate-700 outline-none w-full max-w-md my-4"
    />
  );
}
export default SearchInput;
