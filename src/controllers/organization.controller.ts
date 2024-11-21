// const organizationModel = import("../models/organization.model");

// add admin account and organization
// need to confirm how admin registration works on backend
const initialRegistration = async (req : any, res : any) => {
    try {
        console.log("initialRegistration received");
        console.log(req.body);
        // const adminData = req.body.adminData;
        // const orgName = req.body;

        // const registerAdmin = await organizationModel.addAdmin(adminData);
        // const registerOrg = await organizationModel.addOrg(orgData);
    } catch(err) {
        console.error(err);
    };

};

// edit organization name
const editOrganization = async (req: any, res: any) => {
    try {
        // const orgEditData = req.body;
        // const editOrg = await organizationModel.editOrg(orgEditData);
    } catch(err) {
        console.error(err);
    }

};

export default { initialRegistration, editOrganization };