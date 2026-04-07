import { CreateTaskDto } from './dto/create.task.dto';
import {
	HttpException,
	HttpStatus,
	Injectable
} from '@nestjs/common';
import { UpdateTaskDto } from './dto/update.task.dto';
import { DatabaseService } from '../database/database.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { resolvePagination } from '../common/pagination/resolvePagination';

@Injectable()
export class TasksService {
	constructor(private readonly databaseService: DatabaseService) { }

	async findAll(paginationDto: PaginationDto) {
		//const { limit = 10, offset = 0 } = paginationDto || {};
		const { limit, offset } = resolvePagination(paginationDto);
		const allTasks = await this.databaseService.task.findMany({
			take: paginationDto.limit,
			skip: paginationDto.offset,
			orderBy: {
				createdAt: 'desc'
			}
		});

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
					description: createTaskDto.description,
					completed: false,
					userId: createTaskDto.userId
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
