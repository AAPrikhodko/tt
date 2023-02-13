import React from "react"
import styles from "../About/About.module.scss";
import textData from "../../languages/en.json"

const About = () => {

    return (
        <div className={styles.about_wrapper}>
            <p className={styles.about_caption}>{textData.about.caption}</p>
            <p className={styles.about_description}>{textData.about.description}</p>
        </div>
    )
}

export default About