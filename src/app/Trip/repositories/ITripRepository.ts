/* eslint-disable no-unused-vars */
import Trip from '../TripEntity';

interface ITripRepository {
    create(trip: Trip): Promise<Trip>;
}

export default ITripRepository;
