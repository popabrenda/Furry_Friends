import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../utils/rest-calls';
import styles from './SignUp.module.css';

const SignUp = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
        age: '',
        phone_number: '',
        address: {
            street: '',
            city: '',
            state: '',
        },
        description: '',
        profile_picture: '',
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const [field, subField] = name.split('.');
            setUser(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    [subField]: value,
                },
            }));
        } else {
            setUser(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setUser(prev => ({
                    ...prev,
                    profile_picture: reader.result.split(',')[1],
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateStep = () => {
        setError('');
        switch (step) {
            case 1:
                if (!user.email || !user.password || !user.confirmPassword) {
                    setError('All fields are required');
                    return false;
                }
                if (user.password !== user.confirmPassword) {
                    setError('Passwords do not match');
                    return false;
                }
                break;
            case 2:
                if (!user.name || !user.surname || !user.age || !user.phone_number) {
                    setError('All fields are required');
                    return false;
                }
                break;
            case 3:
                if (!user.address.street || !user.address.city || !user.address.state) {
                    setError('All fields are required');
                    return false;
                }
                break;
            case 4:
                return true;
        }
        return true;
    };

    const nextStep = (e) => {
        e.preventDefault();
        if (validateStep()) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep()) return;

        setLoading(true);
        signUp(user)
            .then(() => {
                navigate('/login');
            })
            .catch(() => {
                setError('Sign-up failed. Please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.signupContainer}>
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
                        onClick={() => navigate("/")}
                    />
                </div>

                <h1 className={styles.title}>
                    {step === 1 && "Sign up"}
                    {step === 2 && "Personal data"}
                    {step === 3 && "Address"}
                    {step === 4 && "Additional details"}
                </h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/*Am adaugat asta formContent*/}
                    {step === 1 && (
                        <>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Email<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Password<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Confirm Password<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Name<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Surname<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={user.surname}
                                    onChange={handleChange}
                                    placeholder="Enter your surname"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Age<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    value={user.age}
                                    onChange={handleChange}
                                    placeholder="Enter your age"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Phone number<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={user.phone_number}
                                    onChange={handleChange}
                                    placeholder="0712 345 678"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    Street<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address.street"
                                    value={user.address.street}
                                    onChange={handleChange}
                                    placeholder="Enter your street"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    City<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={user.address.city}
                                    onChange={handleChange}
                                    placeholder="Enter your city"
                                    className={styles.input}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    State<span className={styles.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="address.state"
                                    value={user.address.state}
                                    onChange={handleChange}
                                    placeholder="Enter your state"
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={user.description}
                                    onChange={handleChange}
                                    placeholder="Enter a description"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Profile picture</label>
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
                                                name="profile_picture"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                                style={{display: 'none'}}
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
                        </>
                    )}

                    {error && <div className={styles.errorMessage}>{error}</div>}

                    <div className={styles.progressBar}>
                        <div className={`${styles.progressDot} ${step >= 1 ? styles.active : ''}`}/>
                        <div className={`${styles.progressDot} ${step >= 2 ? styles.active : ''}`}/>
                        <div className={`${styles.progressDot} ${step >= 3 ? styles.active : ''}`}/>
                        <div className={`${styles.progressDot} ${step >= 4 ? styles.active : ''}`}/>
                    </div>

                    <div className={styles.buttonGroup}>
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className={styles.button}
                            >
                                Back
                            </button>
                        )}

                        {step === 4 ? (
                            <button
                                type="submit"
                                className={styles.button}
                                disabled={loading}
                            >
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={nextStep}
                                className={styles.button}
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

export default SignUp;
