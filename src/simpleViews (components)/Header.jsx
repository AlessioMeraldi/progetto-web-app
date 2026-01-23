import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton.jsx";
import LogoutButton from "./LogoutButton.jsx";

function Header() {
    const { isAuthenticated } = useAuth0(); // Stato di autenticazione

    // Funzione helper per non ripetere il codice su ogni link
    const linkStyle = ({ isActive }) => (isActive ? styles.active : styles.navbarLink);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbarContainer}>
                <div className={styles.logoSection}>
                    <NavLink to="/">
                        <img src="/logo-the-simpson.svg" alt="Logo" className={styles.logoImg} />
                    </NavLink>
                </div>

                <div className={styles.navLinks}>
                    <NavLink title="Home" to="/" className={linkStyle}>Home</NavLink>
                    <NavLink title="Characters" to="/characters" className={linkStyle}>Characters</NavLink>
                    <NavLink title="Locations" to="/locations" className={linkStyle}>Locations</NavLink>
                    {isAuthenticated && (
                    <NavLink title="Profile" to="/profile" className={linkStyle}>Profile</NavLink>)}

                    {/* Login/Logout */}
                    <div>
                        {!isAuthenticated ? <LoginButton className={styles.login}/> : <LogoutButton className={styles.login}/>}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;