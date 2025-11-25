import { Link } from "react-router-dom";

import { Path } from "@/config/routes-config";

type NotFoundProps = {
  error?: string;
};

export default function NotFound({ error }: NotFoundProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h1 className="font-bold">page not found</h1>
      <p>error: {error}</p>
      <Link className="transition-all duration-300 ease-in-out hover:opacity-80" to={Path.index}>
        ← to index page
      </Link>
    </div>
  );
}
