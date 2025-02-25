const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Register Endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({
            username, email, password
        });
        await user.save();
        res.status(201).send({ message: "User registered Successfully" });
    } catch (error) {
        console.log("Error Registering The User : ", error);
        res.status(500).send({ message: "Error Registering The User" });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send({ message: "User Not Found Invalid Email" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send({ message: "Wrong Password Try Again" });
        }

        const token = await generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.status(200).send({
            message: "User Logged In Successfully", user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                bio: user.bio,
                profession: user.profession,
                profileImage: user.profileImage,
                role: user.role
            }
        });

    } catch (error) {
        console.log("Error Logging In The User : ", error);
        res.status(500).send({ message: "Error Logging In The User" });
    }
});

// Get all users (excluding sensitive info)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "id email role").sort({ createdAt: -1 });
        res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users", error);
        res.status(500).send({ message: "Error fetching user" });
    }
});

// Logout Endpoint
router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: "User Logout Succesfully" });
});

// Delete User endpoint
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ messange: "User Not Found" });
        }
        res.status(200).send({ message: "User Deleted Successfully" });
    } catch (error) {
        console.log("Error Deleting The User : ", error);
        res.status(500).send({ message: "Error Deleting The User" });
    }
});

// User role Update endpoint
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!user) {
            return res.status(404).send({ messange: "User Not Found" });
        }
        res.status(200).send({ message: "User Updated Successfully", user });
    } catch (error) {
        console.log("Error Updating The User Role : ", error);
        res.status(500).send({ message: "Error Updating The User Role" });
    }
});

// Edit or update profile
router.patch("/edit-profile", async (req, res) => {
    try {
        const { userId, username, profileImage, bio, profession } = req.body;
        if (!userId) {
            return res.status(400).send({ message: "User ID is required" });
        }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).send({ message: "User not found" });
        }
        // Update profile
        if (username !== undefined) user.username = username;
        if (profileImage !== undefined) user.profileImage = profileImage;
        if (bio !== undefined) user.bio = bio;
        if (profession !== undefined) user.profession = profession;

        await user.save();
        res.status(200).send({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error updating user profile", error);
        res.status(500).send({ message: "Error updating user profile" });
    }
});

module.exports = router;