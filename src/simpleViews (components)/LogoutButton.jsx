import { useAuth0 } from '@auth0/auth0-react';
import React from "react";

const LogoutButton = ({ className }) => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button className={className} onClick={() => logout()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
            </button>
        )
    )
}

export default LogoutButton