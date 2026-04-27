import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO } from './dto/loginDTO';
import { registerDTO } from './dto/registerDTO';

@Controller('auth')
export class AuthController {
    constructor(
		private readonly authService: AuthService
    ) {}

    @Post('/login')
    login(@Body() loginDta: loginDTO){
		return this.authService.login(loginDta)
	}

    @Post('/register')
    register(@Body() registerDta: registerDTO){
        return this.authService.register(registerDta)
    }
}
