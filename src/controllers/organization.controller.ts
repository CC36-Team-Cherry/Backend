import organizationModel from "../models/organization.model";
import accountModel from "../models/account.model";

// add admin account and organization
const initialRegistration = async (req : any, res : any) => {
    try {

        // TODO: Add validation if email exists (check if firebase handles this)

        const newAccount = req.body.newAccount;
        console.log(newAccount);

        // add company and return company id
        const registerOrgId = await organizationModel.addOrg(newAccount.company_name);

        // add company id into new account data 
        newAccount.company_id = registerOrgId.id;

        // convert birthdate and join date to iso string
        newAccount.birthdate = new Date(newAccount.birthdate);
        newAccount.join_date = new Date(newAccount.join_date);
        
        // add account
        const registeredAdminAccount = await accountModel.addAccount(newAccount, newAccount.auth_key);
        console.log("Registered Admin", registeredAdminAccount)

        // return admin data
        res.status(200).json(registeredAdminAccount);

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