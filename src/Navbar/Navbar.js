import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
    return (
        <div className="navbar">
            <div className="navbar-title">mlh</div>
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/wordle" className="navbar-link">Wordle</Link>
            </div>
        </div>
    );
}

export default Navbar;