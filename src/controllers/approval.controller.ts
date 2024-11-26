import approvalModel from "../models/approval.model";

// get all approvals related to that id 
const getAccountApprovals = async (req : any, res : any) => {
    try {
        const accountId = parseInt(req.params.accountId);
        console.log(accountId)

        // TODO: Join tables for one query
        // TODO: Return data with supervisor name included
        const approvalsSentMonthly = await approvalModel.getApprovalsSentMonthly(accountId);

        // const approvalsSentPto = await approvalModel.getApprovalsSentPto(accountId);
        // const approvalsSentSpecialPto = await approvalModel.getApprovalsSentSpecialPto(accountId);

        // TODO: Join tables for one query
        // TODO: Return data with requester name included
        const approvalsRequestedMonthly = await approvalModel.getApprovalsRequestedMonthly(accountId);

        console.log(approvalsSentMonthly, approvalsRequestedMonthly);
        res.status(200).json({approvalsSentMonthly, approvalsRequestedMonthly});

    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when fetching approvals.'})
    }
};

// // get all approvals and calendars of users that have set approver as this account
// const getApproveeCalendars = async (req, res) => {

// };

// // add new approval for monthly attendance
// const submitMonthlyAttendance = async (req, res) => {

// };

// // add new approval for PTO
// const submitPto = async (req, res) => {

// };

// // add new approval for special PTO
// const submitSpecialPto = async (req, res) => {

// };

// changes to an approval item status
// TODO: Change approval status of any id (PTO, special PTO, monthly attendance);
const editApproval = async (req : any, res : any) => {
    try {
        const approvalId = parseInt(req.params.approvalId);
        const updatedStatus = req.body.statusChange
        const approvalStatusUpdated = await approvalModel.updateApprovalStatus(approvalId, updatedStatus);
        res.status(200).json(approvalStatusUpdated);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when editing approval status.'})
    }
};

// // delete approval
const deleteApproval = async (req : any, res : any) => {
    try {
        const approvalId = parseInt(req.params.approvalId);
        const deletedApproval = await approvalModel.deleteApproval(approvalId);
        res.status(200).json(deletedApproval);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when deleting approval.'})
    }

};

export default {getAccountApprovals, editApproval, deleteApproval};