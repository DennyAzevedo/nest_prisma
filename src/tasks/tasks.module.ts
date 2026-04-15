import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from 'src/common/filters/exception.filter';

@Module({
	imports: [DatabaseModule],
	controllers: [TasksController],
	providers: [TasksService, {
		provide: APP_FILTER,
		useClass: ApiExceptionFilter
	}]
})
export class TasksModule {}
