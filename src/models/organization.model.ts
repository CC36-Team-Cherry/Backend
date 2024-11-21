import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Organization {
    constructor() {}

    // static addAdmin(adminData) {
    //     return prisma.account.create({
    //         data: {

    //         }
    //     })
    // }

    static addOrg(orgName : any) {
        return prisma.company.create({
            data: {
                name: orgName,
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