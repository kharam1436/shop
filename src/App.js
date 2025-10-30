import { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import ProductAll from './pages/ProductAll';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';

const PrivateRoute = ({ authenticate, children }) => {
  const location = useLocation();
  if (!authenticate) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  return (
    <div className="App">
      <Navbar authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route path="/shop" element={<ProductAll />} />
        <Route path="/login" element={<Login setAuthenticate={setAuthenticate} />} />
        <Route
          path="/product/:id"
          element={
            <PrivateRoute authenticate={authenticate}>
              <ProductDetail />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
