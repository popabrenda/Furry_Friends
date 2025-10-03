import React from 'react';
import './AboutUs.module.css'
import Header from "../components/Header/Header.jsx";
import UserButton from "../components/Header/UserButton.jsx";
import Button from "../components/Header/Button.jsx";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
    return (
        <div className={styles.aboutUsPage}>
            {/* Paw Icons */}
            <div className={styles.pets}>
                <img className={styles.pawIcon} alt="" src="src/images/paw.svg"/>
                <img className={styles.pawIcon1} alt="" src="src/images/paw.svg"/>
                <img className={styles.pawIcon2} alt="" src="src/images/paw-grey.svg"/>
                <img className={styles.pawIcon3} alt="" src="src/images/paw.svg"/>
                <img className={styles.pawIcon4} alt="" src="src/images/paw-green.svg"/>
            </div>

            {/* Main Content */}
            <div className={styles.frameParent}>
                <Header
                    button={
                        <UserButton />
                    }
                >
                    <Button text="Home" classname="buttonToolbar" path="/welcome"/>
                    <Button text="About us" classname="buttonToolbar" path="/about-us"/>
                    <Button text="Pets" classname="buttonToolbar" path="/pets"/>
                    <Button text="Pet Lovers" classname="buttonToolbar" path="/pet-lovers"/>
                </Header>

                <section className={styles.aboutUsSection}>
                    <h1 className={styles.aboutUsTitle}>About Us</h1>
                    <div className={styles.aboutUsTextContainer}>
                        <p className={styles.aboutUsText}>
                            Furry Friends is an app for the pet lover community, providing a modern solution for mutual support in pet care.
                            In a world where time is a limited resource, the app addresses the need to find trustworthy help and simplifies the organization of pet care.
                        </p>
                        <p className={styles.aboutUsText}>
                            The app has a significant impact on both pet owners and volunteers. Pet owners can quickly and safely find support for their pets' needs, while volunteers who love animals but cannot have their own pets have the opportunity to spend time with them and actively contribute to their well-being.
                        </p>
                        <p className={styles.aboutUsText}>
                            Thus, Furry Friends promotes community collaboration, responsibility, and love for animals, offering an environment that supports both users and pets.
                            It is a platform that combines efficiency, empathy, and passion for animals, becoming a valuable tool in daily life.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutUs;
