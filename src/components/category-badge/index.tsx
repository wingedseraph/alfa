import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type CategoryBadgeProps = {
  category: string;
  variant?: "default" | "inline";
};

export default function CategoryBadge({ category, variant = "default" }: CategoryBadgeProps) {
  if (variant === "inline") {
    return <div className="mb-1 text-xs font-semibold tracking-wider text-accent uppercase">{category}</div>;
  }

  return (
    <div className="mb-4">
      <span className="inline-block rounded-full bg-accent/20 py-1 text-xs font-semibold tracking-wide text-secondary-foreground uppercase">
        {capitalizeFirstLetter(category)}
      </span>
    </div>
  );
}
