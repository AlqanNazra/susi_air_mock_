
import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module.js';
import { DocumentsController } from './documents.controller.js';
import { DocumentsService } from './documents.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [DataModule, AuthModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
