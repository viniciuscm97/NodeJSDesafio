class Cidade {
    id: string;

    cidade: string;

    estado: string;

    created_at: Date;

    constructor(cidade,estado,id){
        this.id = id;
        this.estado = estado;
        this.cidade = cidade;
        this.created_at= new Date();
    }
}

export { Cidade }