import React, { useEffect, useState } from 'react';
import { getPicturesByAnimalId } from '../utils/animal_picture-rest-calls.js';
import {
    getCare_NeedsByAnimalId,
    addCareNeed,
    deleteCareNeed,
    updateCareNeedStatus,
    getCaretakerId, getUser
} from '../utils/rest-calls';
import pawImage from '../icons/AnimalDetails/paw.svg';
import logoImage from '../images/FurryFriends-Logo.png';
import sizeImage from '../icons/AnimalDetails/size.svg';
import statusImage from '../icons/AnimalDetails//help.svg';
import styles from './MyPetDetails.module.css';
import StarRating from "./StarRating.jsx";
import UserDetails from "./UserDetails.jsx";

const MyPetDetails = ({ animal }) => {
    const [animal_pictures, setAnimal_Pictures] = useState([]);
    const [careNeeds, setCareNeeds] = useState([]);
    const [loadingCareNeeds, setLoadingCareNeeds] = useState(false);
    const [activeTab, setActiveTab] = useState('details');
    const [showAddForm, setShowAddForm] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedCareNeed, setSelectedCareNeed] = useState(null);
    const [volunteer, setVolunteer] = useState(null);


    useEffect(() => {
        if (animal?.id) {
            getPicturesByAnimalId(animal.id)
                .then((pictures) => setAnimal_Pictures(pictures))
                .catch((error) => console.error('Error fetching pictures:', error));
        }
    }, [animal?.id]);

    useEffect(() => {
        if (activeTab === 'careNeeds' && animal?.id) {
            setLoadingCareNeeds(true);
            getCare_NeedsByAnimalId(animal.id)
                .then((careNeeds) => {
                    setCareNeeds(careNeeds);
                    setLoadingCareNeeds(false);
                })
                .catch((error) => {
                    console.error('Error while fetching care needs:', error);
                    setLoadingCareNeeds(false);
                });
        }
    }, [activeTab, animal?.id]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    if (!animal || !animal.id) {
        console.error('Invalid animal data:', animal);
        return <div>Loading or No Animal Data Available...</div>;
    }

    const fetchCareNeeds = () => {
        getCare_NeedsByAnimalId(animal.id)
            .then((careNeeds) => {
                setCareNeeds(careNeeds);
                setLoadingCareNeeds(false);
            })
            .catch((error) => {
                console.error('Error while fetching care needs:', error);
                setLoadingCareNeeds(false);
            });
    };

    useEffect(() => {
        fetchCareNeeds();
    }, []);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        if (newStartDate > newEndDate) {
            alert("Start date cannot be later than the end date. Please select valid dates.");
            return;
        }

        const hasOverlap = careNeeds.some((need) => {
            const existingStart = new Date(need.start_date);
            const existingEnd = new Date(need.end_date);
            return (
                (newStartDate >= existingStart && newStartDate <= existingEnd) ||
                (newEndDate >= existingStart && newEndDate <= existingEnd) ||
                (newStartDate <= existingStart && newEndDate >= existingEnd)
            );
        });

        if (hasOverlap) {
            alert("The selected dates overlap with an existing care need. Please choose different dates.");
            return;
        }

        const careNeed = {
            animal: animal,
            start_date: startDate,
            end_date: endDate,
            status: 'pending'
        };

        addCareNeed(careNeed)
            .then((data) => {
                setCareNeeds(prevCareNeeds => [...prevCareNeeds, data]);
                setShowAddForm(false); // Hide the form after submission
                setSuccessMessage('Care need added successfully!');
            })
            .catch((error) => {
                console.error('Error adding care need:', error);
            });
    };

    const handleDeleteCareNeed = (careNeedId) => {
        deleteCareNeed(careNeedId)
            .then(() => {
                // Actualizează lista de care needs după ce a fost șters
                setCareNeeds(prevCareNeeds => prevCareNeeds.filter(need => need.id !== careNeedId));
                setSuccessMessage('Care need deleted successfully!');
            })
            .catch((error) => {
                console.error('Error deleting care need:', error);
            });
    };

    const handleReview = (careNeedId) => {
        setSelectedCareNeed(careNeedId);
    };
    const handleReviewSubmit = async (careNeedId, reviewData) => {
        // Procesul efectiv de trimitere a review-ului
        try {
            await updateCareNeedStatus(careNeedId, 'cancelled'); // Exemplu de update
            console.log('Review Data:', reviewData); // Vezi ce ai primit
            setSuccessMessage('Review submitted successfully!'); // Mesaj de succes
            fetchCareNeeds();
            setActiveTab('careNeeds'); // Schimbă tab-ul înapoi la Care Needs
            // Orice alte operațiuni de succes, ex: actualizări UI

        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const fetchVolunteerDetails = async (careNeedId) => {
        try {
            const caretakerId = await getCaretakerId(careNeedId);
            console.log('Caretaker ID:', caretakerId);

            // Obține detaliile voluntarului
            const volunteerDetails = await getUser(caretakerId);
            console.log('Volunteer Details:', volunteerDetails);

            // Stochează detaliile voluntarului în stat
            setVolunteer(volunteerDetails);
        } catch (error) {
            console.error("Failed to fetch volunteer details:", error);
        }
    };

    const VolunteerDetails = ({volunteer, onBack}) => (
        <div>
            {/* Verifică dacă voluntarul există */}
            {volunteer ? (
                <UserDetails user={volunteer}/>
            ) : (
                <div>Loading volunteer details...</div>
            )}

            <button
                className={styles.backButton}
                onClick={onBack}
            >
                Back to Care Needs
            </button>
        </div>
    );

    const AnimalDetails = () => {
        return(
            <>
                <img
                    className={styles.myAnimalImage}
                    src={animal_pictures.length > 0 ? `data:image/png;base64,${animal_pictures[0].pictureData}` : logoImage}
                    alt={animal.name || "Animal"}
                />
                <div className={styles.myAnimalDetailsSection}>
                    <div className={styles.detailsTitle}>Details</div>
                    <div className={styles.breedSizeContainer}>
                        <div className={styles.breedContainer}>
                            <img src={pawImage} alt="Breed Icon"/>
                            <div className={styles.breedText}>{animal.type?.breed || "Unknown Breed"}</div>
                        </div>
                        <div className={styles.sizeContainer}>
                            <img src={sizeImage} alt="Size Icon"/>
                            <div className={styles.sizeText}>{animal.type?.size_category || "Unknown Size"}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.divider}/>
                <div className={styles.careRequirementContainer}>
                    <div className={styles.careRequirementTitle}>Daily care requirement</div>
                    <div
                        className={styles.careRequirementText}>{animal.type?.daily_care_requirement || "Unknown Care Level"}</div>
                </div>
                <div className={styles.myAnimalNameType}>
                    <div className={styles.myAnimalNameContainer}>
                        <div className={styles.myAnimalName}>{animal.name || "Unknown Name"}</div>
                        <div className={styles.statusIcon}>
                            <img src={statusImage} alt="Status"/>
                        </div>
                    </div>
                    <div className={styles.myAnimalSpecies}>{animal.type?.species || "Unknown Species"}</div>
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.descriptionTitle}>Description</div>
                    <div className={styles.descriptionText}>{animal.description || "No description available"}</div>
                </div>

                {/* View Care Needs Button */}
                <div className={styles.viewCareNeedsContainer}>
                    <button
                        className={styles.viewCareNeedsButton}
                        onClick={() => setActiveTab('careNeeds')}
                    >
                        View Care Needs
                        {/*TODO De schimbat in Options*/}
                    </button>
                </div>
            </>
        );
    }

    const Review = ({ onCancel, onSubmit }) => {
        const [reviewText, setReviewText] = useState("");
        const [reviewRating, setReviewRating] = useState(0);

        const handleSubmit = (e) => {
            e.preventDefault();

            if (!reviewRating || !reviewText) {
                alert('Please provide both a rating and review text.');
                return;
            }

            onSubmit({
                reviewText,
                reviewRating,
            });

            setReviewText('');
            setReviewRating(0);
        };

        return (
            <form onSubmit={handleSubmit} className={styles.reviewForm}>
                <h3>Leave a Review</h3>

                {/* Star Rating */}
                <StarRating
                    maxRating={5}
                    color="#fcc419"
                    size={48}
                    defaultRating={reviewRating}
                    onSetRating={setReviewRating}
                />

                {/* Textarea pentru review */}
                <textarea
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                {/* Butoane de submit și cancel */}
                <div className={styles.buttonsContainer}>
                    <button
                        className={styles.backToDetailsButton}
                        type="button"
                        onClick={onCancel} // Folosește onCancel pentru a anula
                    >
                        Back to Animal Details
                    </button>
                    <button
                        className={styles.submitReviewButton}
                        type="submit"
                    >
                        Submit Review
                    </button>
                </div>
            </form>
        );
    };


    const CareNeeds = () => {
        return (
            <div className={styles.careNeedsContainer}>
                <h3>Care Needs</h3>
                {loadingCareNeeds ? (
                    <div>Loading care needs...</div>
                ) : (
                    <ul>
                        {careNeeds.map((need) => (
                            <li key={need.id}>
                                <strong>Start Date:</strong> {need.start_date || "N/A"} <br/>
                                <strong>End Date:</strong> {need.end_date || "N/A"} <br/>
                                <strong>Status:</strong> {need.status === 'cancelled' ? 'reviewed' : need.status || 'N/A'}<br/>

                                {need.status === 'accepted' && (
                                    <>
                                        <strong>Volunteer:</strong>{" "}
                                        <span
                                            className={styles.volunteerLink}
                                            onClick={() => fetchVolunteerDetails(need.id)}
                                        >
                                                Click to see volunteer details
                                            </span>
                                        <br/>
                                    </>
                                )}

                                            {need.status !== 'active' && need.status !== 'completed' && need.status !== 'accepted' && (
                                                <button
                                                    className={styles.deleteCareNeedButton}
                                                    onClick={() => handleDeleteCareNeed(need.id)}
                                                >
                                                    Delete Care Need
                                                </button>
                                            )}
                                {need.status === 'completed' && (
                                    <button
                                        className={styles.reviewButton}
                                        onClick={() => {
                                            handleReview(need.id)
                                            setActiveTab('review')
                                        }
                                        }
                                    >
                                        Review Volunteer
                                    </button>
                                )}
                                        </li>
                                    ))}
                                </ul>
                            )}

                {showAddForm && (
                    <div className={styles.formContainer}>
                        <h3>Add Care Need</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label htmlFor="start-date">Start Date:</label>
                                <input
                                    type="date"
                                    id="start-date"
                                    name="start-date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="end-date">End Date:</label>
                                <input
                                    type="date"
                                    id="end-date"
                                    name="end-date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                            {/*<button type="submit">Submit</button>*/}
                        </form>
                    </div>
                )}

                {/* Back to Animal Details Button */}
                <div className={styles.buttonsContainer}>
                    <button
                        className={styles.backToDetailsButton}
                        onClick={() => {
                            setActiveTab('details')
                            setShowAddForm(false)
                        }}
                    >
                        Back to Animal Details
                    </button>
                    {!showAddForm && (
                        <button
                            className={styles.addCareNeedButton}
                            onClick={() => setShowAddForm(true)}
                        >
                            Add Care Need
                        </button>
                    )}
                    {showAddForm && (
                        <button
                            className={styles.submitCareNeedButton}
                            type="submit"
                            onClick={handleFormSubmit}
                        >
                            Submit
                        </button>
                    )}
                </div>

            </div>
        );
    }

    return (
        <div className={styles.container}>
            {volunteer ? (
                <div className={styles.volunteerDetailsContainer}>
                    <VolunteerDetails
                        volunteer={volunteer}
                        onBack={() => setVolunteer(null)}
                    />
                </div>
            ) : (
        <div className={styles.myAnimalDetailsContainer}>
            {successMessage && (
                <div className={`${styles.successNotification} ${styles.fadeIn}`}>
                    {successMessage}
                </div>
            )}
            {/* Content Based on Active Tab */}
            {activeTab === 'details' && (
                <AnimalDetails/>
            )}

            {activeTab === 'careNeeds' && (
                <CareNeeds/>
            )}
            {activeTab === 'review' && selectedCareNeed && (
                <Review
                    onCancel={() => setActiveTab('careNeeds')}
                    onSubmit={(reviewData) => handleReviewSubmit(selectedCareNeed, reviewData)}
                />
            )}
        </div>
            )}
        </div>
    );
}

export default MyPetDetails;