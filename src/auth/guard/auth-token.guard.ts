import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'
import { ConfigType } from '@nestjs/config/dist/types/config.type'
import jwtConfig from '../config/jwt.config'
import { REQUEST_TOKEN_PAYLOAD_NAME } from '../common/auth.constants'

@Injectable()
export class AuthTokenGuard implements CanActivate {
	// depois do 1º teste no postman, colocar o constructor
	constructor(
		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly JwtService: JwtService
	) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request: Request = context.switchToHttp().getRequest();
		const token = this.extractTokenHeader(request);

		// console.log('Extracted token:', token);
		// depois do 1º teste no postman
		if (!token) {
			throw new UnauthorizedException('Token is missing')
		}

		try {
			const payload = await this.JwtService.verifyAsync(token, this.jwtConfiguration)
			//console.log('Token payload:', payload); // depois de testado com o token ok, comentar
			// colocar após do 1º teste com token ok
			request[REQUEST_TOKEN_PAYLOAD_NAME] = payload // Armazena o payload do token no objeto de solicitação para uso posterior
		} catch (error) {
			throw new UnauthorizedException('Unauthorized')
		}

		return true
	}

	extractTokenHeader(request: Request) {
		const authorization = request.headers?.authorization;
		if (!authorization || typeof authorization !== 'string') {
			return
		}

		//return authorization - depois do primeiro teste no postman
		return authorization.split(' ')[1]; // Extrai o token do formato "Bearer <token>"
	}
}
