import approvalModel from "../models/approval.model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get all approvals related to that id 
const getAccountApprovals = async (req : any, res : any) => {
  try {
    const accountId = parseInt(req.params.accountId);

    // TODO: Join tables for one query
    const approvalsSentMonthly = await approvalModel.getApprovalsSentMonthly(accountId);

    // const approvalsSentPto = await approvalModel.getApprovalsSentPto(accountId);
    // const approvalsSentSpecialPto = await approvalModel.getApprovalsSentSpecialPto(accountId);

    // TODO: Join tables for one query
    const approvalsRequestedMonthly = await approvalModel.getApprovalsRequestedMonthly(accountId);

    console.log(approvalsSentMonthly, approvalsRequestedMonthly);
    res.status(200).json({approvalsSentMonthly, approvalsRequestedMonthly});

  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when fetching approvals.'})
  }
};

// get all users that have supervisor status set to true
const getSupervisors = async (req : any, res : any) => {
  try {
    const supervisors = await approvalModel.getSupervisors();
    res.status(200).json(supervisors)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when fetching supervisors.'})   
  }
}

// // get all approvals and calendars of users that have set approver as this account
// const getApproveeCalendars = async (req, res) => {

// };

// add new approval for monthly attendance
const submitMonthlyAttendance = async (req : any, res : any) => {
  try {
    console.log(req.body)
    const newApproval = req.body;
    const approvalAdded = await approvalModel.addMonthlyApproval(newApproval);
    res.status(200).json(approvalAdded);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when editing approval status.'})
  }
};

// // add new approval for PTO
// const submitPto = async (req, res) => {

// };

// // add new approval for special PTO
// const submitSpecialPto = async (req, res) => {

// };

// changes to an approval item status
// TODO: Change approval status of any id (PTO, special PTO, monthly attendance);
const editApprovalStatus = async (req : any, res : any) => {
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

const updateApprovalRemind = async (req : any, res: any) => {
  try {
    const approvalId = parseInt(req.params.approvalId);
    console.log(req.body)
    const updatedReminder = req.body.newMessage;
    const updateApprovalReminder = await approvalModel.updateApprovalRemind(approvalId, updatedReminder);
    res.status(200).json(updateApprovalReminder)
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when updating approval reminder'})
  }
}

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

const getApproveeCalendars = async (req: any, res: any) => {
  try {
    const supervisorId = parseInt(req.params.supervisorId, 10);
    const supervisor = await prisma.account.findUnique({
      where: { id: supervisorId },
      include: {
        Privileges: true,
      },
    });
    
    if (!supervisor || !supervisor.Privileges?.is_supervisor) {
      return res.status(403).json({ error: "User is not a supervisor" });
    }
    const approvees = await approvalModel.getApproveeCalendars(supervisorId);
    
    if (!approvees || approvees.length === 0) {
      return res.status(404).json({ message: "No approvees found for this supervisor." });
    }
    res.status(200).json({
      supervisor: {
        id: supervisor.id,
        first_name: supervisor.first_name,
        last_name: supervisor.last_name,
        email: supervisor.email,
      },
        approvees,
    });
  } catch (error) {
    console.error("Error fetching approvee calendars:", {
      supervisorId: req.params.supervisorId,
    });
    res.status(500).json({ error: "Unable to fetch approvee calendars" });
  }
}

export default { getAccountApprovals, editApprovalStatus, updateApprovalRemind, deleteApproval, getSupervisors, submitMonthlyAttendance, getApproveeCalendars };
