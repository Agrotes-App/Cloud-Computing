const prisma = require("../prisma");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePhoto } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 8);

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: encryptedPassword,
        profile_Photo: profilePhoto || null,
      },
    });

    res.status(201).json({
      message: "User registered successfully",
      createdUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const foundUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const authToken = jwt.sign(
      {
        userId: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      secretKey,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      user: {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
      },
      token: authToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUserAccount = async (req, res) => {
  try {
    const { userId } = req.user;
    const { username, email, password } = req.body;

    if (!username && !email && !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }

    if (email) {
      const userWithEmail = await prisma.user.findFirst({ where: { email } });
      if (userWithEmail && userWithEmail.id !== userId) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    let newPassword;
    if (password) {
      newPassword = await bcrypt.hash(password, 8);
    }

    const userUpdate = await prisma.user.update({
      where: { id: userId },
      data: {
        username: username || undefined,
        email: email || undefined,
        password: newPassword || undefined,
      },
    });

    res.json({ message: "Account updated successfully", userUpdate });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logoutUser = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  updateUserAccount,
  logoutUser,
};
