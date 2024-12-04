import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Approval {
    constructor() {}

    static getApprovalsSent(accountId : any) {
        try {
            return prisma.account.findUnique({
                where: {
                    id: accountId, 
                }, 
                include: {
                    ptoRequests: {
                    where: { account_id: accountId },
                    select: {
                        id: true, 
                        supervisor: { select: { first_name: true, last_name: true}},
                        content: true, 
                        status: true, 
                        day: true,
                        updated_at: true,
                        all_day: true,
                        hour_start: true,
                        hour_end: true,
                    },
                },
                specialPTORequests: {
                    where: { account_id: accountId }, 
                    select: {
                        id: true, 
                        supervisor: { select: { first_name: true, last_name: true}},
                        content: true, 
                        status: true, 
                        day: true, 
                        updated_at: true,
                        type: true,
                    },
                }, 
                monthlyRequests: {
                    where: { account_id: accountId },  
                    select: {
                        id: true,
                        supervisor: { select: { first_name: true, last_name: true}},
                        content: true,
                        status: true, 
                        month: true,
                        year: true,
                        updated_at: true,
                    },
                }
            }
        })  

        } catch(err) {
            console.error("Error fetching approvals sent:", err)
        }
    }
    
    static getApprovalsSentPTO(accountId : any) {
        try {
            return prisma.account.findUnique({
                where: {
                    id: accountId, 
                }, 
                include: {
                    ptoRequests: {
                    where: { account_id: accountId },
                    select: {
                        id: true, 
                        supervisor: { select: { first_name: true, last_name: true}},
                        content: true, 
                        status: true, 
                        day: true,
                        updated_at: true,
                        all_day: true,
                        hour_start: true,
                        hour_end: true,
                    },
                },
                specialPTORequests: {
                    where: { account_id: accountId }, 
                    select: {
                        id: true, 
                        supervisor: { select: { first_name: true, last_name: true}},
                        content: true, 
                        status: true, 
                        day: true, 
                        updated_at: true,
                        type: true,
                    },
                }, 
            }
        })  

        } catch(err) {
            console.error("Error fetching approvals sent:", err)
        }
    }
    
    static async getApprovalsReceived(accountId : any) {
        try {

            const monthlyRequests = await prisma.monthlyRequest.findMany({
                where: { supervisor_id: accountId }, 
                include: {
                    account: {select: {first_name: true, last_name: true}}
                }
            })

            const ptoRequests = await prisma.pTORequest.findMany({
                where: { supervisor_id: accountId }, 
                include: {
                    account: {select: {first_name: true, last_name: true}}
                }
            })

            const specialPTORequests = await prisma.specialPTORequest.findMany({
                where: { supervisor_id: accountId }, 
                include: {
                    account: {select: {first_name: true, last_name: true}}
                }
            })

            // return prisma.account.findUnique({
            //     where: {
            //         id: accountId, 
            //     }, 
            //     include: {
            //         ptoRequests: {
            //         where: { supervisor_id: accountId },
                    // select: {
                    //     id: true, 
                    //     account: { select: { first_name: true, last_name: true}},
                    //     content: true, 
                    //     status: true, 
                    //     day: true,
                    //     updated_at: true,
                    //     all_day: true,
                    //     hour_start: true,
                    //     hour_end: true,
                //     },
                // },
                // specialPTORequests: {
                //     where: { supervisor_id: accountId }, 
                //     select: {
                //         id: true, 
                //         account: { select: { first_name: true, last_name: true}},
                //         content: true, 
                //         status: true, 
                //         day: true, 
                //         updated_at: true,
                //         type: true,
                //     },
                // }, 
                // monthlyRequests: {
                //     where: { supervisor_id: accountId },  
                //     select: {
                //         id: true,
                //         account: { select: { first_name: true, last_name: true}},
                //         content: true,
                //         status: true, 
                //         month: true,
                //         year: true,
                //         updated_at: true,
                //     },
                // }
            // }

            return { ptoRequests, specialPTORequests, monthlyRequests }

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
    
    static async updateApprovalStatus(approvalId : any, updatedStatus : any, requestType : any) {
        try {

            if (requestType === 'PTO Request' || requestType === 'Half PTO Request') {
                // Update a PTO Request by ID
                return await prisma.pTORequest.update({
                    where: { id: approvalId },
                    data: { status: updatedStatus },
                });
              } else if (requestType === 'Special PTO Request') {
                // Update a Special PTO Request by ID
                return await prisma.specialPTORequest.update({
                    where: { id: approvalId },
                    data: { status: updatedStatus },
                });
              } else if (requestType === 'Month Attendance Request') {
                // DelUpdateete a Monthly Attendance Request by ID
                return await prisma.monthlyRequest.update({
                    where: { id: approvalId },
                    data: { status: updatedStatus },
                });
            }   

        } catch(err) {
            console.error("Error fetching approvals requested:", err)
        }
    }   

    static async updateApprovalRemind(approvalId : any, updatedReminder : any, requestType : any) {
        try {

            if (requestType === 'PTO Request' || requestType === 'Half PTO Request') {
                // Update a PTO Request by ID
                return await prisma.pTORequest.update({
                    where: { id: approvalId },
                    data: {
                        content: updatedReminder,
                        updated_at: new Date().toISOString(),
                    }
                });
              } else if (requestType === 'Special PTO Request') {
                // Update a Special PTO Request by ID
                return await prisma.specialPTORequest.update({
                    where: { id: approvalId },
                    data: {
                        content: updatedReminder,
                        updated_at: new Date().toISOString(),
                    }
                });
              } else if (requestType === 'Month Attendance Request') {
                // DelUpdateete a Monthly Attendance Request by ID
                return await prisma.monthlyRequest.update({
                    where: { id: approvalId },
                    data: {
                        content: updatedReminder,
                        updated_at: new Date().toISOString(),
                    }
                });
            }   
        } catch(err) {
            console.error("Error fetching approvals requested:", err)
        }
    }   
    
    static async deleteApproval(approvalId : any, requestType : any) {
        try {
            if (requestType === 'PTO Request' || requestType === 'Half PTO Request') {
                // Delete a PTO Request by ID
                return await prisma.pTORequest.delete({
                  where: { id: approvalId },
                });
              } else if (requestType === 'Special PTO Request') {
                // Delete a Special PTO Request by ID
                return await prisma.specialPTORequest.delete({
                  where: { id: approvalId },
                });
              } else if (requestType === 'Month Attendance Request') {
                // Delete a Monthly Attendance Request by ID
                return await prisma.monthlyRequest.delete({
                  where: { id: approvalId },
                });
                }
        } catch (err) {
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

    static addPtoApproval(ptoApproval : any) {
        try {
            return prisma.pTORequest.create({
                data: ptoApproval
            })
        } catch (err) {
            console.error("Error adding pto approval: ", err);
        }
    }

    static addSpecialPtoApproval(specialPtoApproval : any) {
        try {
            return prisma.specialPTORequest.create({
                data: specialPtoApproval
            })
        } catch (err) {
            console.error("Error adding special pto approval: ", err);
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
            console.error("Error when fetching supervisors: ", err);
        }
    }

};

export default Approval;