import Layout from "../hocs/Layout";
import styles from "../App.module.css";
import Card from "../components/Card";
import posts from "../data/posts";

const Home = () => {
  return (
    <Layout>
      <div className="p-20">
        <main className={styles.section}>
          <section className={styles.container}>
            <div className={styles.layout}>
              {posts.map((element, index) => (
                <Card
                  key={index}
                  title={element.title}
                  likes={element.likes}
                  order={index + 1}
                  image={element.image}
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
