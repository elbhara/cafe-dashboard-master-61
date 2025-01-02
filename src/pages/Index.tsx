import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Coffee, ShoppingBag, Users, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Total Sales",
    value: "Rp 2,456,000",
    icon: DollarSign,
    trend: "+12.5%",
  },
  {
    label: "Products",
    value: "124",
    icon: Coffee,
    trend: "+4.3%",
  },
  {
    label: "Orders",
    value: "56",
    icon: ShoppingBag,
    trend: "+8.4%",
  },
  {
    label: "Customers",
    value: "289",
    icon: Users,
    trend: "+2.7%",
  },
];

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back to your café POS</p>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary-hover text-white"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            New Order
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-semibold text-gray-900 mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  {stat.trend}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;