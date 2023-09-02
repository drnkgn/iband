import { Lexer, Token, TokenKind } from "./lexer";
import { isalpha } from "./util";

type Definition = {
    definition: string,
    examples: string[],
    synonyms: string[]
}

enum Context {
    UNKNOWN,
    ENTRY_WORD,
    DEFINITION,
    EXAMPLE,
    SYNONYM,
}

class Parser {
    private lexer: Lexer;
    private stack: Token[];
    private context: Context;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.stack = [];
        this.context = Context.UNKNOWN;
    }

    /**
     * Construct a sentence from the `tokenlist` with proper formatting.
     */
    private construct(tokenlist: Token[], flush: boolean = false): string {
        let str: string[] = [];
        let skip_next_space = false;

        tokenlist.forEach((token, i) => {
            if (token.kind == TokenKind.TEXT || token.kind == TokenKind.NUMBER) {
                if (i == 0 || skip_next_space)
                    skip_next_space = false;
                else
                    str.push(" ");
            } else if (token.kind == TokenKind.OPEN_PAREN) {
                str.push(" ");
                skip_next_space = true;
            }

            str.push(token.content);
        });

        if (flush) this.stack = [];

        return str.join("");
    }

    /**
     * Parse the word of the entry.
     */
    parse_head(): string {
        for (const token of this.lexer) {
            if (token.kind == TokenKind.DOT) break;
            else this.stack.push(token);
        }

        return this.construct(this.stack, true);
    }

    /**
     * Parse the body of the entry.
     */
    parse_body(): Definition {
        let definition: Definition = {
            definition: "",
            examples: [],
            synonyms: []
        };

        return definition;
    }

    parse(): object {
        let m_idx: number = 0;
        let entry = {
            word: "",
            meanings: <Definition[]>[]
        };

        const write_dict = (ctx: Context, clear: boolean) => {
            const construct = this.construct(this.stack, clear);

            switch (ctx) {
                case Context.DEFINITION:
                    entry.meanings[m_idx].definition = construct; break;
                case Context.EXAMPLE:
                    entry.meanings[m_idx].examples.push(construct); break;
                case Context.SYNONYM:
                    entry.meanings[m_idx].synonyms.push(construct); break;
            }
        }

        entry.word = this.parse_head();
        this.context = Context.DEFINITION;

        for (const token of this.lexer) {
            switch (token.kind) {
                case TokenKind.NUMBER:
                    this.stack.push(token); break;

                case TokenKind.COLON: {
                    write_dict(this.context, true);
                    if (this.context == Context.DEFINITION)
                        this.context = Context.EXAMPLE
                    else
                        this.context = Context.SYNONYM

                    break;
                }

                case TokenKind.DOT:
                case TokenKind.QUESTION:
                case TokenKind.EXCLAIMATION: {
                    if (this.stack[this.stack.length - 1].content.length < 4) {
                        let current = this.stack[this.stack.length - 1];
                        if (current.content !== "1" && !isalpha(current.content)) {
                            entry.meanings.push({
                                definition: "",
                                examples: <string[]>[],
                                synonyms: <string[]>[]
                            });
                            m_idx += 1;
                        }
                        this.stack.pop(); // pop except years
                        if (this.stack.length > 0) write_dict(this.context, true);

                        this.context = Context.DEFINITION;
                    } else
                        this.stack.push(token);

                    break;
                }

                default:
                    this.stack.push(token);
            }
        }

        write_dict(this.context, true);

        return entry;
    }
}

export { Parser, Context };
