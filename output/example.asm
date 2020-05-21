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
@5
M=D
@11
D=M
@6
D=D+A
@6
M=D
@5
D=M
@6
A=M
M=D
//pop temp 7
@0
M=M-1
A=M
D=M
@5
M=D
@12
D=M
@7
D=D+A
@6
M=D
@5
D=M
@6
A=M
M=D
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
@5
M=D
@1
D=M
@0
D=D+A
@6
M=D
@5
D=M
@6
A=M
M=D