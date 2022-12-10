import React from "react";
import { useEffect } from "react";

const CartContext = React.createContext();

const getProducts = () => {
  return JSON.parse(localStorage.getItem("car")) ?? [];
};

const CartProvider = ({ children }) => {
  const [products, setProducts] = React.useState(getProducts());

  const productIsAdded = (id) => {
    let isAdded = false;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        isAdded = true;
        break;
      }
    }
    return isAdded;
  };

  const addProduct = (product) => {
    if (productIsAdded(product.id)) return;
    const productsStored = products;
    productsStored.push(product);
    setProducts(productsStored);
    console.log(products);
    localStorage.setItem("car", JSON.stringify(products));
  };
  const deleteProduct = (id) => {
    const newProducts = products.filter((product) => product.id !== id);
    setProducts(newProducts);
    localStorage.setItem("car", JSON.stringify(newProducts));
  };

  const increaseMount = (index) => {
    let productsStored = products;
    let productStored = products[index];
    productStored.mount += 1;
    productsStored[index] = productStored;
    setProducts(productsStored);
    console.log(products);
    localStorage.setItem("car", JSON.stringify(productsStored));
  };

  const decreaseMount = (index) => {
    let productsStored = products;
    let productStored = products[index];
    productStored.mount -= productStored.mount === 1 ? 0 : 1;
    productsStored[index] = productStored;
    setProducts(productsStored);
    localStorage.setItem("car", JSON.stringify(productsStored));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        decreaseMount,
        increaseMount,
        productIsAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export { CartProvider };
export default CartContext;
