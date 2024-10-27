import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Footer from "./Components/Footer";
import ServicesPage from "./Pages/ServicesPage";
import ShopHome from "./Pages/ShopHome";
import Business from "./Pages/Business";


function App() {
  const location = useLocation();
  
  return (
    <>
      {/* Conditionally render Navbar if not on the login page */}
      {(location.pathname !== '/login' && location.pathname !== '/signup') && <Navbar />}

      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/service/:business_name/:business_id" element={<ShopHome/>} />
        <Route path="/business/registration" element={<Business/>} />
        {/* Add other routes here */}
      </Routes>
      {(location.pathname !== '/login' && location.pathname !== '/signup') && <Footer />}
    </>
  );
}

// Wrap the App component with BrowserRouter in the main entry file (index.tsx or main.tsx)
export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
