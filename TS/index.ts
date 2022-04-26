let 이름 :string = 'kim';

type Square = {
    color? : string,
    width : number,
}

type Square2 = {
    width : number
}

type New = Square & Square2;