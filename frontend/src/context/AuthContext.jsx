import React, { createContext, useContext, useState } from 'react';

// Creează contextul pentru autentificare
const AuthContext = createContext();

// Hook pentru a folosi contextul
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

// Creează un provider care va furniza contextul
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // Funcție pentru a loga utilizatorul
    const loginUser = (userData) => {
        setCurrentUser(userData); // Salvează datele utilizatorului
    };

    // Funcție pentru a deloga utilizatorul
    const logoutUser = () => {
        setCurrentUser(null); // Resetează utilizatorul
    };

    return (
        <AuthContext.Provider value={{ currentUser, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};
