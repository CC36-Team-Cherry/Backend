import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Organization {
    constructor() {}

    static getOrg(organizationId : any) {
        return prisma.company.findFirst({
            where: {
                id: organizationId,
            }, 
            select: {
                name: true,
            }
        })
    } 

    static addOrg(orgName : any) {
        return prisma.company.create({
            data: {
                name: orgName,
            },
            select: {
                id: true,
            }
        })
    }    

    // TODO: Planning to delete due to using account model to add account
    // static addAdmin(adminData : any) {
    //     return prisma.account.create({
    //         data: {
    //             email: adminData.adminEmail,
    //             auth_key: "1",
    //             first_name: adminData.adminFirstName,
    //             last_name: adminData.adminLastName,
    //             birthdate: adminData.adminDateOfBirth,
    //             role: adminData.adminRole,
    //             join_date: adminData.adminJoinDate,
    //             company_id: adminData.organizationId,
    //         },
    //         select: {
    //             id: true,
    //             company_id: true,
    //         }
    //     })
    // }

    static addAdminPrivileges(registerAdminId : any) {
        return prisma.privileges.create({
            data: {
                account_id: registerAdminId,
                is_admin: true,
            }
        })
    }

    static editOrg(orgId : any, orgEditData : any) {
        return prisma.company.update({
            where: {
                id: orgId,
            },
            data: {
                name: orgEditData,
            }
        })
    }

    static deleteOrg(orgId : any) {
        return prisma.company.delete({
            where: {
                id: orgId,
            }
        })
    }

}

export default Organization;