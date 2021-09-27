/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import PrismaAgency from '../repositories/PrismaAgency';
import AgencyServices from '../services/AgencyServices';

const agencyServices = new AgencyServices(PrismaAgency);
class AgencyController {
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { agency_name, email, password } = req.body;

    const agency = await agencyServices.create({
      agency_name,
      email,
      password,
    });
    return res.json(agency);
  }

  async findAllAgencies(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const agencies = await agencyServices.findAgencies();

    return res.json(agencies);
  }

  async findOneAgency(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { agencyName } = req.params;
    const agencies = await agencyServices.findOneAgency(agencyName);

    return res.json(agencies);
  }

  async deleteAgency(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = req.params;
    const agencies = await agencyServices.deleteAgency(id);

    return res.json(agencies);
  }

  async updateAgency(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { id } = req.params;
    const { agencyName, email } = req.body;
    const agency = await agencyServices.updateAgency(id, agencyName, email);

    return res.json(agency);
  }

  async authenticate(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { agencyName, password } = req.body;

    const response = await agencyServices.authenticate(agencyName, password);

    if (response instanceof Error) {
      return res.status(401).json({ error: response.message });
    }
    return res.json(response);
  }
}

export default new AgencyController();
