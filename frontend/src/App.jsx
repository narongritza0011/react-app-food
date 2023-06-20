import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./profile/Profile";
import NotFound from "./components/NotFound";
import Users from "./admins/users/Users";
import UsersDetail from "./admins/users/UsersDetail";
import ResetPassword from "./admins/users/ResetPassword";
import Foods from "./admins/foods/Foods";
import FoodDetail from "./admins/foods/FoodDetail";
import FoodAdd from "./admins/foods/FoodAdd";
import Address from "./admins/address/Address";
import Home from "./users/Home";
import Cart from "./users/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Users crud */}
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/users/:id" element={<UsersDetail />} />
        <Route
          path="/admin/users/reset-password/:id"
          element={<ResetPassword />}
        />

        {/* Menu foods */}
        <Route path="/admin/foods" element={<Foods />} />
        <Route path="/admin/foods/:id" element={<FoodDetail />} />
        <Route path="/admin/foods/add" element={<FoodAdd />} />

        {/* address */}
        <Route path="/admin/address" element={<Address />} />

        {/* User */}
        <Route path="/user/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />



        {/* Page notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
