import { ApiProperty } from '@nestjs/swagger';
import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Role } from './roles.model';
@Table ({tableName:'user_roles', createdAt:false, updatedAt:false})
export class UserRoles extends Model <UserRoles>{


    @Column({type:DataType.INTEGER, unique: true, autoIncrement:true,primaryKey:true})
    id:number;

    @ForeignKey(()=> Role)
    @Column({type:DataType.INTEGER})
    roleId:number;
    // USING @FOREIGNKEY WE REFER TO FOREIGN MODELS TO TAKE SOME DIFFERENT SORT OF KEYS, FOR INSTANCE I TAKE THIS FOREIGN KEY FROM ROLE MODEL
    

    @ForeignKey(()=> User)
    @Column({type:DataType.INTEGER})
    userId:number;
}