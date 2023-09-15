import { readFile } from "fs/promises"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const index = JSON.parse(
        await readFile("../index/index.json", { encoding: "utf8"})
    );

    return { index: index }
}
