import { useState } from 'react';

export const UserData = () => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Încărcăm utilizatorul din localStorage la inițializare
        const userData = JSON.parse(localStorage.getItem("user"));
        return userData || null;
    });

    const loadUserData = () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setCurrentUser(userData);
        }
    };

    const saveUserData = (userData) => {
        // Salvăm utilizatorul atât în state cât și în localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        setCurrentUser(userData);
    };

    return {
        currentUser,
        setCurrentUser: saveUserData, // Setăm utilizatorul și îl salvăm
        loadUserData
    };
};
