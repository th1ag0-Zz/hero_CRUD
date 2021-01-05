const { deepStrictEqual, ok } = require('assert')
const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
  id: 1,
  nome: 'Flash',
  poder: 'speed'
}

const DEFAULT_ITEM_ATUALIZAR = {
  id: 2,
  nome: 'Batman',
  poder: 'dinheiro'
}

describe('Suite de manipulação de Herois', () => {

  before( async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
  })

  it("deve pesquisar os herois", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const [resultado] = await database.listar(expected.id)
    deepStrictEqual(resultado, expected)
  })

  it('deve cadastrar um heroi usando arquivos', async () => {
    const expected = DEFAULT_ITEM_CADASTRAR
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
    const [atual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
    deepStrictEqual(atual, expected)
  })

  it('deve deletar o heroi pelo id', async () => {
    const expected = true
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
    deepStrictEqual(resultado, expected)
  })

  it('deve atualizar um heroi pelo id', async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: 'Hulk',
      poder: 'força'
    }
    const novoDado = {
      nome: 'Hulk',
      poder: 'força'
    }
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
    deepStrictEqual(resultado, expected)
  })
})