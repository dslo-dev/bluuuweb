import { Transform } from "class-transformer";
import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class loginDTO {

	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@Transform(({value}) => value.trim())
	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	password!: string;

}
