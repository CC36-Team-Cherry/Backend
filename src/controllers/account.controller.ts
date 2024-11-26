import accountModel from "../models/account.model";
import { Response, Request } from "express";

// get all accounts
const getAccounts = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.companyId;
    const allAccounts = await accountModel.getAccounts(Number(companyId));
    res.json(allAccounts);
    res.status(200);
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
    //const addAccount = await accountModel.addAccount(newAccount, newPassword);
    res.json(addAccount);
    res.status(201);
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
    await accountModel.getSingleAccount(accountId).then((user) => {
      if (user && user.auth_key) {
        const uid = user.auth_key;
        console.log(uid);
        accountModel.deleteFirebaseAccount(uid);
      }
    });
    const deleteAccount = await accountModel.deleteAccount(Number(accountId));
    res.json(deleteAccount);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while deleting an account.'});
  }
};

export default { getAccounts, addAccount, deleteAccount, updateAccount };
// updateAccount