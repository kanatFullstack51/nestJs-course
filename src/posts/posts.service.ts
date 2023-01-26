import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { EachPost } from "./posts.model";

@Injectable()
export class PostsService {
  constructor(@InjectModel(EachPost) private postRepository: typeof EachPost,
  private fileService:FilesService) {}
  async create(dto: CreatePostDto, image: any) {
    const fileName = this.fileService.createFile(image);
    const post = await this.postRepository.create({...dto, image:fileName}); 
    return post;
  }
}
