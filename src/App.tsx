 import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterSuppliers from "./components/uiSuppliers"; // Adjust the import path as needed

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/xd" element={<RegisterSuppliers />} />
        <Route path="*" element={<div>Page not found</div>} /> {/* Default route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;