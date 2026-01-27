import React from "react";
import {NavLink} from "react-router-dom";
import styles from "./Header.module.css";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../ProfileComponents/LoginButton.jsx";
import LogoutButton from "../ProfileComponents/LogoutButton.jsx";

function Header() {
    const {isAuthenticated} = useAuth0(); // Stato di autenticazione

    // Funzione helper per non ripetere il codice su ogni link
    const linkStyle = ({isActive}) => (isActive ? styles.active : styles.navbarLink);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.logoSection}>
                    <NavLink to="/">
                        <img src="/logo-the-simpson.svg" alt="Logo" className={styles.logoImg}/>
                    </NavLink>
                </div>

                <div className={styles.navLinks}>
                    <NavLink title="Home" to="/" className={linkStyle}>Home</NavLink>
                    <NavLink title="Characters" to="/characters" className={linkStyle}>Characters</NavLink>
                    {isAuthenticated && (
                        <NavLink title="Locations" to="/locations" className={({ isActive }) =>
                            `${linkStyle({ isActive })} ${styles.linkWithIcon}`}>
                            Locations
                            {/* open lock SVG */}
                            <svg className={styles.lockIcon}
                                viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M11.5 2C10.6716 2 10 2.67157 10 3.5V6H13V16H1V6H8V3.5C8 1.567 9.567 0 11.5 0C13.433 0 15 1.567 15 3.5V4H13V3.5C13 2.67157 12.3284 2 11.5 2ZM9 10H5V12H9V10Z"
                                          fill="#000000"></path>
                                </g>
                            </svg>
                        </NavLink>)
                    }
                    {!isAuthenticated && (
                        <NavLink title="Locations" to="/access_forbidden" className={({ isActive }) =>
                            `${linkStyle({ isActive })} ${styles.linkWithIcon}`}>

                            Locations
                            {/* closed lock SVG */}
                            <svg className={styles.lockIcon}
                                viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z"
                                          fill="#000000"></path>
                                </g>
                            </svg>
                        </NavLink>)
                    }
                    {isAuthenticated && (
                        <NavLink title="Profile" to="/profile" className={linkStyle}>Profile</NavLink>)
                    }

                    {/* Login/Logout */}
                    <div>
                        {!isAuthenticated ? <LoginButton className={styles.login}/> :
                            <LogoutButton className={styles.login}/>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;