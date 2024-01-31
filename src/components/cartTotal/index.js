import React from "react";
import styles from "./cartTotal.module.css";
import { NumericFormat } from 'react-number-format';

const CartTotal = ({getCartCount, getTotalPrice}) => {
    return(
        <div className={styles.cartTotal_container}>
            <h2 className={styles.subtotal}>Subtotal ({getCartCount()} items): <NumericFormat value={getTotalPrice()} displayType={'text'} thousandSeparator="," prefix={'$'} /></h2>
            <button className={styles.checkout_button}>Proceed to Checkout</button>
        </div>
    );
};

export default CartTotal;