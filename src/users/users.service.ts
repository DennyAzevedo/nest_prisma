import {
	HttpException,
	HttpStatus,
	Injectable,
	Post,
	Body,
	Put
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
	constructor(private readonly databaseService: DatabaseService) {}

	async findOne(id: number) {
		//console.log(`Finding user with id: ${id}`);
		//return `This action returns a user with id: ${id}`;
		const user = await this.databaseService.user.findUnique({
			where: { id },
			select: { // depois de testar o createUser, adicionei o select para não retornar o hash da senha
				id: true,
				name: true,
				email: true,
				// depois de incluir o userId e testar as inclusões das tasks
				tasks: true
			}
		});

		if (user) return user;

		throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
	}

	async create(@Body() createUserDto: CreateUserDto) {
		//console.log('Creating user with data:', createUserDto);
		//return 'This action creates a user';
		try {
			const newUser = await this.databaseService.user.create({
				data: {
					name: createUserDto.name,
					email: createUserDto.email,
					passwordHash: createUserDto.password
				},
				select: { // para evitar retornar o hash da senha
					id: true,
					name: true,
					email: true,
				}
			});

			return newUser;
		} catch (error) {
			throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		try {
			const findUser = await this.databaseService.user.findUnique({
				where: { id }
			});

			if (!findUser) {
				throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
			}

			const updatedUser = await this.databaseService.user.update({
				where: { id },
				data: {
					name: updateUserDto.name ? updateUserDto.name : findUser.name,
					passwordHash: updateUserDto.password ? updateUserDto.password : findUser.passwordHash
				},
				select: {
					id: true,
					name: true,
					email: true
				}
			});

			return updatedUser;
		} catch (error) {
			throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async delete(id: number) {
		try {
			const findUser = await this.databaseService.user.findUnique({
				where: { id }
			});

			if (!findUser) {
				throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
			}

			await this.databaseService.user.delete({
				where: { id }
			});

			return { message: 'User deleted successfully' };
		} catch (error) {
			throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
