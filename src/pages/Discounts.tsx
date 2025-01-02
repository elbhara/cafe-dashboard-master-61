import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DiscountManager } from "@/components/discount/DiscountManager";
import { FeeManager } from "@/components/discount/FeeManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Discounts = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Discounts & Fees</h1>
          <p className="text-gray-500">Manage discounts and additional fees</p>
        </div>

        <Tabs defaultValue="discounts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
            <TabsTrigger value="fees">Additional Fees</TabsTrigger>
          </TabsList>

          <TabsContent value="discounts">
            <DiscountManager />
          </TabsContent>

          <TabsContent value="fees">
            <FeeManager />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Discounts;