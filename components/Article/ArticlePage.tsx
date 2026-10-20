import Link from "next/link";
import SlugPage from "../Slug/SlugPage";

const GetArticales = async (SearchParams?: string) => {
  try {
    const endPoinet =
      SearchParams === "All" || !SearchParams
        ? `/api/articales?populate=*`
        : `/api/articales?populate=*&filters[slug][documentId][$eq]=${SearchParams}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}${endPoinet}`,
    );
    if (!res.ok) {
      throw new Error("Failed To Fetch Articales");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface ArtcalesType {
  title: string;
  description: string;
  date: string;
  id: number;
  documentId: number;
  slug: { name: string };
}
interface SlugType {
  slug?: string;
}
const Article = async ({ slug }: SlugType) => {
  const Articles: ArtcalesType[] = await GetArticales(slug);

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl text-center border-white/10 border-b-2 w-fit m-auto p-2">
          Atricale{" "}
          <span className="text-lg text-gray-500">({Articles.length})</span>
        </h1>
        <SlugPage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
          {Articles?.length > 0 ? (
            Articles.map((artcale) => (
              <div
                className="bg-white/10 p-2 flex flex-col justify-between h-full"
                key={artcale.id}
              >
                <h1 className="text-lg font-bold mb-3 line-clamp-1">
                  {artcale.title}
                </h1>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {artcale.description}
                </p>
                <span className="text-gray-400 w-fit rounded-lg p-2 mt-4 bg-white/10 min-w-10 flex justify-center items-center">
                  {artcale.slug.name}
                </span>
                <div className="p-2 flex justify-end">
                  <Link
                    className="bg-indigo-600 rounded-lg p-1 cursor-pointer duration-300 hover:underline"
                    href={`/artcale/${artcale.documentId}`}
                  >
                    More Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </div>
    </article>
  );
};

export default Article;
