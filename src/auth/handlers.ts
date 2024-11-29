import accountModel from "../models/account.model";
import { Response, Request, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

// function attachCsrfToken (url: string, cookie: string, value: string) {
//     return function(req: Request, res: Response, next: NextFunction) {
//         console.log(req.url);
//         console.log(url);
//         if (req.url == url) {
//             res.cookie(cookie, value);
//             console.log("Cookie created successfully");
//         }
//         next();
//     }
// }

async function loginHandler(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const idToken = req.body.token;
        //const csrfToken = req.body.csrfToken;
        const userAccount = await accountModel.getAccountByEmail(email);
        // if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
        //     res.status(401).send("Unauthorized request");
        //     return;
        // }
        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        getAuth().verifyIdToken(idToken).then((res) => {
            // verify that user signed in within the last five minutes
            if (new Date().getTime() / 1000 - res.auth_time < 5 * 60) {
                return getAuth().createSessionCookie(idToken, {expiresIn: expiresIn});
            }
            throw new Error("Unauthorized request");
            })
            .then((sessionCookie) => {
                console.log("we got to this step");
                const options = {maxAge: expiresIn, httpOnly: true, secure: true};
                res.cookie('session', sessionCookie, options);
                res.status(201).send(userAccount);
            })
            .catch((err) => {
                res.status(401).send("Unauthorized request");})
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured while logging in.'});
    }
}

async function logoutHandler(req: Request, res: Response) {
    const sessionCookie = req.cookies.session || '';
    res.clearCookie('session');
    if (sessionCookie) {
        getAuth().verifySessionCookie(sessionCookie, true).then((res) => {
            return getAuth().revokeRefreshTokens(res.sub);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({error: 'An error occurred while logging out'});
        })
    }
    res.end();
}

export { loginHandler, logoutHandler };