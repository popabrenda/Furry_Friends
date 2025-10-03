import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UserButton from '../components/Header/UserButton.jsx';
import styles from "./PageAfterLogin.module.css";
import Header from "../components/Header/Header.jsx";
import Button from "../components/Header/Button.jsx";


const PageAfterLogin = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleRegisterAnimalClick = () => {
        navigate('/register-animal');
    };

    const handleHelpAnimalClick = () => {
        navigate('/help-animal');
    };

    return (
        <div className={styles.startPage}>
            <div className={styles.puppy11Parent}>
                <img className={styles.puppy11Icon} alt="" src="src/images/puppy-1 1.png"/>
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
                    <div className={styles.frameDiv}>
                        <div className={styles.needSomeoneToCareForYourParent}>
                            <b className={styles.needSomeoneTo}>Welcome to Furry Friends!</b>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '40px'}}>
                            <PetOption
                                option={"Register a Pet"}
                                text={"Become part of our community and connect with reliable pet sitters and caretakers."}
                                button={"Register here"}
                                handleClick={handleRegisterAnimalClick}
                            />
                            <PetOption
                                option={"Help with a Pet"}
                                text={"Find trusted individuals ready to assist you in taking care of your beloved companion."}
                                button={"Help a Pet"}
                                handleClick={handleHelpAnimalClick}
                            />
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
                                <img className={styles.heartIcon} alt="" src="src/icons/heart.svg"/>
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
                    <img className={styles.groupChild} alt="" src="src/icons/Group 1.svg"/>
                </div>
            </div>
        </div>
    );
};

function PetOption({option, text, button, handleClick}) {
    return(
        <div className={styles.petOption}>
            <p><strong>{option}:</strong>{text}</p>
            <div className={styles.primary2Button} onClick={() => {handleClick()} }>
                <div className={styles.primary}> {button}</div>
            </div>
        </div>
    );
}

export default PageAfterLogin;
