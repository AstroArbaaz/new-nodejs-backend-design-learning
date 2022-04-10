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

        const findAdminByEmail = await adminModel.find({ email: newAdmin.value.email });
        if (findAdminByEmail) {
            return res.status(406).json(
                {
                    message: "this email is already in use!",
                },
            );
        }

        const findAdminByContactNumber = await adminModel.find({ contactNumber: newAdmin.value.contactNumber });
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

        return res.status(200).json(
            {
                newAdmin: newAdminDetails,
            },
        );
    } catch (error) {
        logger.error("register-error", error);
        return res.status(500).json({
            message: "Cannot Register",
            error: error.message,
        });
    }
};
