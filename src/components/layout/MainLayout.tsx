import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  // Set collapsed by default on mobile/tablet
  useEffect(() => {
    setIsCollapsed(window.innerWidth < 1024);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isCollapsed={isCollapsed} />
      <main 
        className={`flex-1 p-6 lg:p-8 transition-all duration-200 ${
          isCollapsed ? "ml-[60px]" : "ml-[240px]"
        } ${isMobile ? "ml-0" : ""}`}
      >
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mr-4"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
};