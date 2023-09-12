import { Lexer } from "./lexer";
import { Parser, Semantic } from "./parser";

type Entry = {
    word: string,
    meanings: Definition[],
};

type Definition = {
    definition: string,
    examples: string[],
    synonyms: string[],
    note: string,
};

function new_def(): Definition {
    return {
        definition: "",
        examples: [],
        synonyms: [],
        note: "",
    };
}

function parse(str: string): Entry {
    let p = new Parser(new Lexer(str));
    let r = { word: "", meanings: <Definition[]>[] };
    let i = -1;

    for (const s of p) {
        switch (s.semantic) {
            case Semantic.ENTRY_WORD:
                r.word = s.content;
                break;

            case Semantic.DEFINITION:
                i += 1;
                r.meanings.push(new_def());
                r.meanings[i].definition = s.content;
                break;

            case Semantic.EXAMPLE:
                r.meanings[i].examples.push(s.content);
                break;

            case Semantic.SYNONYM:
                r.meanings[i].synonyms.push(s.content);
                break;

            case Semantic.NOTE:
                r.meanings[i].note = s.content;
                break;
            default:
                console.error("Unreachable");
        }
    }

    return r;
}

export { parse };
