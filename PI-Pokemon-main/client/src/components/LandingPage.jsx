import React from "react";
import {Link} from 'react-router-dom';
import styles from "./LandingPage.module.css"

export default function LandingPage (){
    return (
        <div className={styles.container}>
            <div className={styles.title}> 
            <h>Proyecto Individual Pokemon</h>
            </div>
            <Link to = '/home'>
                <div className={styles.button} >
                <button className={styles.button}> Entrar </button>
                </div>
            </Link>
        </div>
    )
}
