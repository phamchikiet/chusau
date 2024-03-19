import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { LichsuModule } from "./lichsu/lichsu.module";
import { ThietbiModule } from "./thietbi/thietbi.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: '103.221.221.14',
        port: 3306,
        username: 'jtnkwfpz_chikiet88',
        password: '@Hikiet1988',
        database: 'jtnkwfpz_csvc',
        autoLoadEntities: true,
        synchronize: true,
        charset: "utf8mb4"
    }),
    LichsuModule,
    AuthModule,
    UsersModule,
    ThietbiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
