import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Approval {
    constructor() {}

    static getApprovalsSentMonthly(accountId : any) {
        try {
            return prisma.monthlyRequest.findMany({
                where: {
                    account_id: accountId,
                },
                include: {
                    supervisor: {
                        select: {
                            first_name: true,
                            last_name:true,
                        }
                    }
                }
            });
        } catch(err) {
            console.error("Error fetching approvals sent:", err)
        }
    }  
    
    static getApprovalsRequestedMonthly(accountId : any) {
        try {
            return prisma.monthlyRequest.findMany({
                where: {
                    supervisor_id: accountId,
                },
                include: {
                    account: {
                        select: {
                            first_name: true, 
                            last_name: true,
                        }
                    }
                }
            })
        } catch(err) {
            console.error("Error fetching approvals requested:", err)
        }
    }  

    static addMonthlyApproval(newApproval : any) {
        try {
            return prisma.monthlyRequest.create({
                data: newApproval,
            })
        } catch (err) {
            console.error("Error adding approval:", err)
        }
    }
    
    static updateApprovalStatus(approvalId : any, updatedStatus : any) {
        try {
            return prisma.monthlyRequest.update({
                where: {
                    id: approvalId,
                }, 
                data: {
                    status: updatedStatus,
                }
            })
        } catch(err) {
            console.error("Error fetching approvals requested:", err)
        }
    }   

    static updateApprovalRemind(approvalId : any, updatedReminder : any) {
        try {
            return prisma.monthlyRequest.update({
                where: {
                    id: approvalId,
                }, 
                data: {
                    content: updatedReminder,
                    updated_at: new Date().toISOString(),
                }
            })
        } catch(err) {
            console.error("Error fetching approvals requested:", err)
        }
    }   
    
    static deleteApproval(approvalId : any) {
        try {
            return prisma.monthlyRequest.delete({
                where: {
                    id: approvalId,
                }
            })
        } catch(err) {
            console.error("Error deleting approval:", err)
        }
    } 
    
    static async getApproveeCalendars(supervisorId: any) {
        try {
          return await prisma.account.findMany({
            where: { supervisor_id: supervisorId },
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              AttendanceRecord: {
                select: {
                  id: true,
                  day: true,
                  punch_in: true,
                  punch_out: true,
                  break_amount: true,
                  totalHours: true,
                  absence: true,
                  full_pto: true,
                  half_pto: true,
                  special_pto: true,
                },
              },
            },
          });
        } catch (error) {
          console.error("Error fetching approvee calendars:", error);
          throw new Error("Unable to fetch approvee calendars");
        }
      }

    static getSupervisors() {
        try {
            return prisma.account.findMany({
                where: {
                    Privileges: {
                        is_supervisor: true
                    }
                },
                include: {
                    Privileges: true,
                }
            })
            
        } catch(err) {
            console.error("Error when fetching supervisors");
        }
    }

};

export default Approval;