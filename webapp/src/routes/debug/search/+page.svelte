<script>
    // bukit. (M.) Hill, steep land, mountain: (a) distinct from gunong, large
    // forested mountain; paya', swamp, silt; emperan, undulating land, river, level,
    // flood plain; kerapa, upland peat; munggu', low hill; (b) indicator of plant
    // varie-ties, e.g.: padi b., hill or 'dry' rice; ru' b., hill casuarina tree; (c)
    // as first part of place names, e.g., B. Balau, B. Batu, B. Kelingkang, B.
    // Lesong, B. Salong. Parts of a hill are: tatai, slope, flank; genting, saddle;
    // tinting, ridge; kaki, foot.
    let entry = {
        word: "bukit",
        meanings: [
            {
                definition: "(M.) Hill, steep land, mountain",
                contexts: [
                    "distinct from gunong, large forested mountain; paya' \
                        swamp, silt; emperan, undulating land, river, level \
                        flood plain; kerapa, upland peat; munggu', low hill;",
                ],
                examples: [],
                synonyms: [],
            }
        ]
    }
</script>

<section>
    <div class="card">
        <h1>{entry.word}</h1>
        <ol>
            {#each entry.meanings as meaning}
                <li>{meaning.definition}</li>
            {/each}
        </ol>
    </div>
</section>

<style>
    section {
        padding: 1rem;
        padding-left: 5em;
    }

    div {
        width: 60%;
        height: fit-content;
        padding: 1rem;
    }

    h1 {
        border-bottom: 1px var(--gray) solid;
        padding-bottom: 1rem;
    }

    li {
        margin: 1rem 0;
    }

    blockquote {
        padding: 5px 20px 5px 20px;
        border-left: 4px solid darkgray;
        margin-left: 10px;
        font-size: 14px;
        color: var(--darkgray);
        background-color: var(--lightgray);
    }

    @media (max-width: 800px) {
        section {
            padding: 1rem;
        }

        div {
            width: 100%;
        }
    }
</style>
