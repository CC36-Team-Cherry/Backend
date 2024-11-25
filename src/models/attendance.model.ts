const { PrismaClient } = require("@prisma/client");

class Attendance {
    prisma;

    constructor() {
        this.prisma = new PrismaClient(); // Instanza del client Prisma
    }

    // Metodo per ottenere tutti i record di presenze
    async getAllForAccount(accountId: any) {
        try {
            return await this.prisma.attendanceRecord.findMany({
                where: { account_id: Number(accountId) },
            });
        } catch (error) {
            console.error("Error fetching attendance records:", error);
            throw new Error("Unable to fetch attendance records");
        }
    }

    // Metodo per creare un nuovo record di presenze
    async createAttendanceRecord(data: any) {
        try {
          return await this.prisma.attendanceRecord.create({
            data: {
              account_id: Number(data.account_id),
              day: new Date(data.day),
              punch_in: data.punch_in ? new Date(data.punch_in) : null,
              punch_out: data.punch_out ? new Date(data.punch_out) : null,
              break_amount: data.break_amount || 0,
              totalHours: data.totalHours || 0,
              absence: data.absence || false,
              full_pto: data.full_pto || false,
              half_pto: data.half_pto || false,
              special_pto: data.special_pto || false,
            },
          });
          
        } catch (error) {
          console.error("Error creating attendance record:", error);
          throw new Error("Unable to create attendance record");
        }
      }
      
    // Metodo per aggiornare un record esistente
    async updateAttendanceRecord(attendanceId: any, data: any) {
        try {
            return await this.prisma.attendanceRecord.update({
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
}

module.exports = new Attendance();
