import { type MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Trash } from "lucide-react";

import Button from "@/components/button";
import CategoryBadge from "@/components/category-badge";
import ConfirmModal from "@/components/confirm-modal";
import LikeButton from "@/components/like-button";
import Price from "@/components/price";
import Rating from "@/components/rating";
import { useProductStore } from "@/store";
import type { Product } from "@/store/types";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { deleteProduct, getProductById, toggleLike } = useProductStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleCardClick = async () => {
    if (isDeleteModalOpen) {
      return;
    }

    const productExists = getProductById(product.id);

    if (productExists !== undefined) {
      await navigate(`/products/${String(product.id)}`);
    }
  };

  const handleLike = (e: MouseEvent) => {
    e.stopPropagation();
    toggleLike(product.id);
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteProduct(product.id);
    setIsDeleteModalOpen(false);
    void navigate("/products", { replace: true });
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      className="group flex h-[400px] cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg"
      onClick={handleCardClick}
    >
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-card p-4">
        <img
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
          src={product.image}
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button
            className="rounded-full bg-card p-2 text-muted-foreground shadow-md transition-colors hover:bg-destructive/10 hover:text-destructive"
            onClick={handleDeleteClick}
            title="Delete"
            type="button"
          >
            <Trash className="h-5 w-5" />
          </Button>
        </div>

        <LikeButton size="sm" variant="icon" isLiked={product.isLiked === true} onClick={handleLike} />
      </div>

      <div className="flex flex-grow flex-col p-5">
        <CategoryBadge variant="inline" category={product.category} />
        <h3 className="mb-2 line-clamp-1 font-bold text-card-foreground" title={product.title}>
          {product.title}
        </h3>
        <p className="mb-4 line-clamp-3 flex-grow text-sm text-muted-foreground">{capitalizeFirstLetter(product.description)}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
          <Price size="sm" price={product.price} />
          {product.rating !== undefined && <Rating rating={product.rating} />}
        </div>
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete product"
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
