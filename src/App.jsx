import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Forgotpass from "./pages/ForgotPass";
import Updatepss from "./pages/UpdatePass";
import Blogs from "./pages/Blogs";
import Product from "./pages/Product";
import ProductDisplay from "./pages/ProductDisplay";
import WishList from "./pages/wishList";
import Customize from "./pages/Customize";
import UserDashboard from "./pages/user/Dashboard";
import UserWelcome from "./pages/user/UserWelcome";
import OrderHist from "./pages/user/Order";
import Details from "./pages/user/Details";
import Dashboard from "./pages/admin/Dashboard";
import Order from "./pages/admin/Order";
import CustomOrder from "./pages/admin/CustomOrder";
import CreateProd from "./pages/admin/createProd";
import UpdateProd from "./pages/admin/updateProd";
import AdminWelcome from "./pages/admin/AdminWelcome";
import Stats from "./pages/admin/Stats";
import ErrorPage from "./pages/404";

function App() {
  const [token, setToken] = useState(false);

  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    } else {
      setToken(false);
    }
  }, []);

  const shouldRenderNavbar = ![
    "#/admin/dashboard",
    "#/admin/dashboard/order",
    "#/admin/dashboard/custom",
    "#/admin/dashboard/stats",
    "#/admin/dashboard/create",
    "#/admin/dashboard/update",
  ].includes(window.location.hash);

  return (
    <Router>
      {shouldRenderNavbar && <Navbar token={token} />}
      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/signin" element={<Signin setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgotpass />} />
        <Route path="/updatepassword" element={<Updatepss />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/products/:id"
          element={<ProductDisplay token={token} />}
        />
        <Route path="/products" element={<Product />} />
        <Route exact path="/blog/:id" element={<Blogs />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/user/dashboard" element={<UserDashboard />}>
          <Route path="" element={<UserWelcome />}>
            <Route path="" element={<Outlet />} />
          </Route>
          <Route path="order" element={<OrderHist />} />
          <Route path="details" element={<Details />} />
        </Route>
        {token ? (
          <Route path="/admin/dashboard" element={<Dashboard token={token} />}>
            <Route path="" element={<AdminWelcome />}>
              <Route path="" element={<Outlet />} />
            </Route>
            <Route path="order" element={<Order />} />
            <Route path="custom" element={<CustomOrder />} />
            <Route path="stats" element={<Stats />} />
            <Route path="create" element={<CreateProd />} />
            <Route path="update" element={<UpdateProd />} />
          </Route>
        ) : (
          "/"
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
