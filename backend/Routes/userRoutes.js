import express from "express";
import User from "../Models/Users.js";

const router = express.Router();

// ==================================================
// USER API CALLS
// ==================================================

// Check mobile number
router.post("/checkMobile", async (req, res) => {
  try {
    const { mobile } = req.body;

    const existingUser = await User.findOne({ mobile });

    if (
      existingUser &&
      existingUser.mobile === mobile &&
      existingUser.mobile !== ""
    ) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mobile number is available",
    });
  } catch (err) {
    console.error("Check mobile error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to check user",
    });
  }
});

// Create user
router.post("/", async (req, res) => {
  try {
    const { firebaseUid, name, mobile, email, role } = req.body;

    const newUser = await User.create({
      firebaseUid,
      name,
      mobile,
      email,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User saved successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Create user error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to save user",
      error: err.message,
    });
  }
});

// Fetch all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();

    return res.status(200).json({
      success: true,
      message: "Fetched all users",
      data: allUsers,
    });
  } catch (err) {
    console.error("Fetch users error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      data: null,
    });
  }
});

// Fetch one user by Firebase UID
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      firebaseUid: req.params.id,
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched user",
      data: userData,
    });
  } catch (err) {
    console.error("Fetch user error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      data: null,
    });
  }
});

// Update user profile using Firebase UID
router.put("/:id", async (req, res) => {
  try {
    const { name, mobile, gender } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { firebaseUid: req.params.id },
      {
        name,
        mobile,
        gender,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: err.message,
    });
  }
});

export default router;
