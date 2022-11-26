import Layout from "../../hocs/Layout";
import styles from "./Home.module.css";
import Card from "../Card";
import products from "../../data/products";
import CardHome from "../cardHome";
import {Tabs, TabsHeader, TabsBody, Tab, TabPanel} from "@material-tailwind/react";



const Home = () => {
  return (
    <Layout>
      <div className="py-20 2xl:px-60 lg:px-28 sm:px-14 md:px-10 px-10">
        <main className={styles.section}>
          <section className={styles.container}>
            <CardHome></CardHome>
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

          <div className="grid grid-cols-11 w-full justify-center items-center my-6" >
            <hr  className="col-span-4"/><h1 className="text-center col-span-3 xs:text-xs sm:text-xl text-gray-400 font-semibold">Tabs</h1><hr  className="col-span-4"/>
          </div>

          <section>
                <Tabs id="custom-animation" value="html" >
                  <TabsHeader className="w-56 content-center">
                    <Tab key={"t1"} value={"t1"} className="bg-slate-500">
                      Test 1
                    </Tab>
                    <Tab key={"t2"} value={"t2"} className="bg-slate-500 hover:bg-slate-300" >
                      Test 2
                    </Tab>
                  </TabsHeader>
                  <TabsBody>
                    <TabPanel key={"t1"} value={"t1"}>
                      Test 1.1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque pariatur atque tempore, et modi numquam sapiente tempora inventore dolor, est in aperiam dolorem tenetur animi? Eius asperiores dolores eaque suscipit?
                    </TabPanel>
                    <TabPanel key={"t2"} value={"t2"}>
                      Test 2.1
                    </TabPanel>
                  </TabsBody>
                </Tabs>
          </section>

        </main>
      </div>
    </Layout>
  );
};

export default Home;
