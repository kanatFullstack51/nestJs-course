import { ApiProperty } from '@nestjs/swagger';
import {BelongsToMany, Column, DataType, Model, Table} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';
interface RoleCreationAttrs{
    value:string;
    description:string;
}
@Table ({tableName:'roles'})
export class Role extends Model <Role, RoleCreationAttrs>{
    @ApiProperty({example:'1', description:'Unique identifier'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.INTEGER, unique: true, autoIncrement:true,primaryKey:true})
    id:number;


    @ApiProperty({example:'ADMIN', description:'Unique role meaning'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.STRING, unique: true, allowNull:false})
    value:string;
    
    
    
    @ApiProperty({example:'Admin', description:'DEscription role'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.STRING, allowNull:false})
    description:string;

    @BelongsToMany(()=> User, ()=> UserRoles)
    users: User[];


}