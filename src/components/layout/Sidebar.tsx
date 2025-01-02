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
  Percent,
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
    label: "Discounts",
    icon: Percent,
    href: "/discounts",
    color: "text-blue-500",
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

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm z-50 transition-all duration-200",
        isCollapsed ? "w-[60px]" : "w-[240px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "p-6",
          isCollapsed && "p-3"
        )}>
          <h1 className={cn(
            "text-xl font-bold text-primary truncate",
            isCollapsed && "text-center"
          )}>
            {isCollapsed ? "POS" : "POS System"}
          </h1>
        </div>
        
        <nav className="flex-1 px-3 space-y-1">
          {routes.map((route) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-gray-100",
                  isActive 
                    ? "bg-primary text-white hover:bg-primary/90" 
                    : "text-gray-700"
                )
              }
              title={isCollapsed ? route.label : undefined}
            >
              <route.icon className="h-5 w-5" />
              {!isCollapsed && <span>{route.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-200">
          <div className={cn(
            "flex items-center gap-3 px-3 py-2",
            isCollapsed && "justify-center"
          )}>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
              A
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Admin
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}