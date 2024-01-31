import React from "react";
import styles from "./cart.module.css";
import CartItems from "../cartItems";
import CartTotal from "../cartTotal";

const Cart = ({cartItems, products ,user}) => {

    const getCartCount = () => {
        let count = 0;
        cartItems.forEach((item) => {
            count = count + item.product.quantity
        });
        return count;
    };

    const getTotalPrice = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total = total + item.product.price * item.product.quantity
        });
        return total;
    };

    return(
        <div className={styles.cart_container}>
            <CartItems cartItems={cartItems} products={products} user={user} />
            <CartTotal getCartCount={getCartCount} getTotalPrice={getTotalPrice} />
        </div>
    );
};

export default Cart;