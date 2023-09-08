const CONTRACTIONS: Set<string> = new Set([
    "d", "t", "s", "m", "re", "ve", "ll"
]);

const VALID_PUNCT: Set<string> = new Set([
    "'", "\"", "-"
]);

const ABBREVIATIONS: Set<string> = new Set([
    "acc.",                     // according (to)
    "Ar.",                      // Arabic
    "Br.",                      // Brunei (Malay)
    "c.",                       // circa (in italic); century
    "cf.",                      // confer, compare
    "Ch.",                      // China, Chinese
    "D.",                       // Dutch
    "Div.",                     // Administrative Division of Swk
    "e.g.",                     // exempli gratia; for example
    "Eng.",                     // English
    "esp.",                     // especially
    "etc.",                     // et cetera; and others
    "fig.",                     // figuratively
    "i.e.",                     // id est; that is
    "ibid.",                    // ibidem; used to refer again to the last citation
    "gen.",                     // generally
    "H.",                       // Howell & Bailey (dictionary)
    "Hind.",                    // Hindi
    "incl.",                    // include, including
    "Jav.",                     // Javanese (Malay)
    "Kunth.",
    "lit.",                     // literally
    "M.",                       // Malay(s)
    "num.", "cl.",              // numeral classifier
    "obs.",                     // obsolete
    "opp.",                     // opposite
    "orig.",                    // originally
    "Pers.",                    // Persian
    "poet.",                    // poetic
    "Port.",                    // Portuguese
    "prob.",                    // probably
    "pron.",                    // pronounced, pronounciation
    "S.",                       // Scott (dicitionary); south
    "Skr.",                     // Sanskrit
    "sp.", "spp.",              // species
    "Swk.", "M.", "Swk.M.",     // Sarawak; Sarawak Malay
    "unid.",                    // unidentified, not found
    "usu.",                     // usually
    "W.",                       // Wilkinson (dicitionary); west
    "Warb.",
]);

function isalpha(str: string): boolean {
    if (typeof str !== "string") return false;
    for (let i = 0; i < str.length; ++i) {
        if ((str[i] < "a" || str[i] > "z") && (str[i] < "A" || str[i] > "Z"))
            return false;
    }
    return true;
}

function isdigit(str: string): boolean {
    if (typeof str !== "string") return false;
    for (let i = 0; i < str.length; ++i) {
        if (str[i] < "0" || str[i] > "9")
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
        if (!(isalpha(str[i]) || VALID_PUNCT.has(str[i])))
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
    iscntrc
};
