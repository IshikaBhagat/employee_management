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

const ENV = process.env.NODE_ENV

@Module({
  imports: [UsersModule, PrismaModule, PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env': `.env.${ENV}`,
      validationSchema: environmentValidation,
    }),
    PaginationModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
