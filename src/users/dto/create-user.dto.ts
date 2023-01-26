import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail, IsNumber } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "user@gmail.com", description: "user email" }) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
  @IsString({ message: "It must be a string" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;
  //
  @ApiProperty({ example: "password12321", description: "user password" }) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
  @IsString({ message: "It must be a string" })
  @Length(4, 16, { message: "Not less than 4 and more than 16" })
  readonly password: string;
  //
  @ApiProperty({ example: "numberphone", description: "phone number" }) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
  @IsString()
  readonly phoneNumber: string;
}
