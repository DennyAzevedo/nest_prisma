import {
	Controller,
	Get,
	Post,
	Param,
	Query,
	Body,
	Put,
	Delete
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
		return this.taskService.findOne(id)
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto) {
		return this.taskService.create(createTaskDto)
	}

	@Put(":id")
	updateTask(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
		return this.taskService.update(id, updateTaskDto)
	}

	@Delete(":id")
	deleteTask(@Param("id") id: string) {
		return this.taskService.delete(id)
	}
}
