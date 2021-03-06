/* eslint-disable max-len */
/* eslint-disable camelcase */
import Trip from '../TripEntity';
import ITripRepository from './ITripRepository';
import prisma from '../../../database/client';

class PrismaTripRepository implements ITripRepository {
  async create({ name, owner_agency, description, value, date, duration, language, location } : Trip) {
    const trip = await prisma.trip.create({
      data: {
        name,
        description,
        value,
        owner_agency,
        date,
        duration,
        language,
        location,
      },
    });
    return trip;
  }

  async addImage(originalname:string, filename:string, tripId:string) {
    const url = `http://localhost:3333/images/${filename}`;
    const image = await prisma.image.create({
      data: {
        originalname,
        filename,
        trip_id: tripId,
        url,
      },
    });
    return image;
  }

  async findTripById(id: string): Promise<Trip> {
    const trip = await prisma.trip.findFirst({
      where: {
        id,
      },
      include: {
        images: true,
        passengers: true,
      },
    });
    return trip;
  }

  async findAllTrips(page: number, limit: number): Promise<Trip[]> {
    const skip = (page - 1) * limit;
    const trips = await prisma.trip.findMany({
      skip,
      take: limit,
      include: {
        images: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return trips;
  }
}

export default new PrismaTripRepository();
