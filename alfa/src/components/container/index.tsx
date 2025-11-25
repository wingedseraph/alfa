import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  maxWidth?: "3xl" | "7xl";
  padding?: "default" | "page";
};

export default function Container({ children, maxWidth = "7xl", padding = "default" }: ContainerProps) {
  const getPaddingClass = (paddingValue: "default" | "page", maxWidthValue: "3xl" | "7xl"): string => {
    if (paddingValue === "page") {
      return "px-4 py-12 sm:px-6 lg:px-8";
    }

    if (maxWidthValue === "7xl") {
      return "px-4 py-8 sm:px-6 lg:px-8";
    }

    return "px-4 py-12 sm:px-6 lg:px-8";
  };

  const maxWidthClass = maxWidth === "7xl" ? "max-w-7xl" : "max-w-3xl";
  const paddingClass = getPaddingClass(padding, maxWidth);

  return <div className={`mx-auto ${maxWidthClass} ${paddingClass}`}>{children}</div>;
}
