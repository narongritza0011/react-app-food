import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const FoodDetail = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageOld, setImageOld] = useState("");
  const [price, setPrice] = useState(0);
  const [isActive, setIsActive] = useState();

  const { id } = useParams();
  const URL = "http://localhost:5000/images/"
  useEffect(() => {
    refreshToken();
    if (id) {
      getFoodById(id);

    }
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


  const getFoodById = async (id) => {

    const response = await axiosJWT.get(
      "http://localhost:5000/api/menu-foods/" + id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // setFoods(response.data);
    setIsActive(response.data.isActive)
    setName(response.data.name)
    setDescription(response.data.description)
    setImageOld(response.data.imageUrl)
    setPrice(response.data.price)


    // console.log(response.data.isActive)
  }


  const handleUpdateFood = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("imageOld", imageOld);
    formData.append("price", price);
    formData.append("isActive", isActive);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/menu-foods/` + id,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      navigate("/admin/foods");
    } catch (error) {
      console.error(error);
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
          <form onSubmit={handleUpdateFood}>
            <div>
              <div className="mb-3">
                <div className="image is-128x128">
                  {imageOld && <img src={URL + imageOld} alt="Image" />}
                  <div />
                </div>
              </div>
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

                />

                <input
                  className="input"
                  type="text"
                  value={imageOld}
                  name="imageOld"
                  onChange={(e) => setImageOld(e.target.value)} disabled
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

              <div className="field">
                <div className="select">
                  <select defaultValue={isActive} name="isActive" onChange={(e) => setIsActive(e.target.value)}>
                    <option disabled>กรุณาเลือก</option>
                    <option value={0} selected={isActive == 0} >ปิดใช้งาน</option>
                    <option value={1} selected={isActive == 1}>เปิดใช้งาน</option>
                  </select>
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

  )
}

export default FoodDetail