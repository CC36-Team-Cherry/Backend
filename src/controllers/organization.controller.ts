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
        const registeredAdmin = await organizationModel.addAdmin(adminData);
        console.log(registeredAdmin)

        // add admin account to privileges page and set admin as true
        const setAdminPrivileges = await organizationModel.addAdminPrivileges(registeredAdmin.id);
        console.log("added privileges")

        // return admin data
        res.status(200).json(registeredAdmin);
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
        const orgEditData = req.body.adminConsoleData.organizationName;
        const editOrg = await organizationModel.editOrg(orgId, orgEditData);
        res.status(200).json(editOrg);;
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
        res.json(deleteOrg);
        res.status(200);
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when deleting organization.'})
    }
};

export default { initialRegistration, editOrganization, deleteOrganization };