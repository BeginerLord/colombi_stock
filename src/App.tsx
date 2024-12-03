 import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Suppliers from "./screen/suppliers";
import Products from "./screen/products";
import ProductLowStock from "./components/uiProductLowStock";
 

import ScreenCategory from "./screen/category";
  


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/provedores" element={<Suppliers />} />

        <Route path="/productos" element={<Products />} />
 
        <Route path="/xd" element={<Suppliers />} />
        <Route path="/categoria" element={<ScreenCategory />} />
        <Route path="*" element={<div>Page not found</div>} /> {/* Default route */}
        <Route path="/productos-low-stock" element={<ProductLowStock/>} />
 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;