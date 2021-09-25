/* eslint-disable camelcase */
interface Trip {
    id?: string;
    name: string;
    description: string;
    value: number;
    owner_agency:string;
    date: Date;
    duration: string;
    language: string;
    location: string;
}
export default Trip;
