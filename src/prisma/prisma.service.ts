import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          // we need to secure this!
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }
  cleanDatabases() {
    // In a 1-N relation, delete N firstly, then delete 1
    // transaction đảm bảo các lệnh đều phải hoàn thành xong thì mới được, 1 lệnh ko hoàn thành thì ko được
    return this.$transaction([this.note.deleteMany(), this.user.deleteMany()]);
  }
}
