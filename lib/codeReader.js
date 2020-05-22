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
    this.readCode = (anArray,aFilename) => {
      let arrayToReturn = []
      for(let index in anArray){
        let subArray = anArray[index].split(' ')
        let op = subArray[0]
        switch (op) {
          case 'push':
            arrayToReturn.push(this.pushHandler(subArray[1],subArray[2],aFilename))
            break;
          case 'pop':
            arrayToReturn.push(this.popHandler(subArray[1], subArray[2],aFilename))
            break;
          case 'add':
            arrayToReturn.push(this.addHandler())
            break
          case 'sub':
            arrayToReturn.push(this.subHandler())
            break
          case 'neg':
            arrayToReturn.push(this.negHandler())
            break
          default:
            break;
        }
      }
      return arrayToReturn.join('\n')
    }
    this.pushHandler = (segment, num, pushFilename) => {
      num = parseInt(num)
      //handling a push instruction
      let codeToReturn = []
      let SPCode = ['@0','A = M','M = D','@0','M = M + 1'] //pushes whatever is in D to the stack and increments SP
      switch (segment) {
        case 'static':
          codeToReturn = [`@${pushFilename}.${num}`,`D=M`]
          codeToReturn = codeToReturn.concat(SPCode)
          break
        case 'const':
          //just pushes the constant
          //@const
          //D=A
          //@SP
          //A=M
          //M=D
          //@SP
          //M=M+1
          codeToReturn = [`@${num}`,'D=A']
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
          //possible future optimization:
          //across several branches of the switch case, only the first @ instruction changes
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
          //pushes the value at this num to the top of the stack
          //@3 (holds base address of this)
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
          codeToReturn = [`@3`, `D = M`, `@${num}`, `D = D+A`, `A = D`, `D=M`]
          codeToReturn = codeToReturn.concat(SPCode)
          break;
        case 'that':
          //pushes the value at that num to the top of the stack
          //@4 (holds base address of that)
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
          codeToReturn = [`@4`, `D = M`, `@${num}`, `D = D+A`, `A = D`, `D=M`]
          codeToReturn = codeToReturn.concat(SPCode)
          break;
        case 'pointer':
          if (num > 1){
            codeToReturn.push(`PUSH TO INVALID POINTER ADDRESS ${num}`)
          }
          else{
            if(num == 0){
              //pointer 0 -> contains base address of THIS, located at RAM[3]
              codeToReturn.push(`@3`,`D=M`)
              codeToReturn = codeToReturn.concat(SPCode)
            }
            else{
              //pointer 1 -> contains base address of THAT, located at RAM[4]
              codeToReturn.push(`@4`, `D=M`)
              codeToReturn = codeToReturn.concat(SPCode)
            }
          }
          break;
        case 'temp':
          //RAM[5] - RAM[12] -> temp 0 - temp 7
          if(num > 7){
            codeToReturn.push(`INVALID TEMP ADDRESS ${num}`)
          }
          else{
            let myAddr = num + 5
            codeToReturn.push(`@${myAddr}`,`D=M`)
            codeToReturn = codeToReturn.concat(SPCode)
          }
          break;
        default:
          codeToReturn.push(`INVALID PUSH INSTRUCTION`)
          break;
      }
      codeToReturn.splice(0,0,`//push ${segment} ${num}`)
      return codeToReturn.join('\n')
    }
    this.popHandler = (segment, num, popFilename) => {
      num = parseInt(num)
      //handling a pop instruction
      let codeToReturn = []
      let startCode = [`@0`,`M=M-1`,`A=M`,`D=M`,`@13`,`M=D`]
      let endCode = [`D=M`, `@${num}`, `D=D+A`, `@14`, `M=D`, `@13`, `D=M`, `@14`, `A=M`, `M=D`]
      switch (segment) {
        case 'static':
          codeToReturn = [`@0`, `M=M-1`, `A=M`, `D=M`, `@${popFilename}.${num}`, `M=D`]
          break
        case 'const':
          //constant is a virtual segment used for constants
          //you can't pop to there
          codeToReturn = [`ILLEGAL POP INSTRUCTION ${segment} ${num}`]
          break;

        case 'argument':
          //pop the value on the top of the stack to argument num
          //SP is in RAM[0]
          //@0
          //M=M-1 (decrement stack pointer)
          //A=M
          //D=M
          //@13 (store variable in R13)
          //M=D
          //@2 (base address of arg)
          //D=M
          //@num
          //D=D+A
          //@14 (store address in R14)
          //M=D
          //@13 (get the variable)
          //D=M
          //@14 (get the address)
          //A=M
          //M=D

          codeToReturn = [`@2`]
          codeToReturn = startCode.concat(codeToReturn)
          codeToReturn = codeToReturn.concat(endCode)
          break;
        case 'local':
          codeToReturn = [`@1`]
          codeToReturn = startCode.concat(codeToReturn)
          codeToReturn = codeToReturn.concat(endCode)
          break;
        case 'this':
          codeToReturn = [`@3`]
          codeToReturn = startCode.concat(codeToReturn)
          codeToReturn = codeToReturn.concat(endCode)
          break;
        case 'that':
          codeToReturn = [`@4`]
          codeToReturn = startCode.concat(codeToReturn)
          codeToReturn = codeToReturn.concat(endCode)
          break;
        case 'pointer':
          if (num > 1) {
            codeToReturn.push(`POP TO INVALID POINTER ADDRESS ${num}`)
          }
          else {
            codeToReturn = [`@3`]
            codeToReturn = startCode.concat(codeToReturn)
            codeToReturn = codeToReturn.concat(endCode)
          }
          break;
        case 'temp':
          //RAM[5] - RAM[12] -> temp 0 - temp 7
          if (num > 7) {
            codeToReturn.push(`INVALID TEMP ADDRESS ${num}`)
          }
          else {
          //SP is in RAM[0]
          //@0
          //M=M-1 (decrement stack pointer)
          //A=M
          //D=M
          //@${5+num} (store variable in temp directly)
          //M=D
            codeToReturn = [`@0`, `M=M-1`, `A=M`, `D=M`, `@${5 + num}`,`M=D`]
          }
          break;
        default:
          codeToReturn.push(`INVALID POP INSTRUCTION`)
          break;
      }
      codeToReturn.splice(0, 0,`//pop ${segment} ${num}`)
      return codeToReturn.join('\n')
    }
    this.addHandler = () => {
      //pop the two top values on the stack, add them, then push the result
      let codeToReturn = []
      codeToReturn.push(`//add`)
      codeToReturn.push(this.popHandler('temp','6')) //num1 in RAM[11]
      codeToReturn.push(this.popHandler('temp', '7')) //num2 in RAM[12]
      //@11
      //D=M
      //@12
      //D=D+M
      //@10
      //M=D
      codeToReturn.push(`//adding code`)
      codeToReturn.push(`@11`,`D=M`,`@12`,`D=D+M`,`@10`,`M=D`) //add R11 and R12 and store them in R10
      codeToReturn.push(this.pushHandler('temp','5')) //push what's in temp 5, AKA R10
      return codeToReturn.join('\n')
    }
    this.subHandler = () => {
      //pop the two top values on the stack, add them, then push the result
      let codeToReturn = []
      codeToReturn.push(`//sub`)
      codeToReturn.push(this.popHandler('temp', '6')) //num1 in RAM[11]
      codeToReturn.push(this.popHandler('temp', '7')) //num2 in RAM[12]
      //@11
      //D=M
      //@12
      //D=D-M
      //@10
      //M=D
      codeToReturn.push(`//subtracting code`)
      codeToReturn.push(`@11`, `D=M`, `@12`, `D=D-M`, `@10`, `M=D`) //add R11 and R12 and store them in R10
      codeToReturn.push(this.pushHandler('temp', '5')) //push what's in temp 5, AKA R10
      return codeToReturn.join('\n')
    }
    this.negHandler = () => {
      codeToReturn = []
      codeToReturn.push(`//neg`,`@0`,`A=M`,`M=-M`)
    }
  }
}

module.exports = codeReader