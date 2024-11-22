import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type newAccount = {
    auth_key: string,
    email: string,
    first_name: string,
    last_name: string,
    birthdate: Date,
    supervisor_id?: number,
    company_id: number,
    join_date: Date,
    leave_date?: Date,
    role: string,
    team_id?: number,
}

class Account {
    static async getAccounts(company_id: number) {
        return await prisma.account.findMany({
            where: {
                company_id: company_id,
            }
        })
    }

    static addAccount(newAccount: newAccount) {
        return prisma.account.create({
            data: {
                auth_key: newAccount.auth_key,
                email: newAccount.email,
                first_name: newAccount.first_name,
                last_name: newAccount.last_name,
                birthdate: newAccount.birthdate,
                supervisor_id: newAccount.supervisor_id,
                company_id: newAccount.company_id,
                join_date: newAccount.join_date,
                role: newAccount.role,
            }
        })
    }

    // static editAccount() {
    //     return prisma.account.update({
    //         data: {

    //         }
    //     })
    // }

    static deleteAccount(accountId: number) {
        return prisma.account.delete({
            where: { id: accountId }
        });
    }
};

export default Account;