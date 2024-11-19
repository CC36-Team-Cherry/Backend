const express = require("express");
const app = express();

const {loginHandler, logoutHandler} = require("./auth/handlers");

// authentication 
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);

// organization registration
app.post("/registration", registrationController.register); // add admin account and organization 

// personal account data
app.get("/accounts/accountId", accountController); // get account data (including special PTO)
app.patch("/accounts/accountId", accountController); // edit account data through settings

// organization account management
app.get("/accounts", accountController) // get all accounts to show in employee list
app.post("/accounts", accountController); // add an account
app.delete("/accounts/accountId", accountController); // delete an account

// organization management
app.patch("/organizations/organizationId", organizationController); // edit organization name

// approvals
// get all approvals related to that accountId through app.get("accountId");
app.get("/approvals/approverId", approvalController); // get all calendars of users that have set approver as this account
app.post("/approvals/monthAttendance/approverId", approvalController); // add new approval for monthly attendance
app.post("/approvals/pto/approverId", approvalController); // add new approval for PTO
app.post("/approvals/specialPto/approverId", approvalController); // add new approval for special PTO
app.patch("/approvals/approvalId", approvalController); // changes to an approval item status
app.delete("/approvals/approvalId", approvalController); // delete approval

// attendance logging
app.get("/accounts/accountId/attendance/attendanceId", attendanceController); // add attendance record to populate calendar
app.post("/accounts/accountId/attendance/attendanceId", attendanceController); // add attendance record
app.patch("/accounts/accountId/attendance/attendanceId", attendanceController); // edit attendance record

// team management and calendar view
app.get("/teams", teamController); // get list of all teams
app.post("/teams", teamController); // add new team 
app.patch("/teams/teamId", teamController); // edit a team name
app.delete("/teams/teamId", teamController); // delete a team

// special PTO data management
app.post("/accounts/accountId/specialPto", specialPtoController); // add special PTO
app.patch("/accounts/accountId/specialPto", specialPtoController); // edit special PTO type
app.delete("/accounts/accountId/specialPto", specialPtoController); // delete special PTO