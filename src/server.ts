const express = require("express");
const app = express();

const {loginHandler, logoutHandler} = require("./auth/handlers");

// authentication 
app.post("/login", loginHandler);
app.post("/logout", logoutHandler);

// registration and organization management
app.post("/registration", organizationController.register); // add admin account and organization 
app.patch("/organizations/organizationId", organizationController); // edit organization name

// organization account management
app.get("/accounts", accountController) // get all accounts to show in employee list
app.post("/accounts", accountController); // add an employee account
app.patch("/accounts/accountId", accountController); // edit account data through settings
app.delete("/accounts/accountId", accountController); // delete an account

// attendance logging
app.get("/accounts/accountId/attendance/", attendanceController); // get all attendance records to populate calendar for one user
app.post("/accounts/accountId/attendance/attendanceId", attendanceController); // add attendance record
app.put("/accounts/accountId/attendance/attendanceId", attendanceController); // edit attendance record

// approvals and supervisors 
app.get("/accounts/accountId/approvals", approvalController); // get all approvals related to that id 
app.get("/approvals/supervisorId", approvalController); // get all approvals and calendars of users that have set approver as this account
app.post("/approvals/monthAttendance/supervisorId", approvalController); // add new approval for monthly attendance
app.post("/approvals/pto/supervisorId", approvalController); // add new approval for PTO
app.post("/approvals/specialPto/supervisorId", approvalController); // add new approval for special PTO
app.patch("/approvals/approvalId", approvalController); // changes to an approval item status
app.delete("/approvals/approvalId", approvalController); // delete approval

// team management and calendar view
app.get("/teams", teamController); // get list of all teams
app.post("/teams", teamController); // add new team 
app.patch("/teams/teamId", teamController); // edit a team name
app.delete("/teams/teamId", teamController); // delete a team

// special PTO data management
app.get("/accounts/accountId/specialPto", specialPtoController); // view special PTO for that account
app.post("/accounts/accountId/specialPto", specialPtoController); // add special PTO
app.patch("/accounts/accountId/specialPto", specialPtoController); // edit special PTO type
app.delete("/accounts/accountId/specialPto", specialPtoController); // delete special PTO