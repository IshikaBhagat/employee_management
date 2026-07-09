import { Controller, Body, Post, HttpStatus, HttpCode, Inject } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dto/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enum/auth-type.enum';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    ){}

    @Post('sign-in')
    @Auth(AuthType.None)
    @HttpCode(HttpStatus.OK)
    public async signIn(@Body() data: SignInDto)
    {
        return this.authService.signIn(data)
    }
    
}
