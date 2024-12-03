 import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Suppliers from "./screen/suppliers";
import ScreenCategory from "./screen/category";
import SalesScreen from "./screen/sales";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/provedores" element={<Suppliers />} />
        <Route path="/xd" element={<Suppliers />} />
        <Route path="/categoria" element={<ScreenCategory />} />
        <Route path="/ventas" element={<SalesScreen />} />
        <Route path="*" element={<div>Page not found</div>} /> {/* Default route */}
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;