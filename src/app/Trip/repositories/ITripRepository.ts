/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import Trip from '../TripEntity';

interface ITripRepository {
    create(trip: Trip): Promise<Trip>;
    findAllTrips(): Promise<Trip[]>;
    addImage(originalname: string, filename: string, trip_id: string);
}

export default ITripRepository;
