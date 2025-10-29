import { useNavigate } from "react-router-dom";
import "./productCard.css";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="card" onClick={() => showProduct(item.id)}>
      <img src={item && `https://noona-hnm.netlify.app/${item.img}`} alt={item?.title || "Product image"} />
      <div className="choice">{item?.choice ? "Conscious choice" : ""}</div>
      <div className="card-title">{item?.title}</div>
      <div className="card-price">₩{item?.price}</div>
      <div className="new-product">{item?.new ? "신제품" : ""}</div>
    </div>
  );
};

export default ProductCard;