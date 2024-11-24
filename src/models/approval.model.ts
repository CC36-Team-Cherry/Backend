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
                }
            })
        } catch(err) {
            console.error("Error fetching approvals requested:", err)
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

};

export default Approval;