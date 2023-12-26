exports.converterParaData = (dataString) => {
    const partes = dataString.split(' - ');
    const horaMinutos = partes[0];
    const anoMesDia = partes[1];
    
    const [hora, minutos] = horaMinutos.split(':');
    const [ano, mes, dia] = anoMesDia.split('/');
    
    const date = new Date(ano, mes - 1, dia, hora, minutos);

    console.log(`Data enviada: ${dataString}`);
    console.log(`Data convertida ${date}`);
    return date;
  };
