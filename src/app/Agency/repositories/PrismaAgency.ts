/* eslint-disable camelcase */
import { hashSync } from 'bcryptjs';
import Agency from '../AgencyEntity';
import IAgencyRepository from './IAgencyRepository';
import prisma from '../../../database/client';

class PrismaAgencyRepository implements IAgencyRepository {
  async create({ agency_name, email, password }: Agency): Promise<Agency> {
    const passwordHash = await this.hashPassword(password);

    const agency = prisma.agency.create({
      data: {
        agency_name,
        email,
        password: passwordHash,
      },
    });
    return agency;
  }

  async findAllAgencies(): Promise<Agency[]> {
    const agency = await prisma.agency.findMany({
      include: {
        travel_packages: true,
      },
    });
    return agency;
  }

  /*   async updateAgency({ id, name, email }: Agency): Promise<Agency> {

  }
  async deleteAgency(id: string): Promise<Agency> {

  }
  async exists(identifier: string): Promise<Agency> {

  } */

  private async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default new PrismaAgencyRepository();
