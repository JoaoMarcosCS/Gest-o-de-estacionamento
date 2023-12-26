const VagasModel = require('./schema/vagasScheme');

class Vagas{

    async setVagas(vagasTotal, vagasDisponiveis){
        this.vagas={
            vagasTotal: vagasTotal,
            vagasDisponiveis: vagasDisponiveis,
        };

        await VagasModel.create(this.vagas);

    }
    async getVagas(){
        const vagas = await VagasModel.find();
        return vagas;
    }
    async diminuiVagas(vagas, vagasDisponiveis){
        await VagasModel.updateOne(
            { _id: vagas._id }, { $set: vagasDisponiveis }
        );
    }
    async aumentaVagas(vagas, vagasDisponiveis){
        await VagasModel.updateOne(
            { _id: vagas._id }, { $set: vagasDisponiveis }
        );
    }
}

module.exports = Vagas;