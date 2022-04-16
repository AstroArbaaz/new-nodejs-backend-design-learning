const AdminModel = require("../models/admin");
const logger = require("../utilities/logger");

exports.createNewAdmin = async (adminDetails) => {
    const admin = new AdminModel(adminDetails);
    if (admin.error) {
        logger.error(admin.error);
        return admin.error;
    }
    const savedAdmin = await admin.save();
    return savedAdmin;
};

exports.getAdminViaEmail = async (email) => {
    const query = { email };
    const adminEmail = await AdminModel.findOne(query);
    // logger.debug(adminEmail);
    return adminEmail;
};

exports.getAdminViaContactNumber = async (contactNumber) => {
    const query = { contactNumber };
    const adminContactNumber = await AdminModel.findOne(query);
    // logger.debug(adminContactNumber);
    return adminContactNumber;
};

exports.getAllAdmins = async () => {
    const admins = await AdminModel.find({});
    return admins;
};
