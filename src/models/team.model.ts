import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Team {
    constructor() {}

    static async getTeams(organizationId : any) {
        try {
          return await prisma.team.findMany({
            where: {
                company_id: organizationId,
            }, 
            select: {
                id: true,
                team_name: true,
            }
          })  
        } catch (err) {
            console.error("Error fetching teams:", err);
        }
    }

    static async addTeam(organizationId : any, teamName: any) {
        try {
            return await prisma.team.create({
                data: {
                    team_name: teamName,
                    company_id: organizationId,
                }
            })
        } catch (err) {
            console.error("Error adding team:", err);
        }
    }

    static async editTeam(teamId : any, updatedTeamName: any) {
        try {
            return await prisma.team.update({
                where: {
                    id: teamId,
                }, 
                data: {
                    team_name: updatedTeamName,
                }
            })
        } catch (err) {
            console.error("Error when editing team:", err);
        }
    } 

    static async deleteTeam(teamId : any) {
        try {
            return await prisma.team.delete({
                where: {
                    id: teamId,
                }
            })
        } catch (err) {
            console.error("Error adding team:", err);
        }
    }

};

export default Team;