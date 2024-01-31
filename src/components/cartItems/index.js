import React from "react";
import styles from "./cartItems.module.css";
import CartItem from "../cartItem";

const CartItems = ({cartItems, products ,user}) => {
    return(
        <div className={styles.cartItems_container}>
            <h1 className={styles.title}>Shopping Cart</h1>
            <hr />
            <div className={styles.items_container}>
                {
                    cartItems.map((item) => {
                        const [product] = products.filter((product) => product.id === item.id);
                        const limit = product.product.limit;
                        return <CartItem key={item.id} id={item.id} item={item.product} user={user} limit={limit} />
                    })
                }
            </div>
        </div>
    );
};

export default CartItems;