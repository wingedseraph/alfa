import { Star } from "lucide-react";

type RatingProps = {
  rating: {
    count: number;
    rate: number;
  };
  variant?: "badge" | "default";
};

export default function Rating({ rating, variant = "default" }: RatingProps) {
  if (variant === "badge") {
    return (
      <div className="flex items-center rounded-3xl bg-yellow-400/20 px-3 py-1">
        <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
        <span className="font-medium text-yellow-400">
          {rating.rate} <span className="font-normal text-yellow-400/60">({rating.count} reviews)</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center text-xs text-muted-foreground">
      <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
      {rating.rate} ({rating.count})
    </div>
  );
}
