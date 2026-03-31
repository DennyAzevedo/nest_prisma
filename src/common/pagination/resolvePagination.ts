import { PaginationDto } from '../dto/pagination.dto';

export function resolvePagination(paginationDto?: PaginationDto) {
	return {
		limit: paginationDto?.limit ?? 10, // Define um valor padrão de 10 para limit
		offset: paginationDto?.offset ?? 0 // Define um valor padrão de 0 para offset
	}
}