import Link from "next/link";

const GetArticales = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articales?populate=*`,
    );
    if (!res.ok) {
      throw new Error("Failed To Fetch Articales");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
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

const ArticalesPage = async () => {
  const Articles: ArtcalesType[] = await GetArticales();

  return (
    <div id="artcale" className="border-b-2 border-white/10">
      <div className="flex justify-between items-center m-4 ">
        <h1 className="text-2xl">Artcales</h1>
        <Link
          className="bg-white/10 px-3 py-1 rounded-lg text-sm duration-300 hover:bg-white/20 hover:underline"
          href={`/artcale`}
        >
          See more
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
        {Articles?.length > 0 ? (
          Articles.slice(0, 3).map((artcale) => (
            <div
              className="bg-white/10 p-4 flex flex-col justify-between h-full rounded-lg"
              key={artcale.id}
            >
              <h1 className="text-lg font-bold mb-3 line-clamp-1">
                {artcale.title}
              </h1>
              <p className="text-gray-400 text-sm line-clamp-2">
                {artcale.description}
              </p>
              <span className="text-gray-400 w-fit rounded-lg p-2 mt-4 bg-white/10 min-w-10 flex justify-center items-center">
                {artcale.slug?.name}
              </span>

              <div className="p-2 flex justify-end">
                <Link
                  className="bg-indigo-600 rounded-lg px-3 py-1 text-sm font-medium cursor-pointer duration-300 hover:bg-indigo-500"
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
  );
};

export default ArticalesPage;
