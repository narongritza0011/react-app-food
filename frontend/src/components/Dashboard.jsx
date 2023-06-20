import Navbar from "./Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
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

      //set id ไปที่ localStorage
      if (decoded.userId !== "") {
        localStorage.setItem("userId", decoded.userId);
      }

      setName(decoded.name);
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

        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="title ">Welcome : {name}</h1>
        <div className="container mt-5 box">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
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

export default Dashboard;
