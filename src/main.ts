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
    whitelist: true, // Se TRUE, remove propriedades que não estão definidas no DTO
    // podemos testar no Postman enviando um campo extra, como "extra": "valor", e ele será removido automaticamente
    transform: true, // Transforma os tipos de dados automaticamente com base nos DTOs (ex: string para number)
    // Ajustar controller e service para mostrar o transform, como é global, deve ser usado com cuidado
    // colocar com FALSE e mostrar a conversão manualmente
  })) // Habilita validação global usando DTOs
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
