import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Percent, Plus, Edit, Trash } from "lucide-react";
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

type Discount = {
  id: number;
  code: string;
  description: string;
  percentage: number;
  active: boolean;
  validUntil: string;
};

const Discounts = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: 1,
      code: "WELCOME10",
      description: "Welcome discount for new customers",
      percentage: 10,
      active: true,
      validUntil: "2024-12-31",
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: "",
    description: "",
    percentage: "",
    validUntil: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDiscount) {
      // Update existing discount
      setDiscounts(discounts.map(d => 
        d.id === editingDiscount.id 
          ? {
              ...d,
              code: formData.code,
              description: formData.description,
              percentage: Number(formData.percentage),
              validUntil: formData.validUntil,
            }
          : d
      ));
      toast({
        title: "Discount updated",
        description: `Discount code ${formData.code} has been updated successfully.`,
      });
    } else {
      // Add new discount
      const newDiscount: Discount = {
        id: discounts.length + 1,
        code: formData.code,
        description: formData.description,
        percentage: Number(formData.percentage),
        validUntil: formData.validUntil,
        active: true,
      };
      setDiscounts([...discounts, newDiscount]);
      toast({
        title: "Discount created",
        description: `New discount code ${formData.code} has been created successfully.`,
      });
    }

    // Reset form and close dialog
    setFormData({ code: "", description: "", percentage: "", validUntil: "" });
    setEditingDiscount(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (discount: Discount) => {
    setEditingDiscount(discount);
    setFormData({
      code: discount.code,
      description: discount.description,
      percentage: discount.percentage.toString(),
      validUntil: discount.validUntil,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDiscounts(discounts.filter(d => d.id !== id));
    toast({
      title: "Discount deleted",
      description: "The discount has been deleted successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Discount Management</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingDiscount(null);
                setFormData({ code: "", description: "", percentage: "", validUntil: "" });
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Discount
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingDiscount ? "Edit Discount" : "Add New Discount"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Discount Code</label>
                  <Input
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    placeholder="Enter discount code"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter discount description"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Percentage (%)</label>
                  <Input
                    type="number"
                    name="percentage"
                    value={formData.percentage}
                    onChange={handleInputChange}
                    placeholder="Enter discount percentage"
                    min="0"
                    max="100"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Valid Until</label>
                  <Input
                    type="date"
                    name="validUntil"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingDiscount ? "Update Discount" : "Create Discount"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {discounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">{discount.code}</TableCell>
                  <TableCell>{discount.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 mr-1" />
                      {discount.percentage}
                    </div>
                  </TableCell>
                  <TableCell>{discount.validUntil}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      discount.active 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {discount.active ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mr-2"
                      onClick={() => handleEdit(discount)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500"
                      onClick={() => handleDelete(discount.id)}
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
    </MainLayout>
  );
};

export default Discounts;