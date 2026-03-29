import { CreateTaskDto } from './dto/create.task.dto';
import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { Task } from './entities/task.entitie';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TasksService {

	private tasks: Task[] = [
		{
			id: 1,
			name: "Estudar introdução ao TDD",
			description: "Estudar as videos aulas de introdução a metodologia TDD - muito importante para a carreira",
			completed: false
		},
		{
			id: 2,
			name: "Criar primeiro endpoint REST",
			description: "Implementar um endpoint GET simples para listar tarefas",
			completed: false
		},
		{
			id: 3,
			name: "Implementar padrão Controller/Service",
			description: "Separar responsabilidades entre controller e service seguindo boas práticas",
			completed: false
		},
		{
			id: 4,
			name: "Estudar Clean Architecture",
			description: "Compreender as camadas e dependências da arquitetura limpa",
			completed: false
		},
		{
			id: 5,
			name: "Criar validações de entrada",
			description: "Validar dados recebidos no body das requisições",
			completed: false
		},
		{
			id: 6,
			name: "Implementar criação de tarefas",
			description: "Criar endpoint POST para adicionar novas tarefas",
			completed: false
		},
		{
			id: 7,
			name: "Atualizar status de tarefa",
			description: "Criar endpoint PUT para marcar tarefas como concluídas",
			completed: false
		},
		{
			id: 8,
			name: "Remover tarefa da lista",
			description: "Criar endpoint DELETE para remover tarefas por ID",
			completed: false
		},
		{
			id: 9,
			name: "Adicionar logs na aplicação",
			description: "Implementar logs básicos para rastrear requisições",
			completed: false
		},
		{
			id: 10,
			name: "Testar API com Insomnia/Postman",
			description: "Validar todos os endpoints utilizando ferramentas de teste de API",
			completed: false
		}
	];

	findAll() {
		return this.tasks;
	}

	// Depois de testar no Postman, ajustar de string para number para mostrar o transform
	findOne(id: string) {
	//findOne(id: number) {
		const task = this.tasks.find(task => task.id === Number(id));
		// const task = this.tasks.find(task => task.id === id); // ajustar para esta forma após o teste no Postman
		if (task) {
			return task;
		}
		throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
		// depois de testar no Postman, mostrar a forma abaixo
		// throw new NotFoundException("Tarefa não encontrada") // outra forma de lançar a exceção --- IGNORE ---
	}

	create(createTaskDto: CreateTaskDto) {
		const newId = this.tasks.length + 1;
		const newTask: Task = {
			id: newId,
			completed: false,
			...createTaskDto
		};
		this.tasks.push(newTask);
		return newTask;
	}

	update(id: Number, updateTaskDto: UpdateTaskDto) {
		const taskIndex = this.tasks.findIndex(task => task.id === id);
		if (taskIndex === -1) {
			throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
		}
		const taskItem = this.tasks[taskIndex];
		this.tasks[taskIndex] = {
			...taskItem,
			...updateTaskDto
		};

		return this.tasks[taskIndex]
	}

	delete(id: Number) {
		const taskIndex = this.tasks.findIndex(task => task.id === id);
		if (taskIndex === -1) {
			throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
		}
		this.tasks.splice(taskIndex, 1);
		return "Tarefa removida com sucesso!";
	}
}
