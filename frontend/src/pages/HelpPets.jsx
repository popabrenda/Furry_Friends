import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { getAllAnimals } from '../utils/rest-calls.js';
import AnimalDetails_CareNeed from "../components/AnimalDetails_CareNeed.jsx";
import Header from "../components/Header/Header.jsx";
import styles from "./HelpPets.module.css";
import UserButton from "../components/Header/UserButton.jsx";
import Button from "../components/Header/Button.jsx";

const HelpPets = () => {
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchAnimals();
    }, []);

    useEffect(() => {
        if (location.state?.refresh) {
            fetchAnimals();
        }
    }, [location.state]);

    const fetchAnimals = () => {
        getAllAnimals()
            .then((animals) => setAnimals(animals))
            .catch((error) => console.log('Error while fetching animals', error));
    };

    return (
        <div className={styles.pets}>
            <img className={styles.pawIcon} alt="" src="src/images/paw.svg"/>
            <img className={styles.pawIcon1} alt="" src="src/images/paw.svg"/>
            <img className={styles.pawIcon2} alt="" src="src/images/paw-grey.svg"/>
            <img className={styles.pawIcon3} alt="" src="src/images/paw.svg"/>
            <img className={styles.pawIcon4} alt="" src="src/images/paw-green.svg"/>

            <div className={styles.frameParent}>
                <Header
                    button={
                        <UserButton/>
                    }
                >
                    <Button text="Home" classname="buttonToolbar" path="/welcome"/>
                    <Button text="About us" classname="buttonToolbar" path="/about-us"/>
                    <Button text="Pets" classname="buttonToolbar" path="/pets"/>
                    <Button text="Pet Lovers" classname="buttonToolbar" path="/pet-lovers"/>

                </Header>
            </div>
            <div className={styles.animalList}>
                {animals.map((animal) => (
                    <AnimalDetails_CareNeed key={animal.id} animal={animal}/>
                ))}
            </div>
        </div>
    );
};

export default HelpPets;
