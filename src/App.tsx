 import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Suppliers from "./screen/suppliers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/xd" element={<Suppliers />} />
        <Route path="*" element={<div>Page not found</div>} /> {/* Default route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;