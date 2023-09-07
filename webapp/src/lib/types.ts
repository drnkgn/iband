export type Entry = {
    word: string,
    meanings: Definition[],
};

export type Definition = {
    definition: string,
    examples: string[],
    synonyms: string[],
};
