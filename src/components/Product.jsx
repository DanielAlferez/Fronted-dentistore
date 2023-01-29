import React from 'react';
import { useParams} from "react-router-dom";
import  useProductsContext from "../hooks/useProducts"

function Product() {
    const params = useParams();
    const {products} = useProductsContext();
  return (
    <>
        {products.map((element, index) => (
            <div id={index}>
                {(() => {
                    if (element.id == params.id) {
                        return(
                            <div>
                                {element.title}
                            </div>
                        );
                    }
                })()}
            </div>
        ))}
    </>
  )
}

export default Product