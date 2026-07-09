import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
// import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async findAll() {
    const user = await this.prisma.user.findMany({
      include: {
        post: true,
      },
    });
    return user;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findMany({
      where: {
        userId: id,
      },
    });
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return {
      user,
      post,
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async create(user: CreateUserDto) {
    let existinguser;
    let usercreated;

    try {
      existinguser = await this.prisma.user.findFirst({
        where: {
          email: user.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException('Unable to process your request', {
        description: 'Error connecting database',
      });
    }

    if (existinguser) {
      throw new BadRequestException('User already exists');
    }

    try {
      usercreated = await this.prisma.user.create({
        data: {
          ...user,
          password: await this.hashingProvider.hashPassword(user.password),
        },
      });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error: 'Service is not available currently',
          fileName: 'users.service.ts',
          lineNumber: 88,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    return usercreated;
  }

  async update(id: number, user: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: user,
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
