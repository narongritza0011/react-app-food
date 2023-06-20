import Address from "../models/AddressModel.js";


// export const createAddress = async (req, res) => {
//     try {
//         const { house_no, village_no, district, amphur, province, zipcode, tel, userId } = req.body;
//         const data = await Address.create({
//             house_no, village_no, district, amphur, province, zipcode, tel, userId
//         });

//         res.status(201).json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to create Address" });
//     }
// };

export const GetAddressByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Address.findOne({
            where: {
                userId: userId
            },
        }, {
            attributes: ["id", "house_no", "village_no", "district", "amphur", "province", "zipcode", "tel", "userId", "updatedAt"],
        });
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const UpdateAddressByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = await Address.findOne({
            where: { userId: userId }
        });
        if (data) {
            const { house_no, village_no, district, amphur, province, zipcode, tel } = req.body;
            await data.update({ house_no, village_no, district, amphur, province, zipcode, tel });
            res.json(data);
        } else {
            res.status(404).json({ message: "Address not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};






