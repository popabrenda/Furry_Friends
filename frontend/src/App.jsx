import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';  // Asigură-te că calea este corectă
import LogIn from './components/Login/LogIn.jsx';
import SignUp from "./components/Signup/SignUp.jsx";
import PageAfterLogin from "./pages/PageAfterLogin.jsx";
import AnimalRegistration from "./components/AnimalRegistration.jsx";
import Pets from "./pages/Pets.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import AnimalDetails from "./components/AnimalDetails.jsx";
import PetLovers from "./pages/PetLovers.jsx";
import HelpPets from "./pages/HelpPets.jsx";
import MyCaringSessions from "./pages/MyCaringSessions.jsx";
import MyPets from "./pages/MyPets.jsx";
import AboutUs from "./pages/AboutUs.jsx";


const App = () => {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/welcome" element={<PageAfterLogin />} />
                <Route path={"/register-animal"} element={<AnimalRegistration />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/pet-lovers" element={<PetLovers />} />
                <Route path="/animals/:id" element={<AnimalDetails />} />
                <Route path="/help-animal" element={<HelpPets />} />
                <Route path="/my-caring-sessions" element={<MyCaringSessions />} />
                <Route path="/my-pets" element={<MyPets />} />
                <Route path="/about-us" element={<AboutUs />} />

            </Routes>
        </Router>
        </AuthProvider>
    );
};

export default App;



