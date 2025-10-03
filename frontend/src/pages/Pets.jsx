import styles from './Pets.module.css';
import Header from "../components/Header/Header.jsx";
import UserButton from "../components/Header/UserButton.jsx";
import Button from "../components/Header/Button.jsx";
import React, {useEffect, useState} from "react";
import {getAllAnimals} from "../utils/rest-calls.js";
import AnimalDetails from "../components/AnimalDetails.jsx";


const Pets = () => {
    const[animals, setAnimals] = useState([]);

    useEffect(() => {
        getAllAnimals().then((animals) => {
            setAnimals(animals);
        });
    }, []);

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
                {animals?.map((animal) => (
                    <AnimalDetails animal={animal} key={animal.id}/>
                ))}
            </div>
        </div>);
};

export default Pets;
