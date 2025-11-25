import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Path } from "@/config/routes-config";
import { useProductStore } from "@/store";
import Layout from "@/widgets/layout/layout";

export const productsLoader = async () => {
  const { fetchInitialProducts } = useProductStore.getState();

  await fetchInitialProducts();

  return null;
};

export const router = createBrowserRouter(
  [
    {
      children: [
        {
          element: <Navigate replace={true} to={Path.products} />,
          path: Path.index,
        },

        {
          Component: lazy(async () => import("@/pages/create-product")),
          path: Path.createProduct,
        },
        {
          Component: lazy(async () => import("@/pages/create-product")),
          path: Path.editProduct,
        },
        {
          Component: lazy(async () => import("@/pages/products")),
          path: Path.products,
        },
        {
          Component: lazy(async () => import("@/pages/product-detailed")),
          path: Path.productsId,
        },
      ],
      element: <Layout />,
      errorElement: <Navigate replace={true} to={Path.products} />,
      loader: productsLoader,
    },
  ],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ""),
  },
);
