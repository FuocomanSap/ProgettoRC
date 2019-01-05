const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtenteSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    
  },
  name: {
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
  },
  indirizzo: {
    type: String,
    required: true
  },
  codicefiscale: {
    type: String,
    required : true
  },
  dataNascita: {
    type: Date,
    required: true
  },
  luogoNascita:{
    type: String,
    required: true
  },
  esenzioni:{
    type:String,
    required:true
  },
  tipoUtente:{
    type: String,
    required: true
  },
  admin:{
    type:Boolean,
    default: false
  }
});

module.exports = Utente = mongoose.model('utente', UtenteSchema);
