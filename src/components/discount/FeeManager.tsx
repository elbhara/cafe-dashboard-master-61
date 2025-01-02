import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash, DollarSign } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

type Fee = {
  id: number;
  name: string;
  description: string;
  amount: number;
  type: "fixed" | "percentage";
  active: boolean;
};

export function FeeManager() {
  const [fees, setFees] = useState<Fee[]>([
    {
      id: 1,
      name: "Admin Fee",
      description: "Standard administration fee",
      amount: 5000,
      type: "fixed",
      active: true,
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<Fee | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
    type: "fixed",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFee) {
      setFees(fees.map(f => 
        f.id === editingFee.id 
          ? {
              ...f,
              name: formData.name,
              description: formData.description,
              amount: Number(formData.amount),
              type: formData.type as "fixed" | "percentage",
            }
          : f
      ));
      toast({
        title: "Fee updated",
        description: `Fee ${formData.name} has been updated successfully.`,
      });
    } else {
      const newFee: Fee = {
        id: fees.length + 1,
        name: formData.name,
        description: formData.description,
        amount: Number(formData.amount),
        type: formData.type as "fixed" | "percentage",
        active: true,
      };
      setFees([...fees, newFee]);
      toast({
        title: "Fee created",
        description: `New fee ${formData.name} has been created successfully.`,
      });
    }

    setFormData({ name: "", description: "", amount: "", type: "fixed" });
    setEditingFee(null);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingFee(null);
              setFormData({ name: "", description: "", amount: "", type: "fixed" });
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Fee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFee ? "Edit Fee" : "Add New Fee"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fee Name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter fee name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter fee description"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter fee amount"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange as any}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="fixed">Fixed Amount</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <Button type="submit" className="w-full">
                {editingFee ? "Update Fee" : "Create Fee"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee) => (
              <TableRow key={fee.id}>
                <TableCell className="font-medium">{fee.name}</TableCell>
                <TableCell>{fee.description}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {fee.amount.toLocaleString()}
                    {fee.type === "percentage" && "%"}
                  </div>
                </TableCell>
                <TableCell>
                  {fee.type === "fixed" ? "Fixed Amount" : "Percentage"}
                </TableCell>
                <TableCell>
                  <Switch 
                    checked={fee.active}
                    onCheckedChange={(checked) => {
                      setFees(fees.map(f => 
                        f.id === fee.id ? { ...f, active: checked } : f
                      ));
                    }}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setEditingFee(fee);
                      setFormData({
                        name: fee.name,
                        description: fee.description,
                        amount: fee.amount.toString(),
                        type: fee.type,
                      });
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-red-500"
                    onClick={() => {
                      setFees(fees.filter(f => f.id !== fee.id));
                      toast({
                        title: "Fee deleted",
                        description: "The fee has been deleted successfully.",
                      });
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}