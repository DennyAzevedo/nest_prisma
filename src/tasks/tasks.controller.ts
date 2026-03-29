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

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	findAllTasks() {
		return this.taskService.findAll()
	}

	@Get(":id")
	findOneTask(@Param('id') id: string) {
	// depois de testar como string, fazer o ajuste abaixo para mostrar o transform
	// findOneTask(@Param('id') id: number) {
	// depois mostar a conversão manualmente, retirando o transform global
	// findOneTask(@Param('id', ParseIntPipe) id: number) {
	// Isso gera uma exceção no validation, não seguindo adiante
	// depois usar o ParseIntPipe nos outros endpoints também
		console.log(id)
		console.log(typeof id)
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
