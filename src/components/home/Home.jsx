import Layout from "../../hocs/Layout";
import styles from "./Home.module.css";
import Card from "../Card";
import products from "../../data/products";
import Slider from "../slider";

const Home = () => {
  return (
    <Layout>
      <div className="py-20 2xl:px-60 lg:px-28 sm:px-14 md:px-10 px-10">
        <main className={styles.section}>
          <section className={styles.container}>
            <Slider></Slider>
          </section>
          <div className="grid grid-cols-11 w-full justify-center items-center my-6 " >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Todos Los Productos</h1><hr  className="col-span-4"/>
          </div>
          <section className={styles.container}>
            <div className={styles.layout}>
              {products.map((element, index) => (
                <Card
                  key={index}
                  title={element.title}
                  image={element.image}
                  description={element.description}
                />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center my-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Productos Más Vendidos</h1><hr  className="col-span-4"/>
          </div>

          <section className={styles.container}>
            <div className={styles.layout}>
              {products.map((element, index) => (
                <Card
                  key={index}
                  title={element.title}
                  image={element.image}
                  description={element.description}
                />
              ))}
            </div>          
          </section>

          <div className="grid grid-cols-11 w-full justify-center items-center my-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Categorias</h1><hr  className="col-span-4"/>
          </div>

          <section className={styles.container}>
            <div className={styles.layout}>
              {products.map((element, index) => (
                <Card
                  key={index}
                  title={element.title}
                  image={element.image}
                  description={element.description}
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
