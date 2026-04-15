import { Injectable, NestMiddleware } from "@nestjs/common";
import {
	Request,
	Response,
	NextFunction
} from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const authorization = req.headers.authorization

		/* depois de textar, retirar este comando e colocar o abaixo
		if (authorization) {
			if (authorization === '123456') {
				return next()
			}
			res.status(401).json({ message: 'Token inválido' })
		}
		*/
		if (authorization) {
			req['users'] = {
				token: authorization
			}
		}
		next()
	}
}
