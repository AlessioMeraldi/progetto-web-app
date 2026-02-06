import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

// Footer component Receives navigation items and course information as props
function Footer({ navItems, courseName, courseLink }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Logo section */}
                <div className={styles.logoWrapper}>
                    <img src="/logo-the-simpson.svg" alt="Simpson Logo" className={styles.footerLogo} />
                </div>

                {/* Course information */}
                <div className={styles.courseInfo}>
                    <a href={courseLink} target="_blank" rel="noreferrer" className={styles.courseLink}>
                        {courseName}
                    </a>
                </div>

                {/* Navigation links */}
                <nav className={styles.navSection}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.url}>
                                <NavLink to={item.url} className={styles.navLink}>
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* API credits */}
                <div className={styles.apiCredit}>
                    Data provided by <a href="https://thesimpsonsapi.com/" target="_blank" rel="noreferrer">The Simpsons API</a>
                </div>

            </div>
        </footer>
    );
}

export default Footer;