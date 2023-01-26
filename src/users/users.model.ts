import { ApiProperty } from '@nestjs/swagger';
import {BelongsToMany, Column, DataType, HasMany, Model, Table} from 'sequelize-typescript';
import { EachPost } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
interface UserCreationAttrs {
    email:string;
    password:string;
    phoneNumber:string;
}

@Table ({tableName:'users'})
export class User extends Model <User,UserCreationAttrs> {
    @ApiProperty({example:'1', description:'Unique identifier'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.INTEGER, unique: true, autoIncrement:true,primaryKey:true})
    id: number;


    @ApiProperty({example:'user@gmail.com', description:'POst adress'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.STRING, unique: true, allowNull:false})
    email: string;


    @ApiProperty({example:'123123', description:'password'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.STRING, allowNull:false})
    password:string;

    @ApiProperty({example: '996700606060', description:'number'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({ type: DataType.STRING }) 
    phoneNumber: string;


    @ApiProperty({example:'true', description:'banned or not'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.BOOLEAN, defaultValue:false})
    banned:boolean;


    @ApiProperty({example:'for burglary', description:'reason'}) // ApiProperty decorator we use for documenting stuff like that, pointing what exactly we would like to name
    @Column({type:DataType.STRING, allowNull:true})
    banReason:string;



    
    @BelongsToMany(()=> Role, ()=> UserRoles)
    roles: Role[];


    @HasMany(()=> EachPost)
    posts: EachPost[];
}