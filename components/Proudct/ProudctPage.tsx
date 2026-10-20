import CategoreyPage from "../Categorey/CategoreyPage";
import Button from "../utils/AddButton";
import WishlistButton from "../utils/WishlistButton";

const GetProducts = async (categoryID?: string) => {
  try {
    const endpoint =
      categoryID && categoryID !== "All"
        ? `/api/proudcts?populate=*&filters[category][documentId][$eq]=${categoryID}`
        : `/api/proudcts?populate=*`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}`);
    if (!res.ok) {
      throw new Error("Failed To Fetch Products");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

interface ProductType {
  title: string;
  description: string;
  price: number;
  category: { name: string };
  id: number;
  documentId: string;
}

interface ProudctPageProps {
  category?: string;
}

const ProudctPage = async ({ category }: ProudctPageProps) => {
  const products: ProductType[] = await GetProducts(category);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl text-center border-white/10 border-b-2 w-fit m-auto p-2 flex items-center gap-2 justify-center">
          Products
          <span className="text-lg text-gray-500">({products.length})</span>
        </h1>
        <CategoreyPage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
          {products?.length > 0 ? (
            products.map((product) => (
              <div
                className="bg-white/10 p-4 rounded-xl flex flex-col justify-between h-full"
                key={product.id}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-bold mb-2 line-clamp-1 text-white">
                      {product.title}
                    </h1>
                    <WishlistButton id={product.documentId} />
                  </div>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between text-sm my-2">
                    <span className="font-bold text-emerald-400">
                      ${product.price}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-full border border-slate-700/50">
                      {product.category?.name}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button id={product.documentId} />
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-gray-400">No Data</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProudctPage;
