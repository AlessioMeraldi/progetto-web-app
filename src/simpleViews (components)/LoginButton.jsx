import { useAuth0 } from '@auth0/auth0-react';
import React from "react";

const LoginButton = ({ className }) => { // Riceve la classe dal padre
    const { loginWithRedirect } = useAuth0();

    return (
        <button className={className} onClick={() => loginWithRedirect()}>
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
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>
        </button>
    );
};

export default LoginButton;