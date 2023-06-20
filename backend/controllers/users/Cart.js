import Carts from "../../models/CartModel.js";
import CartItems from "../../models/CartItemModel.js";
import Foods from '../../models/FoodModel.js'


export const getCart = async (req, res) => {

    try {

        const user_id = req.params.id
        if (!user_id) {
            res.status(500).json({ error: "user not found!" });
        }
        const CartId = await Carts.findOne({ where: { userId: user_id } })
        if (!CartId) {
            res.status(200).json({ msg: "cart is empty!" });
        }


        CartItems.belongsTo(Foods, { foreignKey: 'food_id' });
        Foods.hasMany(CartItems, { foreignKey: 'id' });




        const data = await CartItems.findAll({
            include: [Foods],
            where: {
                cart_id: CartId.id
            }
        },)


        // const data = await CartItems.findAll({
        //     where: {
        //         cart_id: CartId.id
        //     }
        // },)
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create Cart" });
    }
};


export const addToCart = async (req, res) => {
    const { userId } = req.body;
    const food_id = req.params.id
    // console.log('food ; ,', food_id)
    // console.log('user ; ,', userId)

    try {

        const cart = await Carts.findOne({ where: { userId: userId } });

        if (!cart) {

            //สร้าง cart ใหม่หมด
            const cartNew = await Carts.create({
                userId
            });

            const cartItemNew = await CartItems.create({
                cart_id: cartNew.id,
                food_id: food_id,
                quantity: 1,
            });

            res.status(201).json(cartItemNew);


        } else if (cart) {

            const getCartItem = await CartItems.findOne({ where: { food_id: food_id } });

            if (getCartItem) {
                const updateCartItem = await CartItems.update(
                    { quantity: getCartItem.quantity + 1 },
                    { where: { food_id: getCartItem.food_id } }

                )

                res.status(201).json({ message: "เพิ่มจำนวนสำเร็จ" });

            } else {

                const cartItemNew = await CartItems.create({
                    cart_id: cart.id,
                    food_id: food_id,
                    quantity: 1,
                });
                res.status(201).json(cartItemNew);


            }



        } else {

            res.status(501).json({ error: "Cart not found!" });
        }

    } catch (error) {
        res.status(500).json({ error: "Failed to create Cart" });
    }
}