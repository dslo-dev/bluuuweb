import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from 'src/constants';
import { sign } from 'crypto';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '1d'}
		})
	],
	controllers: [UsersController],
	providers: []
})
export class AuthModule {}
