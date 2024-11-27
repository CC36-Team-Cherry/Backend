import accountModel from "../models/account.model";
import { Response, Request } from "express";

// get all accounts
const getAccounts = async (req: Request, res: Response) => {
  try {
    console.log(req.params)
    const companyId = req.params.companyId;
    const allAccounts = await accountModel.getAccounts(Number(companyId));
    res.status(200).json(allAccounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while fetching accounts.'});
  }
};

// add an employee account
const addAccount = async (req: Request, res: Response) => {
  try {
    const newAccount = req.body;
    const newPassword = generatePassword(10);
    const addAccount = accountModel.addFirebaseAccount(newAccount, newPassword);
    res.status(201).json(addAccount);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while adding an account.'});
  }
};

// generate a random password for the new account
const generatePassword = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result;
}

// edit account data
const updateAccount = async (req: Request, res: Response) => {
  try {
    const accountId = Number(req.params.accountId);
    const editAccountData = req.body;
    const editAccount = await accountModel.updateAccount(accountId, editAccountData);
    //If the email address is being updated, the below will update the address in Firebase
    if (req.body.email) {
      await accountModel.getSingleAccount(accountId).then((user) => {
        if (user && user.auth_key) {
          const uid = user.auth_key;
          accountModel.updateEmailFirebase(uid, req.body.email);
        }
      });
    }
    res.status(200).json(editAccount);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while updating account'})
  } 
};

// // delete an account
const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = Number(req.params.accountId);
    //delete account in Firebase
    await accountModel.getSingleAccount(accountId).then((user) => {
      if (user && user.auth_key) {
        const uid = user.auth_key;
        accountModel.deleteFirebaseAccount(uid);
      }
    });
    //delete account in database
    const deleteAccount = await accountModel.deleteAccount(Number(accountId));
    res.status(200).json(deleteAccount);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while deleting an account.'});
  }
};

const getUserDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.accountId);

    const user = await accountModel.getSingleAccountDetails(userId); 

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return; // Importante per fermare l'esecuzione
    }

    const responseData = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.Privileges?.is_admin || false,
      is_supervisor: user.Privileges?.is_supervisor || false,
      supervisor: user.supervisor || null,
      company_id: user.company_id,
      role: user.role,
      join_date: user.join_date,
      leave_date: user.leave_date || null,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Unable to fetch user details" });
  }
};


export default { getAccounts, addAccount, deleteAccount, updateAccount, getUserDetails };
