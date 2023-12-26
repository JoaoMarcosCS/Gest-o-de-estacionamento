const mongoose = require('mongoose');

const clientesSchema = new mongoose.Schema({
    placaCarro:{type:String, require:true},
    entradaTime:{type:Date, require:true},
    saidaTime:{type:Date, require:true},
    totalPagar:{type:String, require:true},
    estaPago:{type:Boolean, required:true}
    
});

module.exports = mongoose.model("clientes", clientesSchema);
