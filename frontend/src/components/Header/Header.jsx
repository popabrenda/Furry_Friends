import React from 'react';
import styles from './Header.module.css';

const Header = ({children, button}) => {
    return (
        <div className={styles.frameParent}>
            <div className={styles.furryfriendsLogoParent}>
                <img className={styles.furryfriendsLogoIcon} alt="" src="/logos/logo_ff.svg" />
                <div className={styles.furryfriendsParent}>
                    <b className={styles.furryfriends}>FurryFriends</b>
                    <div className={styles.petCare}>P
                        <span className={styles.etCare}>et care</span>
                    </div>
                </div>
            </div>
            <div className={styles.frameGroup}>
                <div className={styles.buttonToolbarParent}>
                    {children}
                </div>
                {button}
            </div>
        </div>
    );
};

export default Header;
