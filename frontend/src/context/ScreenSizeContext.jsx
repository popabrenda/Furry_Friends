import React, { createContext, useState, useEffect, useContext } from 'react';

// Context pentru dimensiunea ecranului
const ScreenSizeContext = createContext();

export const ScreenSizeProvider = ({ children }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        // Setăm un listener pentru redimensionarea ferestrei
        window.addEventListener('resize', handleResize);

        // Curățăm listenerul atunci când componenta este distrusă
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ScreenSizeContext.Provider value={screenWidth}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

// Hook pentru a accesa dimensiunea ecranului în alte componente
export const useScreenSize = () => {
    return useContext(ScreenSizeContext);
};