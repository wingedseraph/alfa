import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import BackLink from "@/components/back-link";
import CategoryBadge from "@/components/category-badge";
import Container from "@/components/container";
import LikeButton from "@/components/like-button";
import Price from "@/components/price";
import Rating from "@/components/rating";
import { cardContainer } from "@/config/styles";
import { useProductStore } from "@/store";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useProductStore((state) => state.products);
  const toggleLike = useProductStore((state) => state.toggleLike);

  const productId = id === undefined ? NaN : Number(id);
  const product = useMemo(() => products.find((p) => p.id === productId), [products, productId]);

  useEffect(() => {
    if (product === undefined && Number.isFinite(productId)) {
      void navigate("/products");
    }
  }, [product, productId, navigate]);

  if (product === undefined) {
    return null;
  }

  return (
    <Container maxWidth="7xl" padding="page">
      <BackLink />

      <div className={`overflow-hidden ${cardContainer}`}>
        <div className="md:flex">
          <div className="flex items-center justify-center border-b border-border bg-card p-8 md:w-1/2 md:border-r md:border-b-0">
            <img className="max-h-[500px] object-contain" alt={product.title} src={product.image} />
          </div>

          <div className="flex flex-col p-8 md:w-1/2 lg:p-12">
            <CategoryBadge category={product.category} />

            <h1 className="mb-4 text-3xl leading-tight font-bold text-card-foreground">{product.title}</h1>

            <div className="mb-6 flex items-center">
              <span className="mr-6">
                <Price size="lg" price={product.price} />
              </span>
              {product.rating !== undefined && <Rating variant="badge" rating={product.rating} />}
            </div>

            <p className="mb-8 flex-grow text-lg leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-auto flex flex-col gap-4 sm:flex-row">
              <LikeButton
                size="md"
                variant="button"
                isLiked={product.isLiked === true}
                onClick={() => {
                  toggleLike(product.id);
                }}
              />

              <Link
                className="flex flex-1 items-center justify-center gap-2 rounded-3xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-colors hover:opacity-90"
                to={`/edit-product/${String(product.id)}`}
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
