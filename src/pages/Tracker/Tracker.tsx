import React from "react"
import styles from "../Tracker/Tracker.module.scss";
import {Table} from "antd";
import {IUserTime} from "../../services/types";
import {getDisplayTime} from "../../utils/utils";
import textData from "../../languages/en.json"

interface ITrackerProps {
    userTime: IUserTime
}

const Tracker = (props: ITrackerProps) => {

    const {userTime} = props

    const columns = [
        {
            title: textData.tracker.page,
            dataIndex: 'page',
            key: 'page',
        },
        {
            title: textData.tracker.spentTime,
            dataIndex: 'time',
            key: 'time',
        }
    ];

    const dataSource = [
        {
            key: "home",
            page: textData.tracker.home,
            time: getDisplayTime(userTime.home)
        },
        {
            key: "articles",
            page: textData.tracker.articles,
            time: getDisplayTime(userTime.articles)
        },
        {
            key: "tracker",
            page: textData.tracker.tracker,
            time: getDisplayTime(userTime.tracker)
        },
        {
            key: "about",
            page: textData.tracker.about,
            time: getDisplayTime(userTime.about)
        },
    ]

    return (
        <div className={styles.tracker_wrapper}>
            <div className={styles.tracker_caption}>{textData.tracker.caption}</div>
            <div className={styles.tracker_table_wrapper}>
                <p className={styles.tracker_description}>{textData.tracker.description}</p>
                <Table
                    className={styles.tracker_table}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                >
                </Table>
            </div>
        </div>
    )
}

export default Tracker