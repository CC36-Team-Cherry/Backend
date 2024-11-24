import express from "express";
import cors from "cors";
const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Set up Firebase Admin SDK
// var firebaseAdmin = require("firebase-admin");
// firebaseAdmin.initializeApp({
//   credential: applicationDefault()
// });
// export { firebaseAdmin }

// import { loginHandler, logoutHandler } from "./auth/handlers";
import organizationController from "./controllers/organization.controller";
import accountController from "./controllers/account.controller";
// import approvalController from "./controllers/approval.controller";
// import attendanceController from "./controllers/attendance.controller";
// import specialPtoController from "./controllers/specialPto.controller";
// import teamController from "./controllers/team.controller";

// authentication 
// app.post("/login", loginHandler);
// app.post("/logout", logoutHandler);

// registration and organization management
app.post("/registration", organizationController.initialRegistration); // add admin account and organization 
app.patch("/organizations/:organizationId", organizationController.editOrganization); // edit organization name
app.delete("/organizations/:organizationId", organizationController.deleteOrganization); // edit organization name

// organization account management
app.get("/accounts/:companyId", accountController.getAccounts); // get all accounts to show in employee list
app.post("/accounts", accountController.addAccount); // add an employee account
// app.patch("/accounts/:accountId", accountController.editAccount); // edit account data
app.delete("/accounts/:accountId", accountController.deleteAccount); // delete an account

// // attendance logging
// app.get("/accounts/:accountId/attendance/", attendanceController.getAttendance); // get all attendance records to populate calendar for one user
// app.post("/accounts/:accountId/attendance/:attendanceId", attendanceController.addAttendance); // add attendance record
// app.put("/accounts/:accountId/attendance/:attendanceId", attendanceController.editAttendance); // edit attendance record

// // approvals and supervisors 
// app.get("/accounts/:accountId/approvals", approvalController.getAccountApprovals); // get all approvals related to that id 
// app.get("/approvals/:supervisorId", approvalController.getApproveeCalendars); // get all approvals and calendars of users that have set approver as this account
// app.post("/approvals/monthAttendance/:supervisorId", approvalController.submitMonthlyAttendance); // add new approval for monthly attendance
// app.post("/approvals/pto/:supervisorId", approvalController.submitPto); // add new approval for PTO
// app.post("/approvals/specialPto/:supervisorId", approvalController.submitSpecialPto); // add new approval for special PTO
// app.patch("/approvals/:approvalId", approvalController.editApproval); // changes to an approval item status
// app.delete("/approvals/:approvalId", approvalController.deleteApproval); // delete approval

// // team management and calendar view
// app.get("/teams", teamController.getTeams); // get list of all teams
// app.post("/teams", teamController.addTeam); // add new team 
// app.patch("/teams/:teamId", teamController.editTeam); // edit a team name
// app.delete("/teams/:teamId", teamController.deleteTeam); // delete a team

// // special PTO data management
// app.get("/accounts/:accountId/specialPto", specialPtoController.getSpecialPto); // view special PTO for that account
// app.post("/accounts/:accountId/specialPto", specialPtoController.addSpecialPto); // add special PTO
// app.patch("/accounts/:accountId/specialPto", specialPtoController.editSpecialPto); // edit special PTO type
// app.delete("/accounts/:accountId/specialPto", specialPtoController.deleteSpecialPto); // delete special PTO

// Server validation
app.get("/", (req, res) => {res.send("Hello from homepage")});
app.listen(PORT, () => {console.log(`Server listening on ${PORT}`)});