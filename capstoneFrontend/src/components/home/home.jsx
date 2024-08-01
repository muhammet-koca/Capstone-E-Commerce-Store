import React from "react";
import { useGetProductQuery } from "./homeSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  const [sortOption, setSortOption] = useState("name-asc");
  const {
    data: products = [],
    isSuccess,
    isLoading,
    error,
  } = useGetProductQuery();
  const [searchInput, setSearchInput] = useState("");

  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption.startsWith("price")) {
      const priceComparison = a.price - b.price;
      return sortOption === "price-asc" ? priceComparison : -priceComparison;
    } else if (sortOption.startsWith("name")) {
      const nameComparison = a.productName.localeCompare(b.productName);
      return sortOption === "name-asc" ? nameComparison : -nameComparison;
    }
    return 0;
  });

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Failed to load products.</h2>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={handleChange}
          className="search-bar"
        />
      </div>

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
