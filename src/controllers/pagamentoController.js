const Cliente = require("../models/clienteModel");
const Vagas = require("../models/vagasModel");

exports.index = (req, res) => {
    //console.log(req.params.placaCarro);
    const dado = req.session.cars.find(cliente => cliente.placaCarro == req.params.placaCarro);

    // console.log(`tipo do dado encontrado em pagamento no entradaTime: ${typeof(dado.entradaTime)}: ${new Date(dado.entradaTime)}`);
    // console.log(`tipo do dado encontrado em pagamento no saidaTime: ${typeof(dado.saidaTime)}: ${new Date(dado.saidaTime)}`);

    dado.saidaTime = new Date();
    //console.log(`tipo do dado encontrado em pagamento no novo saidaTime: ${typeof(dado.saidaTime)}: ${new Date(dado.saidaTime)}`);
    const entrada = new Date(dado.entradaTime);
    const saida = new Date(dado.saidaTime);

    const milisecundos = Math.abs(saida - entrada);

    const horas = milisecundos / (1000 * 60 * 60);

    //se der 1h02m, já conta como se fosse 2h, então o cliente vai pagar o preço de duas horas
    const multiplicador = Math.ceil(horas);
    // console.log(`Diferença em horas: ${multiplicador}`);

    const precoHora = 1;
    const totalPagar = parseFloat(precoHora * multiplicador).toFixed(2);

    const dadosFinalizados = {
        placaCarro: req.params.placaCarro,
        entradaTime: dado.entradaTime,
        saidaTime: dado.saidaTime,
        totalPagar: totalPagar
    }

    res.render("pagamento",{dadosFinalizados});
}

exports.pago = async (req,res,next) => {
    const cliente = new Cliente();
    const vagas = new Vagas();
    const vagasDisponiveis = await vagas.getVagas();

    vagasDisponiveis[0].vagasDisponiveis = (parseInt(vagasDisponiveis[0].vagasDisponiveis) + 1);

    const limitador = 30;

    if(vagasDisponiveis[0].vagasDisponiveis < limitador){
        await vagas.aumentaVagas(vagasDisponiveis[0]._id, vagasDisponiveis[0]);
        // console.log(`------------------`);
        // console.log("Numero de vagas aumentou");
        // console.log(`------------------`);
    }
    // console.log(`------------------`);
    // console.log(`Numero de vagas: ${vagasDisponiveis[0].vagasDisponiveis}`);
    // console.log(`------------------`);
    req.session.vagas = vagasDisponiveis[0].vagasDisponiveis;

    const dado = req.session.cars.find(cliente1 => cliente1.placaCarro == req.body.placaCarro);
    const dadoEspelho = dado;
    dado.estaPago = true;
    dado.totalPagar = req.body.totalPagar;

    //console.log(`Dado: ${dado._id}\nDado Espelho: ${dadoEspelho._id}`);

    await cliente.deleteData(dadoEspelho);
    await cliente.setData(dado);
    
    req.session.save(()=>{
        return res.redirect("/");
    })
}

