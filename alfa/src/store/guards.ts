import type { Product } from "@/store/types";

const isRating = (value: unknown): value is Product["rating"] => {
  if (value === null || value === undefined || typeof value !== "object") {
    return false;
  }

  const rating = value as { count?: unknown; rate?: unknown };

  return typeof rating.count === "number" && typeof rating.rate === "number" && rating.count >= 0 && rating.rate >= 0 && rating.rate <= 5;
};

const isProduct = (value: unknown): value is Product => {
  if (value === null || value === undefined || typeof value !== "object") {
    return false;
  }

  const product = value as {
    category?: unknown;
    description?: unknown;
    id?: unknown;
    image?: unknown;
    isLiked?: unknown;
    price?: unknown;
    rating?: unknown;
    title?: unknown;
  };

  return (
    typeof product.id === "number" &&
    typeof product.category === "string" &&
    typeof product.description === "string" &&
    typeof product.image === "string" &&
    typeof product.price === "number" &&
    typeof product.title === "string" &&
    (product.isLiked === undefined || typeof product.isLiked === "boolean") &&
    (product.rating === undefined || isRating(product.rating))
  );
};

export const isProductArray = (value: unknown): value is Product[] => Array.isArray(value) && value.every(isProduct);
