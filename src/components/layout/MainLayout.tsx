import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-20 p-8 animate-fadeIn">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};