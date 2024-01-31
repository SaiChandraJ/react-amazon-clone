import React from "react";
import styles from "./home.module.css";
import Product from "../product";

const Home = ({user, products}) => {
    return(
        <div className={styles.homepage_container}>
            <div className={styles.banner}></div>
            <div className={styles.content}>
                {products.map((data) => {
                    return(
                        <Product 
                            key={data.id}
                            id={data.id}
                            title={data.product.name} 
                            price={data.product.price} 
                            rating={data.product.rating} 
                            image={data.product.image}
                            limit={data.product.limit} 
                            user={user}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;