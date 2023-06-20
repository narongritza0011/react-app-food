import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsPencilSquare, BsFillEyeFill } from "react-icons/bs";
import DateTH from "../functions/FormateDatetimeTH.js";
import Address from "../admins/address/Address";

const Profile = () => {
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
  const [isedit, setIsedit] = useState(false);
  const [date, setDate] = useState("");

  useEffect(() => {
    refreshToken();
    if (userId) {
      getProfile();
    }
    // console.log(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      //   setName(decoded.name);
      setUserId(localStorage.getItem("userId"));
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

  const getProfile = async () => {
    // console.log("user id :", userId);
    const response = await axios.get(
      `http://localhost:5000/api/profile/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setUsers(response.data);

    setDate(DateTH(response.data.updatedAt));
  };

  const updateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/profile/${userId}`,
        users,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const switchEdit = () => {
    setIsedit(!isedit);
  };
  //   console.log(isedit);
  return (
    <>
      <Navbar />

      <div className="container">
        {/* {users.id} */}
        <h1 className="title ">โปรไฟล์</h1>

        {isedit ? (
          <div className="container mt-5 box">
            <div onClick={switchEdit} style={{ cursor: "pointer" }}>
              <span className="is-pulled-right m-10">
                <BsFillEyeFill />
              </span>
            </div>
            <form onSubmit={updateProfile}>
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
                    onChange={(e) =>
                      setUsers({ ...users, [e.target.name]: e.target.value })
                    }
                    disabled
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
                <button
                  type="submit"
                  className="button is-success is-fullwidth"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="container mt-5 box">
            <div onClick={switchEdit} style={{ cursor: "pointer" }}>
              <span className="is-pulled-right m-10">
                <BsPencilSquare />
              </span>
            </div>
            <div className="field">
              <label className="label">ชื่อผู้ใช้</label>
              <div className="control">
                <h2 className="subtitle">{users.name}</h2>
              </div>
            </div>
            <div className="field">
              <label className="label">บัญชีผู้ใช้</label>
              <div className="control">
                <h2 className="subtitle">{users.email}</h2>
              </div>
            </div>
            <div className="field">
              <label className="label">ระดับผู้ใช้</label>
              <div className="control">
                <h2 className="subtitle">{users.role}</h2>
              </div>
            </div>
            <div className="field">
              <label className="label">วันเวลาที่อัพเดท</label>
              <div className="control">
                <h2 className="subtitle">{date}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
      < Address UserId={userId} token={token} />
      <Footer />
    </>
  );
};

export default Profile;
