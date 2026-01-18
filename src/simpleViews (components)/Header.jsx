import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
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
                    <NavLink title="Profile" to="/profile" className={linkStyle}>Profile</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Header;