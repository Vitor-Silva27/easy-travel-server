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

  async findOneAgency(agencyName: string): Promise<Agency> {
    const agency = await prisma.agency.findFirst({
      where: {
        agency_name: agencyName,
      },
      include: {
        travel_packages: true,
      },
    });
    return agency;
  }

  async updateAgency(agency_id:string, agency_name:string, email:string): Promise<Agency> {
    const agency = await prisma.agency.update({
      where: {
        agency_id,
      },
      data: {
        agency_name,
        email,
      },
    });
    return agency;
  }

  async deleteAgency(id: string): Promise<Agency> {
    const agency = await prisma.agency.delete({
      where: {
        agency_id: id,
      },
    });
    return agency;
  }

  async exists(identifier: string): Promise<boolean> {
    const agencyExists = await prisma.agency.findFirst({
      where: {
        OR: [
          {
            agency_id: identifier,
          },
          {
            agency_name: identifier,
          },
        ],
      },
    });
    return !!agencyExists;
  }

  private async hashPassword(password: string): Promise<string> {
    const hash = hashSync(password, 10);
    return hash;
  }
}

export default new PrismaAgencyRepository();
