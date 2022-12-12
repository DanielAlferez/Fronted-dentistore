import Layout from "../../hocs/Layout";
import styles from "./Home.module.css";
import Card from "../Card";
//import products from "../../data/products";
import CardHome from "../cardHome";
import CardSlideHome from "../CardSlideHome";
import Presentation from "./Presentation";
import Categories from "./Categories";
import { TbTruck, TbPackage } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import Map from "./Map";
import  useProductsContext from '../../hooks/useProducts'

const Home = () => {
  const {products} = useProductsContext();

  return (
    <Layout>
      <div className="relative py-8 lg:pt-14 2xl:px-44 xl:px-20 lg:px-10 md:px-8 sm:px-7 px-6">
        <main className={styles.section}>
          <section className={styles.container}>
            <Presentation/>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center" />
          <section className="pb-20 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-center text-center gap-4 max-w-[16rem] sm:max-w-4xl ">
              <div className="bg-gray-200 p-4 grid grid-cols-1 rounded-2xl ">
                <center><TbTruck className="w-14 h-14 font-thin"/></center>
                <h1 className="text-xl font-medium text-black">Compra facil y enviamos rapido</h1>
              </div>
              <div className="bg-gray-200 p-4 grid grid-cols-1 rounded-2xl">
                <center><TbPackage className="w-14 h-14 font-thin"/></center>
                <h1 className="text-xl font-medium text-black">Disponibilidad inmediata</h1>
              </div>
              <div className="bg-gray-200 p-4 grid grid-cols-1  rounded-2xl">
                <center><RiSecurePaymentLine className="w-14 h-14 font-thin"/></center>
                <h1 className="text-xl font-medium text-black">Seguridad en tus compras</h1>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center mb-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Categorias</h1><hr  className="col-span-4"/>
          </div>
          <section className={styles.container}>
            <Categories/>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center mb-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Productos Más Recientes</h1><hr  className="col-span-4"/>
          </div>

          <section className={styles.container}>
            <div className={styles.layout}>
              {products.map((element, index) => (
                <Card
                  key={index}
                  id={element.id}
                  title={element.title}
                  image={element.image}
                  price={element.price}
                  color={element.color}
                />
              ))}
            </div>          
          </section>


          <div className="grid grid-cols-11 w-full justify-center items-center mb-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Sobre Nosotros</h1><hr  className="col-span-4"/>
          </div>

          <section className={styles.container}>
            <CardSlideHome/>
          </section>

          
          <div className="grid grid-cols-11 w-full justify-center items-center mb-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Encuentranos</h1><hr  className="col-span-4"/>
          </div>
          <section className={styles.container}>
            <Map/>
          </section>

        </main>
      </div>
    </Layout>
  );
};

export default Home;
