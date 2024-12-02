 import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Suppliers from "./screen/suppliers";
import UpdateSuppliers from "./components/uiSuppliers/update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/provedores" element={<Suppliers />} />
        <Route path="*" element={<div>Page not found</div>} /> {/* Default route */}
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;