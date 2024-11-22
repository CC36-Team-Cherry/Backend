import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Organization {
    constructor() {}

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

    static addAdmin(adminData : any) {
        return prisma.account.create({
            data: {
                email: adminData.adminEmail,
                auth_key: adminData.auth_key,
                first_name: adminData.adminFirstName,
                last_name: adminData.adminLastName,
                birthdate: adminData.adminDateOfBirth,
                role: adminData.adminRole,
                join_date: adminData.adminJoinDate,
                company_id: adminData.organizationId,
            }
        })
    }


    // static editOrg(orgEditData) {
    //     return prisma.company.update({
    //         where: {

    //         },
    //         data: {

    //         }
    //     })
    // }
}

export default Organization;