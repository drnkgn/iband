import { readFile } from "fs/promises"
import type { PageServerLoad } from "./$types";
import type { Entry } from "$lib/types";

export const load: PageServerLoad = async ({ params }) => {
    const data: Entry[] = JSON.parse(
        await readFile(
            `../index/${params.word[0].toLowerCase()}.json`,
            { encoding: "utf8" }
        )
    );
    const entry = data.find(
        (ele: Entry) => ele.word.toLowerCase() == params.word
    );

    return {
        found: entry !== undefined,
        entry: entry
    }
}
