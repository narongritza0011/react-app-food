import Foods from "../models/FoodModel.js";
import fs from 'fs'

// Create a menu food

export const createMenuFood = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    // const imageUrl = req.file ? req.file.path : null;

    // const imageUrl = req.file.filename;
    const imageUrl = req.file.filename;
    console.log("imageurl :  " + imageUrl);
    // console.log("image :  " + image);

    const data = await Foods.create({
      name,
      description,
      imageUrl,
      price,
      isActive: 1,
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu food" });
  }
};
// Read all menu foods
export const getAllMenuFoods = async (req, res) => {
  try {



    const data = await Foods.findAll();




    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu foods" });
  }
};

// Update a menu food
export const updateMenuFood = async (req, res) => {
  // const { id } = req.params;
  // const { name, description, price, isActive, imageOld } = req.body;
  // const imageUrlNew = req.file.filename;
  // const imageUrlNew = req.file ? req.file.filename : null;
  // console.log("ภาพเก่า" + imageOld)
  // console.log("ภาพใหม่" + imageUrlNew)

  // console.log(req.body)


  try {
    const { id } = req.params;
    const { name, description, price, isActive, imageOld } = req.body;
    const imageUrlNew = req.file ? req.file.filename : null;
    const data = await Foods.findByPk(id);
    if (data) {
      //check image ว่าอัพเดทไหม
      if (imageUrlNew) {
        //ให้ไปลบรูปเดิมก่อน
        const imagePath = 'public/images/' + data.imageUrl;
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log('Image file deleted successfully');
        });

        await data.update({ name, description, price, isActive, imageUrl: imageUrlNew });
        res.json(data);
      } else {
        await data.update({ name, description, price, isActive });
        res.json(data);
      }

    } else {
      return res.status(404).json({ error: "Menu food not found" });
    }


  } catch (error) {
    res.status(500).json({ error: "Failed to update menu food" });
  }
};

// Delete a menu food
export const deleteMenuFood = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Foods.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: "Menu food not found" });
    }
    const imagePath = 'public/images/' + data.imageUrl;


    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Image file deleted successfully');
    });


    await data.destroy();
    res.json({ message: "Menu food deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu food" });
  }
};


export const getFoodById = async (req, res) => {
  try {
    const data = await Foods.findByPk(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}