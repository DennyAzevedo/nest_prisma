import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { DatabaseService } from 'src/database/database.service';
import { HashingServiceProtocol } from './hash/hashing.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly DatabaseService: DatabaseService,
		private readonly hashingService: HashingServiceProtocol
	) {}

	async authenticate(SignInDto: SignInDto) {
		const user = await this.DatabaseService.user.findUnique({
			where: {
				email: SignInDto.email
			}
		});

		if (!user) {
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}

		const passwordIsValid = await this.hashingService.compare(
			SignInDto.password,
			user.passwordHash
		);

		if (!passwordIsValid) {
			throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
		}

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			message: 'Authentication successful'
		};
	}
}
