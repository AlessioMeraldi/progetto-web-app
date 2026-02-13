
// React imports
import React, {useState} from "react";

// Routing imports
import {NavLink} from "react-router-dom";

// Style imports
import styles from "./Header.module.css";

// Auth0 imports
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "../ProfileComponents/LoginButton.jsx";
import LogoutButton from "../ProfileComponents/LogoutButton.jsx";

// images imports
import theSimpsonsLogo from "/src/assets/Images/logo-the-simpson.svg"

function Header() {

    // Auth0 authentication state
    const {isAuthenticated} = useAuth0();
    const [menuOpen, setMenuOpen] = useState(false);

    // Helper function for NavLink styling applies active class when the link is active
    const linkStyle = ({isActive}) => (isActive ? styles.active : styles.navbarLink);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.logoSection}>
                    <NavLink to="/" onClick={() => setMenuOpen(false)}>
                        <img src={theSimpsonsLogo} alt="Logo" className={styles.logoImg}/>
                    </NavLink>
                    {/* HAMBURGER */}
                    <button
                        className={styles.hamburger}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                {/* Navigation links */}
                <div className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
                <NavLink title="Home" to="/home" className={linkStyle}>Home</NavLink>
                    <NavLink title="Characters" to="/characters" className={linkStyle}>Characters</NavLink>

                    {/* Locations link: shows open lock if authenticated */}
                    {isAuthenticated && (
                        <NavLink title="Locations" to="/locations" className={({ isActive }) =>
                            `${linkStyle({ isActive })} ${styles.linkWithIcon}`}>
                            Locations
                            {/* open lock SVG */}
                            <svg className={styles.lockIcon}
                                 viewBox="0 0 16 16"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M11.5 2C10.6716 2 10 2.67157 10 3.5V6H13V16H1V6H8V3.5C8 1.567 9.567 0 11.5 0C13.433 0 15 1.567 15 3.5V4H13V3.5C13 2.67157 12.3284 2 11.5 2ZM9 10H5V12H9V10Z"
                                          fill="#000000"></path>
                                </g>
                            </svg>
                        </NavLink>)
                    }

                    {/* Locations link: shows closed lock if not authenticated */}
                    {!isAuthenticated && (
                        <NavLink title="Locations" to="/access_forbidden" className={({ isActive }) =>
                            `${linkStyle({ isActive })} ${styles.linkWithIcon}`}>

                            Locations
                            {/* closed lock SVG */}
                            <svg className={styles.lockIcon}
                                 viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M4 6V4C4 1.79086 5.79086 0 8 0C10.2091 0 12 1.79086 12 4V6H14V16H2V6H4ZM6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6H6V4ZM7 13V9H9V13H7Z"
                                          fill="#000000"></path>
                                </g>
                            </svg>
                        </NavLink>)
                    }
                    <NavLink title="Top 5" to="/top5" className={linkStyle}>Top 5</NavLink>

                    {/* Profile link only for authenticated users */}
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