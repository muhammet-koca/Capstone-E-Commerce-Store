import { useGetProductQuery } from "./homeSlice";
import { useGetUserQuery } from "../features/updateSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const { data: products = [], isSuccess, isLoading } = useGetProductQuery();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const userId = () => {};
    userId();
  }, []);

  const filterProducts = (searchInput) => {
    const filteredProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    filterProducts(searchInput);
  }, [searchInput, products]);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="returning">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleChange}
          className="search-bar"
        />
      </div>
      <div className="product-list">
        {isSuccess &&
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="product-image"
                />
                <h2 className="product-name">{product.productName}</h2>
                <p className="product-price">
                  Price: ${product.price.toFixed(2)}
                </p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
