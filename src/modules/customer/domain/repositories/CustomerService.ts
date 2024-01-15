import { ICustomer } from "../entities/CustomerModel";

interface ICustomerCreate {
    nome: string,
    sexo: string,
    data_nascimento: Date,
    idade: string,
    cidade:string,
    id_cliente: string
}

export interface ICustomerService {
    create({ nome, sexo, data_nascimento, idade, cidade, id_cliente }: ICustomerCreate): Promise<void>;
    getAll(): Promise<ICustomer[]>;
    getByName(name: string): Promise<ICustomer[]>;
    getById(id: string): Promise<ICustomer>;
    delete(id: string): Promise<void>;
    updateName(novonome: string, id: string): Promise<void>;
}