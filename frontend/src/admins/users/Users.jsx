import Navbar from "../../components/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { BsFillTrashFill } from "react-icons/bs";
import DateTH from "../../functions/FormateDatetimeTH.js";

const Users = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    refreshToken();
    getUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      // console.log(decoded);

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

        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get(
      "http://localhost:5000/api/users/list",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUsers(response.data);
  };

  const deleteUserById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(users.filter((item) => item.id !== id));

      console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title ">รายการพนักงาน</h1>
        <div className="container mt-5 box">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ชื่อ</th>
                <th>บัญชี</th>
                <th>วันเวลาที่สร้าง</th>
                <th>วันเวลาที่อัพเดท</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/admin/users/${user.id}`}>{index + 1}</Link>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{DateTH(user.createdAt)}</td>
                  <td>{DateTH(user.updatedAt)}</td>

                  <td>
                    <button
                      className="button is-danger"
                      onClick={() => deleteUserById(user.id)}
                    >
                      <BsFillTrashFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Users;
