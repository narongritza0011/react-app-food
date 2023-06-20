import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import DateTH from "../../functions/FormateDatetimeTH.js";
import { BsCheck, BsFillTrashFill, BsX } from "react-icons/bs";

const Foods = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    refreshToken();
    getFoods();

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

  const getFoods = async () => {
    const response = await axiosJWT.get(
      "http://localhost:5000/api/menu-foods",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setFoods(response.data);
    // console.log(response.data)
  };

  const deleteFoodsById = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/menu-foods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFoods(foods.filter((item) => item.id !== id));

      // console.log(response);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title ">รายการอาหาร</h1>
        <div className="container">
          <div className="has-text-right">
            <Link to="/admin/foods/add" className="button is-warning">
              เพิ่ม
            </Link>
          </div>
        </div>
        <div className="container mt-5 box">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>รูปภาพ</th>
                <th>ชื่อ</th>
                <th>ราคา</th>
                <th>สถานะ</th>
                <th>วันเวลาที่สร้าง</th>
                <th>วันเวลาที่อัพเดท</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, index) => (
                <tr key={food.id}>
                  <td>
                    <Link to={`/admin/foods/${food.id}`}>{index + 1}</Link>
                  </td>
                  <td><div className="image is-128x128"><img src={`http://localhost:5000/images/` + food.imageUrl} alt="Image" /><div /></div></td>
                  <td>{food.name}</td>
                  <td>{food.price}</td>
                  <td>
                    {food.isActive ? <span className="tag is-link is-success"><BsCheck size={25} /></span>
                      : <span className="tag is-link is-danger"><BsX size={25} /></span>}
                  </td>

                  <td>{DateTH(food.createdAt)}</td>
                  <td>{DateTH(food.updatedAt)}</td>

                  <td>
                    <button
                      className="button is-danger"
                      onClick={() => deleteFoodsById(food.id)}
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

export default Foods;
