import {Outlet, Navigate} from "react-router-dom";

interface IPrivateRoutesProps {
    username: string | null
}

export const PrivateRoutes = ({username}: IPrivateRoutesProps) => {
    return username ? <Outlet/> : <Navigate to=""/>
}

export default PrivateRoutes