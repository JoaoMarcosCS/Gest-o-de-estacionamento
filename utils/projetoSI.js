function temVaga() {
  return carrosEntrados < vagas;
}

function registrarEntrada() {

  let placa = prompt("Informe a placa do carro: ");

  if (!temVaga()) {
    alert("Não há vagas disponíveis.");
    return;
  }

  let horaEntrada = prompt("Informe a hora de entrada (em formato 24h): ");

  horaEntrada = parseInt(horaEntrada);

  estacionamento.push({
    placa: placa,
    horaEntrada: horaEntrada,
  });

  carrosEntrados++;

  alert("Carro registrado com sucesso.");

  salvarDados();
}

function salvarDados() {

  let arquivo = new FileWriter("db.txt");

  for (const carro of estacionamento) {
    arquivo.write(
      `Placa: ${carro.placa}\nHora de entrada: ${carro.horaEntrada}\n`
    );
  }

  arquivo.close();
}
function registrarSaida() {
 
  let placa = prompt("Informe a placa do carro: ");

  let carroEncontrado = estacionamento.find((carro) => carro.placa === placa);
  if (!carroEncontrado) {
    alert("Carro não encontrado.");
    return;
  }

  let horaSaida = prompt("Informe o horário de saída (formato 24h): ");
  horaSaida = parseInt(horaSaida);

  let tempoPermanencia = horaSaida - carroEncontrado.horaEntrada;

  let valorPago = tempoPermanencia * 1;
 
  alert(
    `Carro saiu com sucesso.\n\nPlaca: ${placa}\nHora de entrada: ${carroEncontrado.horaEntrada}\nHora de saída: ${horaSaida}\nValor a pagar: R$${valorPago}`
  );

  estacionamento.splice(carrosEntrados - 1, 1);

  carrosSaídos++;
}

function gerarRelatorio() {
  let relatorio = "";
  for (const carro of estacionamento) {
    relatorio += `\nPlaca: ${carro.placa}\nHora de entrada: ${carro.horaEntrada}\nHora de saída: ${carro.horaSaida}\nValor a pagar: R$${carroEncontrado.valorPago}`;
  }
  alert(relatorio);
}

function main() {

  let opcao = prompt(
    "Selecione uma opção:\n1. Registrar entrada\n2. Registrar saída\n3. Gerar relatório\n4. Sair"
  );

  switch (opcao) {
    case "1":
      registrarEntrada();
      break;
    case "2":
      registrarSaida();
      break;
    case "3":
      gerarRelatorio();
      break;
    case "4":
      return;
    default:
      alert("Opção inválida.");
      break;
  }
  main();
}

salvarDados();

main();
