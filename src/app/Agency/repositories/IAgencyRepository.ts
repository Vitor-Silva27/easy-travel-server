/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import Agency from '../AgencyEntity';

interface IUsersRepository {
  create(agency: Agency): Promise<Agency>;
  findAllAgencies(): Promise<Agency[]>;
  findOneAgency(agencyName: string): Promise<Agency>;
  updateAgency(agency_id:string, agency_name:string, email:string): Promise<Agency>;
  deleteAgency(id: string): Promise<Agency>;
  exists(identifier: string): Promise<boolean>;
}

export default IUsersRepository;
