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

  async create({ name, description, owner_agency, value }: Trip): Promise<Trip> {
    const trip = await this.repository.create({
      name,
      description,
      owner_agency,
      value,
    });
    return trip;
  }

  async findTrips(): Promise<Trip[]> {
    const trips = await this.repository.findAllTrips();
    return trips;
  }

  async addImage(originalname: string, filename: string, tripId: string): Promise<Image[]> {
    const image = await this.repository.addImage(originalname, filename, tripId);
    return image;
  }
}

export default TripServices;
