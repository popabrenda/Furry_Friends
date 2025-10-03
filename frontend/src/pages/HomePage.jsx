import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

import Header from "../components/Header/Header.jsx";
import Button from "../components/Header/Button.jsx";


const HomePage = () => {

    const navigate = useNavigate();
    return (
        <div className={styles.startPage}>
            <div className={styles.puppy11Parent}>
                <img className={styles.puppy11Icon} alt="" src="src/images/puppy-1 1.png" />
                <div className={styles.frameParent}>
                    <Header
                        button={
                            <Button text="Log in" classname="primary1Button" path="/login"/>
                        }
                    >
                        <Button text="About us" classname="buttonToolbar" path="/about-us"/>
                    </Header>
                    <div className={styles.frameDiv}>
                        <div className={styles.needSomeoneToCareForYourParent}>
                            <b className={styles.needSomeoneTo}>Need someone to care for your pet?</b>
                            <div className={styles.atFurryfriendsYoullFind}>At FurryFriends, you’ll find trustworthy
                                animal lovers ready to look after your furry friend while you’re away. From walks and
                                feeding to playtime and companionship, our community is here to provide the support you
                                need. Connect with people who love animals as much as you do, and make sure your pet
                                gets the attention they deserve!
                            </div>
                        </div>
                        <div className={styles.primary2Button}>
                            <div className={styles.primary} onClick={() => navigate('/signup')}>Register here</div>
                        </div>
                    </div>
                </div>
                <div className={styles.groupDiv}>
                    <div className={styles.ourAchievementsOf2024Parent}>
                        <b className={styles.furryfriends}>Our achievements of 2024</b>
                        <div className={styles.frameParent1}>
                            <div className={styles.parent}>
                                <b className={styles.furryfriends}>68</b>
                                <div className={styles.petLovers}>pet lovers</div>
                            </div>
                            <div className={styles.heartParent}>
                                <img className={styles.heartIcon} alt="" src="src/icons/heart.svg" />
                                <b className={styles.furryfriends}>102</b>
                                <div className={styles.petLovers}>friendly pets</div>
                            </div>
                            <div className={styles.parent}>
                                <b className={styles.furryfriends}>3</b>
                                <div className={styles.internationalAwards}>international awards</div>
                            </div>
                            <div className={styles.parent}>
                                <b className={styles.furryfriends}>∞</b>
                                <div className={styles.petLovers}>good services</div>
                            </div>
                        </div>
                    </div>
                    <img className={styles.groupChild} alt="" src="src/icons/Group 1.svg" />
                </div>
            </div>
        </div>);
};

export default HomePage;