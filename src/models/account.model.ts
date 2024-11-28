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

  // gets an account by ID number
  static async getSingleAccount(input: number) {
    try {
      return await prisma.account.findUnique({
        where: {
          id: input,
        },
      })
    } catch (err) {
      console.error("Error fetching account: ", err)
      throw new Error("Failed to fetch account from the database")
    }
  }

  // gets an account by email address
  static async getAccountByEmail (inputEmail: string) {
    try {
      return await prisma.account.findUnique({
        where: {
          email: inputEmail,
        },
        include: {
          Privileges: true,
          company: true,
        }
      })
    } catch (err) {
      console.error("Error fetching account: ", err)
      throw new Error("Failed to fetch account from the database")
    }
  }

  static async getAccounts(company_id: number) {
    try {
      return await prisma.account.findMany({
        where: {
          company_id: Number(company_id),
        },
        include: {
            Privileges: true,
            PTO: true,
            team: {
              select: {
                team_name: true,
              },
            },
        },
      });
    } catch (err) {
      console.error("Error fetching accounts: ", err);
      throw new Error("Failed to fetch accounts from the database");
    }
  }

  //add an account and its privileges. This is called by the below function, addFirebaseAccount.
  static async addAccount(newAccount: userAccount, uid: string) {
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
            team_id: Number(newAccount.team_id),
          },
        });

        await prisma.privileges.create({
          data: {
            account_id: createdAccount.id,
            is_admin: Boolean(newAccount.is_admin),
            is_supervisor: Boolean(newAccount.is_supervisor),
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

  static addFirebaseAccount(newAccount: userAccount, newPassword: string) {
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
          return this.addAccount(newAccount, uid);
      })
        .catch((err) => {
          console.error("Error: ", err)
      })
    } catch (err) {
      console.error("Error adding account: ", err);
      throw new Error("Failed to add account to Firebase");
    }
  }

  //prepare update object
  static patchObject(obj: Record<string, any>) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null));
  }
  //update an account
  static async updateAccount(accountId: number, updates: Partial<userAccount>) {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        //updates account if needed
        if (updates.email || updates.first_name || updates.last_name || updates.birthdate || updates.supervisor_id || updates.join_date || updates.role) {
          const accountUpdates = {
            email: updates.email,
            first_name: updates.first_name,
            last_name: updates.last_name,
            birthdate: updates.birthdate ? new Date(updates.birthdate) : null,
            supervisor_id: Number(updates.supervisor_id),
            join_date: updates.join_date,
            role: updates.role,
            team_id: updates.team_id
          };
          const cleanedAccUpdates = Account.patchObject(accountUpdates);

          await prisma.account.update({
            where: { id: accountId },
            data: cleanedAccUpdates,
          });
        }
        //updates privileges if needed
        if (updates.is_admin || updates.is_supervisor) {
          const privilegesUpdates = {
            is_admin: Boolean(updates.is_admin),
            is_supervisor: Boolean(updates.is_supervisor),
          };
          const cleanedPrivUpdates = Account.patchObject(privilegesUpdates);

          await prisma.privileges.update({
            where: {account_id: accountId},
            data: cleanedPrivUpdates,
          });
        }
        //updates pto if needed
        if (updates.remaining_pto) {
          await prisma.pTO.update({
            where: { account_id: accountId },
            data: {
              remaining_pto: Number(updates.remaining_pto),
            },
          });
        }
      });
    return "Account updated successfullly";
    } catch (err) {
      console.error("Error updating account:", err);
      throw new Error("Failed to update account");
    }
  }

  static updateEmailFirebase(uid: string, newEmail: string) {
    getAuth()
      .updateUser(uid, {
        email: newEmail
      })
      .then(() => {
        console.log("Successfully updated email in Firebase");
      })
      .catch((error) => {
        console.log("Error updating email: ", error)
      })
  }

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

  static deleteFirebaseAccount(uid: string) {
    getAuth()
      .deleteUser(uid)
      .then(() => {
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        console.log("Error deleting user: ", error)
      })
  }

  static async getSingleAccountDetails(accountId: number) {
    try {
      return await prisma.account.findUnique({
        where: { id: accountId },
        include: {
          supervisor: { 
            select: {
              id: true,
              first_name: true,
              last_name: true,
            },
          },
          Privileges: true, 
        },
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw new Error("Failed to fetch user details");
    }
  }
  
}

export default Account;
