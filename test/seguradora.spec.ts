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

    it('Should retrieve all cars and validate response is array', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carros`)
        .withHeaders({ apiKey })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([]);
    });

    it('Should retrieve cars with limit parameter', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carros`)
        .withHeaders({ apiKey })
        .withQueryParams('limit', '5')
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

    it('Should create another car with different data', async () => {
      await p
        .spec()
        .post(`${baseUrl}/carros`)
        .withHeaders({ apiKey })
        .withJson({
          placa: 'ABC1234',
          fabricante: 'volkswagen',
          cor: 'azul'
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('Should create a car and return created data', async () => {
      await p
        .spec()
        .post(`${baseUrl}/carros`)
        .withHeaders({ apiKey })
        .withJson({
          placa: 'XYZ9999',
          fabricante: 'fiat',
          cor: 'preta'
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

    it('Should retrieve all policies and validate response is array', async () => {
      await p
        .spec()
        .get(`${baseUrl}/apolices`)
        .withHeaders({ apiKey })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike([]);
    });

    it('Should retrieve policies with limit parameter', async () => {
      await p
        .spec()
        .get(`${baseUrl}/apolices`)
        .withHeaders({ apiKey })
        .withQueryParams('limit', '10')
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

    it('Should create another policy with different data', async () => {
      await p
        .spec()
        .post(`${baseUrl}/apolices`)
        .withHeaders({ apiKey })
        .withJson({
          id_carro: 3,
          nome: 'João Silva Santos',
          dt_nascimento: '15/05/1990'
        })
        .expectStatus(StatusCodes.CREATED);
    });

    it('Should create a policy and return created data', async () => {
      await p
        .spec()
        .post(`${baseUrl}/apolices`)
        .withHeaders({ apiKey })
        .withJson({
          id_carro: 4,
          nome: 'Maria Oliveira Costa',
          dt_nascimento: '10/12/1985'
        })
        .expectStatus(StatusCodes.CREATED);
    });
  });

  describe('API - Verifying headers and response validation', () => {
    it('Should validate apiKey header is required for carros GET', async () => {
      await p
        .spec()
        .get(`${baseUrl}/carros`)
        .expectStatus(StatusCodes.UNAUTHORIZED);
    });

    it('Should validate apiKey header is required for apolices GET', async () => {
      await p
        .spec()
        .get(`${baseUrl}/apolices`)
        .expectStatus(StatusCodes.UNAUTHORIZED);
    });
  });
});
