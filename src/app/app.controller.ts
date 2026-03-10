import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

//@Controller("/api") - depois de mostrar voltar ao normal
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/teste")
  getTest() {
    return "Rota de teste da API"
  }

  @Post("/teste")
  createTeste() {
    return "Rota Post funcionando"
  }
}
