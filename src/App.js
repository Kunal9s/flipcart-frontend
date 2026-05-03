import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";

import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailView from "./components/details/DetailView";
import Cart from './components/cart/Cart';
import OrderSuccess from './components/OrderSuccess';
import PrivateRoute from "./components/PrivateRoute";
import Address from "./components/Address";
import Payment from "./components/Payment";


function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
        <Box style={{ marginTop: 54 }}>
          <Routes>
            {/*Public Route*/}
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<DetailView />} />
            <Route path='/cart' element={<Cart />} />

            {/*Protected Routes*/}
            <Route element={<PrivateRoute />}>
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/address" element={<Address />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
