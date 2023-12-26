const Cliente = require("../models/clienteModel");
const Vagas = require("../models/vagasModel");
const {formatDate} = require("../utils/formatDate");

exports.index = (req, res) => {
    //console.log("chegou no index");
    res.render("cadastrar");
}

exports.cadastrar = async (req, res) => {
    //console.log("chegou no cadastrar");
    try{
        const cliente = new Cliente();
        const vagas = new Vagas();
        if(req.body.placaCarro == ""){
            return;
        }        
        
        const data = {
            placaCarro:req.body.placaCarro,
            entradaTime:new Date(),
            saidaTime:new Date(),
            totalPagar:"0",
            estaPago: false
        }

        await cliente.setData(data);
        
        let vagasDisponiveis = await vagas.getVagas();
        //console.log(`Vagas disponiveis: ${vagasDisponiveis}`);
        
        vagasDisponiveis[0].vagasDisponiveis = (parseInt(vagasDisponiveis[0].vagasDisponiveis) - 1);

        const limitador = 0;
        if(vagasDisponiveis[0].vagasDisponiveis > limitador){
            await vagas.diminuiVagas(vagasDisponiveis[0]._id,vagasDisponiveis[0]);
            // console.log(`------------------`);
            // console.log("Numero de vagas diminuiu");
            // console.log(`------------------`);
        }
        // console.log(`------------------`);
        // console.log(`Numero de vagas: ${vagasDisponiveis[0].vagasDisponiveis}`);
        // console.log(`------------------`);
        req.session.vagas = vagasDisponiveis[0].vagasDisponiveis;

        //console.log(`Carro cadastrado!`);

        req.session.save(()=>{
            return res.redirect("/");
        })

    }catch(error){
        console.log(`-Erro: ${error}`);
    }
}