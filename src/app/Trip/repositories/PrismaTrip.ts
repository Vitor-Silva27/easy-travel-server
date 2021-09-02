/* eslint-disable camelcase */
import Trip from '../TripEntity';
import ITripRepository from './ITripRepository';
import prisma from '../../../database/client';

class PrismaTripRepository implements ITripRepository {
  async create({ name, owner_agency, description, value } : Trip) {
    const trip = prisma.trip.create({
      data: {
        name,
        description,
        value,
        owner_agency,
      },
    });
    return trip;
  }
}

export default new PrismaTripRepository();
