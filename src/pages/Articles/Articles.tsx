import React from "react"
import styles from './Articles.module.scss'
import textData from "../../languages/en.json"
import {articlesData} from "../../services/mockData";
import {Card} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons'

const Articles = () => {

    const {Meta} = Card;

    return (
        <div className={styles.articles_wrapper}>
            <div className={styles.articles_caption}>{textData.articles.caption}</div>
            <br/>
            <div className={styles.articles_description}>{textData.articles.description}</div>
            <div className={styles.articles_items}>
                {
                    articlesData.map(a => {
                        return (
                            <Card
                                className={styles.articles_card}
                                cover={
                                    <img
                                        alt="example"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting"/>,
                                    <EditOutlined key="edit"/>,
                                    <EllipsisOutlined key="ellipsis"/>,
                                ]}
                            >
                                <Meta
                                    title={a.title}
                                    description={a.text.short}
                                />
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Articles