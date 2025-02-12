const { request,response } = require("express");
const Participantdata = require("../other/requette");
const { validationResult } = require("express-validator");

const dataParticipant = class{

    static getParticipant = async (req =request,res =response)=>{
       res.render('index')
    
    }
    
    static AllParticipant = async (req =request,res =response)=>{

        const participant  = await Participantdata.ParticipantsAll()
            if (participant.success) {
           
                res.status(201).render("liste",{"resultat":participant.success})
            } else {
                res.status(400).json({"Une erreur est surveni":participant.erreur})
            }
    }

    static postParticipant = async (req =request,res =response)=>{
        console.log('posst',req.body);
        const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
        console.log('rrfrrkrk',error ); 
         res.render('index',{erreur:error})
       }else{
    
        const participantUniq = await Participantdata.ParticipantsOne(req.body.email)
        if (participantUniq.alert) {
            
            const participant  = await Participantdata.InsertionParticipants(req.body)
            if (participant.success) {
           
                res.status(201).render( "index",{success:"Enregistrement effectué avec success ! "})
            } else {
                res.status(400).json({"Une erreur est surveni":participant.erreur})
            }
            
        } else {
            
            res.status(201).render( "index",{alert:"Participant(e) existe déjà ! "})
            
        }
       
    }

        

        


}

static getNotification = async (req =request,res =response)=>{
    res.render('notifications')
 
 }


   
}

 


module.exports = dataParticipant