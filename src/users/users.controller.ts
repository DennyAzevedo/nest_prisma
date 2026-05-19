import {
	Controller,
	Get,
	Param,
	Body,
	ParseIntPipe,
	Post,
	Put,
	Delete,
	UseGuards,
	Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { Request } from 'express';
import { REQUEST_TOKEN_PAYLOAD_NAME } from '../auth/common/auth.constants';
import { TokenPayloadParam } from '../auth/param/token-payload.param';
import { PayloadTokenDto } from '../auth/dto/payload-token.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get(':id')
	findOneUser(@Param('id', ParseIntPipe) id: number) {
		//return `This action returns a user with id: ${id}`;
		return this.usersService.findOne(id);
	}

	@Post()
	createUser(@Body() createUserDto: CreateUserDto) {
		//console.log('Creating user with data:', createUserDto);
		//return 'This action creates a user';
		return this.usersService.create(createUserDto);
	}

	@UseGuards(AuthTokenGuard)
	@Put(':id')
	// depois do 1º teste com token ok
	//updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
	updateUser(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateUserDto: UpdateUserDto,
		// depois de testado
		//@Req() req: Request
		@TokenPayloadParam() tokenPayload: PayloadTokenDto
	) {
		//console.log(req[REQUEST_TOKEN_PAYLOAD_NAME]) // depois de testar
		// depois de testado
		//console.log('ID user: ', req[REQUEST_TOKEN_PAYLOAD_NAME]?.sub)
		//console.log('Token payload in controller:', tokenPayloadParam) // depois de testado

		return this.usersService.update(id, updateUserDto, tokenPayload);
	}

	@UseGuards(AuthTokenGuard)
	@Delete(':id')
	deleteUser(
		@Param('id', ParseIntPipe) id: number,
		@TokenPayloadParam() tokenPayload: PayloadTokenDto
	) {
		return this.usersService.delete(id, tokenPayload);
	}
}
