const { body } = require("express-validator");

exports.ValiderRegistre = [
    body('nom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Nom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('prenom')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Prénom ne peut pas être vide')
        .isLength({min:5 , max:10})
        .withMessage('Minimun 5 caractères obligatoires')
        .isAlpha()
        .withMessage('Pas de chaine de caractères'),
    body('email')
        .notEmpty()
        .withMessage('e-mail  requis'),
    body('email')
        .exists()
        .isEmail()
        .withMessage('email non valide'),
    body('numero')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .bail()
        .withMessage('Numéro de Téléphone obligatoire')
        //  .isAlpha()
        //  .withMessage('Pas de chaine de caractères')
         .isMobilePhone()
        .withMessage('des chiffres obligatoires'),

   


]