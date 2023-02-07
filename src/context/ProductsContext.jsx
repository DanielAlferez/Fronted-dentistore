import React, { useState, useEffect } from "react";
const ProductsContext = React.createContext();
import productDefault from "../data/productDefault";



const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const URLP = import.meta.env.VITE_HOST + "products/"
    try {
        const response = await fetch(URLP);
        const data = await response.json();
        if(data.length > 0){
            setProducts(data);
        }
        else{
            setProducts(productDefault)
        }
    } catch (error) {
        alert("Error al consultar el servidor");
        console.log('Error al consultar productos')
    }
    };

    fetchData();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
export default ProductsContext;
