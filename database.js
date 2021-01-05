const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile) 

class Database {
  constructor() {
    this.NOME_ARQUIVO = 'herois.json'
  }
  
  async obterDadosArquivos() {
    const arquivo = await readFileAsync(this.NOME_ARQUIVO, "utf8")
    return JSON.parse(arquivo.toString())
  }

  async escreverArquivo(dados) {
    await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    return true
  }

  async cadastrar(heroi) {
    const dados = await this.obterDadosArquivos();
    //workaround para simular um id
    const id = heroi.id <= 2 ? heroi.id : Date.now();
    const heroiComId = {
      ...heroi,
      id,
    };

    return await this.escreverArquivo([...dados, heroiComId]);
  }

  async listar(id) {
    const dados = await this.obterDadosArquivos()
    const dadosFiltrados = dados.filter( item => id ? (item.id == id) : true )
    return dadosFiltrados
  }

  async remover(id) {
    if (!id) {
      return await this.escreverArquivo([])
    }

    const dados = await this.obterDadosArquivos()
    const indice = dados.findIndex(item => item.id === parseInt(id))

    if (indice === -1) {
      throw Error('O usuario não existe')
    }
    
    dados.splice(indice, 1)
    return await this.escreverArquivo(dados)
  }

  async atualizar(id, atualizacoes) {
    const dados = await this.obterDadosArquivos();
    const indice = dados.findIndex(item => item.id === parseInt(id));
    if (indice === -1) {
      throw Error('heroi não existe!');
    }

    const atual = dados[indice];
    dados.splice(indice, 1);

    const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
    const dadoAtualizado = Object.assign({}, atual, objAtualizado);

    return await this.escreverArquivo([...dados, dadoAtualizado]);
  }

}

module.exports = new Database