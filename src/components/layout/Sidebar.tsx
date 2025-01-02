import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  ShoppingCart,
  Package,
  Tags,
  Users,
  Settings,
  FileText,
  BarChart3,
} from "lucide-react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Our Menu",
    icon: Store,
    href: "/catalog",
    color: "text-violet-500",
  },
  {
    label: "Cart",
    icon: ShoppingCart,
    href: "/cart",
    color: "text-pink-700",
  },
  {
    label: "Products",
    icon: Package,
    href: "/products",
    color: "text-orange-700",
  },
  {
    label: "Categories",
    icon: Tags,
    href: "/categories",
    color: "text-emerald-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/users",
    color: "text-green-700",
  },
  {
    label: "Sales Report",
    icon: BarChart3,
    href: "/sales-report",
    color: "text-blue-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-700",
  },
];

export function Sidebar() {
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-1">
          {routes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  isActive ? "text-white bg-white/10" : "text-zinc-400"
                )
              }
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}