import styles from './login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login ({ setToken, setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {

        e.preventDefault();

        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const { token, user } = await response.json();
            setToken(token);
            setUser(user);
            localStorage.setItem('token', token);
            navigate('/');
        } else {
            setError('Invalid email or password');
        }

    }

    return (
        <div className={styles["login-container"]}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className={styles["form-group"]}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles["form-group"]}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className={styles["error"]}>{error}</p>}
                <button type="submit" className={styles["submit-button"]}>Login</button>
            </form>
            <p className={styles["register-link"]}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    )

}