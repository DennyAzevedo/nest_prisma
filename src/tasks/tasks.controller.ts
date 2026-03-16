import {
	Controller,
	Get,
	Post,
	Param,
	Query,
	Body,
	Patch,
	Delete
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly taskService: TasksService) {}

	// depois de testar o @Params
	@Get()
	// depois dos testes do @query, retirar do código
	//findAllTasks(@Query() queryParam: any) {
	findAllTasks() {
		//return "Listando Todas as Tarefas..."
		return this.taskService.findAll()
	}

// depois de testar no Postman, modificar
/*
	@Get(":id")
	findOneTask(@Param() params: any) {
		console.log(params)
		return this.taskService.findOne()
	}
*/

	@Get(":id")
	findOneTask(@Param('id') id: string) {
		//console.log(id)
		return this.taskService.findOne(id)
	}

	@Post()
	createTask(@Body() body: any) {
		//console.log(body)
		return this.taskService.create(body)
	}

	@Patch(":id") // pode ser utilizado Put
	updateTask(@Param("id") id: string, @Body() body: any) {
		console.log("ID: ", id)
		console.log("body: ", body)

		return "Atualizando tarefa..."
	}

	@Delete(":id")
	deleteTask(@Param("id") id: string) {
		console.log("ID: ", id)

		return "Deletar a tarefa com id: " + id
	}
}
