const { request,response } = require("express");
const Participantdata = require("../other/requette");




const dataParticipant = class{

    static getParticipant = async (req =request,res =response)=>{
       res.render('index')
    
    }
    
    static AllParticipant = async (req =request,res =response)=>{

        const participant  = await Participantdata.ParticipantsAll()
            if (participant.success) {
           
                res.status(201).json({"resultat":participant.success})
            } else {
                res.status(400).json({"Une erreur est surveni":participant.erreur})
            }
    }

    static postParticipant = async (req =request,res =response)=>{

        const participantUniq = await Participantdata.ParticipantsOne(req.body.email)
        if (participantUniq.alert) {

            const participant  = await Participantdata.InsertionParticipants(req.body)
            if (participant.success) {
           
                res.status(201).json({"resultat":participant.success})
            } else {
                res.status(400).json({"Une erreur est surveni":participant.erreur})
            }
            
        } else {
            res.status(201).json({message:"participant existe"})
            
        }
       

        


}


   
}

 


module.exports = dataParticipant