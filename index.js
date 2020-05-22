const { prompt } = require('inquirer')
const fs = require('fs')
const path = require('path')
const translatorInterface = require('./lib/translatorInterface')

//TO DO
//Write remaining ops
//Write jest tests for the assembly code?

//STYLE WISHLIST
//rewrite push and pop
//break out all operations into a separate lib, far away from codeReader

console.log(path.join(__dirname, '/input'))

const mainMenu = (inputDirFileList) => {
  let myList = {
    type: 'list',
    name: 'choice',
    message: `Please choose a file to translate.`,
    choices: inputDirFileList
  }

  prompt(myList)
  .then(({choice}) => {
    let myInterface = new translatorInterface
    // console.log(choice)
    // console.log(typeof choice) problem's not here
    myInterface.takeInput(choice)
  })
  .catch(err => {
    if(err){
      console.log(err)
    }
  })
}

const fileListMaker = () => { //from https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
  fs.readdir(path.join(__dirname,'/input'),(err,files) => {
    if(err){
      return console.log('Unable to scan directory: ' + err);
    }
    
    let fileList = []

    files.forEach(function (file) {
      // Do whatever you want to do with the file
      fileList.push(file)
    });
    mainMenu(fileList) 
  })
}

fileListMaker()

//take in the filepath

//pass it to the takeInput method of the translatorInterface class

//read the file, line by line

//instructions to implement:
//MEMORY LOCATIONS
//RAM[0] -> base address of SP
//RAM[1] -> base address of LCL, allocated dynamically
//RAM[2] -> base address of ARG, allocated dynamically
//RAM[3] -> base address of THIS, allocated dynamically
//RAM[4] -> base address of THAT, allocated dynamically
//RAM[5] - RAM[12] -> temp
//RAM[13] - RAM[15] -> general purpose
//RAM[16] - RAM[255] -> static
//RAM[0x100] -> base address of the stack
//MEMORY ACCESS
//push <segment> <index>
//pop <segment> <index>
//valid segments:
//argument (ARG)
//local (LCL)
//static -> static variable i in file Xxx should be translated to asm symbol Xxx.i
//constant (holds constants 0 - 32767)
//this (THIS)
//that (THAT)
//pointer
//pointer[0] -> base address of this
//pointer[1] -> base address of that
//temp (size 8)
//ARITHMETIC / LOGICAL
//add
//sub
//neg
//eq
//gt
//lt
//and (bitwise)
//or (bitwise)
//not (bitwise)