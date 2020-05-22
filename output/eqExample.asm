//push const 1
@1
D=A
@0
A = M
M = D
@0
M = M + 1
//push const 2
@2
D=A
@0
A = M
M = D
@0
M = M + 1
//eq
//pop temp 0
@0
M=M-1
A=M
D=M
@5
M=D
//pop temp 1
@0
M=M-1
A=M
D=M
@6
M=D
//eq code
@5
D=M
@6
D=D-M
@False
D;JNE
(True)
@0
D=A
@1
D=D-A
@7
M=D
//push temp 2
@7
D=M
@0
A = M
M = D
@0
M = M + 1
@End
0;JMP
(False)
//push const 0
@0
D=A
@0
A = M
M = D
@0
M = M + 1
(End)
//push const 1
@1
D=A
@0
A = M
M = D
@0
M = M + 1
//push const 1
@1
D=A
@0
A = M
M = D
@0
M = M + 1
//eq
//pop temp 0
@0
M=M-1
A=M
D=M
@5
M=D
//pop temp 1
@0
M=M-1
A=M
D=M
@6
M=D
//eq code
@5
D=M
@6
D=D-M
@False
D;JNE
(True)
@0
D=A
@1
D=D-A
@7
M=D
//push temp 2
@7
D=M
@0
A = M
M = D
@0
M = M + 1
@End
0;JMP
(False)
//push const 0
@0
D=A
@0
A = M
M = D
@0
M = M + 1
(End)
(Halt)
@Halt
0;JMP