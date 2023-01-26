import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { RoleEnum } from "./enums/role.enum";
import { User } from "./users.model";

// SERVICES MUST USE @INJECTABBLE TO BE INJECTED IN CONTROLLERS, 
// ALSO THEY SERVE AS A BASIS FOR FUNCTIONS WHICH WE USE BY REFERING TO SERVICE IN CONTROLLERS.
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) { }  
    // we use this to make changes for this model in database

  async createUser(dto: CreateUserDto) {
    const phoneNumber = dto.phoneNumber.toString();
    const user = await this.userRepository.create({...dto,phoneNumber});
    const role = await this.roleService.getRoleByValue("USER");
    await user.$set('roles', [role?.id]);
    user.roles = [role];
    return user;
  }
  // 
  async getAllUsers() {
    const users = await this.userRepository.findAll({include: {all:true}});
    return users;
  }
  // 
  async getUserByEmail(email:string){
    const user = await this.userRepository.findOne({where: {email}, include:{all:true}});
    return user;
  }
  // 
  async addRole(dto: AddRoleDto){
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if(role && user){
      await user.$add('role', role.id);
       return dto;
    }
    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);

  }
  async ban(dto: BanUserDto){
    const user = await this.userRepository.findByPk(dto.userId);
    if(!user){
    throw new HttpException('User or role was not found', HttpStatus.NOT_FOUND);
    }
    user.banned = dto.ban;
    if(!dto.ban){
      user.banReason=null;
    }else user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
