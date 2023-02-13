import {MutableRefObject, useCallback, useRef, useState} from "react";

const useTimer = () => {
    const [isCounting, setIsCounting] = useState(false)
    const [seconds, setSeconds] = useState(0)
    let timerId: MutableRefObject <undefined | NodeJS.Timer> = useRef(undefined)

    const startTimer = useCallback(() => {
        timerId.current = setInterval(() => {
            setSeconds(prev => prev + 1)
        },1000)
        setIsCounting(true)
    },[setSeconds, setIsCounting])

    const stopAndClearTimer = useCallback(() => {
        clearInterval(timerId.current)
        setIsCounting(false)
        setSeconds(0)
    },[setSeconds, setIsCounting])

    return {
        startTimer,
        stopAndClearTimer,
        seconds,
        isCounting
    }
}

export default useTimer