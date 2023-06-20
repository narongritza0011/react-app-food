import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DateTH from "../../functions/FormateDatetimeTH.js";
const UsersDetail = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState({
    name: "",
    email: "",
    role: "",
    updatedAt: "",
  });

  const [date, setDate] = useState("");
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    if (userId) {
      getUserById();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      //   setName(decoded.name);
      setUserId(id);
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

  const getUserById = async () => {
    // console.log("user id :", userId);
    const response = await axios.get(
      `http://localhost:5000/api/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsers(response.data);

    setDate(DateTH(response.data.updatedAt));
  };

  const updateUserById = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        users,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data);
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        {/* {users.id} */}
        <h1 className="title ">เเก้ไขข้อมูลพนักงาน</h1>
        <div className="container mt-5 box">
          <form onSubmit={updateUserById}>
            <div className="field">
              <label className="label">ชื่อผู้ใช้</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={users.name}
                  name="name"
                  onChange={(e) =>
                    setUsers({ ...users, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="field">
              <label className="label">บัญชีผู้ใช้</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={users.email}
                  name="email"
                  onChange={(e) =>
                    setUsers({ ...users, [e.target.name]: e.target.value })
                  }
                  disabled
                />
              </div>
            </div>

            <div className="field">
              <label className="label">ระดับผู้ใช้</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={users.role}
                  name="role"
                  onChange={(e) =>
                    setUsers({ ...users, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="field">
              <label className="label">วันเวลาที่อัพเดท</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={date}
                  onChange={(e) =>
                    setUsers({ ...users, [e.target.name]: e.target.value })
                  }
                  disabled
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
                to={`/admin/users/reset-password/${users.id}`}
                type="submit"
                className="button is-info is-fullwidth"
              >
                รีเซ็ทรหัสผ่าน
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UsersDetail;
