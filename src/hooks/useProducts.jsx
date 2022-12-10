import React from "react";
import ProductsContext from "../context/ProductsContext";

const useProductsContext = () => {
  return React.useContext(ProductsContext);
};

export default useProductsContext;
