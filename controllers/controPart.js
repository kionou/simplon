const { request,response } = require("express");
const Participantdata = require("../other/requette");
const { validationResult } = require("express-validator");

const API_KEY = "1536910383678539018fd155.59185723";
const SITE_ID = "105885554";

// Fonction pour vérifier le statut de la transaction via CinetPay
async function checkTransactionStatus(transactionId) {
    try {
        const response = await axios.post("https://api-checkout.cinetpay.com/v2/payment/check", {
            apikey: API_KEY,
            site_id: SITE_ID,
            transaction_id: transactionId
        });

        return response.data?.data?.status || "UNKNOWN"; // Retourne le statut ou "UNKNOWN"
    } catch (error) {
        console.error("Erreur API CinetPay:", error);
        return "ERROR"; // En cas d'erreur
    }
}

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
    const notificationData = req.body;
    console.log('Notification reçue:', notificationData);
   // Vérifier si l'ID de transaction est présent
   if (!notificationData || !notificationData.cpm_trans_id) {
    return res.status(400).json({ message: "Transaction ID manquant" });
}

const transactionId = notificationData.cpm_trans_id;

// Vérifier le statut via l'API CinetPay
const status = await checkTransactionStatus(transactionId);

console.log('Statut de la transaction' , status);

if (status === "ACCEPTED") {
    console.log("✅ Paiement validé");
    return res.status(200).json({ message: "Paiement validé" });
} else if (status === "PENDING") {
    console.log("⏳ Paiement en attente");
    return res.status(200).json({ message: "Paiement en attente" });
} else {
    console.log("❌ Paiement échoué ou annulé");
    return res.status(400).json({ message: "Paiement échoué ou annulé" });
    }

}
   
}


module.exports = dataParticipant




