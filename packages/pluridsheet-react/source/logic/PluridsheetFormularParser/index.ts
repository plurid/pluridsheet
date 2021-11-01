// #region module
export enum Tokens {
    SPACE,
    ADD, SUBTRACT, MULTIPLY, DIVIDE,
    IDENTIFIER,
}

export type Token =
    | GeneralToken
    | IdentifierToken;

export interface GeneralToken {
    type: keyof typeof Tokens;
}

export interface IdentifierToken {
    type: 'IDENTIFIER';
    value: string;
}



export type OperationValue = {
    type: 'v';
    value: string;
}

export type OperationAdd = {
    type: '+';
    left: Operation;
    right: Operation;
}

export type OperationSubtract = {
    type: '-';
    left: Operation;
    right: Operation;
}

export type OperationMultiply = {
    type: '*';
    left: Operation;
    right: Operation;
}

export type OperationDivide = {
    type: '/';
    left: Operation;
    right: Operation;
}

export type Operation =
    | OperationValue
    | OperationAdd
    | OperationSubtract
    | OperationMultiply
    | OperationDivide;



class PluridsheetFormularParser {
    private value: string;
    private tokens: Token[] = [];
    private formula: undefined | Operation;


    constructor(
        value: string,
    ) {
        this.value = value;
    }


    public parse() {
        this.tokenize();
        this.interpret();

        return this.formula;
    }


    private tokenize() {
        for (const character of this.value) {
            switch (character) {
                case ' ':
                    this.space();
                    break;
                case '+':
                    this.add();
                    break;
                case '-':
                    this.subtract();
                    break;
                case '*':
                    this.multiply();
                    break;
                case '/':
                    this.divide();
                    break;
                default:
                    this.identifier(character);
                    break;
            }
        }
    }

    private space() {
        const token: Token = {
            type: 'SPACE',
        };
        this.tokens.push(token);
    }

    private add() {
        const token: Token = {
            type: 'ADD',
        };
        this.tokens.push(token);
    }

    private subtract() {
        const token: Token = {
            type: 'SUBTRACT',
        };
        this.tokens.push(token);
    }

    private multiply() {
        const token: Token = {
            type: 'MULTIPLY',
        };
        this.tokens.push(token);
    }

    private divide() {
        const token: Token = {
            type: 'DIVIDE',
        };
        this.tokens.push(token);
    }

    private identifier(
        character: string,
    ) {
        const token: Token = {
            type: 'IDENTIFIER',
            value: character,
        };
        this.tokens.push(token);
    }


    private interpret() {
        let memberType = 'left';
        let member = '';
        let op: any = {};

        const collectLeft = () => {
            if (!member) {
                return;
            }

            op.left = member;
            memberType = 'right';
            member = '';
        }

        for (const token of this.tokens) {
            switch (token.type) {
                case 'ADD':
                    collectLeft();
                    op.type = '+';
                    break;
                case 'SUBTRACT':
                    collectLeft();
                    op.type = '-';
                    break;
                case 'MULTIPLY':
                    collectLeft();
                    op.type = '*';
                    break;
                case 'DIVIDE':
                    collectLeft();
                    op.type = '/';
                    break;
                case 'SPACE':
                    collectLeft();
                    break;
                case 'IDENTIFIER':
                    member += (token as IdentifierToken).value;
                    break;
            }
        }

        op.right = member;

        this.formula = op;
    }
}
// #endregion module


// #region exports
export default PluridsheetFormularParser;
// #endregion exports
