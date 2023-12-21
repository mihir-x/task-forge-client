import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types'
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Shared/Loader";


const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()
    if (loading) return <Loader></Loader>
    if (!user) {
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
    children: PropTypes.node
}