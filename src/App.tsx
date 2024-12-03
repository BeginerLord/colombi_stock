 import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Suppliers from "./screen/suppliers";
import Products from "./screen/products";
import ProductLowStock from "./components/uiProductLowStock";

 

import ScreenCategory from "./screen/category";

import SalesScreen from "./screen/sales";
import StockIn from "./components/uiStockIn";
import NotFound from "./components/ui/404";



function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/provedores" element={<Suppliers />} />
      <Route path="/" element={<Suppliers />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/categoria" element={<ScreenCategory />} />
        <Route path="/ventas" element={<SalesScreen />} />
        <Route path="/productos-low-stock" element={<ProductLowStock />} />
        <Route path="/stock-in" element={<StockIn />} />
        <Route path="*" element={<NotFound />} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;