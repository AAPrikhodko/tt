import React from "react"
import styles from './Home.module.scss'
import textData from "../../languages/en.json"

const Home = () => {

    return (
        <div className={styles.home_wrapper}>
            <p className={styles.home_welcomeText}>{textData.home.welcomeText}</p>
            <br/>
            <p className={styles.home_mainTextText}>{textData.home.mainText}</p>
        </div>
    )
}

export default Home