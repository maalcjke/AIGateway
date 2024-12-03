import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  const config = new DocumentBuilder()
    .setTitle('OpenAI-Proxy')
    .setDescription('API Geteway for AI services')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
