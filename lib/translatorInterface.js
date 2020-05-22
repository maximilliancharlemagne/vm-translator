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
        let newCode = this.stringProcessor(data,filename)
        this.makeNewFile(filename,newCode)
      })
    }
    this.stringProcessor = (myData,myFilename) => {
      let myLineArray = myData.split('\n')
      for(let index in myLineArray){
        myLineArray[index] = myLineArray[index].trim()
      }
      let myReader = new codeReader(myFilename)
      let asmCode = myReader.readCode(myLineArray) //takes an array of lines of VM code, returns an array of lines of Hack ASM code
      return asmCode
    }
    this.makeNewFile = (aVMFilename,someCode) => {
      let splitArr = aVMFilename.split('.')
      let newName = splitArr[0]
      fs.writeFile(path.resolve(`./output/${newName}.asm`),someCode,err => console.log(err))
    }
  }
}

module.exports = translatorInterface