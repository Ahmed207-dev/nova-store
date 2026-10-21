const GetArticales = async (id: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!baseUrl) return null;
    const res = await fetch(
      `${baseUrl}/api/articales/${id}?populate=*`,
      { cache: "no-store" },
    );

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

interface ArtcalesType {
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
    <div className="min-h-[calc(100vh-64px)] bg-slate-950 text-slate-100 flex flex-col justify-center items-center">
      <div className="bg-white/10 p-4 rounded-lg m-4">
        <div className="flex justify-center">
          <div className="w-100 md:w-full m-5 h-40 bg-indigo-400 rounded-lg flex justify-center items-center"></div>
        </div>
        <h1 className="text-xl font-bold my-2">{Article.title}</h1>
        <p className=" md:w-200 text-gray-400 text-sm my-2">
          {Article.description}
        </p>
        <div className="flex justify-end">
          <span>{Article.date}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticalePage;
