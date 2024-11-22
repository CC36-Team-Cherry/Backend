import accountModel from "../models/account.model";
import { Response, Request, RequestHandler } from "express";

// get all accounts
const getAccounts = async (req: Request<{ company_id: number }>, res: Response) => {
  try {
    const { company_id } = req.body;
    const allAccounts = await accountModel.getAccounts(company_id);
    return res.json(allAccounts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: 'An error occured while fetching accounts.'});
  }
};

// add an employee account
const addAccount = async (req: Request, res: Response) => {
  try {
    const newAccount = req.body;
    const addAccount = await accountModel.addAccount(newAccount);
  } catch (err) {
    console.error(err);
  }
};

// edit account data
const editAccount = async (req: Request, res: Response) => {
    const cardId = req.params.accountId;
    const editAccountData = req.body.editAccountData;
    const editAccount = await accountModel.editAccount(editAccountData, accountId);
};

// // delete an account
const deleteAccount = async (req: Request<{ account_id: number }>, res: Response) => {
  try {
    const accountId = req.params.account_id;
    const deleteAccount = await accountModel.deleteAccount(accountId);
  } catch (err) {
    console.error(err);
  }
};

export default { getAccounts, addAccount, editAccount, deleteAccount };
