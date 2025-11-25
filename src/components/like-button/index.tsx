import { type MouseEvent } from "react";

import { Heart } from "lucide-react";

import Button from "@/components/button";

type LikeButtonProps = {
  isLiked: boolean;
  onClick: (e: MouseEvent) => void;
  size?: "md" | "sm";
  variant?: "button" | "icon";
};

export default function LikeButton({ isLiked, onClick, size = "sm", variant = "icon" }: LikeButtonProps) {
  const isLikedValue = isLiked;

  if (variant === "button") {
    return (
      <Button
        variant={isLikedValue ? "ghost" : "outline"}
        className={`flex flex-1 items-center justify-center gap-2 ${
          isLikedValue ? "border border-destructive/30 bg-destructive/20 text-destructive" : ""
        }`}
        onClick={onClick}
      >
        <Heart className={`h-6 w-6 ${isLikedValue ? "fill-current" : ""}`} />
        {isLikedValue ? "In Favorites" : "Add to Favorites"}
      </Button>
    );
  }

  return (
    <Button
      className={`absolute top-2 left-2 rounded-full p-2 shadow-sm transition-colors ${
        isLikedValue ? "bg-destructive/20 text-destructive" : "bg-card/90 text-muted-foreground hover:text-destructive"
      }`}
      onClick={onClick}
      title={isLikedValue ? "Remove like" : "Like"}
      type="button"
    >
      <Heart className={`${size === "sm" ? "h-5 w-5" : "h-6 w-6"} ${isLikedValue ? "fill-current" : ""}`} />
    </Button>
  );
}
