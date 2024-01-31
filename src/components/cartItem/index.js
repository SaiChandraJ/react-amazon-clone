import React from "react";
import styles from "./cartItem.module.css";
import { NumericFormat } from 'react-number-format';
import { db } from "../../firebase";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

const CartItem = ({id, item, limit, user}) => {

    const deleteItem = async (event) => {
        event.preventDefault();
        await deleteDoc(doc(db, `${user.email.split('@')[0]}_cartItems`, id));
    }

    let options = [];

    for(let i=1; i<=limit; i++){
        options.push(<option key={i} value={i}>Qty: {i}</option>)
    }

    const changeQuantity = async (newQuantity) => {
        const cartItemsDoc = doc(db, `${user.email.split('@')[0]}_cartItems`,id);
        const cartItemsDocSnap = await getDoc(cartItemsDoc);
        await setDoc(doc(db, `${user.email.split('@')[0]}_cartItems`, id), {
            ...cartItemsDocSnap.data(),
            quantity: +newQuantity
        });
    };

    return(
        <div className={styles.cartItem_container}>
            <div className={styles.cartItem_image_container}>
                <img src={item.image} alt={item.name} className={styles.image} />
            </div>
            <div className={styles.cartItem_info}>
                <div className={styles.cartItem_text}>
                    <h2>{item.name}</h2>
                </div>
                <div className={styles.cartItem_bottom_info}>
                    <div className={styles.cartItem_quantity}>
                        <select value={item.quantity} onChange={(event) => {changeQuantity(event.target.value)}}>
                            {options}
                        </select>
                    </div>
                    <div className={styles.cartItem_delete} onClick={deleteItem}>Delete</div>
                </div>
            </div>
            <div className={styles.cartItem_price}><NumericFormat value={item.price} displayType={'text'} thousandSeparator="," prefix={'$'} /></div>
        </div>
    );
};

export default CartItem;