import { CreateTaskDto } from './dto/create.task.dto';
import {
	HttpException,
	HttpStatus,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { Task } from './entities/task.entitie';
import { UpdateTaskDto } from './dto/update.task.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TasksService {
	constructor(private readonly databaseService: DatabaseService) { }

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

	async findAll() {
		const allTasks = await this.databaseService.task.findMany();

		return allTasks;
	}

	async findOne(id: number) {
		const task = await this.databaseService.task.findUnique({
			where: {
				id
			}
		});
		if (task) {
			return task;
		}
		throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
	}

	async create(createTaskDto: CreateTaskDto) {
		try {
			const newTask = await this.databaseService.task.create({
				data: {
					name: createTaskDto.name,
					description: createTaskDto.description
				}
			});

			return newTask;
		} catch (error) {
			throw new HttpException("Erro ao criar tarefa", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async update(id: number, updateTaskDto: UpdateTaskDto) {
		try {
			const findTask = await this.databaseService.task.findUnique({
				where: {
					id
				}
			});
			if (!findTask) {
				throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
			}
			const updatedTask = await this.databaseService.task.update({
				where: {
					id
				},
				data: updateTaskDto
			});

			return updatedTask;
		} catch (error) {
			throw new HttpException("Erro ao atualizar tarefa", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async delete(id: number) {
		try {
			const findTask = await this.databaseService.task.findUnique({
				where: {
					id
				}
			});
			if (!findTask) {
				throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND);
			}
			await this.databaseService.task.delete({
				where: {
					id
				}
			});

			return { "message": "Tarefa removida com sucesso!" };
		} catch(error) {
			throw new HttpException("Erro ao remover tarefa", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
