const organizationModel = import("../models/organization.model");

// add admin account and organization
// need to confirm how admin registration works on backend
const initialRegistration = async (req, res) => {
    try {
        const adminData = req.body.adminData;
        const orgData = req.body.orgData;

        const registerAdmin = await organizationModel.addAdmin(adminData);
        const registerOrg = await organizationModel.addOrg(orgData);
    } catch(err) {
        console.error(err);
    };

};

// edit organization name
const editOrganization = async (req, res) => {
    try {
        const orgEditData = req.body;
        const editOrg = await organizationModel.editOrg(orgEditData);
    } catch(err) {
        console.error(err);
    }

};