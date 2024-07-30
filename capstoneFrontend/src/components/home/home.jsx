import { useGetProductQuery } from "./homeSlice";
import { useGetUserQuery } from "../features/updateSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";

export default function Home() {
  const [sortOption, setSortOption] = useState("name-asc");
  const { data: products = [], isSuccess, isLoading } = useGetProductQuery();

  useEffect(() => {
    const userId = () => {};
    userId();
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption.startsWith("price")) {
      const priceComparison = a.price - b.price;
      return sortOption === "price-asc" ? priceComparison : -priceComparison;
    } else if (sortOption.startsWith("name")) {
      const nameComparison = a.productName.localeCompare(b.productName);
      return sortOption === "name-asc" ? nameComparison : -nameComparison;
    }
    return 0;
  });

  return (
    <div>
      <div className="sort-options">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOption} onChange={handleSortChange}>
          <option value="name-asc">Product Name (A to Z)</option>
          <option value="name-desc">Product Name (Z to A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      <div className="product-list">
        {isSuccess &&
          sortedProducts.map((product) => (
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
