import { ApiProperty } from '@nestjs/swagger';
import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { User } from 'src/users/users.model';
interface PostCreationAttrs {
    title:string;
    content:string;
    userId:number;
    image: any;
}

@Table ({tableName:'users'})
export class EachPost extends Model <EachPost,PostCreationAttrs> {
    @Column({type:DataType.INTEGER, unique: true, autoIncrement:true,primaryKey:true})
    id: number;


    @Column({type:DataType.STRING, unique: true, allowNull:false})
    title: string;


    @Column({type:DataType.STRING, allowNull:false})
    content:string;

    @Column({type:DataType.STRING})
    image:string;

    @ForeignKey(()=> User)
    @Column({type:DataType.INTEGER})
    userId:number;

    @BelongsTo(()=> User)
    author:User;
}