/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import PrismaTrip from '../repositories/PrismaTrip';
import TripServices from '../services/TripServices';

const tripServices = new TripServices(PrismaTrip);

class AgencyController {
  async create(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { name, description, owner_agency, value } = req.body;
    const value_float = parseFloat(value);
    const trip = await tripServices.create({
      name,
      description,
      owner_agency,
      value: value_float,
    });

    return res.json(trip);
  }
}

export default new AgencyController();
