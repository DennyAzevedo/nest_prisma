import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

/*
- `src/app/app.module.ts`: Módulo principal do aplicativo.
- `src/app/app.controller.ts`: Define as rotas e lida com as requisições.
- `src/app/app.service.ts`: Contém a lógica de negócio, separado do controller.
*/

// Arquivo que inicia o nosso projeto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }))
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
