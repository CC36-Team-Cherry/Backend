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
    const addAccount = await accountModel.addAccount(newAccount);
    res.json(addAccount);
    res.status(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while adding an account.'});
  }
};

// edit account data
// const editAccount = async (req: Request, res: Response) => {
//     const cardId = req.params.accountId;
//     const editAccountData = req.body.editAccountData;
//     const editAccount = await accountModel.editAccount(editAccountData, accountId);
// };

// // delete an account
const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;
    const deleteAccount = await accountModel.deleteAccount(Number(accountId));
    res.json(deleteAccount);
    res.status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured while deleting an account.'});
  }
};

export default { getAccounts, addAccount, deleteAccount };
// editAccount