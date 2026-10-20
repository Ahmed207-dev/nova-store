"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface slugType {
  name: string;
  documentId: string;
}

const SlugPage = () => {
  const [slugs, setSlug] = useState<slugType[]>([]);

  const SearchParams = useSearchParams();

  const IsActive = SearchParams.get("slug") || "All";

  const Data = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/slugs?populate=*`,
    );

    if (!res.ok) {
      throw new Error("Failed to Fetch slugs");
    }

    const result = await res.json();

    setSlug(result.data);
  };

  useEffect(() => {
    Data();
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="flex justify-center gap-4">
        <Link
          href={`/artcale?slug=All`}
          className={
            IsActive === "All" ? "bg-indigo-600 rounded-lg p-2" : "p-2"
          }
        >
          All
        </Link>
        {slugs.map((slug) => (
          <Link
            key={slug.documentId}
            href={`/artcale?slug=${slug.documentId}`}
            className={
              IsActive === slug.documentId
                ? "bg-indigo-600 rounded-lg p-2"
                : "p-2"
            }
          >
            {slug.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SlugPage;
