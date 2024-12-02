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
  credential: firebaseAdmin.credential.cert({
    "projectId": process.env.FIREBASE_PROJECT_ID,
    "privateKey": process.env.FIREBASE_PRIVATE_KEY,
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
//app.use(attachCsrfToken('/login', 'csrfToken', (Math.floor(Math.random() * 1000000000000000)).toString()))
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);

app.get("/accounts/:accountId/details", authenticateUser, accountController.getUserDetails);

// registration and organization management
app.get("/organizations/:organizationId", authenticateUser, organizationController.getOrganization); // get name of organization (ALL USERS)
app.post("/registration", authenticateAdmin, organizationController.initialRegistration); // add admin account and organization (ADMIN ONLY)
app.patch("/organizations/:organizationId", authenticateAdmin, organizationController.editOrganization); // edit organization name (ADMIN ONLY)
app.delete("/organizations/:organizationId", authenticateAdmin, organizationController.deleteOrganization); // delete organization (ADMIN ONLY)

// organization account management
app.get("/accounts/:companyId", authenticateUser, accountController.getAccounts); // get all accounts to show in employee list (ALL USERS)
app.post("/accounts", authenticateAdmin, accountController.addAccount); // add an employee account (ADMIN ONLY)
app.patch("/accounts/:accountId", authenticateUser, accountController.updateAccount); // edit account data (ALL USERS)
app.delete("/accounts/:accountId", authenticateAdmin, accountController.deleteAccount); // delete an account (ADMIN ONLY)

// // attendance logging
app.get("/accounts/:accountId/attendance/", authenticateUser, attendanceController.getAttendance); // get all attendance records to populate calendar for one user (ALL USERS)
app.post("/accounts/:accountId/attendance/", authenticateUser, attendanceController.addAttendance); // add attendance record (ALL USERS)
app.put("/accounts/:accountId/attendance/:attendanceId", authenticateUser, attendanceController.editAttendance); // edit attendance record (ALL USERS)

// // approvals and supervisors 
app.get("/accounts/:accountId/approvals/", approvalController.getAccountApprovals); // get all approvals related to that id 
app.get("/approvals/:supervisorId", approvalController.getApproveeCalendars); // get all approvals and calendars of users that have set approver as this account
app.get("/supervisors/", approvalController.getSupervisors); // get all approvals related to that id 
app.post("/approvals/monthAttendance/", approvalController.submitMonthlyAttendance); // add new approval for monthly attendance
app.post("/approvals/pto/", approvalController.submitPto); // add new approval for PTO
// app.post("/approvals/specialPto/", approvalController.submitSpecialPto); // add new approval for special PTO
app.patch("/approvals/:requestType/:approvalId", approvalController.editApprovalStatus); // changes to an approval item status
app.patch("/approvals/:requestType/:approvalId/remind", approvalController.updateApprovalRemind); // changes to reminder of approval
app.delete("/approvals/:requestType/:approvalId", approvalController.deleteApproval); // delete approval

// // team management and calendar view
app.get("/organizations/:organizationId/teams", teamController.getTeams); // get list of all teams
app.post("/organizations/:organizationId/teams", teamController.addTeam); // add new team 
app.patch("/teams/:teamId", teamController.editTeam); // edit a team name
app.delete("/teams/:teamId", teamController.deleteTeam); // delete a team

// // special PTO data management
app.get("/accounts/:accountId/specialPto", specialPtoController.getSpecialPto); // view special PTO for that account
app.post("/accounts/:accountId/specialPto", specialPtoController.addSpecialPto); // add special PTO
app.patch("/specialPto/:specialPtoId", specialPtoController.editSpecialPto); // edit special PTO type
app.delete("/specialPto/:specialPtoId", specialPtoController.deleteSpecialPto); // delete special PTO

// Server validation
app.get("/", (req, res) => {res.send("Hello from homepage")});
app.listen(PORT, () => {console.log(`Server listening on ${PORT}, Frontend origin set to ${FRONTEND_URL}`)});