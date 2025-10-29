import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/productCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import "./ProductAll.css";

const ProductAll = () => {
  let [products, setProducts] = useState([]);
  const [query] = useSearchParams();
  let [error, setError] = useState("");

  const getProducts = useCallback(async () => {
    try {
      let keyword = query.get("q") || "";
      let url = `https://my-json-server.typicode.com/legobitna/hnm-react-router/products?q=${keyword}`;
      let response = await fetch(url);
      let data = await response.json();

      console.log("Fetched data:", data);

      let allProducts = data || [];
      
      // Always set all products first (initial load)
      if (!keyword) {
        setProducts(allProducts);
        setError(""); // Clear any previous errors
      } else {
        // Filter products based on search keyword
        let filteredProducts = allProducts.filter(product => 
          product.title.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (filteredProducts.length < 1) {
          setError(`${keyword}와 일치하는 상품이 없습니다`);
          setProducts([]); // Clear products when no matches
        } else {
          setProducts(filteredProducts);
          setError(""); // Clear any previous errors
        }
      }
    } catch (err) {
      setError("상품을 불러오는데 실패했습니다");
      setProducts([]); // Clear products on error
    }
  }, [query]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <Container className="product-container">
      <div className="product-grid">
        {error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <Row>
            {products.length > 0 &&
              products.map((item) => (
                <Col lg={3} md={4} sm={6} xs={12} key={item.id}>
                  <ProductCard item={item} />
                </Col>
              ))}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default ProductAll;