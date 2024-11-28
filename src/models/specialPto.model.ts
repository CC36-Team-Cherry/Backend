import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class SpecialPto {
    constructor() {}

    static getSpecialPto(accountId : any) {
        return prisma.specialPTO.findMany({
            where: {
                account_id: accountId
            }, 
        })
    }

    static addSpecialPto(accountId: any, newSpecialPto : any) {
        return prisma.specialPTO.create({
            data: {
                account_id: accountId,
                type: newSpecialPto,
            }
        })
    }

    static editSpecialPto(specialPtoId : any, newSpecialPtoType : any) {
        return prisma.specialPTO.update({
            where: {
                id: specialPtoId,
            },
            data: {
                type: newSpecialPtoType,
            }
        })
    }

    static deleteSpecialPto(specialPtoId : any) {
        return prisma.specialPTO.delete({
            where: {
                id: specialPtoId,
            }
        })
    }

};

export default SpecialPto;