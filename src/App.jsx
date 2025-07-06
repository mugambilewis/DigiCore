import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DeviceDetail from "./pages/DeviceDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/device/:id" element={<DeviceDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
