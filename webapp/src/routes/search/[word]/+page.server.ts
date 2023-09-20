import { queryWord, matchWord } from "$lib/util/dictionary";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    let entry = await queryWord(params.word);

    return {
        query: params.word,
        found: entry !== undefined,
        entry: entry,
        suggestions: matchWord(params.word, params.word[0], 10),
    }
}
