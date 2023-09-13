import { readFile } from "fs/promises"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const stats: { total: number } = JSON.parse(
        await readFile(`../index/log.json`, { encoding: "utf8" })
    );

    return { stats: stats }
}
