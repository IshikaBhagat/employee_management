import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enum/auth-type.enum';
// import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';

@ApiTags('Users')
@Controller('users') // class decorator
export class UsersController {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  @ApiBearerAuth()
  @Get() // method decorator
  findAll() {
    //usin config service get method
    const environment = this.config.get('PORT');
    const node = this.config.get('NODE_ENV');
    console.log('>>>>', environment);
    console.log('????', node);
    console.log(this.config.get('COMMON'));
    console.log(this.config.get('NODE_ENV'));
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // param/ body decorator
    return this.usersService.findOne(Number(id));
  }

  @ApiBearerAuth()
  // @UseGuards(AccessTokenGuard) -- for single guard apply on a route
  @Auth(AuthType.None)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
