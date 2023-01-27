import { Module, Post } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesService } from "./roles/roles.service";
import { RolesController } from "./roles/roles.controller";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/roles.model";
import { UserRoles } from "./roles/user-roles.model";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { AuthModule } from "./auth/auth.module";
// import { PostsModule } from './posts/posts.module';
// import {OnePost} from 'src/posts/posts.model';
// import { FilesModule } from "./files/files.module";
// import { PostsService } from "./posts/posts.service";
// import { PostsController } from "./posts/posts.controller";
// import { PostsModule } from "./posts/posts.module";
// import { EachPost } from "./posts/posts.model";
import { AuthService } from "./auth/auth.service";
import { AuthController } from "./auth/auth.controller";

@Module({
  // controllers: [RolesController, UsersController, AuthController, PostsController],
  // providers: [RolesService, UsersService, PostsService, AuthService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  // providers: [PostsService],
  // controllers: [PostsController],
})
export class AppModule {}
