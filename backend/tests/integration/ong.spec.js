const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => { // eh executada antes de cada teste
    await connection.migrate.rollback(); // zerando o banco de dados antes do teste
    await connection.migrate.latest(); // mesma coisa que o comando "knex migrate:latest"
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('shold be able to create a new ONG', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
      name: "Teste OmniStack",
      email: "contato@ongs.com.br",
      whatsapp: "84999999999",
      city: "Natal",
      uf: "RN"
    });

    //console.log(response.body);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
})