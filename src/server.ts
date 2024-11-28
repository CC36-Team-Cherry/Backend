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

// Set up Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: applicationDefault()
});

import { attachCsrfToken, checkLogin, loginHandler, logoutHandler,  } from "./auth/handlers";
import organizationController from "./controllers/organization.controller";
import accountController from "./controllers/account.controller";
import approvalController from "./controllers/approval.controller";
import attendanceController from "./controllers/attendance.controller";
import specialPtoController from "./controllers/specialPto.controller";
import teamController from "./controllers/team.controller";

// authentication 
app.use(attachCsrfToken('/', 'csrfToken', (Math.floor(Math.random() * 1000000000000000)).toString()))
app.use(checkLogin('/login',));
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);

app.get("/accounts/:accountId/details", accountController.getUserDetails);

// registration and organization management
app.get("/organizations/:organizationId", organizationController.getOrganization); // get name of organization
app.post("/registration", organizationController.initialRegistration); // add admin account and organization 
app.patch("/organizations/:organizationId", organizationController.editOrganization); // edit organization name
app.delete("/organizations/:organizationId", organizationController.deleteOrganization); // edit organization name

// organization account management
app.get("/accounts/:companyId", accountController.getAccounts); // get all accounts to show in employee list
app.post("/accounts", accountController.addAccount); // add an employee account
app.patch("/accounts/:accountId", accountController.updateAccount); // edit account data
app.delete("/accounts/:accountId", accountController.deleteAccount); // delete an account

// // attendance logging
app.get("/accounts/:accountId/attendance/", attendanceController.getAttendance); // get all attendance records to populate calendar for one user
app.post("/accounts/:accountId/attendance/", attendanceController.addAttendance); // add attendance record
app.put("/accounts/:accountId/attendance/:attendanceId", attendanceController.editAttendance); // edit attendance record

// // approvals and supervisors 
app.get("/accounts/:accountId/approvals", approvalController.getAccountApprovals); // get all approvals related to that id 
app.get("/approvals/:supervisorId", approvalController.getApproveeCalendars); // get all approvals and calendars of users that have set approver as this account
app.get("/supervisors/", approvalController.getSupervisors); // get all approvals related to that id 
app.post("/approvals/monthAttendance/", approvalController.submitMonthlyAttendance); // add new approval for monthly attendance
// app.post("/approvals/pto/", approvalController.submitPto); // add new approval for PTO
// app.post("/approvals/specialPto/", approvalController.submitSpecialPto); // add new approval for special PTO
app.patch("/approvals/:approvalId", approvalController.editApprovalStatus); // changes to an approval item status
app.patch("/approvals/:approvalId/remind", approvalController.updateApprovalRemind); // changes to reminder of approval
app.delete("/approvals/:approvalId", approvalController.deleteApproval); // delete approval

// // team management and calendar view
app.get("/organizations/:organizationId/teams", teamController.getTeams); // get list of all teams
app.post("/organizations/:organizationId/teams", teamController.addTeam); // add new team 
app.patch("/teams/:teamId", teamController.editTeam); // edit a team name
app.delete("/teams/:teamId", teamController.deleteTeam); // delete a team

// // special PTO data management
app.get("/accounts/:accountId/specialPto", specialPtoController.getSpecialPto); // view special PTO for that account
app.post("/accounts/:accountId/specialPto", specialPtoController.addSpecialPto); // add special PTO
// app.patch("/accounts/:accountId/specialPto", specialPtoController.editSpecialPto); // edit special PTO type
// app.delete("/accounts/:accountId/specialPto", specialPtoController.deleteSpecialPto); // delete special PTO

// Server validation
app.get("/", (req, res) => {res.send("Hello from homepage")});
app.listen(PORT, () => {console.log(`Server listening on ${PORT}, Frontend origin set to ${FRONTEND_URL}`)});