import { useEffect, useState } from "react"
import axios from "axios";
import DateTH from "../../functions/FormateDatetimeTH.js";


// eslint-disable-next-line react/prop-types
const Address = ({ UserId, token }) => {
    const [date, setDate] = useState("");
    const [loadData, setLoadData] = useState(false)
    const [data, setData] = useState({
        house_no: "",
        village_no: "",
        district: "",
        amphur: "",
        province: "",
        zipcode: "",
        tel: "",
        updatedAt: "",

    })

    useEffect(() => {


        if (UserId) {
            getAddress(UserId)
        }


    }, [UserId, loadData])




    const getAddress = async (id) => {
        const response = await axios.get(
            `http://localhost:5000/api/address/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setData(response.data);
        // console.log(response.data);

        setDate(DateTH(response.data.updatedAt));
    };


    const updateAddress = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/address/${UserId}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setData(response.data);
            setLoadData(true)
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <>

            {/* <Navbar /> */}



            <div className="container mt-5">
                <h1 className="title ">ที่อยู่ </h1>
                <form onSubmit={updateAddress}>
                    <div className="container mt-5 mb-5 box is-gapless">
                        <div className="column">
                            <div className="columns is-mobile">
                                <div className="column is-half">
                                    <div className="field">
                                        <label className="label">บ้านเลขที่</label>
                                        <div className="control">
                                            <input className="input" value={data.house_no} name="house_no" type="text" placeholder="12/10" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">หมู่</label>
                                        <div className="control">
                                            <input className="input" value={data.village_no} name="village_no" type="text" placeholder="11" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">ตำบล</label>
                                        <div className="control">
                                            <input className="input" value={data.district} name="district" type="text" placeholder="งิ้วงาม" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">อำเภอ</label>
                                        <div className="control">
                                            <input className="input" value={data.amphur} name="amphur" type="text" placeholder="เมือง" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">จังหวัด</label>
                                        <div className="control">
                                            <input className="input" value={data.province} name="province" type="text" placeholder="พิษณุโลก" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-half">
                                    <div className="field">
                                        <label className="label">รหัสไปรษณีย์</label>
                                        <div className="control">
                                            <input className="input" value={data.zipcode} name="zipcode" type="text" placeholder="65230" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">เบอร์โทร</label>
                                        <div className="control">
                                            <input className="input" value={data.tel} name="tel" type="text" placeholder="0805077810" onChange={(e) =>
                                                setData({ ...data, [e.target.name]: e.target.value })
                                            } />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">วันเวลาที่อัพเดท</label>
                                        <div className="control">
                                            <p>{date}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="field is-grouped is-grouped-centered">
                                <p className="control">
                                    <button type="submit" className="button is-primary">
                                        บันทึก
                                    </button>
                                </p>

                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Address