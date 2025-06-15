
import React from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product, onClick, minimal }) => (
  <div
    className={`flex items-center gap-3 group bg-neutral-50 rounded-xl p-2 border border-neutral-200 hover:shadow-md transition-shadow hover:scale-[1.03] cursor-pointer ${minimal ? "" : "flex-col"} `}
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-label={product.name}
  >
    <img
      src={product.image}
      alt={product.name}
      className={minimal
        ? "h-12 w-12 rounded-lg object-cover"
        : "w-[110px] h-[110px] rounded-xl object-cover mb-2"}
      loading="lazy"
    />
    <div className="flex-1">
      <div className="font-medium text-sm text-foreground truncate">{product.name}</div>
      <div className="font-bold text-base text-black">{product.price}</div>
    </div>
    {!minimal && (
      <button
        className="ml-auto p-1.5 rounded-full border border-neutral-200 bg-white hover:bg-neutral-100 hover:scale-110 transition-all"
        title="Add to Wishlist"
        onClick={e => { e.stopPropagation(); /* UI only */ }}
      >
        <Heart size={18} className="text-black" />
      </button>
    )}
  </div>
);

export default ProductCard;
