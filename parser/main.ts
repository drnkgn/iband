import { parse } from "./src/lib";
import path from "path";
import { readdirSync, readFileSync, writeFileSync  } from "fs";

const CORPUS_PATH = "../corpus";
const INDEX_PATH  = "../index";

let filenames = readdirSync(CORPUS_PATH);

for (const filename of filenames) {
    let content = readFileSync(`${CORPUS_PATH}/${filename}`, "utf8").split("\n");
    let outname = `${path.parse(filename).name}.json`;
    let entries = [];

    console.log(`Parsing ${filename}...`);
    for (const line of content.slice(0, content.length - 1)) {
        entries.push(parse(line));
    }

    writeFileSync(`${INDEX_PATH}/${outname}`, JSON.stringify(entries));
}
