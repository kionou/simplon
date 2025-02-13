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
       
        const result = validationResult(req)
        if (!result.isEmpty() ) {
        const error = result.mapped()
      
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

 static postNotifications = async (req =request,res =response)=>{
      // Récupérer le corps de la requête
    const notificationData = req.body;

    // Afficher la notification reçue (pour le débogage)
    console.log('Notification reçue:', notificationData);
    console.log('Notification reçuefff:', notificationData.cpm_error_message);

    // Vérifier si le statut est bien envoyé
    if (notificationData.data && notificationData.data.status) {
        const paymentStatus = notificationData.data.status;
        console.log('Statut du paiement:', paymentStatus);

        // Effectuer des actions selon le statut de la transaction
        if (paymentStatus === 'ACCEPTED') {
            // Paiement réussi, effectuez des actions comme ajouter l'abonnement
            console.log('Paiement accepté, traitement de l\'abonnement...');
        } else {
            // Paiement échoué ou en attente
            console.log('Paiement échoué ou en attente');
        }
        
        // Répondre à CinetPay pour confirmer que la notification a été reçue
        res.status(200).send({ message: 'Notification reçue avec succès' });
    } else {
        // Si le statut n'est pas dans la notification, renvoyer une erreur
        res.status(400).send({ message: 'Statut de paiement manquant' });
    }

  
 

}
   
}


module.exports = dataParticipant