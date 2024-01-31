import React, { useState } from "react";
import styles from "./header.module.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Outlet, Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

const Header = ({cartItems, user, signingOut}) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const getCartCount = () => {
        let count = 0;
        cartItems.forEach((item) => {
            count = count + item.product.quantity
        });
        return count;
    };

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };
    
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return(
        <>
            <div className={styles.header}>
                <button className={styles['sidebar-toggle']} onClick={openSidebar}>
                    {!isSidebarOpen && <MenuIcon />}
                </button>
                <div className={`${styles.sidebar} ${isSidebarOpen ? styles['show-sidebar'] : ''}`}>
                    <div className={styles['sidebar-header']}>
                        <img src="https://i.imgur.com/7I9Was5.png" alt='logo' className={styles.logo} />
                        <button className={styles['close-btn']} onClick={closeSidebar}>
                            <CloseIcon />
                        </button>
                    </div>
                    <ul className={styles.links}>
                        <li> <Link to="/"> <HomeIcon /> Home</Link> </li>
                        <li> <Link to="/login"> <LoginIcon /> Login</Link> </li>
                        <li> <Link to="/cart"> <ShoppingCartIcon /> Cart</Link> </li>
                    </ul>
                    {user && 
                        <div className={styles.user_sidebar_container}>
                            <div className={styles.user_sidebar}>
                                <div className={styles.user_logo_container}><img src={user ? user.photo : 'Photo'} alt="UserPhoto" className={styles.user_logo} /></div>
                                <div className={styles.header_option1}>
                                    <div className={styles.header_option_line1}>Hello, {user ? user.name : 'User'}</div>
                                    {user && <div className={styles.header_option_button} onClick={signingOut}>Sign Out</div>}
                                </div>
                            </div>
                            <div className={styles.header_option_cart}>
                                <Link to="/cart">
                                    <ShoppingBasketIcon />
                                    <div className={styles.header_cart_count}>
                                        {getCartCount()}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.header_logo}>
                    <Link to="/">
                        <img src="https://i.imgur.com/7I9Was5.png" alt="amazon_logo" className={styles.header_image} />
                    </Link>
                </div>
                <div className={styles.header_address}>
                    <LocationOnIcon />
                    <div className={styles.header_option}>
                        <div className={styles.header_option_line1}>Hello,</div>
                        <div className={styles.header_option_line2}>Select your address</div>
                    </div>
                </div>
                <div className={styles.header_search}>
                    <input type="text" className={styles.header_search_input} />
                    <div className={styles.header_search_icon}> <SearchIcon /> </div>
                </div>
                <div className={styles.header_nav_items}>
                    <div className={styles.user_logo_container}><img src={user ? user.photo : 'Photo'} alt="UserPhoto" className={styles.user_logo} /></div>
                    <div className={styles.header_option1}>
                        <div className={styles.header_option_line1}>Hello, {user ? user.name : 'User'}</div>
                        <div className={styles.header_option_line2}>Account & Lists</div>
                        {user && <div className={styles.header_option_button} onClick={signingOut}>Sign Out</div>}
                    </div>
                    <div className={styles.header_option2}>
                        <div className={styles.header_option_line1}>Returns</div>
                        <div className={styles.header_option_line2}>& Orders</div>
                    </div>
                    <div className={styles.header_option_cart}>
                        <Link to="/cart">
                            <ShoppingBasketIcon />
                            <div className={styles.header_cart_count}>
                                {/* {cartItems.reduce((quantity,cartItem) => cartItem.product.quantity + quantity, 0)} */}
                                {getCartCount()}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Header;