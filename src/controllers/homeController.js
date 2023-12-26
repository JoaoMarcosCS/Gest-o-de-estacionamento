const Cliente = require("../models/clienteModel");
const Vagas = require("../models/vagasModel");

exports.index = async (req,res,next)=>{
    try{

        const cliente = new Cliente();  
        const clienteData = await cliente.getData();
        const vagas = new Vagas();
        const vagasDisponiveis = await vagas.getVagas();
        req.session.vagas = vagasDisponiveis[0].vagasDisponiveis;

        //console.log(`Dados recebidos do db: ${clienteData}`);
        //console.log(`Dados da sessão cars antes do db: ${req.session.cars}`);

        if(clienteData.length > 0){
           
            req.session.cars = clienteData; 
            //console.log(`Dados da sessão cars depois do db: ${req.session.cars}`);
            req.session.save(() => {
                return res.redirect("/home");
            });
        }else{
            req.session.cars = {}; 
            console.log("Nenhum cliente cadastrado ainda!");
            req.session.save(function(){
                return res.redirect("/home");
            });
        }
    }catch(e){
        console.log(e);
        return res.redirect('/home');
    }
};

exports.home = (req,res) => {
    const cars = [];
    const formater = Intl.DateTimeFormat("pt-br",{
        dateStyle:'full',
        timeStyle:"short"
    });

    

    if(req.session.cars.length > 0){
        req.session.cars.forEach(car => {
            if(car.estaPago == false){
                //console.log(`Placa do carro que será renderizado: ${car.entradaTime}`);
                cars.push(car);
            } 
        });
        
    };
   
    const vagasAtuais = req.session.vagas;
    //console.log(`Dado que representa a vaga vindo da sessão: ${typeof(vagasAtuais)}: ${vagasAtuais}`);
    return res.render("home", {cars, vagasAtuais});
}

