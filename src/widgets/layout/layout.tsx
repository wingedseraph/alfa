import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Spinner from "@/components/spinner";
import Footer from "@/widgets/layout/Footer";
import Header from "@/widgets/layout/Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow transition-all">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
