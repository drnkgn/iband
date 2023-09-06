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
                if (i != 0) str.push(" ");
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
    parse_head(): [string, number] {
        let idx: number = 0;
        for (const token of this.lexer) {
            if (token.kind == TokenKind.DOT) break;
            else this.stack.push(token);
            idx += 1;
        }

        return [this.construct(this.stack, true), idx];
    }

    new_definition(): Definition {
        return {
            definition: "",
            examples: [],
            synonyms: [],
        };
    }

    parse(): object {
        let m_idx: number = 0;
        let entry = {
            word: "",
            meanings: <Definition[]>[]
        };

        const write_dict = (ctx: Context, clear: boolean) => {
            let construct = this.construct(this.stack, clear);

            if (construct[construct.length - 1] == ".")
                construct = construct.slice(0, construct.length - 1);

            switch (ctx) {
                case Context.DEFINITION:
                    entry.meanings[m_idx].definition = construct; break;
                case Context.EXAMPLE:
                    entry.meanings[m_idx].examples.push(construct); break;
                case Context.SYNONYM:
                    entry.meanings[m_idx].synonyms.push(construct); break;
            }
        }

        let end_word: number;
        [entry.word, end_word] = this.parse_head();
        this.context = Context.DEFINITION;
        entry.meanings.push(this.new_definition());

        for (const token of this.lexer.tokens.slice(end_word + 1)) {
            switch (token.kind) {
                case TokenKind.NUMBER:
                    this.stack.push(token); break;

                case TokenKind.COLON: {
                    write_dict(this.context, true);
                    if (this.context == Context.DEFINITION)
                        this.context = Context.EXAMPLE;
                    else
                        this.context = Context.SYNONYM;

                    break;
                }

                case TokenKind.SEMICOLON: {
                    if (this.context == Context.EXAMPLE)
                        write_dict(this.context, true);
                    else
                        this.stack.push(token);

                    break;
                }

                case TokenKind.DOT:
                case TokenKind.QUESTION:
                case TokenKind.EXCLAIMATION: {
                    let top = this.stack[this.stack.length - 1];
                    if (this.stack.length > 0
                        && top.kind == TokenKind.NUMBER
                        && top.content.length < 3) {
                        this.stack.pop();

                        if (this.stack.length > 0)
                            write_dict(this.context, true);

                        if (!(top.content == "1" || isalpha(top.content))) {
                            entry.meanings.push(this.new_definition());
                            m_idx += 1;
                        }

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
