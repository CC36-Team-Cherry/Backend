import organizationModel from "../models/organization.model";

// add admin account and organization
const initialRegistration = async (req : any, res : any) => {
    try {
        const adminData = req.body.adminData;

        // temporary testing, requiring unique auth key 
        // DELETE AFTER UPDATING SCHEMA
        function makeid(length : any) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }
        adminData.auth_key = makeid(5);

        // add company and return company id
        const registerOrgId = await organizationModel.addOrg(adminData.organizationName);

        // add company id into adminData 
        adminData.organizationId = registerOrgId.id;

        // convert birthdate and join date to iso string
        adminData.adminDateOfBirth = new Date(adminData.adminDateOfBirth);
        adminData.adminJoinDate = new Date(adminData.adminJoinDate);

        // add company Id to admin that was just created
        const registerAdmin = await organizationModel.addAdmin(adminData);
        console.log("Registration and Org Created", registerAdmin); 

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