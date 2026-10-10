
import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard.js';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService,) {}
  @Get()
  getDocuments() {
    return this.documentsService.getDocuments();
  }
}
