/* eslint-disable camelcase */

interface TripData {
    trip_id: string;
}
interface User {
    id?: string;
    name: string;
    username: string;
    email:string;
    password:string;
    is_admin?: boolean;
    trips?: TripData[];
}
export default User;
