import { Inbox } from "lucide-react";

type EmptyStateProps = {
  description?: string;
  title?: string;
};

export default function EmptyState({
  description = "Try changing the search parameters or filters.",
  title = "No products",
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card py-20 text-center">
      <Inbox className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-2 text-sm font-medium text-card-foreground">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
