import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navigation() {
  const sessionToken = window.sessionStorage.getItem("Token");
  const token = useSelector(
    (state) => state.login.token || state.register.token
  );
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {/* <Link to="/" className="nav-link">
                Home
              </Link> */}
              {(!token || !sessionToken) && (
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              )}
              {(!token || !sessionToken) && (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
              {(token || sessionToken) && (
                <Link to="/update/:id" className="nav-link">
                  Account
                </Link>
              )}
              <Link to="/getcart/:id" className="nav-link">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
