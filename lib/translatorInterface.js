const fs = require('fs')
const path = require('path')
const codeReader = require('./codeReader.js')

class translatorInterface {
  constructor(){
    this.takeInput = (filename) => {
      fs.readFile(path.resolve(`./input/${filename}`), 'utf8', (err, data) => {
        if(err){
          console.log(err)
        }
        this.stringProcessor(data)
      })
    }
    this.stringProcessor = (myData) => {
      let myLineArray = myData.split('\n')
      for(let index in myLineArray){
        myLineArray[index] = myLineArray[index].trim()
      }
      let myReader = new codeReader
      let asmCode = myReader.readCode(myLineArray) //takes an array of lines of VM code, returns an array of lines of Hack ASM code
    }
  }
}

module.exports = translatorInterface