exports.formatDate = (date) => {
    // Obtém a hora e os minutos
    let timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Obtém o dia
    let dateString = date.toLocaleDateString();

    // Retorna a data formatada
    return `${timeString} - ${dateString}`;
};