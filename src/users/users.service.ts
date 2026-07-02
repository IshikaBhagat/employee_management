import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async create(user: CreateUserDto) {

    return this.prisma.user.create({
        data:user,
    });
  }

  async update(id: number, user: UpdateUserDto) {

    return this.prisma.user.update({
        where:
        {
            id,
        },
        data:user,
    });

  }

  async patch(id: number, user: UpdateUserDto) {
    return this.prisma.user.update({
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