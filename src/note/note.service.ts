import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InsertNoteDTO, UpdateNoteDTO } from './dto';

@Injectable()
export class NoteService {
  constructor(private prismaService: PrismaService) {}
  async insertNote(userId: number, insertNoteDTO: InsertNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        title: insertNoteDTO.title,
        description: insertNoteDTO.description,
        url: insertNoteDTO.url,
        user: { connect: { id: userId } }, // Assuming a relationship between Note and User
      },
    });
    return note;
  }
  getNotes(userId: number) {
    const notes = this.prismaService.note.findMany({
      where: {
        userId,
      },
    });

    return notes;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getNoteById(noteId: number) {
    return this.prismaService.note.findFirst({
      where: {
        id: noteId,
      },
    });
  }

  updateNoteById(
    noteId: number, //validate noteId is "number"
    updateNoteDTO: UpdateNoteDTO,
  ) {
    const note = this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find note to update');
    }
    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: { ...updateNoteDTO },
    });
  }

  async deleteNoteById(noteId: number) {
    const note = await this.prismaService.note.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note || note === null) {
      return {
        success: false,
        message: 'Note not found. Deletion unsuccessful.',
      };
    }

    const result = await this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });

    console.log('VVVRESULT: ', result);
    return { success: true, message: 'Note deleted successfully.' };
  }
}
