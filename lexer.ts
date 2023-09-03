import { isspace, isdigit, isword, isabbv, isalpha } from "./util";

enum TokenKind {
    UNKNOWN,
    EOL,
    TEXT,
    NUMBER,
    NEWLINE,
    COMMA,
    DOT,
    EXCLAIMATION,
    QUESTION,
    COLON,
    SEMICOLON,
    OPEN_PAREN,
    CLOSE_PAREN,
    PUNCT,
}

class Token {
    kind: TokenKind;
    content: string;

    constructor() {
        this.kind = TokenKind.UNKNOWN;
        this.content = "";
    }

    toString(): string {
        return `[ kind: ${TokenKind[this.kind]}, content: "${this.content}" ]`;
    }
}

class Lexer {
    private cursor: number;
    private short: string;
    readonly content: string;
    readonly tokens: Token[];

    constructor(content: string) {
        this.content = content;
        this.cursor = 0;
        this.tokens = [];
        this.short = `${content[0].toLowerCase()}.`;
    }

    /**
     * Removes leading whitespaces.
     */
    private trim_left(): void {
        while (this.cursor != this.content.length
            && isspace(this.content[this.cursor]))
            this.cursor += 1
    }

    /**
     * Returns the current token and iterate to the next.
     */
    private next(): Token {
        let token = new Token();
        let content: string[] = [];

        this.trim_left();

        /**
         * Consumes an entire word.
         * @param ... first two should be obvious
         * @param abbv {boolean} should this function checks for abbv?
         */
        const consume = (predicate: (str: string) => boolean,
                         kind: TokenKind,
                         abbv: boolean = false) => {
            while (predicate(this.content[this.cursor])) {
                content.push(this.content[this.cursor]);
                this.cursor += 1;
            }

            if (abbv && this.content[this.cursor] == ".") {
                let abbv = [...content];
                let temp = this.cursor;

                while ((isword(this.content[this.cursor])
                        || this.content[this.cursor] == ".")
                       && this.content.length != this.cursor) {
                    abbv.push(this.content[this.cursor]);
                    this.cursor += 1;
                }

                let shorten = abbv.slice(abbv.length - 2, abbv.length)
                                  .join("");

                if (isabbv(abbv.join(""))
                    || (this.short == shorten
                        && !isalpha(abbv[abbv.length - 3])))
                    content = abbv;
                else
                    this.cursor = temp;
            }

            token.kind = kind;
            token.content = content.join("");
        }

        if (this.cursor == this.content.length)
            token.kind = TokenKind.EOL;
        else if (isword(this.content[this.cursor]))
            consume((str) => isword(str), TokenKind.TEXT, true);
        else if (isdigit(this.content[this.cursor]))
            consume((str) => isdigit(str), TokenKind.NUMBER);
        else {
            switch (this.content[this.cursor]) {
                case ".":
                    token.kind = TokenKind.DOT; break;
                case ",":
                    token.kind = TokenKind.COMMA; break;
                case "!":
                    token.kind = TokenKind.EXCLAIMATION; break;
                case "?":
                    token.kind = TokenKind.QUESTION; break;
                case ":":
                    token.kind = TokenKind.COLON; break;
                case ";":
                    token.kind = TokenKind.SEMICOLON; break;
                case "(":
                    token.kind = TokenKind.OPEN_PAREN; break;
                case ")":
                    token.kind = TokenKind.CLOSE_PAREN; break;
                default:
                    token.kind = TokenKind.PUNCT;
            }

            token.content = this.content[this.cursor];
            this.cursor += 1;
        }

        return token;
    }

    /**
     * Tokenize the string and returns a list of tokens.
     */
    tokenize(): Token[] {
        let token: Token = new Token();

        this.cursor = 0; // reset cursor

        while (token.kind != TokenKind.EOL) {
            if (token.kind != TokenKind.UNKNOWN)
                this.tokens.push(token);
            token = this.next();
        }

        return this.tokens;
    }

    *[Symbol.iterator]() {
        if (this.tokens.length == 0) this.tokenize();
        for (let i = 0; i < this.tokens.length; ++i) {
            yield this.tokens[i];
        }
    }
}

export { Lexer, Token, TokenKind };
