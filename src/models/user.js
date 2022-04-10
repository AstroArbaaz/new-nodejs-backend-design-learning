const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        cuid: { type: String, unique: true, required: true },
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        contactNumber: { type: String, required: true, unique: true },
        address: { type: String },
        active: { type: Boolean, default: true },
        password: { type: String, required: true },
        accessToken: { type: String, default: null },

    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    },
);

const User = mongoose.model("User", userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error("Hashing failed", error);
    }
};

module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (error) {
        throw new Error("Comparison failed", error);
    }
};
