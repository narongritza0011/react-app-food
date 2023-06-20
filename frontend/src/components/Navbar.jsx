import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/images/logo-round.png";
import { BsFillPersonFill, BsBoxArrowRight, BsFillCartFill } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar box is-warning"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/dashboard">
            <img src={Logo} width="100%" height="100%" />
          </Link>

          <Link
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start ">
            <Link to="/dashboard" className="navbar-item ">
              dashboard
            </Link>
            <Link to="/admin/users" className="navbar-item ">
              พนักงาน
            </Link>
            <Link to="/admin/foods" className="navbar-item ">
              เมนูอาหาร
            </Link>
            <Link to="/user/home" className="navbar-item ">
              หน้าหลัก
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/cart" className="button is-white">
                  <BsFillCartFill />
                </Link>
                <Link to="/profile" className="button is-white">
                  <BsFillPersonFill />
                </Link>
                <button onClick={Logout} className="button is-white">
                  <BsBoxArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
