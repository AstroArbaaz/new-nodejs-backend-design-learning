/* eslint-disable max-len */
const Joi = require("joi");
const cuid = require("cuid");
const dataObjects = require("../data_objects/admin");
const adminModel = require("../models/admin");
const logger = require("../utilities/logger");

const adminValidationSchema = Joi.object().keys(
    {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email({ minDomainSegments: 2 }).required(),
        contactNumber: Joi.string().required(),
        role: Joi.string().required(),
        password: Joi.string().required(),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    },
);

exports.registerAdmin = async (req, res) => {
    try {
        const newAdmin = adminValidationSchema.validate(req.body);
        logger.debug("Admin-Details: ", newAdmin);
        if (newAdmin.error) {
            logger.error(newAdmin.error);
            return res.status(400).json(
                {
                    error: newAdmin.error.message,
                },
            );
        }

        const findAdminByEmail = await adminModel.findOne({ email: newAdmin.value.email });
        if (findAdminByEmail) {
            return res.status(406).json(
                {
                    message: "this email is already in use!",
                },
            );
        }

        const findAdminByContactNumber = await adminModel.findOne({ contactNumber: newAdmin.value.contactNumber });
        if (findAdminByContactNumber) {
            return res.status(406).json(
                {
                    message: "this contact number is already in use!",
                },
            );
        }

        // assign cuid
        const id = cuid();
        newAdmin.value.cuid = id;

        // hash the password
        const hash = await adminModel.hashPassword(newAdmin.value.password);
        // remove the confirmPassword field from the result as we dont need to save this in the db.
        delete newAdmin.value.confirmPassword;
        newAdmin.value.password = hash;

        const newAdminDetails = await dataObjects.createNewAdmin(newAdmin.value);

        return res.status(201).json(
            {
                newAdmin: newAdminDetails,
            },
        );
    } catch (error) {
        // logger.error("register-error", error);
        return res.status(500).json({
            message: "Cannot Register",
            error: error.message,
        });
    }
};

exports.getAdminByEmail = async (req, res) => {
    try {
        const adminEmail = req.params.email;
        const adminDetail = await dataObjects.getAdminViaEmail(adminEmail);
        if (adminDetail === null) {
            // logger.error("No details Found");
            return res.status(204).json(
                {
                    message: "no details found",
                },
            );
        } if (adminDetail.error) {
            // logger.error(details.error);
            return res.status(400).json(
                {
                    error: adminDetail.error,
                },
            );
        }
        return res.status(200).json(
            {
                adminDetail,
            },
        );
    } catch (error) {
        logger.error("admin-email-search-error", error);
        return res.status(500).json({
            message: "Something Went Wrong!",
            error: error.message,
        });
    }
};

exports.getAdminByContactNumber = async (req, res) => {
    try {
        const adminContactNumber = req.body.number;
        const adminDetail = await dataObjects.getAdminViaContactNumber(adminContactNumber);
        if (adminDetail === null) {
            // logger.error("No details Found");
            return res.status(204).json(
                {
                    message: "no details found",
                },
            );
        } if (adminDetail.error) {
            // logger.error(details.error);
            return res.status(400).json(
                {
                    error: adminDetail.error,
                },
            );
        }
        return res.status(200).json(
            {
                adminDetail,
            },
        );
    } catch (error) {
        logger.error("admin-contact-number-search-error", error);
        return res.status(500).json({
            message: "Something Went Wrong!",
            error: error.message,
        });
    }
};

// get all admin details
exports.getAllAdmins = async (req, res) => {
    try {
        const details = await dataObjects.getAllAdmins();
        if (details.length === 0) {
            // logger.error("No details Found");
            return res.status(204).json(
                {
                    message: "no details found",
                },
            );
        } if (details.error) {
            // logger.error(details.error);
            return res.status(400).json(
                {
                    error: details.error,
                },
            );
        }
        return res.status(200).json({
            details,
        });
    } catch (error) {
        // logger.error("register-error", error);
        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message,
        });
    }
};
