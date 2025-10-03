import React, { useState } from 'react';
import { login } from '../../utils/rest-calls.js';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import styles from './LogIn.module.css';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { loginUser } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        login(email, password)
            .then((data) => {
                loginUser(data);
                navigate('/welcome');
            })
            .catch(() => {
                setError('Login failed. Please check your credentials and try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginContainer}>
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
                    {/*<button className={styles.closeButton}>&times;</button>*/}
                    <img src='src/icons/exit.svg' alt="Close" className={styles.exitIcon} onClick={() => navigate("/")} />
                </div>

                <h1 className={styles.title}>Log in</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email*</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password*</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter you password"
                            className={styles.input}
                            required
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={styles.loginButton}
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                <div className={styles.divider}>or</div>

                <Link to="/signup" className={styles.createAccount}>
                    Create an account
                </Link>
            </div>
        </div>
    );
};

export default LogIn;