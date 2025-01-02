import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Products from "@/pages/Products";
import Categories from "@/pages/Categories";
import Cart from "@/pages/Cart";
import Users from "@/pages/Users";
import Settings from "@/pages/Settings";
import SalesReport from "@/pages/SalesReport";
import Payment from "@/pages/Payment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/catalog" element={<Index />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/users" element={<Users />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;