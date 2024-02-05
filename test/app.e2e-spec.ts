// make a database for testing!
// Every we run tests, clean up data
// We must call request like we do with Postman
// How to open prisma studio on "TEST" database
// npx dotenv -e .env.test -- prisma studio
// npx dotenv -e .env -- prisma studio
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import pactum from 'pactum';

const PORT = 3100;

describe('App EndToEnd tests', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication<INestApplication>();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    await app.listen(PORT);

    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabases();
    pactum?.request.setBaseUrl(`http://localhost:${PORT}`);
  });

  describe('TEST AUTHENTICATION', () => {
    describe('Register', () => {
      it('Should show error with empty email', () => {
        return pactum
          ?.spec() // Corrected here
          .post('/auth/register')
          .withBody({
            email: '',
            password: 'a12345',
          })
          .expectStatus(400);
      });
      it('Should show error with invalid email formatter', () => {
        return pactum
          ?.spec() // Corrected here
          .post('/auth/register')
          .withBody({
            email: 'abc',
            password: 'a12345',
          })
          .expectStatus(400);
      });
      it('Should show error with empty password', () => {
        return pactum
          ?.spec() // Corrected here
          .post('/auth/register')
          .withBody({
            email: 'abc@gmail.com',
            password: '',
          })
          .expectStatus(400);
      });

      it('Should register success', () => {
        return pactum
          ?.spec() // Corrected here
          .post('/auth/register')
          .withBody({
            email: 'test@gmail.com',
            password: 'a12345',
          })
          .expectStatus(200);
      });
    });
    describe('Login', () => {
      it('Should Login', () => {
        return pactum
          ?.spec()
          .post('/auth/login')
          .withBody({
            email: 'test123@gmail.com',
            password: '12345',
          })
          .expectStatus(201)
          .inspect()
          .stores('accessToken', 'accessToken'); //stores variables for next request
      });
    });

    describe('User', () => {
      describe('Get detail user', () => {
        it('Should get detail user', async () => {
          return await pactum
            ?.spec()
            .get('/users/me')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .expectStatus(200)
            .stores('userId', 'id')
            .inspect();
        });
      });
    });

    describe('Note', () => {
      describe('Insert note', () => {
        it('insert first note', () => {
          return pactum
            ?.spec()
            .post('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withBody({
              title: 'This is title 2',
              description: 'description 2',
              url: 'www.yahoo.com',
            })
            .expectStatus(201)
            .stores('noteId01', 'id');
        });
        it('insert second note', () => {
          return pactum
            ?.spec()
            .post('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withBody({
              title: 'This is title 33333',
              description: 'description 33333',
              url: 'www.yahoo.com',
            })
            .expectStatus(201)
            .stores('noteId02', 'id');
        });
        it('Get note by Id', () => {
          return pactum
            ?.spec()
            .get('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withPathParams('id', '$S{noteId01}')
            .expectStatus(200);
        });
        it('Get all notes', () => {
          return pactum
            ?.spec()
            .get('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .inspect()
            .expectStatus(200);
        });
        it('Get all notes', () => {
          return pactum
            ?.spec()
            .get('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .inspect()
            .expectStatus(200);
        });
        it('Delete note by Id', () => {
          return pactum
            ?.spec()
            .delete('/notes')
            .withHeaders({
              Authorization: 'Bearer $S{accessToken}',
            })
            .withQueryParams('id', '$S{noteId02}')
            .inspect()
            .expectStatus(200);
        });
      });
    });
  });

  afterAll(async () => {
    app.close();
  });

  it.todo('should PASS, ahihi');
  it.todo('should PASS, ahihi111');
});
