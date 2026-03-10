import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	@Get()
	getTasks() {
		//return "Listando Todas as Tarefas..."
		return this.taskService.listAllTasks()
	}

	@Get("/1")
	getTest() {
		return this.taskService.findOneTask()
	}
}
