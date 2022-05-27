import "bootstrap/dist/css/bootstrap.min.css"
import "./styles.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import HomeView from "./views/HomeView";

import { getCategories } from "./services/categoryService";
import { getCategoryById } from "./services/categoryService";
import { getProduct } from "./services/productService";

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="container mt-4">
            <Routes>
              <Route path="/" element={<HomeView />} />
              {/* <Route path="/detallelugar/:catId/:lugId" element={<DetalleLugarView />} /> */}
              {/* <Route path="/favoritos" element={<ProtectedRoute><FavoritosView /></ProtectedRoute>} /> */}
              {/* <Route path="/login" element={<LoginView />} /> */}
              {/* <Route path="/categoria/:catId" element={<CategoriaView />} /> */}
            </Routes>
          </div>
    </Router>
  );
}
