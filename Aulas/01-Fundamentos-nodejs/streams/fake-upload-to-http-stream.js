import {Readable} from 'node:stream'

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

  fetch('http://localhost:3334', {
   method: 'POST',
   body: new OneToHundredStream(),
   duplex: 'half', // Necessário para streams no Node.js
}).then(response => {
   return response.text();
}).then(data => {
   console.log(data);
});
