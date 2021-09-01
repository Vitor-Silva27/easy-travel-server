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
}

export default new AgencyController();
