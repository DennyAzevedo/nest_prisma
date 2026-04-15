import {
	ExecutionContext,
	NestInterceptor,
	CallHandler,
	Injectable
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		//console.log('Interceptando a requisição...'); - depois de testado
		const request = context.switchToHttp().getRequest();
		const method = request.method;
		const url = request.url;
		const now = Date.now();

		//depois do primeiro teste do middleware
		console.log(request['users'])
		console.log(`[REQUEST] [${method}] ${url} - ${now} - Início da requisição...`);

		return next.handle().pipe(
			tap(() => {
				console.log(`[RESPONSE] [${method}] ${url} - ${Date.now() - now}ms - Fim da requisição...`);
			})
		);
	}
}