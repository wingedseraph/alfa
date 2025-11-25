type PriceProps = {
  price: number;
  size?: "lg" | "md" | "sm";
};

export default function Price({ price, size = "md" }: PriceProps) {
  const sizeClasses = {
    lg: "text-3xl",
    md: "text-lg",
    sm: "text-lg",
  };

  return <span className={`font-bold text-card-foreground ${sizeClasses[size]}`}>${price.toFixed(2)}</span>;
}
