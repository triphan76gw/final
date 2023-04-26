import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { logout } from '../redux/auth/AuthReducer';

function PrivateRoute({ children }) {

    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    // function to check if the token is expired
    const isTokenExpired = () => {
        if (token) {
            const decodedToken = jwt_decode(token);
            const expiresAt = decodedToken.exp;
            const now = Math.floor(Date.now() / 1000);
            if(now > expiresAt) {
                dispatch(logout());
            }
            return now > expiresAt;
        }
        return true;
    };

    return (
        isTokenExpired() ? <Navigate to={'/'} /> : <>{children}</>
    );
}

export default PrivateRoute;
