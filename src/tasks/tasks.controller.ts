import {
	Controller,
	Get,
	Post,
	Param,
	Query,
	Body,
	Put,
	Delete,
	ParseIntPipe
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dto/update.task.dto';
import { CreateTaskDto } from './dto/create.task.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
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
