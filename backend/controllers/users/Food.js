import Foods from "../../models/FoodModel.js";

export const getFoods = async (req, res) => {
    try {
        const data = await Foods.findAll({
            where: {
                isActive: 1
            }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch menu foods" });
    }
};
