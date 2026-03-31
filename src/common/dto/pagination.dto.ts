import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(50)
	@Type(() => Number)
	//limit: number -- depois de testado e usado a atribuição local, ajustar com o valor padrão
	limit?: number = 10;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Type(() => Number)
	//offset: number -- depois de testado e usado a atribuição local, ajustar com o valor padrão
	offset?: number = 0;
}