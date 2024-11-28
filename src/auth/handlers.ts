import accountModel from "../models/account.model";
import { Response, Request, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

function attachCsrfToken (url: string, cookie: string, value: string) {
    return function(req: Request, res: Response, next: NextFunction) {
        if (req.url === url) {
            res.cookie(cookie, value);
            console.log("Cookie created successfully");
        }
        next();
    }
}

function checkLogin (url: string) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.url === url) {
            const sessionCookie = req.cookies.session || '';
            getAuth().verifySessionCookie(sessionCookie).then((res) => {
                res.redirect('/calendar');
            }).catch((err) => {next()})
        } else {
            next();
        }
    }
}

async function loginHandler(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const idToken = req.body.token;
        const csrfToken = req.body.csrfToken;
        const userAccount = await accountModel.getAccountByEmail(email);
        if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
            res.status(401).send("Unauthorized request");
            return;
        }
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        getAuth().verifyIdToken(idToken).then((res) => {
            if (new Date().getTime() / 1000 - res.auth_time < 5 * 60) {
                return getAuth().createSessionCookie(idToken, {expiresIn: expiresIn});
            }
            throw new Error("Unauthorized request");
            })
            .then((sessionCookie) => {
                const options = {maxAge: expiresIn, httpOnly: true, secure: false};
                res.cookie('session', sessionCookie, options);
                res.status(201).send(userAccount);
            })
            .catch((err) => {res.status(401).send("Unauthorized request")})
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured while logging in.'})
    }
}

async function logoutHandler(req: Request, res: Response) {

}

export { attachCsrfToken, checkLogin, loginHandler, logoutHandler };