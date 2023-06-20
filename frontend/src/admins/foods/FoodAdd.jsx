import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import axios from "axios";

import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const FoodAdd = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    refreshToken();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("price", price);

    try {
      await axios.post("http://localhost:5000/api/menu-foods", formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/admin/foods");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title ">เพิ่มเมนูอาหาร</h1>
        <div className="container">
          <div className="has-text-left">
            <Link to="/admin/foods/" className="button is-warning">
              ย้อนกลับ
            </Link>
          </div>
        </div>
        <div className="container mt-5 box">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  รูปภาพ
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  required
                />
              </div>
              <div className="field">
                <label className="label">ชื่อ</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">รายละเอียด</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={description}
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">ราคา</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={price}
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="button is-success">
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FoodAdd;
