import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

type BackLinkProps = {
  label?: string;
  to?: string;
};

export default function BackLink({ label = "Back to list", to = "/products" }: BackLinkProps) {
  return (
    <Link className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-card-foreground" to={to}>
      <ArrowLeft className="mr-1 h-5 w-5" />
      {label}
    </Link>
  );
}
