import { BrowserRouter, Route, Routes } from "react-router-dom";
import Suppliers from "./screen/suppliers";
import Products from "./screen/products";
import ProductLowStock from "./components/uiProductLowStock";

import ScreenCategory from "./screen/category";
import SalesScreen from "./screen/sales";
import StockIn from "./components/uiStockIn";
import NotFound from "./components/ui/404";
import StockOut from "./components/uiStockOut";
import MovementStocks from "./screen/movementStock";
import StockToday from "./components/uiStockToday";
import StockAll from "./components/uitStockAll";
import StockMovementTransation from "./components/uiStockMovementTransation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/provedores" element={<Suppliers />} />
        <Route path="/" element={<Suppliers />} />
        <Route path="/stock-day" element={<StockToday />} />
        <Route path="/stock-trans" element={<StockMovementTransation />} />
        <Route path="/stock-all" element={<StockAll />} />
        <Route path="/categoria" element={<ScreenCategory />} />
        <Route path="/ventas" element={<SalesScreen />} />
        <Route path="/productos-low-stock" element={<ProductLowStock />} />
        <Route path="/stock-in" element={<StockIn />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/stock-out" element={<StockOut />} />
        <Route path="/movements" element={<MovementStocks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
