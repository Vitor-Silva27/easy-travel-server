/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import PrismaTrip from '../repositories/PrismaTrip';
import TripServices from '../services/TripServices';

const tripServices = new TripServices(PrismaTrip);

class TripController {
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

  async findAllTrips(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const trips = await tripServices.findTrips();

    return res.json(trips);
  }

  async addImage(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const { originalname, filename } = req.file;
    const { trip } = req.body;
    const image = await tripServices.addImage(originalname, filename, trip);

    return res.json(image);
  }
}

export default new TripController();
