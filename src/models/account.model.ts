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
  first_name: string;
  last_name: string;
  birthdate: Date;
  supervisor_id?: number;
  company_id: number;
  join_date: Date;
  leave_date?: Date;
  role: string;
  team_id?: number;
};

class Account {
  constructor() {}

  static async getAccounts(company_id: number) {
    try {
      return await prisma.account.findMany({
        where: {
          company_id: Number(company_id),
        },
      });
    } catch (err) {
      console.error("Error fetching accounts:", err);
      throw new Error("Failed to fetch accounts from the database");
    }
  }

  static addAccount(newAccount: userAccount) {
    try {
      return prisma.account.create({
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
    } catch (err) {
      console.error("Error adding account:", err);
      throw new Error("Failed to add account to the database");
    }
  }

  static addFirebaseAccount(newAccount: userAccount, newPassword: string) {
    try {
      getAuth()
        .createUser({
          email: newAccount.email,
          emailVerified: false,
          password: newPassword,
          disabled: false,
      });
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
