import { IsOptional, IsBoolean } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create.task.dto';
/*
export class UpdateTaskDto {
	@IsString()
	@IsOptional()
	@MinLength(5, { message: 'Name must be at least 5 characters long' })
	readonly name?: string;

	@IsString()
	@IsOptional()
	@MinLength(10, { message: 'Description must be at least 10 characters long' })
	readonly description?: string;

	@IsBoolean()
	@IsOptional()
	readonly completed?: boolean;
}
*/
// O PartialType é uma função que recebe um DTO e retorna um novo DTO com todas as propriedades opcionais.
// Isso é útil para evitar a repetição de código ao criar DTOs de atualização que são semelhantes aos
// DTOs de criação, mas com todas as propriedades opcionais.
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
	@IsBoolean()
	@IsOptional()
	readonly completed?: boolean;
}