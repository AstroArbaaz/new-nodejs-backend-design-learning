const res = require("express/lib/response");
const AdminModel = require("../models/admin");
const logger = require("../utilities/logger");

exports.createNewAdmin = async (adminDetails) => {
    try {
        const admin = new AdminModel(adminDetails);
        if (admin.error) {
            logger.error(admin.error);
            return res.status(400).json(
                {
                    error: admin.error.message,
                },
            );
        }
        return await admin.save();
    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            {
                message: "Something Went Wrong!",
                error: error.message,
            },
        );
    }
};

exports.getAdminByEmail = async (email) => {
    try {
        const adminEmail = await AdminModel.findOne({ email });
        if (adminEmail.error) {
            logger.error(adminEmail.error);
            return res.status(400).json(
                {
                    error: adminEmail.error.message,
                },
            );
        } if (!adminEmail) {
            logger.error("admin not found");
            return res.status(404).json(
                {
                    error: "admin not found",
                },
            );
        }
        return adminEmail;
    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            {
                message: "Something Went Wrong!",
                error: error.message,
            },
        );
    }
};

exports.getAdminByContactNumber = async (contactNumber) => {
    try {
        const adminContactNumber = await AdminModel.findOne({ contactNumber });
        if (adminContactNumber.error) {
            logger.error(adminContactNumber.error);
            return res.status(400).json(
                {
                    error: adminContactNumber.error.message,
                },
            );
        } if (!adminContactNumber) {
            logger.error("admin not found");
            return res.status(404).json(
                {
                    error: "admin not found",
                },
            );
        }
        return adminContactNumber;
    } catch (error) {
        logger.error(error);
        return res.status(500).json(
            {
                message: "Something Went Wrong!",
                error: error.message,
            },
        );
    }
};
