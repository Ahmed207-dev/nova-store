import SingleArticle from "@/components/Article/SingleArticle";
import { Suspense } from "react";

const GetArticales = async (id: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!baseUrl) return null;
    const res = await fetch(`${baseUrl}/api/articales/${id}?populate=*`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed To Fetch Articales");
    }
    const data = await res.json();

    return data.data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export interface ArtcalesType {
  title: string;
  description: string;
  date: string;
  id: number;
}

const ArticalePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const Article: ArtcalesType = await GetArticales(id);

  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <SingleArticle Article={Article} />
    </Suspense>
  );
};

export default ArticalePage;
