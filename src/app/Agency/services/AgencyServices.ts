import IAgencyRepository from '../repositories/IAgencyRepository';

class AgencyServices {
  constructor(private repository: IAgencyRepository) {
    this.repository = repository;
  }
}

export default AgencyServices;
