import attendanceModel from "../models/attendance.model";

// Get all attendance records for a user
const getAttendance = async (req: any, res: any) => {
    const { accountId } = req.params;
    try {
        const attendanceRecords = await attendanceModel.getAllForAccount(accountId);
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error("Error fetching attendance records:", error);
        res.status(500).json({ error: "Unable to fetch attendance records" });
    }
};

// Add a new attendance record
const addAttendance = async (req: any, res: any) => {
    const { accountId } = req.params;
    const data = { ...req.body, account_id: accountId };
    try {
        const newAttendance = await attendanceModel.createAttendanceRecord(data);
        res.status(201).json(newAttendance);
    } catch (error) {
        console.error("Error adding attendance record:", error);
        res.status(500).json({ error: "Unable to add attendance record" });
    }
};

// Update an attendance record
const editAttendance = async (req: any, res: any) => {
    const { attendanceId } = req.params;
    try {
        const updatedAttendance = await attendanceModel.updateAttendanceRecord(attendanceId, req.body);
        res.status(200).json(updatedAttendance);
    } catch (error) {
        console.error("Error updating attendance record:", error);
        res.status(500).json({ error: "Unable to update attendance record" });
    }
};

// // edit attendance record
// const editAttendance = async (req, res) => {

// };

export default { getAttendance, addAttendance, editAttendance};
