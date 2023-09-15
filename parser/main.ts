import { parse } from "./src/lib";
import path from "path";
import { readdirSync, readFileSync, writeFileSync  } from "fs";

const CORPUS_PATH = "../corpus";
const INDEX_PATH  = "../index";

interface LooseObject {
    [key: string]: string[]
}

function main() {
    let files = readdirSync(CORPUS_PATH);
    let words: LooseObject = {};
    let stats = {
        total: 0,
    };

    for (const file of files) {
        let filename = path.parse(file).name;
        let content = readFileSync(`${CORPUS_PATH}/${file}`, "utf8").split("\n");
        let outname = `${filename}.json`;
        let entries = [];

        let t0 = performance.now();

        for (const line of content.slice(0, content.length - 1)) {
            entries.push(parse(line));
            if (words[filename])
                words[filename].push(entries[entries.length - 1].word);
            else
                words[filename] = [entries[entries.length - 1].word];
        }

        stats.total += entries.length;

        let t1 = performance.now();
        console.log(`Parsing ${file}... ${(t1 - t0).toFixed(2)} ms`);

        writeFileSync(`${INDEX_PATH}/${outname}`, JSON.stringify(entries));
    }

    writeFileSync(`${INDEX_PATH}/index.json`, JSON.stringify(words));
    console.log("Saving indexed words to index.json...");

    writeFileSync(`${INDEX_PATH}/stats.json`, JSON.stringify(stats));
    console.log("Saving logs to stats.json...");
}

main();
