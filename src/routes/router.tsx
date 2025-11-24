import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Path } from "@/config/routes-config";
import NotFound from "@/pages/not-found/not-found";
import Layout from "@/widgets/layout/layout";

const PAGE_NOT_FOUND_ERROR = "404";

export const router = createBrowserRouter([
  {
    children: [
      {
        Component: lazy(async () => import("@/pages/index")),
        path: Path.index,
      },

      {
        Component: lazy(async () => import("@/pages/create-product")),
        path: Path.createProduct,
      },
      {
        Component: lazy(async () => import("@/pages/products")),
        path: Path.products,
      },
    ],
    element: <Layout />,
    // todo: add API loader there before mount
    // loader:
    errorElement: <NotFound error={PAGE_NOT_FOUND_ERROR} />,
  },
]);
