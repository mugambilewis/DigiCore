import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DeviceDetail from "./pages/DeviceDetail";
import Cart from "./pages/Cart";

 
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import Dashboard from "./pages/admin/Dashboard";
  {/*
  import Checkout from "./pages/Checkout";
*/}

import Layout from "./components/Layout"; // 👈 Wrapper with Navbar, Footer, etc.
import PrivateRoute from "./components/PrivateRoute"; // 👈 Guards protected routes


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>

            {/* PUBLIC ROUTES */}
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/device/:id" element={<DeviceDetail />} />
              <Route path="/cart" element={<Cart />} />
             
              
               <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              {/* <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} /> */}
              
            </Route>

            {/* 404 PAGE */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}


export default App;
