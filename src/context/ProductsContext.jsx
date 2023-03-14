import React from "react";
import products from "../data/products";
const ProductsContext = React.createContext();
const getProducts = () => {
    return products
};

const ProductsProvider = ({ children }) => {

    const [products, setProducts] = React.useState(getProducts);
    return (
        <ProductsContext.Provider
            value={{
                products
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export { ProductsProvider };
export default ProductsContext;