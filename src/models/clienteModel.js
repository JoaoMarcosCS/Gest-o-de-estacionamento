const ClienteModel = require('./schema/clientesSchema');

class Cliente{
    
    async getData(){
        const data = await ClienteModel.find();
        return data;
    }

    async setData(data){
        this.data = data;

        await ClienteModel.create(data);
    }

    async deleteData(data){
        try{
            await ClienteModel.deleteOne({ _id: data._id });
            //console.log(`Dado excluído: ${data.placaCarro}`);
        }catch(e){
            console.log(`Dado não excluido: ${data.placaCarro}`);
        }
    }

    // formatDate(date){
    //     date.setMilliseconds(0);
        
    //     const formattedDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
    //     ' - ' +
    //     date.toLocaleDateString();
    
    //     return formattedDate;
    // }
}

module.exports = Cliente;


