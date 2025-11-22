import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Spinner from "@/components/spinner";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* some navbar ? */}
      <main className="flex-grow transition-all">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="mt-12 border-t border-gray-600 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm"> some footer data</div>
      </footer>
    </div>
  );
}
