import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Home</Link>
                <Link className="navbar-brand" to="/bookings">Bookings</Link>
            </div>
        </nav>
    )
};

export default Header;
