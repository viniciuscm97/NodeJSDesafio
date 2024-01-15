import { Request, Response } from "express";
import { CreateCityUseCase } from "../../application/createCityUseCase";

export class CreateCityController {
  constructor(private createCityUseCase: CreateCityUseCase) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, state } = req.body;

    try {
      const response = await this.createCityUseCase.execute({ name, state });
      return res.status(201).json(response)
    } catch (err) {
      let response = {status: 'Erro', resposta: err};
      return res.json(response)
    }
  }
}