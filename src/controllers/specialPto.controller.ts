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
        console.log("add special pto id: ", accountId, newSpecialPtoData);

        const newSpecialPto = await specialPtoModel.addSpecialPto(accountId, newSpecialPtoData);
        res.status(200).json(newSpecialPto);
    } catch (err) {
        res.status(500).json({error: 'An error occured when adding special pto'});
    }
};

// // edit special PTO type
const editSpecialPto = async (req : any, res : any) => {
    try {
        console.log("edit special pto params: ", req.params)
        const specialPtoId = parseInt(req.params.specialPtoId);
        const newSpecialPtoType = req.body.specialPto.type;
        console.log("editspecialPtoId", specialPtoId, "editnewSpecialPtoType", newSpecialPtoType)

        const editSpecialPto = await specialPtoModel.editSpecialPto(specialPtoId, newSpecialPtoType);
        res.status(200).json(editSpecialPto);
    } catch (err) {
        res.status(500).json({error: 'An error occured when editing special pto'});
    }
};

// // delete specal PTO
const deleteSpecialPto = async (req : any, res : any) => {
    try {
        
        const specialPtoId = parseInt(req.params.specialPtoId);

        const deleteSpecialPto = await specialPtoModel.deleteSpecialPto(specialPtoId);
        
        res.status(200).json(deleteSpecialPto)
    } catch (err) {
        res.status(500).json({error: 'An error occured when deleing special pto'})
    }
};

export default { getSpecialPto, addSpecialPto, editSpecialPto, deleteSpecialPto };
