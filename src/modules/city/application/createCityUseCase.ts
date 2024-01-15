import { CityRepository } from "../domain/repositories/CityRepository";

export class CreateCityUseCase {
    constructor(private cityRepository: CityRepository) { }

    async execute({ name, state }) {
        const todasCidades = await this.cityRepository.getAll();
        const id_cidade = todasCidades.length + 1;

        const response = await this.cityRepository.create({name, state, id_city: id_cidade.toString()});

        return response;
    }
}