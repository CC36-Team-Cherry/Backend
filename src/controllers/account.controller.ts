const accountModel = import("../models/account.model");

// get all accounts 
const getAccounts = async (req, res) => {
    const allAccounts = await accountModel.getAccounts();
    return res.json(allAccounts);
};

// add an employee account 
const addAccount = async (req, res) => {
    const newAccount = req.body;
    const addAccount = await accountModel.addAccount(newAccount);
};

// edit account data
const editAccount = async (req, res) => {
    const cardId = req.params.accountId;
    const editAccountData = req.body.editAccountData;
    const editAccount = await accountModel.editAccount(editAccountData, accountId);
};

// delete an account 
const deleteAccount = async (req, res) => {
    const accountId = req.params.accountId;
    const deleteAccount = await accountModel.deleteAccount(accountId)
};