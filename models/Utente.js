const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtenteSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  nome: {
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  telefono: {
    type: Number,
  },
  indirizzo: {
    type: String,
  },
  codicefiscale: {
    type: String,
  },
  dataNascita: {
    type: Date,
  },
  luogoNascita:{
    type: String,
  },
  esenzioni:{
    type:String,
  },
  tipoUtente:{
    type: String,
  },
  sesso:{
    type: String,
  },
  admin:{
    type:Boolean,
    default: false
  }
});

module.exports = Utente = mongoose.model('utente', UtenteSchema);
