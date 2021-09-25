/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import Trip from '../TripEntity';

interface ITripRepository {
    create(trip: Trip): Promise<Trip>;
    findAllTrips(page: number, limit: number): Promise<Trip[]>;
    findTripById(id: string): Promise<Trip>;
    addImage(originalname: string, filename: string, trip_id: string);
}

export default ITripRepository;
