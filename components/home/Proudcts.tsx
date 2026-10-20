import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import WishlistButton from "../utils/WishlistButton";

const GetProducts = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/proudcts?populate=*`,
    );
    if (!res.ok) {
      throw new Error("Failed To Fetch Products");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error);
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

const Products = async () => {
  const products: ProductType[] = await GetProducts();
  return (
    <div id="products">
      {/* Header */}
      <div className="flex justify-between items-center m-4">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Link
          className="bg-white/10 px-3 py-1 rounded-lg text-sm duration-300 hover:bg-white/20 hover:underline"
          href={`/proudct`}
        >
          See more
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 m-3">
        {products?.length > 0 ? (
          products.slice(0, 3).map((product) => (
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
                <Link
                  className="bg-indigo-600 rounded-lg px-3 py-1 text-sm font-medium cursor-pointer duration-300 hover:bg-indigo-500"
                  href={`/proudct/${product.documentId}`}
                >
                  More Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-gray-400">No Data</h1>
        )}
      </div>
    </div>
  );
};

export default Products;
