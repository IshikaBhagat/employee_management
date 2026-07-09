import {
  BadRequestException,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../dto/signin.dto';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtconfigurations: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(data: SignInDto) {
    try {
      const existUser = await this.userService.findByEmail(data.email);
      if (!existUser) {
        throw new BadRequestException('User Does not exist');
      }
      let verify: boolean = false;
      verify = await this.hashingProvider.comparePassword(
        data.password,
        existUser.password,
      );
      if (!verify) {
        throw new UnauthorizedException('Incorrect Password');
      }
      //send jwt token
      console.log(this.jwtconfigurations.secret);
      const accesstoken = await this.jwtService.signAsync(
        {
          sub: existUser.id,
          email: existUser.email,
        },
        {
          audience: this.jwtconfigurations.audience,
          issuer: this.jwtconfigurations.issuer,
          expiresIn: this.jwtconfigurations.accessTokenTtl,
          secret: this.jwtconfigurations.secret,
        },
      );
      return accesstoken;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }
  }
  public isAuth() {
    return true;
  }
}
