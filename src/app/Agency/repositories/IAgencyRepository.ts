/* eslint-disable no-unused-vars */
import Agency from '../AgencyEntity';

interface IUsersRepository {
  create(agency: Agency): Promise<Agency>;
/*   updateAgency(id: string, name: string, email: string): Promise<Agency>;
  deleteAgency(id: string): Promise<Agency>;
  exists(identifier: string): Promise<boolean>; */
}

export default IUsersRepository;
