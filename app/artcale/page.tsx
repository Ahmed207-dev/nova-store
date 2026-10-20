import Article from "@/components/Article/ArticlePage";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ slug: string }>;
}) => {
  const { slug } = await searchParams;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center">
          <div className="w-10 h-10 border border-b-0 rounded-full animate-spin"></div>
        </div>
      }
    >
      <Article slug={slug} />
    </Suspense>
  );
};

export default page;
