import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Wallet } from "lucide-react";

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cashAmount, setCashAmount] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(items);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.11; // 11% tax
  const total = subtotal + tax;
  const change = cashAmount ? Number(cashAmount) - total : 0;

  const handlePayment = () => {
    if (paymentMethod === "cash" && Number(cashAmount) < total) {
      toast({
        variant: "destructive",
        title: "Invalid payment amount",
        description: "Cash amount must be greater than or equal to total amount",
      });
      return;
    }

    toast({
      title: "Payment successful",
      description: `Payment of Rp ${total.toLocaleString()} processed successfully`,
    });

    // Clear cart
    localStorage.removeItem("cartItems");
    setCartItems([]);
    setCashAmount("");
  };

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (11%)</span>
                  <span>Rp {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">
                      <div className="flex items-center">
                        <Wallet className="mr-2 h-4 w-4" />
                        Cash
                      </div>
                    </SelectItem>
                    <SelectItem value="card">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Card
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === "cash" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cash Amount</label>
                  <Input
                    type="number"
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="Enter cash amount"
                  />
                  {Number(cashAmount) >= total && (
                    <div className="flex justify-between font-medium text-green-600">
                      <span>Change</span>
                      <span>Rp {change.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              <Button 
                className="w-full" 
                size="lg"
                onClick={handlePayment}
                disabled={paymentMethod === "cash" && Number(cashAmount) < total}
              >
                Process Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;