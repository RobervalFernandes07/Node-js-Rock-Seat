// Fundamentos streams


// process.stdin
  //  .pipe(process.stdout)

  import { Readable, Writable, Transform } from 'node:stream'

  class OneToHundredStream extends Readable{
   index = 1
   
   //Método de leitura obrigatoriamente.
   _read(){
      const i = this.index++

      setTimeout(() =>{
         if (  i > 10){
            this.push(null)
         } else{
            const buf = Buffer.from(String(i))
   
            this.push(buf)
         }
      },1000)
   }

  }

  class InverseNumberStream extends Transform{
   _transform(chunk, enconding , callback){
      const transformed = Number(chunk.toString()) * -1

      callback(null, Buffer.from(String(transformed)))
   }
  }

  class MultiplyByTenStream extends Writable{
   _write(chunk,enconding,callback){
      console.log(Number(chunk.toString())*10)
      callback()
   }
  }

new OneToHundredStream()
   .pipe(new InverseNumberStream())
   .pipe(new MultiplyByTenStream())

 