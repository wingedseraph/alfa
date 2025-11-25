import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Path } from "@/config/routes-config";
import NotFound from "@/pages/not-found/not-found";
import { useProductStore } from "@/store";
import Layout from "@/widgets/layout/layout";

const PAGE_NOT_FOUND_ERROR = "404";

export const productsLoader = async () => {
  const { fetchInitialProducts } = useProductStore.getState();

  await fetchInitialProducts();

  return null;
};

export const router = createBrowserRouter([
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
    errorElement: <NotFound error={PAGE_NOT_FOUND_ERROR} />,
    loader: productsLoader,
  },
]);
