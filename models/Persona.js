const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtenteSchema = new Schema({
  email: {
    type: String,
    required: true
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
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Utente = mongoose.model('user', UtenteSchema);
