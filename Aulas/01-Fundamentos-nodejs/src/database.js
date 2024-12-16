//
import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)

export class DataBase{
    #datebase = {}
    
    // Criará um arquivo em branco caso ainda não tenha dados no db.json
    constructor(){
        fs.readFile(databasePath, 'utf8')
          .then(data => {
            this.#datebase = JSON.parse(data)
          })
          .catch(() => {
            this.#persist()
          })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#datebase))
    }

    select(table){
      const data = this.#datebase[table] ?? []

      return data
    }

    insert (table,data){
      if (Array.isArray(this.#datebase[table])){
        this.#datebase[table].push(data)
      } else{
        this.#datebase[table] = [data]
      }

      this.#persist();

      return data;
    }
}
