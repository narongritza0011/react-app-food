import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios";
import Product from "../components/Product";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([])
    const [userId, setUserId] = useState("");



    useEffect(() => {

        if (!userId) {
            setUserId(localStorage.getItem("userId"))

        }



        getFoods()

    }, [userId])


    const getFoods = async () => {

        const response = await axios.get(
            `http://localhost:5000/user/api/foods/`

        );

        setFoods(response.data);

        console.log(response.data);

    };


    const handleRedirectSuccess = () => {
        Swal.fire({
            title: "เพิ่มรายการอาหารสำเร็จ",
            text: "",
            icon: "success",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
                setTimeout(() => {
                    navigate("/user/home"); // Redirect to the desired page
                }, 1000);
            },
        });
    };


    const addToCart = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/user/api/cart/${id}`, {
                userId: userId,
            });
            // console.log(response.data);
            handleRedirectSuccess();

        } catch (error) {
            console.log(error)
        }
        handleRedirectSuccess()
    }




    return (
        <>
            <Navbar />
            <div className="container">

                <h1 className="title ">รายการอาหาร</h1>
                <div className="container mt-5 ">

                    {/* {userId} */}


                    <div className="container">
                        <div className="columns is-multiline">
                            {foods.map((food) => (
                                <div key={food.id} className="column is-3">
                                    <Product handleClick={addToCart} id={food.id} title={food.name} description={food.description} price={food.price} image={food.imageUrl} />
                                </div>


                            ))} </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home