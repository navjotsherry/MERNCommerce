import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () =>{

    // Fetching user authentication status from the Redux store
    const { isAuthenticated } = useSelector(state => state.user);

    return isAuthenticated === false ? <Navigate to="/login"/> : <Outlet/>  
    
}

export default ProtectedRoutes