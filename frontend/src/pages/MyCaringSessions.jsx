import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnimalById, getCaring_sessionsByUserId, updateCareNeedStatus } from '../utils/rest-calls.js';
import styles from './MyCaringSessions.module.css';
import { useAuth } from "../context/AuthContext.jsx";
import AnimalDetails from "../components/AnimalDetails.jsx";
import UserDetails from "../components/UserDetails.jsx";
import UserButton from "../components/Header/UserButton.jsx";
import Button from "../components/Header/Button.jsx";
import Header from "../components/Header/Header.jsx";

const MyCaringSessions = () => {
    const [caring_sessions, setCaring_sessions] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);
    const [feedback, setFeedback] = useState("");

    useEffect(() => {
        fetchCaring_sessions();
    }, []);

    const fetchCaring_sessions = () => {
        getCaring_sessionsByUserId(currentUser.id)
            .then((caring_sessions) => setCaring_sessions(caring_sessions))
            .catch((error) => console.log('Error while fetching caring sessions', error));
    };

    const isSessionCompleted = (startDate, endDate) => {
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        return currentDate > end;
    };

    const handleSubmitFeedback = async (feedback) => {
        if (!feedback.trim()) {
            setError("Please provide feedback to complete the session.");
            return;
        }

        try {
            await updateCareNeedStatus(currentSession.care_need.id, 'completed');
            setIsFormOpen(false);
            fetchCaring_sessions();
        } catch (error) {
            console.error("Error updating session status:", error);
        }
    };

    const Sessions = () => (
        <div className={styles.petsContainer}>
            <div className={styles.petsTitle}>Caring Sessions</div>
            <div className={styles.petsList}>
                {caring_sessions.map((caring_session, index) => (
                    <div key={index} className={styles.caringSessionCard}>
                        <strong>Pet:</strong>{" "}
                        <span
                            className={styles.animalLink}
                            onClick={async () => {
                                try {
                                    const animal = await getAnimalById(caring_session.care_need.animal.id);
                                    setSelectedAnimal(animal);
                                } catch (error) {
                                    console.error("Error fetching animal details:", error);
                                }
                            }}
                        >
                            {"Click to see pet and owner details"}
                        </span>
                        <br />
                        <strong>Start Date:</strong> {caring_session.start_date || "N/A"} <br />
                        <strong>End Date:</strong> {caring_session.end_date || "N/A"} <br />
                        <strong>Status:</strong> {caring_session.care_need.status === 'cancelled' ? 'reviewed' : caring_session.care_need.status || 'N/A'}
                        {isSessionCompleted(caring_session.start_date, caring_session.end_date) && caring_session.care_need.status !== "completed"
                            && caring_session.care_need.status !== "cancelled" && (
                            <button
                                className={styles.completeSessionButton}
                                onClick={() => {
                                    setIsFormOpen(true);
                                    setCurrentSession(caring_session);
                                }}
                            >
                                Complete Caring Session
                            </button>
                        )}
                    </div>
                ))}
            </div>

            {isFormOpen && currentSession && (
                <FeedbackForm
                    onSubmit={(feedback) => {
                        setFeedback(feedback);
                        handleSubmitFeedback(feedback);
                    }}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </div>
    );

    const Details = () => (
        <div className={styles.animalDetailsContainer}>
            <div className={styles.details}>
                <AnimalDetails animal={selectedAnimal} />
                <button
                    className={styles.backButton}
                    onClick={() => setSelectedAnimal(null)}
                >
                    Back to Caring Sessions
                </button>
                <UserDetails user={selectedAnimal.owner} />
            </div>
        </div>
    );

    const FeedbackForm = ({ onSubmit, onCancel }) => {
        const [feedback, setFeedback] = useState("");

        const handleSubmit = () => {
            onSubmit(feedback);
        };

        return (
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles.feedbackForm}>
                    <h3>Complete the session feedback</h3>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Provide feedback here"
                    />
                    <button type="submit" onClick={handleSubmit}>Submit Feedback</button>
                    <button type="button" onClick={onCancel}>Cancel</button>
                </div>
            </form>
        );
    };



    return (
        <div className={styles.fullscreenContainer}>
            <div className={styles.frameParent}>
                <Header button={<UserButton />}>
                    <Button text="Home" classname="buttonToolbar" path="/welcome"/>
                    <Button text="About us" classname="buttonToolbar" path="/about-us" />
                    <Button text="Pets" classname="buttonToolbar" path="/pets" />
                    <Button text="Pet Lovers" classname="buttonToolbar" path="/pet-lovers" />
                </Header>
            </div>
            {selectedAnimal ? <Details /> : <Sessions />}
        </div>
    );
};

export default MyCaringSessions;
