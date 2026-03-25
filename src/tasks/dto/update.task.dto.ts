import { IsString, IsOptional, IsBoolean, MinLength } from "class-validator";

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