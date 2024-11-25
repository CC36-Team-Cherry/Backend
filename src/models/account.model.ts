import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type userAccount = {
  email: string;
  first_name: string;
  last_name: string;
  birthdate: Date;
  supervisor_id?: number;
  company_id: number;
  join_date: Date;
  leave_date?: Date;
  role: string;
  team_id?: number;
  is_admin: string;
  is_supervisor: string;
  remaining_pto: number;
};

class Account {
  constructor() {}

  static async getAccounts(company_id: number) {
    try {
      return await prisma.account.findMany({
        where: {
          company_id: Number(company_id),
        },
        include: {
            Privileges: true,
            PTO: true
        },
      });
    } catch (err) {
      console.error("Error fetching accounts:", err);
      throw new Error("Failed to fetch accounts from the database");
    }
  }

  //add an account and its privileges
  static async addAccount(newAccount: userAccount) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const createdAccount = await prisma.account.create({
          data: {
            email: newAccount.email,
            first_name: newAccount.first_name,
            last_name: newAccount.last_name,
            birthdate: newAccount.birthdate,
            supervisor_id: Number(newAccount.supervisor_id),
            company_id: Number(newAccount.company_id),
            join_date: newAccount.join_date,
            role: newAccount.role,
          },
        });

        await prisma.privileges.create({
          data: {
            account_id: createdAccount.id,
            is_admin: (newAccount.is_admin === "true"),
            is_supervisor: (newAccount.is_supervisor === "true"),
          },
        });

        await prisma.pTO.create({
          data: {
            account_id: createdAccount.id,
            remaining_pto: Number(newAccount.remaining_pto),
          }
        })

        return createdAccount;
      });

      return result;
    } catch (err) {
      console.error("Error adding account:", err);
      throw new Error("Failed to add account to the database");
    }
  }

  // static editAccount() {
  //     return prisma.account.update({
  //         data: {

  //         }
  //     })
  // }

  static deleteAccount(accountId: number) {
    try {
      return prisma.account.delete({
        where: { id: accountId },
      });
    } catch (err) {
      console.error("Error deleting account:", err);
      throw new Error("Failed to delete account from the database");
    }
  }
}

export default Account;
