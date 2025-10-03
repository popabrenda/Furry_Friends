import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMyPets } from '../utils/rest-calls.js';
import MyPetDetails from '../components/MyPetDetails.jsx';
import { useAuth } from "../context/AuthContext.jsx";
import { useScreenSize } from "../context/ScreenSizeContext.jsx";
import styles from "./MyPets.module.css";
import Header from "../components/Header/Header.jsx";
import UserButton from "../components/Header/UserButton.jsx";
import Button from "../components/Header/Button.jsx";
import AnimalDetails from "../components/AnimalDetails.jsx";  // Importăm hook-ul

const MyPets = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const screenWidth = useScreenSize();  // Obținem lățimea ecranului

    useEffect(() => {
        if (currentUser && currentUser.id) {
            fetchAnimals(currentUser.id);
        } else {
            setError('User is not logged in');
            setLoading(false);
        }
    }, [currentUser]);

    const fetchAnimals = (userId) => {
        setLoading(true);
        setError(null);

        getMyPets(userId)
            .then((animals) => {
                console.log('Fetched animals:', animals);
                setAnimals(animals);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error while fetching animals', error);
                setError('Error while fetching pets');
                setLoading(false);
            });


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
                    <MyPetDetails key={animal.id} animal={animal}/>
                ))}
            </div>
        </div>);
};

export default MyPets;