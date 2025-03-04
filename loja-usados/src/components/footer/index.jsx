import "./index.css";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer>
            <h1>2025 - Pedro Antunes</h1>
            <Link to="https://github.com/PedroFellipeAntunes" target="_blank" rel="noopener noreferrer">
                GitHub
            </Link>
        </footer>
    );
};