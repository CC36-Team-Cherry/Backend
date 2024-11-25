import { PrismaClient } from "@prisma/client";
import { applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
const prisma = new PrismaClient();

// Set up Firebase Admin SDK
var firebaseAdmin = require("firebase-admin");
firebaseAdmin.initializeApp({
  credential: applicationDefault()
});

type userAccount = {
  email: string;
  auth_key: string;
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
  static async addAccountDatabase(newAccount: userAccount, uid: string) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const createdAccount = await prisma.account.create({
          data: {
            email: newAccount.email,
            auth_key: uid,
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

  static addAccount(newAccount: userAccount, newPassword: string) {
    try {
      getAuth()
        .createUser({
          email: newAccount.email,
          emailVerified: false,
          password: newPassword,
          disabled: false,
      })
        .then((userRecord) => {
          const uid = userRecord.uid;
          return this.addAccountDatabase(newAccount, uid);
      })
    } catch (err) {
      console.error("Error adding account:", err);
      throw new Error("Failed to add account to Firebase");
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
