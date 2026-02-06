const User = require("../models/user");
const jwt = require("jsonwebtoken");


// ✅ REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    let { fullName, userName, password, role, departmentName } = req.body;

    // ✅ sanitize
    userName = userName?.trim().toLowerCase();
    fullName = fullName?.trim();
    departmentName = departmentName?.trim();

    // ✅ validation
    if (!fullName || !userName || !password || !role || !departmentName) {
      return res.status(400).json({
        success: false,
        message: "All fields required ❌",
      });
    }

    // ✅ username unique check
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists ❌",
      });
    }

    // ✅ create user
    const newUser = await User.create({
      fullName,
      userName,
      password,
      role,
      departmentName,
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully ✅",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        role: newUser.role,
        departmentName: newUser.departmentName,
      },
    });

  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
    });
  }
};



// ✅ LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // ✅ basic validation
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "Username आणि Password required आहे ❌",
      });
    }

    // ✅ find user
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found ❌",
      });
    }

    // ✅ password match
    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password ❌",
      });
    }

    // ✅ token generate
    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ login success
    return res.status(200).json({
      success: true,
      message: "Login Success ✅",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        role: user.role,
        departmentName: user.departmentName,
      },
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
    });
  }
};



// ✅ UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    const user = await User.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found ❌",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Updated ✅",
      user,
    });

  } catch (error) {
    console.log("Update Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
    });
  }
};
