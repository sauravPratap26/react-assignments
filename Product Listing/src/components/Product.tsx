import { useState } from "react";
import "../Product.css";
import type { PRODUCT } from "../types/type";

const Product = ({ product }: { product: PRODUCT }) => {
  const {
    brand,
    category,
    description,
    discountPercentage,
    images,
    price,
    rating,
    stock,
    thumbnail,
    title,
  } = product;
  const [current, setCurrent] = useState(0);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-card">
      <div className="product-category">{category}</div>

      <div className="image-container">
        <img src={images[current] || thumbnail} alt={title} />

        <button className="nav-btn left" onClick={prevImage}>
          ‹
        </button>
        <button className="nav-btn right" onClick={nextImage}>
          ›
        </button>
      </div>

      <div className="product-info">
        <h3>{title}</h3>
        <p className="brand">{brand}</p>
        <p className="description">{description}</p>

        <div className="price-row">
          <span className="price">₹{price}</span>
          <span className="discount">-{discountPercentage}%</span>
        </div>

        <div className="meta">
          ⭐ {rating} | Stock: {stock}
        </div>
      </div>
    </div>
  );
};

export default Product;
