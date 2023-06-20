import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";

export const getUsersList = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const GetUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      attributes: ["id", "name", "email", "role", "createdAt", "updatedAt"],
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const UpdateUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      const { name, role } = req.body;

      // //เช็คemail ซ้ำไหม
      // const CheckEmail = await Users.findOne({ where: { email } });
      // if (CheckEmail != null) {
      //   return res.status(401).json({ message: "มีบัญชีผู้ใช้นี้เเล้ว!" });
      // }
      await user.update({ name, role });
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const ResetPasswordUserById = async (req, res) => {
  try {
    // const id = req.params.id;
    const { userId, password, NewPassword, confirmPassword } = req.body;

    const user = await Users.findByPk(userId);

    if (user === null) {
      return res.status(401).json({ message: "ไม่เจอบัญชีผู้ใช้นี้!" });
    }

    if (NewPassword !== confirmPassword)
      return res.status(400).json({ message: "รหัสผ่านไม่ตรงกัน" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง !" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(NewPassword, salt);

    await user.update({ password: hashPassword });
    res.status(200).json({ message: "เปลี่ยนรหัสผ่านสำเร็จ" });
  } catch (error) {
    res.status(404).json({ message: "error" });
  }
};
