import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
        where:{
            id,
        },
    });
  }

  async create(user: { name: string; email: string }) {

    return this.prisma.user.create({
        data:user,
    });
  }

  async update(id: number, user: { name: string; email: string }) {

    this.prisma.user.update({
        where:
        {
            id,
        },
        data:user,
    });

  }

  async patch(id: number, user: Partial<{ name: string; email: string }>) {
    this.prisma.user.update({
      where:{
        id,
      },
      data: user,
    });
  }

  async remove(id: number) {

    return this.prisma.user.delete({
      where:
      {
        id,
      }
    })
  }
}