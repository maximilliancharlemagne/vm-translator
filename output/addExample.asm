//push const 5
@5
D=A
@0
A = M
M = D
@0
M = M + 1
//push const 3
@3
D=A
@0
A = M
M = D
@0
M = M + 1
//add
//pop temp 6
@0
M=M-1
A=M
D=M
@11
M=D
//pop temp 7
@0
M=M-1
A=M
D=M
@12
M=D
//adding code
@11
D=M
@12
D=D+M
@10
M=D
//push temp 5
@10
D=M
@0
A = M
M = D
@0
M = M + 1
//pop local 0
@0
M=M-1
A=M
D=M
@13
M=D
@1
D=M
@0
D=D+A
@14
M=D
@13
D=M
@14
A=M
M=D
(Halt)
@Halt
0;JMP