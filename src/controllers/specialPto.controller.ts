import specialPtoModel from "../models/specialPto.model";

// // view special PTO for that account
const getSpecialPto = async (req : any, res : any) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const specialPto = await specialPtoModel.getSpecialPto(accountId);
        res.status(200).json(specialPto);
    } catch (err) {
        res.status(500).json({error: 'An error occured when fetching approvals.'})
    }

};

// // add special PTO
const addSpecialPto = async (req : any, res : any) => {
    try {
        const accountId = parseInt(req.params.accountId);
        const newSpecialPtoData = req.body.content
        console.log(accountId, newSpecialPtoData);

        const newSpecialPto = await specialPtoModel.addSpecialPto(accountId, newSpecialPtoData);
        res.status(200).json(newSpecialPto);
    } catch (err) {
        res.status(500).json({error: 'An error occured when adding special pto'})
    }
};

// // edit special PTO type
// const editSpecialPto = async (req, res) => {

// };

// // delete specal PTO
// const deleteSpecialPto = async (req, res) => {

// };

export default { getSpecialPto, addSpecialPto };
// export default { getSpecialPto, addSpecialPto, editSpecialPto, deleteSpecialPto };
