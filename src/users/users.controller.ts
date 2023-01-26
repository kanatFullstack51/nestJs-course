import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth-guards";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";
import { UsersService } from "./users.service";
// Контроллеры отвечают за обработку входящих запросов (Request) и возврат ответов (Response) клиенту.
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}


  @ApiOperation({ summary: "User creation" })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: "Getting all users alive" })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: "Выдать роль" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/role")
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  // 
  @ApiOperation({ summary: "BAN USER" })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post("/ban")
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
