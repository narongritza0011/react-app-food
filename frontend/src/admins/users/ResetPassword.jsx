import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const { id } = useParams();
  const [user, setUser] = useState({
    userId: id,
    password: "",
    NewPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    refreshToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      //   setName(decoded.name);

      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);

        // setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const ResetPassword = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `http://localhost:5000/api/users/reset-password/`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      handleRedirectSuccess(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirectSuccess = (msg) => {
    Swal.fire({
      title: msg,
      text: "You will be redirected to the new page.",
      icon: "success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        setTimeout(() => {
          navigate("/admin/users/", id); // Redirect to the desired page
        }, 1500);
      },
    });
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="title ">รีเซ็ทรหัสผ่าน</h1>
        <form onSubmit={ResetPassword}>
          <div className="container mt-5 box">
            <div className="field">
              <label className="label">รหัสผ่านเดิม</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={user.password}
                  name="password"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">รหัสผ่านใหม่</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={user.NewPassword}
                  name="NewPassword"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">ยืนยันรหัสผ่านใหม่</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={user.confirmPassword}
                  name="confirmPassword"
                  onChange={(e) =>
                    setUser({ ...user, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field mt-5">
              <button type="submit" className="button is-success is-fullwidth">
                บันทึก
              </button>
            </div>
            <div className="field mt-5">
              <Link
                to={`/admin/users/${id}`}
                className="button is-warning is-light is-fullwidth"
              >
                ยกเลิก
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
