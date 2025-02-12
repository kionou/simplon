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
        // Récupérer les données envoyées par CinetPay
    const notificationData = req.body;
  
    // Afficher les données pour debug
    console.log('Notification reçue :', notificationData);
  
    // Récupérer les valeurs importantes
    const status = notificationData.status;
    const uniqueCode = notificationData.uniqueCode;
    const amount = notificationData.amount;
    const name = notificationData.name;
    const phone = notificationData.phone;
    const emailclit = notificationData.emailclit;
  
    // Vérifier si le paiement a été accepté
    if (status === 'ACCEPTED') {
      console.log('Paiement réussi');
      
      // Exemple de traitement (par exemple, ajout à la base de données)
      const subscriptionData = {
        uniqueCode,
        amount,
        name,
        emailclit,
        phone,
        status: 'Actif',
        creationDate: new Date(),
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Expiration dans 30 jours
      };
  
      // Simuler l'ajout à la base de données (log ici pour l'exemple)
      console.log('Abonnement créé:', subscriptionData);
  
      // Répondre à CinetPay pour confirmer que la notification a été bien reçue
      res.status(200).send('Paiement accepté et traité');
    } else {
      console.log('Paiement échoué');
      res.status(400).send('Paiement échoué');
    }


}
   
}


module.exports = dataParticipant