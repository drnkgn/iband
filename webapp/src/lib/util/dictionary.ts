import { readFile } from "fs/promises";
import Fuse from "fuse.js";
import type { Entry } from "$lib/types";

import index from "../../../../index/index.json";

const fuse = new Fuse<string>([]);
const words = <{ [key: string]: string[] }>index;

async function queryWord(query: string): Promise<Entry | undefined>
{
    const data: Entry[] = JSON.parse(
        await readFile(
            `../index/${query[0].toLowerCase()}.json`,
            { encoding: "utf8" }
        )
    );

    return data.find(
        (ele: Entry) => ele.word.toLowerCase() == query
    );
}

async function matchWord(query: string, letter: string, slice?: number)
    :Promise<string[]>
{
    if (!words[letter]) return [];

    fuse.setCollection(words[letter]);
    return fuse
        .search(query)
        .slice(0, slice)
        .map((x) => x.item);
}

async function getStats(): Promise<{ total: number }>
{
    return JSON.parse(
        await readFile("../index/stats.json", { encoding: "utf8" })
    );
}

export { queryWord, matchWord, getStats };
