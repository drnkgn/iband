import { Lexer, Token, TokenKind } from "./lexer";

enum Semantic {
    UNKNOWN,
    ENTRY_WORD,
    DEFINITION,
    EXAMPLE,
    SYNONYM,
}

class Context {
    content: string;
    semantic: Semantic;

    constructor(ctn: string = "", ctx: Semantic = Semantic.UNKNOWN) {
        this.content = ctn;
        this.semantic = ctx;
    }

    toString(): string {
        return `[ semantic: ${Semantic[this.semantic]}, content: "${this.content}" ]`;
    }
}

class Parser {
    contexts: Context[];
    private lexer: Lexer;
    private stack: Token[];

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.stack = [];
        this.contexts = [];
    }

    /**
     * Construct a sentence from the `tokenlist` with proper formatting.
     */
    private construct(): string {
        let str: string[] = [];
        let skip_next_space = false;

        this.stack.forEach((token, i) => {
            if (token.kind == TokenKind.TEXT || token.kind == TokenKind.NUMBER) {
                if (i == 0 || skip_next_space)
                    skip_next_space = false;
                else
                    str.push(" ");
            } else if (token.kind == TokenKind.OPEN_PAREN) {
                if (i != 0) str.push(" ");
                skip_next_space = true;
            }

            str.push(token.content);
        });

        // trims redundant dots at the end of the result
        if (str[str.length - 1] == ".") str.pop();

        this.stack = [];

        return str.join("");
    }

    parse(): Context[] {
        let cursmtc = Semantic.UNKNOWN;

        for (const token of this.lexer) {
            switch (token.kind) {
                case TokenKind.NUMBER: {
                    this.stack.push(token);
                    break;
                }

                case TokenKind.COLON: {
                    this.contexts.push(new Context(this.construct(), cursmtc));

                    if (cursmtc == Semantic.DEFINITION)
                        cursmtc = Semantic.EXAMPLE;
                    else
                        cursmtc = Semantic.SYNONYM;

                    break;
                }

                case TokenKind.SEMICOLON: {
                    if (cursmtc == Semantic.EXAMPLE) {
                        this.contexts.push(new Context(this.construct(), cursmtc));
                    } else
                        this.stack.push(token);

                    break;
                }

                case TokenKind.DOT:
                case TokenKind.QUESTION:
                case TokenKind.EXCLAIMATION: {
                    let top = this.stack[this.stack.length - 1];

                    if (cursmtc == Semantic.UNKNOWN) {
                        this.contexts.push(new Context(this.construct(), Semantic.ENTRY_WORD));
                        cursmtc = Semantic.DEFINITION;
                    } else if (this.stack.length > 0
                            && top.kind == TokenKind.NUMBER
                            && top.content.length < 3) {
                        this.stack.pop();

                        if (this.stack.length > 0)
                            this.contexts.push(new Context(this.construct(), cursmtc));

                        cursmtc = Semantic.DEFINITION;
                    } else
                        this.stack.push(token);

                    break;
                }

                default:
                    this.stack.push(token);
            }
        }

        this.contexts.push(new Context(this.construct(), cursmtc));

        return this.contexts;
    }

    *[Symbol.iterator]() {
        if (this.contexts.length == 0) this.parse();
        for (let i = 0; i < this.contexts.length; ++i) {
            yield this.contexts[i];
        }
    }
}

export { Parser, Semantic };
