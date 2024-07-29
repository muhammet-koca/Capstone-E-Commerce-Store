import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import Logout from "../logout/logout";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const token = useSelector(
    (state) => state.login.token || state.register.token
  );
  const user = useSelector((state) => state.login.user || state.register.user);
  const sessionToken = window.sessionStorage.getItem("Token");
  const sessionUser = window.sessionStorage.getItem("User");
  const sessionCart = window.sessionStorage.getItem("Cart");
  const navigate = useNavigate();

  console.log("User:", sessionUser);
  console.log("Cart:", sessionCart);

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("Token");
      sessionStorage.removeItem("User");
      sessionStorage.removeItem("Cart");
      alert("Logged Out!");
      navigate("/");
    } catch (error) {
      console.log("Logout error", error);
    }
  };

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
              {(token || sessionToken) && user && user.id && (
                <Link to={`/update/${user.id}`} className="nav-link">
                  Account
                </Link>
              )}

              <Link to={`/getCart/${sessionCart}`} className="nav-link">
                Cart
              </Link>
              {/* {(token || sessionToken) && user && user.id && (
                <Link
                  to={`/getCart/${user.cart.id || cart.id}`}
                  className="nav-link"
                >
                  Cart
                </Link>
              )} */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
