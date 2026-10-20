"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoriesType {
  name: string;
  id: number;
  documentId: string;
}

const CategoreyPage = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);

  const Data = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/categories`,
      );
      if (!res.ok) {
        throw new Error("Failed To Fetch Products");
      }
      const data = await res.json();
      setCategories(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Data();
  }, []);

  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "All";

  return (
    <div className="flex justify-center items-center gap-4 my-5 cursor-pointer">
      <Link
        href="/proudct?category=All"
        className={
          currentCategory === "All" ? "bg-indigo-600 p-2 rounded-lg" : ""
        }
      >
        All
      </Link>

      {categories?.map((cat) => (
        <Link
          key={cat.id}
          href={`/proudct?category=${cat.documentId}`}
          className={
            currentCategory === cat.documentId
              ? "bg-indigo-600 p-2 rounded-lg"
              : ""
          }
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoreyPage;
