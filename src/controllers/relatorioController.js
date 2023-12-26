const chartConfig = require('chart.js');
const Cliente = require("../models/clienteModel");


exports.index = (req,res) => {

const formater = Intl.DateTimeFormat("pt-br",{
    timeStyle:"short"
});

const horarios = [];

req.session.cars.forEach(elemento => {
horarios.push({
  entrada: elemento.entradaTime, 
  saida: elemento.saidaTime
});
});


console.log("------------------------------------------");

const dados = [
  { entradaTime: '09:00', saidaTime: '12:00' },
  { entradaTime: '10:30', saidaTime: '13:45' },
  
];

// Extrai os valores de entradaTime e saidaTime
const entradas = horarios.map(item => formater.format(new Date(item.entrada)));
const saidas = horarios.map(item => formater.format(new Date(item.saida)));

saidas.forEach(elemento => {
  console.log("--------------------------");
  console.log(`\nSaídas: ${elemento}`);
});
entradas.forEach(elemento => {
  console.log("--------------------------");
  console.log(`\Entradas: ${elemento}`);
});
  
  // Configuração básica do gráfico
  const chartConfig = {
    type: 'bar',
    data: {
      labels: entradas,  // Horários de entrada
      datasets: [
        {
          label: 'Entradas',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: entradas.map(hora => parseInt(hora.split(':')[0])), // Extrai apenas a parte das horas
        },
        {
          label: 'Saídas',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          data: saidas.map(hora => parseInt(hora.split(':')[0])), // Extrai apenas a parte das horas
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: 'category', // Alterado para 'category' para exibir horas diretamente
          labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24], // Usamos os horários de entrada como rótulos
        },
        y: {
          label:'Quantidade',
          beginAtZero: true,
          max: 30, // Define o máximo para 24 horas
          stepSize: 1, // Define o intervalo do eixo y para 1 hora
        },
      },
    },
  };

console.log(`Tipo do gráfico: ${typeof(chartConfig)}: ${chartConfig}`);
res.render('relatorio', {chartConfig});


}