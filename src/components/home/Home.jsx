import Layout from "../../hocs/Layout";
import styles from "./Home.module.css";
import Card from "../Card";
import products from "../../data/products";
import CardHome from "../cardHome";
import CardSlideHome from "../CardSlideHome";
import Presentation from "./Presentation";


const Home = () => {
  return (
    <Layout>
      <div className="py-8 lg:pt-14 2xl:px-44 xl:px-20 lg:px-10 md:px-8 sm:px-7 px-6">
        <main className={styles.section}>
          <section className={styles.container}>
            <Presentation/>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center mb-6 " >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Categorias</h1><hr  className="col-span-4"/>
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
                />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center my-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Sobre Nostros</h1><hr  className="col-span-4"/>
          </div>

          <section className={styles.container}>
            <CardSlideHome/>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center my-6" >
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
                />
              ))}
            </div>          
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center my-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Todos Los Productos</h1><hr  className="col-span-4"/>
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
                />
              ))}
            </div>          
          </section>

          

        </main>
      </div>
    </Layout>
  );
};

export default Home;
