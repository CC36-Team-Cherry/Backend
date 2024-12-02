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

app.get("/accounts/:accountId/details", accountController.getUserDetails);

// registration and organization management
app.get("/organizations/:organizationId", organizationController.getOrganization); // get name of organization
app.post("/registration", organizationController.initialRegistration); // add admin account and organization 
app.patch("/organizations/:organizationId", organizationController.editOrganization); // edit organization name
app.delete("/organizations/:organizationId", organizationController.deleteOrganization); // edit organization name

// organization account management
app.get("/accounts/:companyId", authenticateUser, accountController.getAccounts); // get all accounts to show in employee list
app.post("/accounts", accountController.addAccount); // add an employee account
app.patch("/accounts/:accountId", accountController.updateAccount); // edit account data
app.delete("/accounts/:accountId", accountController.deleteAccount); // delete an account

// // attendance logging
app.get("/accounts/:accountId/attendance/", attendanceController.getAttendance); // get all attendance records to populate calendar for one user
app.post("/accounts/:accountId/attendance/", attendanceController.addAttendance); // add attendance record
app.put("/accounts/:accountId/attendance/:attendanceId", attendanceController.editAttendance); // edit attendance record

// // approvals and supervisors 
app.get("/accounts/:accountId/approvals/", authenticateUser, approvalController.getAccountApprovals); // get all approvals related to that id (ALL USERS)
app.get("/approvals/:supervisorId", authenticateUser, approvalController.getApproveeCalendars); // get all approvals and calendars of users that have set approver as this account (ALL USERS)
app.get("/supervisors/", authenticateUser, approvalController.getSupervisors); // get all approvals related to that id  (ALL USERS)
app.post("/approvals/monthAttendance/", authenticateUser, approvalController.submitMonthlyAttendance); // add new approval for monthly attendance (ALL USERS)
app.post("/approvals/pto/", authenticateUser, approvalController.submitPto); // add new approval for PTO (ALL USERS)
// app.post("/approvals/specialPto/", approvalController.submitSpecialPto); // add new approval for special PTO
app.patch("/approvals/:requestType/:approvalId", authenticateSupervisor, approvalController.editApprovalStatus); // changes to an approval item status (ALL USERS)
app.patch("/approvals/:requestType/:approvalId/remind", authenticateUser, approvalController.updateApprovalRemind); // changes to reminder of approval (ALL USERS)
app.delete("/approvals/:requestType/:approvalId", authenticateUser, approvalController.deleteApproval); // delete approval (ALL USERS)

// // team management and calendar view
app.get("/organizations/:organizationId/teams", authenticateUser, teamController.getTeams); // get list of all teams (ALL USERS)
app.post("/organizations/:organizationId/teams", authenticateAdmin, teamController.addTeam); // add new team (ONLY ADMIN) 
app.patch("/teams/:teamId", authenticateAdmin, teamController.editTeam); // edit a team name (ONLY ADMIN)
app.delete("/teams/:teamId", authenticateAdmin, teamController.deleteTeam); // delete a team (ONLY ADMIN)

// // special PTO data management
app.get("/accounts/:accountId/specialPto", authenticateUser, specialPtoController.getSpecialPto); // view special PTO for that account (ALL USERS)
app.post("/accounts/:accountId/specialPto", authenticateUser, specialPtoController.addSpecialPto); // add special PTO (ALL USERS)
app.patch("/specialPto/:specialPtoId", authenticateUser, specialPtoController.editSpecialPto); // edit special PTO type (ALL USERS)
app.delete("/specialPto/:specialPtoId", authenticateUser, specialPtoController.deleteSpecialPto); // delete special PTO (ALL USERS)

// Server validation
app.get("/", (req, res) => {res.send("Hello from homepage")});
app.listen(PORT, () => {console.log(`Server listening on ${PORT}, Frontend origin set to ${FRONTEND_URL}`)});