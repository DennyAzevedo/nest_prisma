import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {

	listAllTasks() {
		return [
			{id:1, task: "Comprar pão"}
		]
	}

	findOneTask() {
		return "Tarefa testes...."
	}
}
