import { CONTRACTIONS, VALID_PUNCT, ABBREVIATIONS } from "./common";

function isupper(str: string): boolean {
    if (typeof str !== "string") return false;
    if (str >= "A" && str <= "Z")
        return true;

    return false;
}

function isalpha(str: string): boolean {
    if (typeof str !== "string") return false;
    for (let i = 0; i < str.length; ++i) {
        if ((str < "a" || str > "z") && (str < "A" || str > "Z"))
            return false;
    }
    return true;
}

function isdigit(str: string): boolean {
    if (typeof str !== "string") return false;
    for (let i = 0; i < str.length; ++i) {
        if (str < "0" || str > "9")
            return false;
    }
    return true;
}

function isspace(ch: string): boolean {
    return typeof ch === "string" && ch == " ";
}

function isword(str: string): boolean {
    if (typeof str !== "string") return false;
    for (let i = 0; i < str.length; ++i) {
        if (!(isalpha(str) || VALID_PUNCT.has(str)))
            return false;
    }
    return true;
}

function isabbv(str: string): boolean {
    if (typeof str !== "string") return false;
    return ABBREVIATIONS.has(str);
}

function iscntrc(str: string): boolean {
    return CONTRACTIONS.has(str);
}

export {
    isalpha,
    isdigit,
    isspace,
    isword,
    isabbv,
    iscntrc,
    isupper,
};
