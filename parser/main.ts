import { parse } from "./src/lib";
import { readFileSync, writeFileSync } from "fs";

let lines = readFileSync("../corpus/a.txt", "utf8").split("\n");
let entries = [];
for (const line of lines.slice(0, lines.length - 1)) {
    entries.push(parse(line));
}
writeFileSync("../index/a.json", JSON.stringify(entries));
