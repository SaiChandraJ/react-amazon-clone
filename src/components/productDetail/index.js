import React, { useEffect, useState } from "react";
import styles from "./productDetail.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { NumericFormat } from 'react-number-format';


const ProductDetail = ({products, cartItems, user}) => {
    const {productID} = useParams();
    const navigate = useNavigate();
    const [product] = products.filter((product) => product.id === productID);
    const [cartItem] = cartItems.filter((cartItem) => cartItem.id === productID);
    const [productDetail, setProductDetail] = useState(null);
    const [image, setImage] = useState((product && product.product.image) || null);
    const [loading, setLoading] = useState(false);

    const getImage = (event) => {
        setImage(event.target.src);
    };

    const addToCart = async () => {
        const cartItemsDoc = doc(db, `${user.email.split('@')[0]}_cartItems`, productID);
        const cartItemsDocSnap = await getDoc(cartItemsDoc);

        if (cartItemsDocSnap.exists()) {
            if(cartItemsDocSnap.data().quantity < product.product.limit){
                await setDoc(doc(db, `${user.email.split('@')[0]}_cartItems`, productID), {
                    ...cartItemsDocSnap.data(),
                    quantity: cartItemsDocSnap.data().quantity + 1
                });
            }else{
                alert("Maximum Limit Achieved"); 
            }
        } else {
            await setDoc(doc(db, `${user.email.split('@')[0]}_cartItems`, productID), {
                name: product.product.name,
                image: product.product.image,
                price: product.product.price,
                quantity: 1
            });
        }
    }

    useEffect(() => {
        const getProductDetail = async () => {
            onSnapshot(doc(db, "productDetails", productID), (doc) => {
                setProductDetail(doc.data());
            });
        }

        if(!product){
            navigate("/");
        }else{
            setLoading(true);
            getProductDetail();
        }
    },[productID, product, navigate]);

    if(!loading){
        return(
            <div className={styles.product_error}>Loading...</div>
        );
    }

    if(!product || !productDetail){
        return(
            <div className={styles.product_error}>Product Details not Available!!!</div>
        );
    }else{
        return(
            <div>
                <div className={styles.productDetail_container}>
                    <div className={styles.images_container}>
                        <div className={styles.topimage_container}>
                            <img src={image} alt="ipad" className={styles.image} />
                        </div>
                        <div className={styles.lowerimages_container}>
                            {productDetail && JSON.parse(productDetail.images).map((img, index) => {
                                return(
                                    <img src={img} alt="" className={styles.lowerimage} onMouseEnter={getImage} onClick={getImage} key={index} />
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.information_container}>
                        <div className={styles.top_information}>
                            <h1 className={styles.title}>{product && product.product.name}</h1>
                            <p className={styles.brand}>Brand: {productDetail && productDetail.brand}</p>
                            <p className={styles.rating}><span className={styles.rating_text}>{product && product.product.rating}.0</span>{product && Array(product.product.rating).fill().map((rating, index) => <span key={index}>⭐</span>)}</p>
                            <p className={styles.sell_count}>{productDetail && productDetail.sellcount}+ bought in last month</p>
                            <hr />
                        </div>
                        <div className={styles.price_container}>
                            <p className={styles.deal}>Deal of the Day</p>
                            <h2 className={styles.discounted_price}><span className={styles.discount}>-{productDetail && productDetail.discount}%</span>{product && <NumericFormat value={product.product.price} displayType={'text'} thousandSeparator="," prefix={'$'} />}</h2>
                            <p className={styles.actual_price}>M.R.P: $<span className={styles.actual_price_number}>{product && productDetail && Math.floor((product.product.price*100)/(100-productDetail.discount))}</span></p>
                            <p className={styles.taxes_text}>Inclusive of all taxes</p>
                            <hr />
                        </div>
                        <div className={styles.bottom_information}>
                            <h4 className={styles.item_info}>Brand: <span className={styles.item_info_value}>{productDetail && productDetail.brand}</span></h4>
                            <h4 className={styles.item_info}>Model Name: <span className={styles.item_info_value}>{productDetail && productDetail.modelname}</span></h4>
                            <h4 className={styles.item_info}>Memory Storage Capacity: <span className={styles.item_info_value}>{productDetail && productDetail.MemoryStorageCapacity}</span></h4>
                            <h4 className={styles.item_info}>Screen Size: <span className={styles.item_info_value}>{productDetail && productDetail.ScreenSize} Inches</span></h4>
                            <h4 className={styles.item_info}>Operating System: <span className={styles.item_info_value}>{productDetail && productDetail.OperatingSystem}</span></h4>
                            <hr />
                        </div>
                    </div>
                    <div className={styles.buynow_container}>
                        <div className={styles.buynow_card_container}>
                            <h4><span className={styles.delivery_text}>FREE Delivery by </span>27 January</h4>
                            <h4><span className={styles.delivery_text}>Or Fastest Delivery by </span>26 January</h4>
                            <hr />
                            <p className={styles.stock_text}>In Stock</p>
                            <div className={styles.seller_container}>
                                <div className={styles.seller_info1}>
                                    <p className={styles.seller_text}>Ships from</p>
                                    <p className={styles.seller_text}>Amazon</p>
                                </div>
                                <div className={styles.seller_info2}>
                                    <p className={styles.seller_text}>Sold by</p>
                                    <p className={styles.seller_text}>Appario Retail Private Ltd</p>
                                </div>
                            </div>
                            <p className={styles.quantity}>Quantity: {cartItem ? cartItem.product.quantity : 0}</p>
                            <div className={styles.button_container}>
                                <button className={styles.addToCart_button} onClick={addToCart}>Add to Cart</button>
                                <Link to="/cart"><button className={styles.buyNow_button}>Buy Now</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.below_buynow_container}>
                    <div className={styles.below_buynow_card_container}>
                        <h4><span className={styles.below_delivery_text}>FREE Delivery by </span>27 January</h4>
                        <h4><span className={styles.below_delivery_text}>Or Fastest Delivery by </span>26 January</h4>
                        <hr />
                        <p className={styles.below_stock_text}>In Stock</p>
                        <div className={styles.below_seller_container}>
                            <div className={styles.below_seller_info1}>
                                <p className={styles.below_seller_text}>Ships from</p>
                                <p className={styles.below_seller_text}>Amazon</p>
                            </div>
                            <div className={styles.below_seller_info2}>
                                <p className={styles.below_seller_text}>Sold by</p>
                                <p className={styles.below_seller_text}>Appario Retail Private Ltd</p>
                            </div>
                        </div>
                        <p className={styles.below_quantity}>Quantity: {cartItem ? cartItem.product.quantity : 0}</p>
                        <div className={styles.below_button_container}>
                            <button className={styles.below_addToCart_button} onClick={addToCart}>Add to Cart</button>
                            <Link to="/cart"><button className={styles.below_buyNow_button}>Buy Now</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductDetail;