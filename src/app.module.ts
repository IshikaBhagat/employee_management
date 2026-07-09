import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import {ConfigModule} from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import { AuthModule } from './auth/auth.module';
import environmentValidation from './config/environmemt.validation'
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { join } from 'path';

const ENV = process.env.NODE_ENV 

console.log("ENV-->", ENV, join (process.cwd(), `.env.${ENV}`))

@Module({
  imports: [UsersModule, PrismaModule, PostsModule,
    // ConfigModule.forFeature(jwtConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join (process.cwd(), `.env.${ENV}`),
      validationSchema: environmentValidation,
    }),
    // JwtModule.registerAsync(jwtConfig.asProvider()),
    PaginationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    // {
    //       provide: APP_GUARD,
    //       useClass: AccessTokenGuard
    //     }
  ],
})
export class AppModule {}
