const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(403).json({ message: 'Auth failed, email or password is incorrect', success: false });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id }, // Include user ID in the token payload
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};




const updateProfile = async (req, res) => {
    try {
        const { name, password } = req.body;
        const { _id } = req.user; // Extract user ID from the JWT token

        // Find user by ID
        const user = await UserModel.findById(_id);
        if (!user) {
            return res.status(404)
                .json({ message: 'User not found', success: false });
        }

        // Update user details
        if (name) user.name = name;
        if (password) {
            // Validate and hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200)
            .json({
                message: "Profile updated successfully",
                success: true
            });
    } catch (err) {
        console.error("Error updating profile:", err); // Log the error
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}





const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check admin credentials
        if (email === 'admin@gmail.com' && password === '1234') {
            const jwtToken = jwt.sign(
                { email, role: 'admin' },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200)
                .json({
                    message: "Admin login successful",
                    success: true,
                    jwtToken
                });
        } else {
            res.status(403)
                .json({ message: 'Auth failed: email or password is wrong', success: false });
        }
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
}



module.exports = {
    signup,
    login,
    updateProfile,
    adminLogin
}