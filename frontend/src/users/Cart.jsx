import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (!userId) {
      setUserId(localStorage.getItem("userId"));
    }
    if (userId) {
      getFoods(userId);
    }
  }, [userId]);
  const getFoods = async (id) => {
    const response = await axios.get(
      `http://localhost:5000/user/api/cart/${id}`
    );

    setCartItems(response.data);
    console.log(response.data);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="title ">ตะกร้าสินค้า</h1>
        <div className="container mt-5 box">
          {cartItems.map((item) => (
            <div key={item.id} className="box">
              <div className="image is-128x128">
                <img
                  src={`http://localhost:5000/images/` + item.food.imageUrl}
                  alt="Image"
                />
                <div />
              </div>
              <p>{item.food.name}</p>
              <p>{item.food.price}</p>
              <p>{item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
