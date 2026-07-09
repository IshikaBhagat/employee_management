import { Module,forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
// import { ConfigModule } from '@nestjs/config';
// import jwtConfig from 'src/auth/config/jwt.config';
// import { JwtModule } from '@nestjs/jwt';
// import { APP_GUARD } from '@nestjs/core';
// import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@Module({
  imports: [forwardRef(()=>AuthModule)
    // ConfigModule.forFeature(jwtConfig),
    // JwtModule.registerAsync(jwtConfig.asProvider())
  ],
  controllers: [UsersController],
  //to apply global guards(all modules will be guarded)
  providers: [UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard
    // }
  ],
  exports:[UsersService],
})
export class UsersModule {}
