import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from './PetLovers.module.css';
import UserButton from "../components/Header/UserButton.jsx";
import Header from "../components/Header/Header.jsx";
import UserDetails from "../components/UserDetails.jsx";
import {getAllUsers} from "../utils/rest-calls.js";
import Button from "../components/Header/Button.jsx";


const PetsLovers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         setTimeout(async () => {
    //             const users = await fetch('http://localhost:8080/furry_friends/users').then(response => response.json());
    //             //setFetchedId(users[0].id);
    //             setUsers(users);
    //         }, 10);
    //     }
    //     fetchUsers();
    // }, []);
    useEffect(() => {
        getAllUsers().then((users) => {
            setUsers(users);
        });
    }, []);


    return (
        <div className={styles.petsLovers}>
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
            {/*<img className={styles.vectorIcon} alt="" src="src/icons/Vector.svg"/>*/}
            <div className={styles.vectorIcon}/>
            <div className={styles.petLoversList}>
                {users?.map((user) => (
                    <UserDetails user={user} key={user.id}/>
                ))}
            </div>
        </div>
    );
};

export default PetsLovers;
