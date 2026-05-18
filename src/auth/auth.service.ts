import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { DatabaseService } from 'src/database/database.service';
import { HashingServiceProtocol } from './hash/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import e from 'express';

@Injectable()
export class AuthService {
	constructor(
		private readonly DatabaseService: DatabaseService,
		private readonly hashingService: HashingServiceProtocol,

		@Inject(jwtConfig.KEY)
		private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
		private readonly jwtService: JwtService
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

		const token = await this.jwtService.signAsync(
			{
				sub: user.id,
				email: user.email,
			},
			{
			secret: this.jwtConfiguration.secret,
			expiresIn: this.jwtConfiguration.ttl,
			audience: this.jwtConfiguration.audience,
			issuer: this.jwtConfiguration.issuer,
			}
		);
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			token
		};
	}
}
