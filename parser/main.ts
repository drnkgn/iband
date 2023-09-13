import { parse } from "./src/lib";
import path from "path";
import { readdirSync, readFileSync, writeFileSync  } from "fs";

const CORPUS_PATH = "../corpus";
const INDEX_PATH  = "../index";

function main() {
    let filenames = readdirSync(CORPUS_PATH);
    let stats = {
        total: 0,
    };

    for (const filename of filenames) {
        let content = readFileSync(`${CORPUS_PATH}/${filename}`, "utf8").split("\n");
        let outname = `${path.parse(filename).name}.json`;
        let entries = [];

        let t0 = performance.now();

        for (const line of content.slice(0, content.length - 1)) {
            entries.push(parse(line));
        }

        stats.total += entries.length;

        let t1 = performance.now();
        console.log(`Parsing ${filename}... ${(t1 - t0).toFixed(2)} ms`);

        writeFileSync(`${INDEX_PATH}/${outname}`, JSON.stringify(entries));
    }

    writeFileSync(`${INDEX_PATH}/log.json`, JSON.stringify(stats));
    console.log("Saving logs to logs.json...");
}

main();
