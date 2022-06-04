import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap/dist/js/bootstrap.min.js";

import "./styles.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CartContextProvider from "./context/cartContext";
import FavsContextProvider from "./context/favsContext"
import { AuthContextProvider } from "./context/authContext";

import NavigationBar from "./components/NavigationBar";
import HomeView from "./views/HomeView";
import CategoryView from "./views/CategoryView";
import ProductView from "./views/ProductView";
import CartView from "./views/CartView";
import FavsView from "./views/FavsView";
import LoginView from "./views/LoginView";

export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <CartContextProvider>
          <FavsContextProvider>
            <NavigationBar />
            <div className="container mt-4">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/category/:catId" element={<CategoryView />} />
                <Route path="/productdetails/:catId/:prodId" element={<ProductView />} />
                <Route path="/cart" element={<CartView />} />
                <Route path="/favs" element={<FavsView />} />
                <Route path="/login" element={<LoginView />} />
                {/* <Route path="/favoritos" element={<ProtectedRoute><FavoritosView /></ProtectedRoute>} /> */}
              </Routes>
            </div>
          </FavsContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </Router>
  );
}
