const commander = require('commander')
const database = require('./database')
const Heroi = require('./heroi')

async function main() {
  commander
    .version('1.0')
    .option('-n, --nome [value]', 'Nome do heroi')
    .option('-p, --poder [value]', 'Poder do heroi')
    .option('-i, --id [value]', 'ID do heroi')

    .option('-c, --cadastrar', 'Cadastrar heroi')
    .option('-r, --remover [value]', 'remover herois')
    .option('-a, --atualizar [value]', 'Atualizar herois')
    .option('-l, --listar', 'Listar herois')
    .parse(process.argv)
  
  const heroi = new Heroi(commander)

  try {

    if(commander.listar) {
      const dados = await database.listar()
      console.log(dados)
      return
    }

    if (commander.cadastrar) {
      const resultado = await database.cadastrar(heroi)
      if (!resultado) {
        console.log('Algum erro ;-;')
        return
      }
      console.log('Cadastrado com sucesso!!!')
    }

    if (commander.remover) {
      const resultado = await database.remover(heroi.id)
      if (!resultado) {
        console.log('Algum erro ;-;')
        return
      }
      console.log('Removido com sucesso!!!')
    }

    if (commander.atualizar) {
      const id = commander.atualizar;
      console.log('id', id);
      await database.atualizar(id, heroi);
      console.log('item atualizado com sucesso!');
      return;
    }
    
  } catch (error) {
    console.log('Erro: ',error)
  }
}

main()