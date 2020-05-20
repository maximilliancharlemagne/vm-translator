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

class codeReader {
  constructor(){
    this.readCode = (anArray) => {
      let arrayToReturn = []
      for(let index in anArray){
        let subArray = anArray.split(' ')
        let op = subArray[0]
        switch (op) {
          case 'push':
            arrayToReturn.push(this.pushHandler(subArray[1],subArray[2]))
            break;
        
          default:
            break;
        }
      }
    }
    this.pushHandler = (segment, num) => {
      //handling a push instruction
      let codeToReturn = []
      let SPCode = ['@SP','A = M','M = D','@SP','M = M + 1'] //pushes whatever is in D to the stack and increments SP
      switch (segment) {
        case 'const':
          //just pushes the constant
          //@const
          //D=A
          //@SP
          //A=M
          //M=D
          //@SP
          //M=M+1
          codeToReturn = [`//push const ${num}`,`@${num}`,'D=A']
          codeToReturn = codeToReturn.concat(SPCode)
          break;

        case 'argument':
          //pushes the value at argument num to the top of the stack
          //@2 (holds base address of argument)
          //D = M
          //@num
          //D = D+A
          //A = D
          //D = M
          //@SP
          //A=M
          //M=D
          //@SP
          //M=M+1
          codeToReturn = [`@2`,`D = M`,`@${num}`,`D = D+A`,`A = D`,`D=M`]
          codeToReturn = codeToReturn.concat(SPCode)
          break;
        case 'local':
          //pushes the value at local num to the top of the stack
          //@1 (holds base address of local)
          //D = M
          //@num
          //D = D+A
          //A = D
          //D = M
          //@SP
          //A=M
          //M=D
          //@SP
          //M=M+1
          codeToReturn = [`@1`, `D = M`, `@${num}`, `D = D+A`, `A = D`, `D=M`]
          codeToReturn = codeToReturn.concat(SPCode)
          break;
        case 'this':
          break;
        case 'that':
          break;
        case 'pointer':
          break;
        case 'temp':
          break;
        default:
          break;
      }
    }
  }
}

module.exports = codeReader