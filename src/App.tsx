import React, {useEffect, useState} from 'react';
import './App.scss';
import {Route, Routes, Navigate, useLocation} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Articles from "./pages/Articles/Articles";
import Tracker from "./pages/Tracker/Tracker";
import About from "./pages/About/About";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PrivateRoutes from "./services/privateRouter";
import useTimer from "./hooks/useTimer";
import {IUserTime} from "./services/types";
import {convertPathToName} from "./utils/utils";

function App() {

    const initialUserTime: IUserTime = {
        home: 0,
        articles: 0,
        tracker: 0,
        about: 0
    }
    const [username, setUsername] = useState<string | null>(null)
    const updateUser = (username: string | null) => setUsername(username)
    const location = useLocation()

    const [userTime, setUserTime] = useState<IUserTime>(initialUserTime)
    const {startTimer, stopAndClearTimer, seconds} = useTimer()


    const getUserTimeFromLS = (username: string) => {
        return new Promise((resolve) => {
            let time: string | null = localStorage.getItem("time")
            if (time) {
                let parsedTime = JSON.parse(time)
                let userNames = parsedTime.map((el: any) => Object.keys(el)[0])
                let index = userNames.indexOf(username)
                if (index !== -1) {
                    resolve(parsedTime[index][username])
                } else {
                    //no info about user time in LS
                    parsedTime.push({[username]: initialUserTime})
                    localStorage.setItem(
                        "time",
                        JSON.stringify(parsedTime)
                    )
                }
            } else {
                // empty LocalStorage
                localStorage.setItem(
                    "time",
                    JSON.stringify([{[username]: initialUserTime}])
                )
            }
        })
    }

    const updateUserTime = (pathname: string, username: string | null) => {
        let time: string | null = localStorage.getItem("time")
        if (time && username) {
            let parsedTime = JSON.parse(time)
            let userNames = parsedTime.map((el: any) => Object.keys(el)[0])
            let index = userNames.indexOf(username)
            if (index !== -1) {
                let updatedUserTime = {
                    [username]: {
                        ...parsedTime[index][username],
                        [convertPathToName(pathname)]: parsedTime[index][username][convertPathToName(pathname)] + 1
                    }
                }
                parsedTime.splice(index, 1, updatedUserTime)
                localStorage.setItem(
                    "time",
                    JSON.stringify(parsedTime)
                )
            }
        }
    }

    useEffect(() => {
        if (username) {
            getUserTimeFromLS(username).then((userTime: any) => {
                setUserTime(userTime)
            })
        } else {
            // Sign out was pressed
            stopAndClearTimer()
        }
    }, [username])

    useEffect(() => {
        if ((username) && (location.pathname === "/home"
            || location.pathname === "/articles"
            || location.pathname === "/tracker"
            || location.pathname === "/about"
        )) {
            stopAndClearTimer()
            startTimer()
        }
    }, [location.pathname])

    useEffect(() => {
        switch (location.pathname) {
            case '/home':
            case '/articles':
            case '/tracker':
            case '/about': {
                updateUserTime(location.pathname, username)
                if (username) {
                    getUserTimeFromLS(username).then((userTime: any) => {
                        setUserTime(userTime)
                    })
                }
                break
            }
        }
    }, [seconds])

    return (
        <div className="app-wrapper">
            <div className="header">
                <Header username={username} updateUser={updateUser}/>
            </div>
            <div className="content">
                <Routes>
                    <Route element={<PrivateRoutes username={username}/>}>
                        <Route path="/home" element={<Home/>}/>
                        <Route path="/articles" element={<Articles/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/tracker" element={<Tracker userTime={userTime}/>}/>
                    </Route>
                    <Route path="/" element={<Auth updateUser={updateUser}/>}/>
                    <Route path="/404" element={<NotFoundPage/>}/>
                    <Route path="*" element={<Navigate to="/404" replace/>}/>
                </Routes>
            </div>
            <div className="footer"><Footer/></div>
        </div>
    );
}

export default App;
