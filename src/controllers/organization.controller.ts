import organizationModel from "../models/organization.model";

// add admin account and organization
// need to confirm how admin registration works on backend
const initialRegistration = async (req : any, res : any) => {
    try {
        console.log("initialRegistration received");
        const orgName = req.body.orgName;
        const adminData = req.body
        console.log(req.body.orgName);
        console.log(req.body.adminData);
        
        // const registerAdmin = await organizationModel.addAdmin(adminData);
        // const registerOrg = await organizationModel.addOrg(orgName);
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

// delete organization
const deleteOrganization = async (req: any, res: any) => {
    try {

    } catch(err) {
        console.error(err);
    }
};

export default { initialRegistration, editOrganization, deleteOrganization };