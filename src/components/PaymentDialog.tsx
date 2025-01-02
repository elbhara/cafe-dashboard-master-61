import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface PaymentDialogProps {
  total: number;
}

export function PaymentDialog({ total }: PaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const change = paymentMethod === "cash" ? Number(cashAmount) - total : 0;

  const handlePayment = () => {
    if (paymentMethod === "cash" && Number(cashAmount) < total) {
      toast({
        title: "Invalid payment",
        description: "Cash amount must be greater than or equal to total amount",
        variant: "destructive",
      });
      return;
    }

    // Clear cart
    localStorage.setItem("cartItems", "[]");
    
    // Show success message
    toast({
      title: "Payment successful",
      description: `Payment of Rp ${total.toLocaleString()} processed successfully.`,
    });
    
    // Close dialog and redirect
    setOpen(false);
    navigate("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" size="lg">
          <CreditCard className="mr-2 h-5 w-5" />
          Proceed to Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Total Amount</Label>
            <div className="text-2xl font-bold">
              Rp {total.toLocaleString()}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <Select
              required
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="qris">QRIS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {paymentMethod === "cash" && (
            <>
              <div className="space-y-2">
                <Label>Cash Amount</Label>
                <Input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="Enter cash amount"
                />
              </div>

              <div>
                <Label>Change</Label>
                <div className="text-xl font-semibold">
                  Rp {Math.max(0, change).toLocaleString()}
                </div>
              </div>
            </>
          )}

          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={
              !paymentMethod ||
              (paymentMethod === "cash" && Number(cashAmount) < total)
            }
          >
            Complete Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}