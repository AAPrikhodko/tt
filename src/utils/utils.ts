export const convertPathToName = (pathname: string) => {
    // converts '/pathname' to 'pathname'
    return pathname.slice(1)
}

export const getDisplayTime = (totalSeconds: number) => {
    let minutes = Math.floor(totalSeconds / 60)
    let seconds = totalSeconds - minutes * 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}