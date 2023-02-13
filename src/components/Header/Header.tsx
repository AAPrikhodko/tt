import React from "react";
import {Avatar, Dropdown} from "antd";
import logo from '../../img/hourglass.png'
import styles from './Header.module.scss'
import textData from "../../languages/en.json"
import {useNavigate} from "react-router-dom";
import type {MenuProps} from 'antd';

interface IHeaderProps {
    username: string | null
    updateUser: (username: string | null) => void
}

const Header = (props: IHeaderProps) => {

    const pages = {
        articles: "Articles",
        tracker: "Tracker",
        about: "About"
    }
    const navigate = useNavigate()
    const {username, updateUser} = props

    const pageClickHandler = (pageKey: string) => navigate(`/${pageKey}`)

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <nav
                    className={styles.header_menu_item}
                    onClick={() => {
                        updateUser(null)
                        pageClickHandler("")
                    }
                    }
                >
                    {textData.header.signOut}
                </nav>
            ),
        },
    ];

    return (
        <div className={styles.header_wrapper}>
            <nav className={styles.header_logo} onClick={() => pageClickHandler("home")}>
                <img src={logo} width="60" height="80" alt="No logo"/>
            </nav>
            <div className={styles.header_page_block}>
                <h3 className={styles.header_caption}>{textData.header.caption}</h3>
                <div className={styles.header_line}/>
                <div className={styles.header_page_group}>
                    {
                        Object.keys(pages).map((pageKey: string) => {
                            return <div className={styles.header_page_group_title}
                                        onClick={() => pageClickHandler(pageKey)}>
                                {pageKey}
                            </div>
                        })
                    }
                </div>
                <div/>
            </div>
            {username ?
                <Dropdown
                    className={styles.header_dropdown}
                    menu={{items}}
                    placement="bottomLeft"
                >
                    <Avatar size={60} className={styles.avatar}>{username?.charAt(0).toUpperCase()}</Avatar>
                </Dropdown>
                : <Avatar size={60} className={styles.avatar}>{username?.charAt(0).toUpperCase()}</Avatar>
            }
        </div>
    )
}

export default Header