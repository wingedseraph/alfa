import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Path } from "@/config/routes-config";

export default function NotFound({ error }: { error: string }): ReactNode {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-bold">page not found</h1>
      <p>error: {error}</p>
      <Link className="transition-all" to={Path.index}>
        ← to index page
      </Link>
    </div>
  );
}
