import React from "react";
import styles from "./error.module.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return(
        <div className={styles.error_container}>
            <div className={styles.error_content}>
                <h1 className={styles.error_heading}>Oops! You seem to be lost.</h1>
                <p className={styles.error_paragraph}>Here are some helpful links:</p>
                <div className={styles.error_links_container}>
                    <Link to='/login'>Login</Link>
                    <Link to='/'>Home</Link>
                    <Link to='/cart'>Cart</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;