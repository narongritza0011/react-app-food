import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Address from "../models/AddressModel.js";
//auth
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  const user = await Users.findOne({ where: { email } });

  if (user != null) {
    return res.status(401).json({ message: "มีบัญชีผู้ใช้นี้เเล้ว!" });
  }

  if (password !== confPassword)
    return res.status(400).json({ msg: "รหัสผ่านไม่ตรงกัน" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const data = await Users.create({
      name: name,
      email: email,
      role: "user",
      password: hashPassword,
    });

    //สร้าง Address
    await Address.create({
      userId: data.id
    })

    res.json({ msg: "สมัครสมาชิกสำเร็จ" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "รหัสผ่านไม่ถูกต้อง !" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "บัญชีนี้ไม่มีในระบบ !" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

//Profile
//Get
export const GetProfile = async (req, res) => {
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

//Update
export const UpdateProfile = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      const { name } = req.body;
      await user.update({ name });
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
