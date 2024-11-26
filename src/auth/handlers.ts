import accountModel from "../models/account.model";
import { Response, Request } from "express";

async function loginHandler(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const userAccount = await accountModel.getAccountByEmail(email);

        //TODO: set auth?

        res.status(201).send(userAccount);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured while logging in.'})
    }
}

async function logoutHandler(req: Request, res: Response) {

}

export { loginHandler, logoutHandler };