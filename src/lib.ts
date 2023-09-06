import { Lexer } from "./lexer";
import { Parser } from "./parser";

function parse(str: string): object {
    let p = new Parser(new Lexer(str));

    for (const s of p) {
        console.log(`${s}`);
    }

    return {};
}

export { parse };
