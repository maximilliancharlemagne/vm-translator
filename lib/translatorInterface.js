const fs = require('fs')
const path = require('path')

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
      console.log(myLineArray)
    }
  }
}

module.exports = translatorInterface