import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import bodyParser = require("body-parser");
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3300;
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  const config = new DocumentBuilder()
  .setTitle('Cơ sở vật chất API')
  .setDescription('Mô tả API của cơ sở vật chất')
  .setVersion('0.1')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('ui', app, document);
  await app.listen(port);
}
bootstrap();
