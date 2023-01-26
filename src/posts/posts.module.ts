import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { PostsController } from './posts.controller';
import { EachPost } from './posts.model';
import { PostsService } from './posts.service';

@Module({
    providers: [PostsService],
    controllers:[PostsController],
    imports:[
        SequelizeModule.forFeature([User, EachPost]),
        FilesModule
    ]
})
export class PostsModule {}
