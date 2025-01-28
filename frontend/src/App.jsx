import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import Product from "./Product";
import AdminDashboard from "./AdminDashboard";
import WelcomePage from "./WelcomePage";
import Navbar from "./Navbar";

const App = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<AuthPage />} />
        <Route path="/main" element={<Navbar/>}>
        <Route path="/main/home" index element={<WelcomePage />} />
        <Route path="/main/product" element={<Product />} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
      </Routes>
    </Router>
  );
};

export default App;
