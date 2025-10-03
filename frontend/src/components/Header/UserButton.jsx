import React, { useState } from 'react';
import styles from './UserButton.module.css';
import {useNavigate} from "react-router-dom";


const UserButton = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleViewCaringSessions = () => {
        navigate('/my-caring-sessions');
    };

    const handleViewMyPets = () => {
        navigate('/my-pets');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className={styles.userButtonContainer}>
            {/* Imaginea utilizatorului */}
            <img
                src={'/src/icons/user.svg'}
                alt="User Avatar"
                className={styles.userAvatar}
                onClick={toggleMenu}
            />
            {menuOpen && (
                <div className={styles.userMenu}>
                    <div className={styles.menuItem} onClick={handleViewCaringSessions}>
                        View Caring Sessions
                    </div>
                    <div className={styles.menuItem} onClick={handleViewMyPets}>
                        View My Pets
                    </div>
                    <div className={styles.menuItem} onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserButton;
