import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isOnProducts = location.pathname === "/products";

  const isActive = (path: string) =>
    location.pathname === path ? "text-muted-foreground pointer-events-none" : "text-primary hover:opacity-80 transition-colors";

  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link className={`flex flex-shrink-0 items-center gap-2 ${isOnProducts ? "pointer-events-none" : ""}`} to="/">
              <span className="text-xl font-bold tracking-tight text-primary">fetcher</span>
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link className={isActive("/products")} to="/products">
              Products
            </Link>
            <Link className={isActive("/create-product")} to="/create-product">
              Create
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
