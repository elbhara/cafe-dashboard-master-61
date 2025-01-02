import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Coffee,
  ShoppingCart,
  Percent,
  Settings,
} from "lucide-react";

const links = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/products", icon: Coffee, label: "Products" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/discounts", icon: Percent, label: "Discounts" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-20 bg-white border-r border-gray-200">
      <div className="flex h-full flex-col items-center py-8">
        <nav className="space-y-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <link.icon className="h-6 w-6" />
              <span className="sr-only">{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};