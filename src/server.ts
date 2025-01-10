import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import firebaseAdmin from "firebase-admin";
import cookieParser from "cookie-parser";
import { applicationDefault } from "firebase-admin/app";
const app = express();

// Load environment variables 
dotenv.config();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors(
    {
        origin: FRONTEND_URL,
        credentials: true,
    }
));

app.set("trust proxy", 1);

const privateKey = JSON.parse(process.env.FIREBASE_PRIVATE_KEY!);

// Set up Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": privateKey,
    "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
  })
});

import { loginHandler, logoutHandler, authenticateUser, authenticateAdmin, authenticateSupervisor } from "./auth/handlers";
import organizationController from "./controllers/organization.controller";
import accountController from "./controllers/account.controller";
import approvalController from "./controllers/approval.controller";
import attendanceController from "./controllers/attendance.controller";
import specialPtoController from "./controllers/specialPto.controller";
import teamController from "./controllers/team.controller";

// authentication 
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);

app.get("/accounts/:accountId/details", authenticateUser, accountController.getUserDetails);

// registration and organization management
app.get("/organizations/:organizationId", authenticateUser, organizationController.getOrganization); // get name of organization (ALL USERS)
app.post("/registration", organizationController.initialRegistration); // add admin account and organization (NO AUTH)
app.post("/email", accountController.checkAccountExists); // check if account exists based on email (NO AUTH)
app.patch("/organizations/:organizationId", authenticateAdmin, organizationController.editOrganization); // edit organization name (ADMIN ONLY)
app.delete("/organizations/:organizationId", authenticateAdmin, organizationController.deleteOrganization); // delete organization (ADMIN ONLY)

// organization account management
app.get("/accounts/:companyId", authenticateUser, accountController.getAccounts); // get all accounts to show in employee list (ALL USERS)
app.post("/accounts", authenticateAdmin, accountController.addAccount); // add an employee account (ADMIN ONLY)
app.patch("/accounts/:accountId", authenticateUser, accountController.updateAccount); // edit account data (ALL USERS)
app.delete("/accounts/:accountId", authenticateAdmin, accountController.deleteAccount); // delete an account (ADMIN ONLY)
app.get("/accounts/:accountId/remainingPto", authenticateUser, accountController.getRemainingPto);

// // attendance logging
app.get("/accounts/:accountId/attendance/", authenticateUser, attendanceController.getAttendance); // get all attendance records to populate calendar for one user (ALL USERS)
app.post("/accounts/:accountId/attendance/", authenticateUser, attendanceController.addAttendance); // add attendance record (ALL USERS)
app.put("/accounts/:accountId/attendance/:attendanceId", authenticateUser, attendanceController.editAttendance); // edit attendance record (ALL USERS)
app.delete("/accounts/attendance/:attendanceId", authenticateUser, attendanceController.deleteAttendance);

// // approvals and supervisors 
app.get("/accounts/:accountId/approvals/", authenticateUser, approvalController.getAccountApprovals); // get all approvals related to that id (ALL USERS)
app.get("/approvals/:supervisorId", authenticateUser, approvalController.getApproveeCalendars); // get all approvals and calendars of users that have set approver as this account (ALL USERS)
app.get("/organizations/:organizationId/supervisors/", authenticateUser, approvalController.getSupervisors); // get all supervisors for that organization  (ALL USERS)
app.post("/approvals/monthAttendance/", authenticateUser, approvalController.submitMonthlyAttendance); // add new approval for monthly attendance (ALL USERS)
app.post("/approvals/pto/", authenticateUser, approvalController.submitPto); // add new approval for PTO (ALL USERS)
app.post("/approvals/specialPto/", authenticateUser, approvalController.submitSpecialPto); // add new approval for special PTO
app.patch("/approvals/:requestType/:approvalId", authenticateSupervisor, approvalController.editApprovalStatus); // changes to an approval item status (ALL USERS)
app.patch("/approvals/:requestType/:approvalId/remind", authenticateUser, approvalController.updateApprovalRemind); // changes to reminder of approval (ALL USERS)
app.delete("/approvals/:requestType/:approvalId", authenticateUser, approvalController.deleteApproval); // delete approval (ALL USERS)

// // team management and calendar view
app.get("/organizations/:organizationId/teams", authenticateUser, teamController.getTeams); // get list of all teams (ALL USERS)
app.post("/organizations/:organizationId/teams", authenticateAdmin, teamController.addTeam); // add new team (ADMIN ONLY) 
app.patch("/teams/:teamId", authenticateAdmin, teamController.editTeam); // edit a team name (ADMIN ONLY)
app.delete("/teams/:teamId", authenticateAdmin, teamController.deleteTeam); // delete a team (ADMIN ONLY)

// // special PTO data management
app.get("/accounts/:accountId/specialPto", authenticateUser, specialPtoController.getSpecialPto); // view special PTO for that account (ALL USERS)
app.post("/accounts/:accountId/specialPto", authenticateUser, specialPtoController.addSpecialPto); // add special PTO (ALL USERS)
app.patch("/specialPto/:specialPtoId", authenticateUser, specialPtoController.editSpecialPto); // edit special PTO type (ALL USERS)
app.delete("/specialPto/:specialPtoId", authenticateUser, specialPtoController.deleteSpecialPto); // delete special PTO (ALL USERS)

//get all approval but only for PTO and specialPTO
app.get("/accounts/:accountId/approvalsPTO/", authenticateUser, approvalController.getAccountApprovalsPTO);
// Server validation
app.get("/", (req, res) => {res.send("Hello from homepage")});
app.listen(PORT, () => {console.log(`Server listening on ${PORT}, Frontend origin set to ${FRONTEND_URL}`)});