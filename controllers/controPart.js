const { request, response } = require("express");
const Participantdata = require("../other/requette");
const { validationResult } = require("express-validator");
const axios = require('axios'); // Utiliser require au lieu de import

const API_KEY = "1536910383678539018fd155.59185723";
const SITE_ID = "105885554";

class DataParticipant {
    // Fonction utilitaire pour vérifier le statut de la transaction
    static async checkTransactionStatus(transactionId) {
        try {
            const response = await axios.post("https://api-checkout.cinetpay.com/v2/payment/check", {
                apikey: API_KEY,
                site_id: SITE_ID,
                transaction_id: transactionId
            });

            return response.data?.data?.status || "UNKNOWN";
        } catch (error) {
            console.error("Erreur API CinetPay:", error);
            return "ERROR";
        }
    }

    static async getParticipant(req = request, res = response) {
        try {
            res.render('index');
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }

    static async getAllParticipant(req = request, res = response) {
        try {
            const participant = await Participantdata.ParticipantsAll();
            if (participant.success) {
                res.status(200).render("liste", { "resultat": participant.success });
            } else {
                res.status(400).json({ "erreur": "Une erreur est survenue" });
            }
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }

    static async postParticipant(req = request, res = response) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.render('index', { erreur: result.mapped() });
            }

            const participantUniq = await Participantdata.ParticipantsOne(req.body.email);
            if (participantUniq.alert) {
                const participant = await Participantdata.InsertionParticipants(req.body);
                if (participant.success) {
                    return res.status(201).render("index", { 
                        success: "Enregistrement effectué avec succès !" 
                    });
                }
                return res.status(400).json({ 
                    erreur: "Une erreur est survenue"
                });
            }
            
            return res.status(409).render("index", { 
                alert: "Participant(e) existe déjà !" 
            });
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }

    static async getNotification(req = request, res = response) {
        try {
            res.render('notifications');
        } catch (error) {
            res.status(500).json({ error: "Erreur serveur" });
        }
    }

    static async postNotifications(req = request, res = response) {
        try {
            const notificationData = req.body;
            console.log('Notification reçue:', notificationData);

            if (!notificationData?.cpm_trans_id) {
                return res.status(400).json({ message: "Transaction ID manquant" });
            }

            const status = await this.checkTransactionStatus(notificationData.cpm_trans_id);
            console.log('Statut de la transaction:', status);

            switch (status) {
                case "ACCEPTED":
                    console.log("✅ Paiement validé");
                    return res.status(200).json({ message: "Paiement validé" });
                case "PENDING":
                    console.log("⏳ Paiement en attente");
                    return res.status(200).json({ message: "Paiement en attente" });
                default:
                    console.log("❌ Paiement échoué ou annulé");
                    return res.status(400).json({ message: "Paiement échoué ou annulé" });
            }
        } catch (error) {
            console.error("Erreur lors du traitement de la notification:", error);
            res.status(500).json({ error: "Erreur serveur" });
        }
    }
}

module.exports = DataParticipant;