import { Home, Settings, ShoppingCart, Package, Printer, Tag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: ShoppingCart, label: "New Order", path: "/order" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Tag, label: "Discounts", path: "/discounts" },
  { icon: Printer, label: "Print", path: "/print" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-20 bg-white border-r border-gray-200 h-screen flex flex-col items-center py-6 fixed left-0 top-0">
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-8">
        <ShoppingCart className="w-6 h-6 text-white" />
      </div>
      <nav className="flex-1 flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group ${
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:bg-primary/10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="fixed left-24 scale-0 rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:scale-100 transition-all duration-200">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};