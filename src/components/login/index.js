import React from "react";
import styles from "./login.module.css";
import { provider, auth } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = ({setUser}) => {
  
    const signIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            let newUser = {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            };
            localStorage.setItem('user',JSON.stringify(newUser));
            setUser(newUser);
        }).catch((error) => {
            alert(error.message);
        });
    };

    return(
        <div className={styles.login_container}>
            <div className={styles.content}>
                <img src="https://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" alt="AmazonLogo" className={styles.logo} />
                <h1>Sign Into Amazon</h1>
                <button className={styles.login_button} onClick={signIn}>Sign In With Google</button>
            </div>
        </div>
    );
};

export default Login;