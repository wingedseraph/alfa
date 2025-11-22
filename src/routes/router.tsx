import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Path } from "@/config/routes-config";
import Layout from "@/layout/layout";
import NotFound from "@/pages/not-found/not-found";

const PAGE_NOT_FOUND_ERROR = "404";

export const router = createBrowserRouter([
  {
    children: [
      {
        Component: lazy(async () => import("@/pages/index/index")),
        path: Path.index,
      },
    ],
    element: <Layout />,
    errorElement: <NotFound error={PAGE_NOT_FOUND_ERROR} />,
  },
]);
