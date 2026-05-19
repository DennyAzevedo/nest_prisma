import {
	Controller,
	Get,
	Post,
	Param,
	Query,
	Body,
	Put,
	Delete,
	ParseIntPipe,
	UseGuards
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { TasksUtils } from './tasks.utils';
import { AuthTokenGuard } from '../auth/guard/auth-token.guard';
import { PayloadTokenDto } from '../auth/dto/payload-token.dto';
import { TokenPayloadParam } from '../auth/param/token-payload.param';

@Controller('tasks')
export class TasksController {
	constructor(
		private readonly taskService: TasksService,
		private readonly tasksUtils: TasksUtils
	) { }

	@Get()
	findAllTasks(@Query() paginationDto: PaginationDto) {
		console.log(this.tasksUtils.splitString('Hello World from NestJS'))
		return this.taskService.findAll(paginationDto)
	}

	@Get(":id")
	findOneTask(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.findOne(id)
	}

	@UseGuards(AuthTokenGuard)
	@Post()
	createTask(
		@Body() createTaskDto: CreateTaskDto,
		@TokenPayloadParam() tokenPayload: PayloadTokenDto
	) {
		return this.taskService.create(createTaskDto, tokenPayload)
	}

	@UseGuards(AuthTokenGuard)
	@Put(":id")
	updateTask(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateTaskDto: UpdateTaskDto,
		@TokenPayloadParam() tokenPayload: PayloadTokenDto
	) {
		return this.taskService.update(id, updateTaskDto, tokenPayload)
	}

	@UseGuards(AuthTokenGuard)
	@Delete(":id")
	deleteTask(
		@Param("id", ParseIntPipe) id: number,
		@TokenPayloadParam() tokenPayload: PayloadTokenDto
	) {
		return this.taskService.delete(id, tokenPayload)
	}
}
