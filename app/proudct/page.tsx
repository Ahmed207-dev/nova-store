import ProudctPage from "@/components/Proudct/ProudctPage";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

const page = async ({ searchParams }: Props) => {
  const { category } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center">
          <div className="w-10 h-10 border border-b-0 rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProudctPage category={category} />
    </Suspense>
  );
};

export default page;
