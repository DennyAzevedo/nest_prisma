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
	UseInterceptors
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { LoggerInterceptor } from '../common/interceptors/logger.interceptor';
import { BodyCreateTaskInterceptor } from 'src/common/interceptors/body-create-task.interceptor';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('tasks')
	//@UseInterceptors(LoggerInterceptor)
	// Podemos usar o interceptor para todas as rotas do controller, ou apenas para rotas específicas,
	// como a rota de listagem de tarefas, por exemplo.
	// Depois de testado, podemos decidir onde aplicar o interceptor.
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	@UseInterceptors(LoggerInterceptor)
	@UseInterceptors(AddHeaderInterceptor)
	// Depois de testado no Postmamp, podemos definir um DTO para os parâmetros de consulta
	//findAllTasks(@Query() params: any) {
	findAllTasks(@Query() paginationDto: PaginationDto) {
		//console.log(params)
		//console.log(paginationDto)
		return this.taskService.findAll(paginationDto)
	}

	@Get(":id")
	findOneTask(@Param('id', ParseIntPipe) id: number) {
		return this.taskService.findOne(id)
	}

	@Post()
	@UseInterceptors(BodyCreateTaskInterceptor)
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.taskService.create(createTaskDto)
	}

	@Put(":id")
	updateTask(@Param("id", ParseIntPipe) id: number, @Body() updateTaskDto: UpdateTaskDto) {
		return this.taskService.update(id, updateTaskDto)
	}

	@Delete(":id")
	deleteTask(@Param("id", ParseIntPipe) id: number) {
		return this.taskService.delete(id)
	}
}
