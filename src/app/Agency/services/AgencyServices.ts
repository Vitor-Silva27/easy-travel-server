/* eslint-disable max-len */
/* eslint-disable camelcase */
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Agency from '../AgencyEntity';
import IAgencyRepository from '../repositories/IAgencyRepository';

interface AgencyData {
  id: string;
  agencyName: string;
}

interface AuthResponse {
  agency: AgencyData;
  token: string;
}
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

  async deleteAgency(id: string): Promise<Agency | Error> {
    const agencyExists = await this.repository.exists(id);

    if (!agencyExists) return new Error('Agency does not exists!');

    const agency = await this.repository.deleteAgency(id);
    return agency;
  }

  async updateAgency(agency_id: string, agency_name: string, email: string): Promise<Agency | Error> {
    const agencyExists = await this.repository.exists(agency_id);

    if (!agencyExists) return new Error('Agency does not exists!');

    const res = await this.repository.updateAgency(agency_id, agency_name, email);
    return res;
  }

  async authenticate(agencyName: string, password: string): Promise<AuthResponse | Error> {
    const agency = await this.repository.findOneAgency(agencyName);
    const passwordMatch = await compare(password, agency.password);

    if (!passwordMatch) return new Error('agencyName or password is wrong!');

    const token = await this.signToken(agency.agency_name, agency.agency_id);
    return {
      agency: {
        id: agency.agency_id,
        agencyName: agency.agency_name,
      },
      token,
    };
  }

  private async signToken(agencyName: string, id: string) {
    const token = sign({
      id,
    }, process.env.TOKEN_KEY, {
      subject: agencyName,
      expiresIn: '3600s',
    });

    return token;
  }
}

export default AgencyServices;
