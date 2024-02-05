import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';
import { NoteService } from './note.service';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  getNotes(@GetUser('id') userId: number) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id') //example: /notes/123
  getNoteById(@Param('id') noteId: number) {
    this.noteService.getNoteById(noteId);
  }

  @Post()
  async insertNote(
    @GetUser('id') userId: number,
    @Body(new ValidationPipe()) insertNoteDTO: InsertNoteDTO,
  ) {
    try {
      const result = await this.noteService.insertNote(userId, insertNoteDTO);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.response,
      };
    }
  }

  @Patch(':id')
  updateNoteById(
    @Param('id', ParseIntPipe) noteId: number, //validate noteId is "number"
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    return this.noteService.updateNoteById(noteId, updateNoteDTO);
  }

  @Delete()
  deleteNoteById(@Query('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNoteById(noteId);
  }
}
