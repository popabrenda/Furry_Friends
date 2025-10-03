import React, { useEffect, useState } from 'react';
import { getPicturesByAnimalId } from '../utils/animal_picture-rest-calls.js';
import { addCaring_session, getCare_NeedsByAnimalId } from '../utils/rest-calls';
import pawImage from '../icons/AnimalDetails/paw.svg';
import logoImage from '../images/FurryFriends-Logo.png';
import sizeImage from '../icons/AnimalDetails/size.svg';
import statusImage from '../icons/AnimalDetails/help.svg';
import styles from './AnimalDetails_CareNeed.module.css'; // Updated import
import { useAuth } from "../context/AuthContext.jsx";
const AnimalDetails_CareNeed = ({ animal }) => {
    const [animal_pictures, setAnimal_Pictures] = useState([]);
    const [showCareDetails, setShowCareDetails] = useState(false);
    const [careNeeds, setCareNeeds] = useState([]);
    const [loadingCareNeeds, setLoadingCareNeeds] = useState(false);
    const { currentUser } = useAuth();

    useEffect(() => {
        getPicturesByAnimalId(animal.id)
            .then((animal_pictures) => {
                setAnimal_Pictures(animal_pictures);
                console.log('Animal id', animal.id);
            })
            .catch((error) => console.log('Error while fetching animal pictures', error));
    }, [animal.id]);

    useEffect(() => {
        if (showCareDetails) {
            setLoadingCareNeeds(true);
            getCare_NeedsByAnimalId(animal.id)
                .then((careNeeds) => {
                    console.log('Care needs', careNeeds);
                    setCareNeeds(careNeeds);
                    setLoadingCareNeeds(false);
                })
                .catch((error) => {
                    console.log('Error while fetching care needs', error);
                    setLoadingCareNeeds(false);
                });
        }
    }, [showCareDetails, animal.id]);

    if (!animal) {
        return <div>Loading...</div>;
    }

    const handleHelpClick = (careNeedId) => {
        const careNeed = careNeeds.find(need => need.id === careNeedId);
        console.log('Care need:', careNeed);
        console.log('Current user:', currentUser);

        if (careNeed && currentUser) {
            const caringSession = {
                care_need: careNeed,
                caretaker: currentUser,
                start_date: careNeed.start_date,
                end_date: careNeed.end_date
            };
            addCaring_session(caringSession)
                .then(response => {
                    console.log('Caring session added successfully:', response);
                    setShowCareDetails(!showCareDetails);
                })
                .catch(error => {
                    console.error('Error adding caring session:', error);
                });
        }
    };

    const AnimalDetails = () => {
        return (
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img
                    className={styles.animalImage}
                    src={animal_pictures.length > 0 ? `data:image/png;base64,${animal_pictures[0].pictureData}` : logoImage}
                    alt={animal.name || "Animal"}
                />
                <div className={styles.animalDetailsSection}>
                    <div className={styles.detailsTitle}>Details</div>
                    <div className={styles.breedSizeContainer}>
                        <div className={styles.breedContainer}>
                            <img src={pawImage} alt="Breed Icon" />
                            <div className={styles.breedText}>{animal.type.breed || "Unknown Breed"}</div>
                        </div>
                        <div className={styles.sizeContainer}>
                            <img src={sizeImage} alt="Size Icon" />
                            <div className={styles.sizeText}>{animal.type.size_category || "Unknown Size"}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.divider} />
                <div className={styles.careRequirementContainer}>
                    <div className={styles.careRequirementTitle}>Daily care requirement</div>
                    <div className={styles.careRequirementText}>{animal.type.daily_care_requirement || "Unknown Care Level"}</div>
                </div>
                <div className={styles.animalNameType}>
                    <div className={styles.animalNameContainer}>
                        <div className={styles.animalName}>{animal.name || "Unknown Name"}</div>
                        <div className={styles.statusIcon}>
                            <img src={statusImage} alt="Status" />
                        </div>
                    </div>
                    <div className={styles.animalSpecies}>{animal.type.species || "Unknown Species"}</div>
                </div>
                <div className={styles.descriptionContainer}>
                    <div className={styles.descriptionTitle}>Description</div>
                    <div className={styles.descriptionText}>{animal.description || "No description available"}</div>
                </div>

                {/* Adăugarea secțiunii pentru adresa proprietarului */}
                <div className={styles.addressContainer}>
                    <div className={styles.addressTitle}>Owner's Address</div>
                    <div className={styles.addressText}>
                        <strong>State:</strong> {animal.owner.address.state || "Nu este disponibil"}
                    </div>
                    <div className={styles.addressText}>
                        <strong>City:</strong> {animal.owner.address.city || "Nu este disponibil"}
                    </div>
                    <div className={styles.addressText}>
                        <strong>Street:</strong> {animal.owner.address.street || "Nu este disponibil"}
                    </div>
                </div>
            </div>
        );
    };

    const CareList = () => {
        return (
            <ul>
                {careNeeds.filter((need) => need.status === 'pending').map((need) => (
                    <li key={need.id}>
                        <div className={styles.dateContainer}>
                            <div className={styles.dateInfo}>
                                <div className={styles.dateLabel}>Start Date</div>
                                <div className={styles.dateValue}>{need.start_date || "N/A"}</div>
                            </div>
                            <div className={styles.dateInfo}>
                                <div className={styles.dateLabel}>End Date</div>
                                <div className={styles.dateValue}>{need.end_date || "N/A"}</div>
                            </div>
                        </div>
                        <div className={styles.statusIndicator}>
                            <span className={styles.statusText}>{need.status || "N/A"}</span>
                        </div>
                        {need.status === "pending" && (
                            <button
                                className={styles.helpButton}
                                onClick={() => handleHelpClick(need.id)}
                            >
                                Help during this period
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        );
    }

    const CareDetails = () => {
        return (
            <div className={styles.careDetailsSection}>
                <div className={styles.careDetailsHeader}>
                    <h2>Care Details</h2>
                </div>

                <div className={styles.careDetailsContent}>
                    {loadingCareNeeds ? (
                        <p>Loading care needs...</p>
                    ) : (
                        careNeeds.filter((need) => need.status === 'pending').length > 0 ? (
                            <CareList />
                        ) : (

                            <p>No care needs available for this animal.</p>
                        )
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.animalDetailsContainer}>
            <div className={styles.nextButtonContainer}>
                <button
                    className={styles.nextButton}
                    onClick={() => setShowCareDetails(!showCareDetails)}
                >
                    {showCareDetails ? "Back to Details" : "Help"}
                </button>
            </div>
            {showCareDetails ? <CareDetails /> : <AnimalDetails />}
        </div>
    );
};

export default AnimalDetails_CareNeed;
