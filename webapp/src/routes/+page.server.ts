import { getStats } from "$lib/util/dictionary";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return { stats: await getStats() }
}
