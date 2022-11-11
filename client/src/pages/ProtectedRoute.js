import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const ProtectedRoute = ({ admin, children }) => {
    const { user } = useAppContext();

    if (!user) {
        return <Navigate to='/auth' />;
    }
    if (admin && user.userType !== "Admin") {
        return <Navigate to='/' />;
    }
    if (!admin && user.userType === "Admin") {
        return <Navigate to='/admin' />;
    }
    return children;
};

export default ProtectedRoute;
