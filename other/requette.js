const Participants = require("../models/participant")




const Participantdata = class{

    static InsertionParticipants=  (into)=>{

        const {nom,prenom,email,numero} = into
        return new Promise(async (next)=>{
            Participants.create({nom,prenom,numero,email})
            .then(resultat=>{
                console.log('sshhh',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static ParticipantsOne= async(into) =>{ 
        return new Promise(async (next)=>{  
        await Participants.findOne({email:into})
            .then(resultat=>{
                console.log('sseeee',resultat);
                if (resultat != null) {
                    next({success:resultat})
                    
                } else {
                    next({alert:"Email n' existe pas"})

                }
                
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

    static ParticipantsAll=  ()=>{
        return new Promise(async (next)=>{
            Participants.find({})
            .then(resultat=>{
                console.log('ss',resultat);
                next({success:resultat})
            }).catch(err=>{
                console.log("eee",err);
                next ({ erreur:err})
           })
        })

    }

  
}


module.exports = Participantdata