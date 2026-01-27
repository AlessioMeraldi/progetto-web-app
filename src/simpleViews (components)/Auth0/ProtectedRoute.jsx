import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return (<Navigate to="/access_forbidden" replace />);
    }

    return children;
}

export default ProtectedRoute;
