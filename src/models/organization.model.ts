const prisma = require("../prisma");

class Organization {
    constructor() {}

    static addAdmin(adminData) {
        return prisma.account.create({
            data: {

            }
        })
    }

    static addOrg(orgData) {
        return prisma.company.create({
            data: {

            }
        })
    }

    static editOrg(orgEditData) {
        return prisma.company.update({
            where: {

            },
            data: {

            }
        })
    }
}

module.exports = Organization;