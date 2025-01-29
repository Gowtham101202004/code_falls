import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Product from "./Product";
import AdminDashboard from "./AdminDashboard";
import WelcomePage from "./WelcomePage";
import Navbar from "./Navbar";
import OrderPage from "./OrderPage";
<<<<<<< HEAD
import Footer from "./Footer";
=======
>>>>>>> 574963999eecbbc254bb92ce08602f07a26c6c65

const App = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<Navbar/>}>
        <Route path="/main/home" index element={<WelcomePage />} />
        <Route path="/main/product" element={<Product />} />
        <Route path="/main/order" element={<OrderPage />} />
<<<<<<< HEAD
=======
  
>>>>>>> 574963999eecbbc254bb92ce08602f07a26c6c65
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
