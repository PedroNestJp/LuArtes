import React from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();

  return (
    <div>
      <h1>Product Page</h1>
      <h2>Product ID: {id}</h2>
    </div>
  );
}

export default Product;
