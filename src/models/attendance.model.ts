
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type userAttendance = {
    account_id: number;
    day: Date;
    punch_in: Date;
    punch_out: Date;
    break_amount: number;
    totalHours: number;
    absence: boolean;
    full_pto: boolean;
    half_pto: boolean;
    special_pto: boolean;
  };

class Attendance {

    constructor() {}

    // Metodo per ottenere tutti i record di presenze
    static async getAllForAccount(accountId: any) {
        try {
            return await prisma.attendanceRecord.findMany({
                where: { account_id: Number(accountId) },
            });
        } catch (error) {
            console.error("Error fetching attendance records:", error);
            throw new Error("Unable to fetch attendance records");
        }
    }

    // Metodo per creare un nuovo record di presenze
    static async createAttendanceRecord(newAttendance: userAttendance) {
        try {
          return await prisma.attendanceRecord.create({
            data: {
              account_id: newAttendance.account_id,
              day: newAttendance.day,
              punch_in: newAttendance.punch_in,
              punch_out: newAttendance.punch_out,
              break_amount: newAttendance.break_amount,
              totalHours: newAttendance.totalHours,
              absence: newAttendance.absence,
              full_pto: newAttendance.full_pto,
              half_pto: newAttendance.half_pto,
              special_pto: newAttendance.special_pto,
            },
          });
          
        } catch (error) {
          console.error("Error creating attendance record:", error);
          throw new Error("Unable to create attendance record");
        }
      }
      
    // Metodo per aggiornare un record esistente
    static async updateAttendanceRecord(attendanceId: any, data: any) {
        try {
            return await prisma.attendanceRecord.update({
                where: { id: Number(attendanceId) },
                data: {
                    day: data.day ? new Date(data.day) : undefined,
                    punch_in: data.punch_in ? new Date(data.punch_in) : undefined,
                    punch_out: data.punch_out ? new Date(data.punch_out) : undefined,
                    break_amount: data.break_amount || undefined,
                    totalHours: data.totalHours || undefined,
                    absence: data.absence || undefined,
                    full_pto: data.full_pto || undefined,
                    half_pto: data.half_pto || undefined,
                    special_pto: data.special_pto || undefined,
                },
            });
        } catch (error) {
            console.error("Error updating attendance record:", error);
            throw new Error("Unable to update attendance record");
        }
    }

    static async deleteAttendanceRecord(attendanceId: number, data: userAttendance) {
      try {
        return await prisma.attendanceRecord.delete({
          where: {
            id: attendanceId,
          },
        });
      } catch (err) {
        console.error("Error deleting attendacne record:", err);
        throw new Error("Unable to delete attendance record");
      }
    }
}

export default Attendance;
