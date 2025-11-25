import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type ButtonSize = "lg" | "md" | "sm";

type ButtonVariant = "default" | "destructive" | "ghost" | "outline";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-card text-card-foreground hover:bg-muted",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  ghost: "bg-destructive text-destructive-foreground hover:bg-destructive/30",
  outline: "border border-border bg-card text-card-foreground hover:bg-muted",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "px-6 py-3 text-base",
  md: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-sm",
};

export default function Button({ children, className = "", size = "md", variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-3xl font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
