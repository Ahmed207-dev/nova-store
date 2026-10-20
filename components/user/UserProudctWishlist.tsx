import Button from "../utils/AddButton";
import WishlistButton from "../utils/WishlistButton";

export interface UserProudctWishlistType {
  documentId: string;
  proudct: {
    title: string;
    description: string;
    price: number;
    id: number;
    documentId: string;
  };
}
interface ComponentProps {
  item: UserProudctWishlistType;
  onRemove: (id: string) => void;
}

const UserProudctWishlist = ({ item, onRemove }: ComponentProps) => {
  return (
    <div className="bg-white/10 p-4 rounded-xl flex flex-col justify-between h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-white">{item.proudct?.title}</h1>

        <WishlistButton
          id={item.proudct?.documentId}
          initialWishlistId={item.documentId}
          initialAdd={true}
          onRemove={() => onRemove(item.documentId)}
        />
      </div>
      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
        {item.proudct.description}
      </p>
      <div className="flex items-center justify-between text-sm my-2">
        <span className="font-bold text-emerald-400">
          ${item.proudct.price}
        </span>
      </div>
      <div className="pt-2 flex justify-end">
        <Button id={item.proudct.documentId} />
      </div>
    </div>
  );
};

export default UserProudctWishlist;
