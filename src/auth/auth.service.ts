import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcryptjs";
import { User } from "src/users/users.model";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: CreateUserDto) {
    const user = this.validateUser(userDto);
     return this.generateToken(await user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "User with such email already exists",
        HttpStatus.BAD_REQUEST
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if(user && passwordEquals){
        return user;
    }
    throw new UnauthorizedException({message:'you have incorrect email or password'})
  }
}
