import { useState } from 'react';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            navigate('/login');
        } else {
            setError('Invalid email or password');
        }
    };

    return (

        <div className={styles["register-container"]}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className={styles["submit-button"]}>Register</button>
            </form>
            <p className={styles["login-link"]}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>

    )

}