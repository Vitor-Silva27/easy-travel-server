/* eslint-disable camelcase */
import ITripRepository from '../repositories/ITripRepository';
import Trip from '../TripEntity';

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
}

export default TripServices;
