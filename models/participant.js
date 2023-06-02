const  mongoose  = require("mongoose");


const participantSchema = new mongoose.Schema({
    nom:{
        type:String,
        required:true,
    },
    prenom:{
        type:String,
        required: true
    },
    numero:{
        type:Number,
        required: true,
        minLength:10
    },
    email:{
        type:String,
        required: true,
        unique: true,
    }
   

},
{ timestamps: true }
)


const Participants = mongoose.model('Participants',participantSchema)
module.exports = Participants