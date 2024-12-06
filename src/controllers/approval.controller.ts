import approvalModel from "../models/approval.model";
import { PrismaClient } from "@prisma/client";
import { format } from 'date-fns'
const prisma = new PrismaClient();

// get all approvals related to that id 
const getAccountApprovals = async (req : any, res : any) => {
  try {
    const accountId = parseInt(req.params.accountId);

    // Return all general, pto, special pto sent
    const approvalsSent : any = await approvalModel.getApprovalsSent(accountId) || [];
    const approvalsReceived : any = await approvalModel.getApprovalsReceived(accountId) || [];

    const approvalsSentData = [
      ...approvalsSent.monthlyRequests.map((sentApproval: any) => ({
        id: sentApproval.id,
        supervisorName: `${sentApproval.supervisor.first_name} ${sentApproval.supervisor.last_name}`,
        attendanceType: `Month Attendance Request`,
        memo: sentApproval.content,
        status: sentApproval.status,
        date:  `${sentApproval.year}-${sentApproval.month}`,
        updated_at: format(new Date(sentApproval.updated_at), 'yyyy-MM-dd h:mm'),
      })) || [],
      ...approvalsSent.ptoRequests.map((sentApproval: any) => ({
        id: sentApproval.id, 
        supervisorName: `${sentApproval.supervisor.first_name} ${sentApproval.supervisor.last_name}`,
        attendanceType: sentApproval.all_day ? `PTO Request` : `Half PTO Request`,  // Conditionally set type
        memo: sentApproval.content,
        status: sentApproval.status,
        date: sentApproval.day,
        updated_at: format(new Date(sentApproval.updated_at), 'yyyy-MM-dd h:mm'),
      })) || [],
      ...approvalsSent.specialPTORequests.map((sentApproval: any) => ({
        id: sentApproval.id, 
        supervisorName: `${sentApproval.supervisor.first_name} ${sentApproval.supervisor.last_name}`,
        attendanceType: `Special PTO Request`,
        memo: sentApproval.content,
        status: sentApproval.status,
        date: sentApproval.day,
        updated_at: format(new Date(sentApproval.updated_at), 'yyyy-MM-dd h:mm'),
        type: sentApproval.type,
      })) || []
    ]
    
    const approvalsReceivedData = [
      ...approvalsReceived.monthlyRequests.map((receivedApproval: any) => ({
        id: receivedApproval.id,
        employeeName: `${receivedApproval.account.first_name} ${receivedApproval.account.last_name}`,
        attendanceType: `Month Attendance Request`,
        memo: receivedApproval.content,
        status: receivedApproval.status,
        date: `${receivedApproval.year}-${receivedApproval.month}`,  // Format date as MM - YYYY
        updated_at: receivedApproval.updated_at,
      })) || [],
      ...approvalsReceived.ptoRequests.map((receivedApproval: any) => ({
        id: receivedApproval.id,
        employeeName: `${receivedApproval.account.first_name} ${receivedApproval.account.last_name}`,
        attendanceType: receivedApproval.all_day ? `PTO Request` : `Half PTO Request`,  // Conditionally set type
        memo: receivedApproval.content,
        status: receivedApproval.status,
        date: receivedApproval.day,
        updated_at: format(new Date(receivedApproval.updated_at), 'yyyy-MM-dd h:mm'),
      })) || [],
      ...approvalsReceived.specialPTORequests.map((receivedApproval: any) => ({
        id: receivedApproval.id,
        employeeName: `${receivedApproval.account.first_name} ${receivedApproval.account.last_name}`,
        attendanceType: `Special PTO Request`,
        memo: receivedApproval.content,
        status: receivedApproval.status,
        date: receivedApproval.day,
        updated_at: format(new Date(receivedApproval.updated_at), 'yyyy-MM-dd h:mm'),
        type: receivedApproval.type,
      })) || []
    ];

    res.status(200).json({approvalsSentData, approvalsReceivedData});

  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when fetching approvals.'})
  }
};

// get all approvalsPTO related to that id
const getAccountApprovalsPTO = async (req : any, res : any) => {
  try {
    const accountId = parseInt(req.params.accountId);

    // Return all general, pto, special pto sent
    const approvalsSent : any = await approvalModel.getApprovalsSent(accountId) || [];
    const approvalsReceived : any = await approvalModel.getApprovalsReceived(accountId) || [];

    const approvalsSentData = [
      ...approvalsSent.ptoRequests.map((sentApproval: any) => ({
        id: sentApproval.id, 
        supervisorName: `${sentApproval.supervisor.first_name} ${sentApproval.supervisor.last_name}`,
        type: sentApproval.full_day ? `PTO Request` : `Half PTO Request`,  // Conditionally set type
        memo: sentApproval.content,
        status: sentApproval.status,
        date: sentApproval.day,
        updated_at: sentApproval.updated_at,
      })) || [],
      ...approvalsSent.specialPTORequests.map((sentApproval: any) => ({
        id: sentApproval.id, 
        supervisorName: `${sentApproval.supervisor.first_name} ${sentApproval.supervisor.last_name}`,
        type: `Special PTO Request`,
        memo: sentApproval.content,
        status: sentApproval.status,
        date: sentApproval.day,
        updated_at: sentApproval.updated_at,
      })) || []
    ]

    res.status(200).json({approvalsSentData});

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
    const newApproval = req.body;
    const approvalAdded = await approvalModel.addMonthlyApproval(newApproval);
    res.status(200).json(approvalAdded);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when adding month attendance.'})
  }
};

// // add new approval for PTO
const submitPto = async (req : any, res : any) => {
  try {
    const accountId = req.body.account_id;
    const ptoApproval = req.body;
    const ptoApprovalAdded = await approvalModel.addPtoApproval(ptoApproval, accountId);
    res.status(200).json(ptoApprovalAdded);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when adding pto.'})
  }
};

// // add new approval for special PTO
const submitSpecialPto = async (req : any, res : any) => {
  try {
    const specialPtoApproval = req.body;
    const specialPtoApprovalAdded = await approvalModel.addSpecialPtoApproval(specialPtoApproval);
    res.status(200).json(specialPtoApprovalAdded);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when adding special pto'})
  }
};

// changes to an approval item status
const editApprovalStatus = async (req : any, res : any) => {
  try {
    const approvalId = parseInt(req.params.approvalId);
    const updatedStatus = req.body.statusChange
    const requestType = req.params.requestType;

    console.log("edit approval status: ", requestType)

    const approvalStatusUpdated = await approvalModel.updateApprovalStatus(approvalId, updatedStatus, requestType);
    res.status(200).json(approvalStatusUpdated);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: 'An error occured when editing approval status.'})
  }
};

const updateApprovalRemind = async (req : any, res: any) => {
  try {
    const approvalId = parseInt(req.params.approvalId);
    const requestType = req.params.requestType;

    const updatedReminder = req.body.newMessage;
    const updateApprovalReminder = await approvalModel.updateApprovalRemind(approvalId, updatedReminder, requestType);
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
    const requestType = req.params.requestType;

    const deletedApproval = await approvalModel.deleteApproval(approvalId, requestType);
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

export default { getAccountApprovals, editApprovalStatus, updateApprovalRemind, deleteApproval, getSupervisors, submitMonthlyAttendance, getApproveeCalendars, submitPto, submitSpecialPto, getAccountApprovalsPTO };
