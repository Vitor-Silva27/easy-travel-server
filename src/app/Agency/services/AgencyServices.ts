/* eslint-disable camelcase */
import Agency from '../AgencyEntity';
import IAgencyRepository from '../repositories/IAgencyRepository';

class AgencyServices {
  constructor(private repository: IAgencyRepository) {
    this.repository = repository;
  }

  async create({ agency_name, email, password }: Agency): Promise<Agency> {
    const agency = await this.repository.create({
      agency_name, email, password,
    });
    return agency;
  }

  async findAgencies(): Promise<Agency[]> {
    const agencies = await this.repository.findAllAgencies();
    return agencies;
  }
}

export default AgencyServices;
