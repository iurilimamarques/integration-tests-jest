import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Seguradora API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://zzvpewgygcnfnivbrqtm.supabase.co/rest/v1';
  const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6dnBld2d5Z2NuZm5pdmJycXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2ODY2OTMsImV4cCI6MjA5MTI2MjY5M30.DDDlG41TTzXa4Hor3irGmklPlkpYy4ZvKl1u0j4EeeI';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('CARROS - Verifying endpoints using GET method', () => {
    it('Should retrieve all cars', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carros`)
        .withHeaders({ apiKey })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('CARROS - Verifying endpoints using POST method', () => {
    it('Should create a new car', async () => {
      await p
        .spec()
        .post(`${baseUrl}/carros`)
        .withHeaders({ apiKey })
        .withJson({
          placa: 'BRA2E19',
          fabricante: 'ford',
          cor: 'vermelha'
        })
        .expectStatus(StatusCodes.CREATED);
    });
  });

  describe('APOLICES - Verifying endpoints using GET method', () => {
    it('Should retrieve all policies', async () => {
      await p
        .spec()
        .get(`${baseUrl}/apolices`)
        .withHeaders({ apiKey })
        .expectStatus(StatusCodes.OK);
    });
  });

  describe('APOLICES - Verifying endpoints using POST method', () => {
    it('Should create a new policy', async () => {
      await p
        .spec()
        .post(`${baseUrl}/apolices`)
        .withHeaders({ apiKey })
        .withJson({
          id_carro: 2,
          nome: 'Iuri de Lima Marques',
          dt_nascimento: '28/02/2001'
        })
        .expectStatus(StatusCodes.CREATED);
    });
  });
});
