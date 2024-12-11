import teamModel from "../models/team.model";

// // get list of all teams
const getTeams = async (req : any, res : any) => {
    try {
        const organizationId = parseInt(req.params.organizationId);

        const allTeams = await teamModel.getTeams(organizationId);

        res.status(200).json(allTeams)

    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when fetching teams.'})
    }

};

// // add new team
const addTeam = async (req : any, res : any) => {
    try {
        const organizationId = parseInt(req.params.organizationId);
        const teamName = req.body.newTeamName;
        const newTeam = await teamModel.addTeam(organizationId, teamName);
        res.status(200).json(newTeam)
    } catch(err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when fetching teams.'});
    }
};

// // edit a team name
const editTeam = async (req: any, res: any) => {
    try {
        const teamId = parseInt(req.params.teamId);
        const updatedTeamName = req.body.updatedTeamName;
        const editedTeam = await teamModel.editTeam(teamId, updatedTeamName);
        res.status(200).json(editedTeam);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'An error occured when editing team name.'})
    }
};

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

export default { getTeams, addTeam, deleteTeam, editTeam };