const mongoose = require('mongoose');

const VagasScheme = new mongoose.Schema({
    vagasTotal:{type:Number, required: true},
    vagasDisponiveis:{type:String, required: true}
});

module.exports = mongoose.model("vagasDisponiveis", VagasScheme);