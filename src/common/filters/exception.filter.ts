import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException
} from "@nestjs/common";
import { Request, Response } from "express";
import path from "path";
import { timestamp } from "rxjs";


@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();
		const errorResponse = exception.getResponse();

		console.log('Passando pelo filtro de exceção');

		response.status(400).json({
			//message: 'testes'
			//message: errorResponse
			message: errorResponse !== '' ? errorResponse : 'Ocorreu um erro inesperado',
			// apagar a mensagem no service para testar
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url
		})
	}
}