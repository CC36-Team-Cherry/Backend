import teamModel from "../models/team.model";

// // get list of all teams
const getTeams = async (req : any, res : any) => {
    try {
        const organizationId = req.params.activeCompanyId;
        console.log(organizationId);

        const allTeams = await teamModel.getTeams(organizationId);

        console.log(allTeams);
        res.status(200).json(allTeams)

    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when fetching teams.'})
    }

};

// // add new team
const addTeam = async (req : any, res : any) => {
    try {
        console.log(req.params.organizationId);
        console.log(req.body.newTeamName);
        const organizationId = parseInt(req.params.organizationId);
        const teamName = req.body.newTeamName;

        const newTeam = await teamModel.addTeam(organizationId, teamName);

        console.log(newTeam);
        res.status(200).json(newTeam)

    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when fetching teams.'});
    }
};

// // edit a team name
// const editTeam = async (req, res) => {

// };

// delete a team
const deleteTeam = async (req : any, res: any) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const deletedTeam = await teamModel.deleteTeam(teamId);
        res.status(200).json(deletedTeam);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when deleting a team.'});
    }
};

export default { getTeams, addTeam, deleteTeam };