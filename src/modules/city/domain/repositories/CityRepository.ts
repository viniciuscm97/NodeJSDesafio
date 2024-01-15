import { ICity } from "../entities/CityModel";

interface ICityCreate{
    name:string;
    state:string;
    id_city:string;
}

export interface CityRepository {
    create({ name, state, id_city }: ICityCreate): Promise<void>;
    getAll(): Promise<ICity[]>;
    getByName(name: string): Promise<ICity[]>;
    getByEstado(state: string): Promise<ICity[]>;
}