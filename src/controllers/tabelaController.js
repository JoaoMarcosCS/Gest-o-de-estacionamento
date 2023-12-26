
exports.index = (req,res) => {
    const tabela = [];
    const formater = Intl.DateTimeFormat("pt-br",{
        dateStyle:'full',
        timeStyle:"short"
    });
    
    req.session.cars.forEach(car => {
        
        if(car.estaPago == true){
            tabela.push({
                placaCarro: car.placaCarro,
                entrada: formater.format(new Date(car.entradaTime)),
                saida: formater.format(new Date(car.saidaTime)),
                totalPagar: car.totalPagar,
                estaPago: car.estaPago
            });
            //console.log(`-Valor da entrada: ${car.entradaTime}`)
        }
    });

    console.log(`Dado que será renderizado no relatório diario:`);
    tabela.forEach(dado => {
        console.log(dado.placaCarro + " - " + dado.totalPagar + " - " + dado.entrada + " - " + dado.saida + " - " + dado.estaPago);
    });
    res.render("tabela", {tabela});
}