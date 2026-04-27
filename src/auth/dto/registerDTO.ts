import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class registerDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@IsNotEmpty()
	@MinLength(8)
	@IsNotEmpty()
	password!: string;

}
