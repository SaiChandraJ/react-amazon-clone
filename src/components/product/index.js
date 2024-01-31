import React from "react";
import styles from "./product.module.css";
import { db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const Product = ({title, price, rating, image, limit, id, user}) => {

    const addToCart = async () => {
        const cartItemsDoc = doc(db, `${user.email.split('@')[0]}_cartItems`,id);
        const cartItemsDocSnap = await getDoc(cartItemsDoc);

        if (cartItemsDocSnap.exists()) {
            if(cartItemsDocSnap.data().quantity < limit){
                await setDoc(doc(db, `${user.email.split('@')[0]}_cartItems`, id), {
                    ...cartItemsDocSnap.data(),
                    quantity: cartItemsDocSnap.data().quantity + 1
                });
            }else{
                alert("Maximum Limit Achieved");
            }
        } else {
            await setDoc(doc(db, `${user.email.split('@')[0]}_cartItems`, id), {
                name: title,
                image: image,
                price: price,
                quantity: 1
              });
        }
    }

    return(
        <div className={styles.product_container}>
            <Link to={`/productDetail/${id}`}><span className={styles.title}>{title}</span></Link>
            <span className={styles.price}>${price}</span>
            <div className={styles.rating}>
                {Array(rating).fill().map((rating, index) => <p key={index}>⭐</p>)}
            </div>
            <img src={image} alt={title} className={styles.image} />
            <div className={styles.button}>
                <button className={styles.addToCart_button} onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;