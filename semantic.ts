import { Lexer, Token, TokenKind } from "./lexer";

enum Context {
    UNKNOWN,
    START,
    SWITCH,
    ENTRY_WORD,
    DEFINITION,
    EXAMPLE,
    SYNONYM,
    END,
}

/**
 * Probably doesn't have anything to do with the
 * actual meaning of "sematics". But I'm running out of
 * names, so meh.
 */
class Semantic {
    content: string;
    context: Context;

    constructor(ctx: Context = Context.UNKNOWN) {
        this.content = "";
        this.context = ctx;
    }

    toString(): string {
        return `[ context: ${Context[this.context]}, content: "${this.content}" ]`;
    }
}

class SemanticParser {
    private lexer: Lexer;
    private iter: Generator<Token, void, unknown>;
    readonly semantics: Semantic[];

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.iter = this.lexer[Symbol.iterator]();
        this.semantics = [];
    }

    private previous_ctx(): Context {
        return this.semantics[this.semantics.length - 1].context;
    }

    private insert_switch(): void {
        this.semantics.push(new Semantic(Context.SWITCH));
    }

    next(): Semantic {
        let semantic = new Semantic();

        return semantic;
    }
}

export { SemanticParser as SematicParser, Context };

// abah. 1. Cut made in a tree for felling, under-cut: a. nuan enda' manah, you
// haven't cut it properly; ia ngabah-ka dulu' legi' aku nimbal, he first makes
// a cut on his side, then I make one on my side. 2. Wedge-shaped chips from a
// felling cut.
//
// [
//   {
//     "content": null,
//     "context": START
//   },
//   {
//     "content" :"abah",
//     "context": ENTRY_WORD
//   },
//   {
//     "content": null,
//     "context": SWITCH
//   },
//   {
//     "content": "cut made in a tree for felling, under-cut",
//     "context": DEFINITION
//   },
//   {
//     "content": null,
//     "context": SWITCH
//   },
//   {
//     "content": "a. nuan enda' manah, you haven't cut it properly",
//     "context": EXAMPLE
//   },
//   {
//     "content": null,
//     "context": CONTINUE
//   },
//   {
//     "content": "ia ngabah-ka dulu' legi aku nimbal",
//     "context": EXAMPLE
//   },
//   {
//     "content": null,
//     "context: SWITCH
//   }
//   {
//     "content": "wedge-shaped chips from a felling cut",
//     "context": DEFINITION
//   },
//   {
//     "content": null,
//     "context": END
//   }
// ]
