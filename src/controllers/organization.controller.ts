import organizationModel from "../models/organization.model";

// add admin account and organization
const initialRegistration = async (req : any, res : any) => {
    try {

        // TODO: Add validation if email exists (check if firebase handles this)

        const adminData = req.body.adminData;
        console.log(adminData);

        // add company and return company id
        const registerOrgId = await organizationModel.addOrg(adminData.organizationName);

        // add company id into adminData 
        adminData.organizationId = registerOrgId.id;

        // convert birthdate and join date to iso string
        adminData.adminDateOfBirth = new Date(adminData.adminDateOfBirth);
        adminData.adminJoinDate = new Date(adminData.adminJoinDate);

        // add admin account data and return admin id
        const registerAdminId = await organizationModel.addAdmin(adminData);
        console.log(registerAdminId.id)

        // add admin account to privileges page and set admin as true
        const setAdminPrivileges = await organizationModel.addAdminPrivileges(registerAdminId.id);
        console.log("added privileges")

        // return admin id
        res.json(registerAdminId);
        res.status(200);
        console.log("Registration and Org Created", adminData); 

    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when registering.'})
    };
};

// edit organization name
const editOrganization = async (req: any, res: any) => {
    try {
        const orgId = parseInt(req.params.organizationId);
        const orgEditData = req.body.orgName;
        const editOrg = await organizationModel.editOrg(orgId, orgEditData);
        res.status(200);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when editing organization.'})
    }
};

// delete organization
const deleteOrganization = async (req: any, res: any) => {
    try {
        const orgId = parseInt(req.params.organizationId);
        const deleteOrg = await organizationModel.deleteOrg(orgId);
        res.status(200);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when deleting organization.'})
    }
};

export default { initialRegistration, editOrganization, deleteOrganization };