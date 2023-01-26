import { Inject, Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { User } from 'src/users/users.model';
import { CreatePostDto } from './dto/create-post.dto';
import { OnePost } from './posts.model';

@Injectable()
export class PostsService {

    constructor(
        @InjectModel(OnePost) private postRepository:typeof OnePost,
        @InjectModel(User) private userRepository,
                private fileService: FilesService){}

    async create(dto: CreatePostDto, image:any){
        const user = await this.userRepository.findOne({where: {id: dto.userId}});
        const fileName = await this.fileService.createFile(image);
        const post = await this.postRepository.create({title: dto.title, content: dto.content, userId: user, image:fileName});
        return post;
    }
}
