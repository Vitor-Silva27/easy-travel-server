/* eslint-disable max-len */
/* eslint-disable camelcase */
import ITripRepository from '../repositories/ITripRepository';
import Trip from '../TripEntity';

interface Image {
  originalname: string;
  filename: string;
  trip_id: string;
}
class TripServices {
  constructor(private repository: ITripRepository) {
    this.repository = repository;
  }

  async create({ name, description, owner_agency, value, date, duration, language, location }: Trip): Promise<Trip> {
    const trip = await this.repository.create({
      name,
      description,
      owner_agency,
      value,
      date,
      duration,
      language,
      location,
    });
    return trip;
  }

  async findTrips(page: number, limit: number): Promise<Trip[]> {
    const trips = await this.repository.findAllTrips(page, limit);
    return trips;
  }

  async findTripById(id: string): Promise<Trip> {
    const trip = await this.repository.findTripById(id);
    return trip;
  }

  async addImage(originalname: string, filename: string, tripId: string): Promise<Image[]> {
    const image = await this.repository.addImage(originalname, filename, tripId);
    return image;
  }
}

export default TripServices;
