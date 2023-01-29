import React from 'react'
import Layout from "./../../hocs/Layout";
import { FaTeethOpen } from "react-icons/fa";
import  useProductsContext from '../../hooks/useProducts'
import Card from "../Card";

export default function Products() {

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const {products} = useProductsContext();

  return (
    <Layout>
      <center>
        <div className='max-w-7xl mb-10'>
          <div className='text-center py-10'>
            <h1 className='font-bold text-4xl text-gray-800'>Catálogo de productos</h1>
          </div>
          <div className='grid grid-cols-4'>
            <div className='px-12 md:block hidden'>
              <div className='pb-5 w-full'>
                <input className='rounded-xl w-full border-gray-400 text-gray-400' type="text" value="buscar" id="" />
              </div>
              <hr className='mb-8 mt-5'/>
              <div className='mt-3 text-left '>
                <h1 className='font-bold'>Categorias</h1>
              </div>
            </div>
            <div className='col-span-4 mx-5 md:col-span-3'>
              <hr />
                <p className='font-medium py-1.5 mr-10 text-lg text-right'>Ordenar por</p>
              <hr />
              <br />
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-center gap-x-3 gap-y-3'>
                {products.map((element, index) => (
                        <Card
                          key={index}
                          id={element.id}
                          title={element.title}
                          image={element.image}
                          price={element.price}
                          color={element.color}
                          description={element.description}
                        />
                    ))}
              </div>
            </div>
          </div> 
        </div>
      </center>
    </Layout>
  );
}
