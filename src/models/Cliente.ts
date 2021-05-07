class Cliente {
    id: string;

    nome: string;

    data_nascimento: string;

    idade: string;

    sexo: string;
    
    cidade: string;

    created_at: Date;
    
    constructor(id,nome,data_nascimento,idade,sexo,cidade) {
        this.id = id;
        this.nome = nome;
        this.data_nascimento = data_nascimento;
        this.idade = idade;
        this.sexo = sexo;
        this.cidade = cidade;
        this.created_at = new Date()
    }

}

export {Cliente}