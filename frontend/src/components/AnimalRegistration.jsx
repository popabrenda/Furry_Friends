import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAnimal } from '../utils/rest-calls';
import { useAuth } from '../context/AuthContext';
import { addAnimal_picture } from "../utils/animal_picture-rest-calls";
import styles from './AnimalRegistration.module.css';

const AnimalRegistration = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [animal, setAnimal] = useState({
        owner: null,
        name: '',
        type: {
            species: '',
            breed: '',
            size_category: '',
            daily_care_requirement: ''
        },
        description: '',
        picture: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setAnimal(prevState => ({
                ...prevState,
                owner: currentUser
            }));
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in animal.type) {
            setAnimal(prevState => ({
                ...prevState,
                type: {
                    ...prevState.type,
                    [name]: value
                }
            }));
        } else {
            setAnimal(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAnimal(prevState => ({
                ...prevState,
                picture: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateStep = () => {
        setError('');
        switch (step) {
            case 1:
                if (!animal.name || !animal.type.species || !animal.type.size_category || !animal.type.daily_care_requirement) {
                    setError('Please fill in all required fields');
                    return false;
                }
                break;
            case 2:
                return true; // Description is optional
            case 3:
                return true; // Picture is optional
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep()) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep()) return;
        if (step !== 3) {
            nextStep();
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formattedCareRequirement = animal.type.daily_care_requirement.charAt(0).toUpperCase() +
                animal.type.daily_care_requirement.slice(1);

            const updatedAnimal = {
                ...animal,
                type: {
                    ...animal.type,
                    daily_care_requirement: formattedCareRequirement
                }
            };

            const response = await addAnimal(updatedAnimal);

            if (animal.picture) {
                const formData = new FormData();
                formData.append('id_animal', response.id);
                formData.append('picture', animal.picture);
                await addAnimal_picture(formData);
            }

            navigate('/pets', { state: { refresh: true } });
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.animalRegistrationContainer}>
                <div className={styles.header}>
                    <div className={styles.logoContainer}>
                        <img
                            src="/logos/logo_ff.svg"
                            alt="FurryFriends Logo"
                            className={styles.logo}
                        />
                        <div className={styles.brandInfo}>
                            <span className={styles.brandName}>FurryFriends</span>
                            <span className={styles.brandDescription}>Pet care</span>
                        </div>
                    </div>
                    <img
                        src='src/icons/exit.svg'
                        alt="Close"
                        className={styles.exitIcon}
                        onClick={() => navigate("/welcome")}
                    />
                </div>

                <h1 className={styles.title}>
                    {step === 1 && "Pet Details"}
                    {step === 2 && "Description"}
                    {step === 3 && "Profile Picture"}
                </h1>

                <form className={styles.registrationForm} onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    Name <span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={animal.name}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    placeholder="Enter pet's name"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    Species <span className={styles.required}>*</span>
                                </label>
                                <select
                                    name="species"
                                    value={animal.type.species}
                                    onChange={handleChange}
                                    className={styles.selectField}
                                >
                                    <option value="">Select Species</option>
                                    <option value="dog">Dog</option>
                                    <option value="cat">Cat</option>
                                    <option value="rabbit">Rabbit</option>
                                    <option value="bird">Bird</option>
                                    <option value="sheep">Sheep</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    Breed
                                </label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={animal.type.breed}
                                    onChange={handleChange}
                                    className={styles.inputField}
                                    placeholder="Enter breed"
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    Size Category <span className={styles.required}>*</span>
                                </label>
                                <select
                                    name="size_category"
                                    value={animal.type.size_category}
                                    onChange={handleChange}
                                    className={styles.selectField}
                                >
                                    <option value="">Select Size</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    Daily Care Requirement <span className={styles.required}>*</span>
                                </label>
                                <select
                                    name="daily_care_requirement"
                                    value={animal.type.daily_care_requirement}
                                    onChange={handleChange}
                                    className={styles.selectField}
                                >
                                    <option value="">Select Care Level</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Description</label>
                            <textarea
                                name="description"
                                value={animal.description}
                                onChange={handleChange}
                                className={styles.textareaField}
                                placeholder="Enter a description of your pet"
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <div className={styles.inputGroup}>
                            <label className={styles.inputLabel}>Profile Picture</label>
                            <div
                                className={styles.uploadArea}
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                {!imagePreview ? (
                                    <>
                                        <img
                                            src="src/icons/img.svg"
                                            alt="Upload"
                                            className={styles.uploadIcon}
                                        />
                                        <div className={styles.uploadText}>Upload from files</div>
                                        <input
                                            id="fileInput"
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                ) : (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className={styles.previewImage}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <div className={styles.progressBar}>
                        <div className={`${styles.progressDot} ${step >= 1 ? styles.active : ''}`} />
                        <div className={`${styles.progressDot} ${step >= 2 ? styles.active : ''}`} />
                        <div className={`${styles.progressDot} ${step >= 3 ? styles.active : ''}`} />
                    </div>

                    <div className={styles.buttonGroup}>
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className={styles.formButton}
                            >
                                Back
                            </button>
                        )}

                        {step === 3 ? (
                            <button
                                type="submit"
                                className={styles.formButton}
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? 'Registering...' : 'Register Pet'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    nextStep();
                                }}
                                className={styles.formButton}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AnimalRegistration;