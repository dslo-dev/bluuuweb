import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BadRequestException } from '@nestjs/common';
import { registerDTO } from './dto/registerDTO';
import * as bcriptjs from 'bcryptjs';
import { loginDTO } from './dto/loginDTO';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async login({ password, email }: loginDTO){
		//datos
		const user  = await this.userService.findOneByEmail(email);
		const isValidPassword = await bcriptjs.compare(password, user.password);

		//validacion
		if (isValidPassword || user == null) {
			throw new BadRequestException("Email or Password are wrong")
		}

		//token
		const payloadToken = { name: user.name, email: user.email, rol: user.rol }
		const token = this.jwtService.signAsync(payloadToken)
		return token
	}
	async register({name, password, email}: registerDTO){

		const existing = await this.userService.findOneByEmail(email)
		if (existing) { throw new BadRequestException(); }
		const user = await this.userService.create({ name, email, password: await bcriptjs.hash(password, 10)})
		return user
	}
}
