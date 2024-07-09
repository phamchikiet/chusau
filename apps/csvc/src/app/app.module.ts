import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { LichsuModule } from "./lichsu/lichsu.module";
import { ThietbiModule } from "./thietbi/thietbi.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GoogleAnalyticsService } from "./google-analytics.service";
import { BaocaoModule } from './baocao/baocao.module';
import { Mau1Module } from './mau1/mau1.module';
import { Mau2Module } from './mau2/mau2.module';
import { Mau3Module } from './mau3/mau3.module';
import { HangmucModule } from './hangmuc/hangmuc.module';
import { CauhinhModule } from './cauhinh/cauhinh.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: '103.221.222.71',
        port: 3306,
        username: 'tazaspac_chikiet',
        password: '@Hikiet88',
        database: 'tazaspac_chikiet',
        autoLoadEntities: true,
        synchronize: true,
        charset: "utf8mb4"
    }),
    // TypeOrmModule.forRoot({
    //     type: 'mysql',
    //     host: '103.221.221.14',
    //     port: 3306,
    //     username: 'jtnkwfpz_chikiet88',
    //     password: '@Hikiet1988',
    //     database: 'jtnkwfpz_csvc',
    //     autoLoadEntities: true,
    //     synchronize: true,
    //     charset: "utf8mb4"
    // }),
    LichsuModule,
    AuthModule,
    UsersModule,
    ThietbiModule,
    BaocaoModule,
    Mau1Module,
    Mau2Module,
    Mau3Module,
    HangmucModule,
    CauhinhModule,
  ],
  controllers: [AppController],
  providers: [AppService,GoogleAnalyticsService],
})
export class AppModule {}
