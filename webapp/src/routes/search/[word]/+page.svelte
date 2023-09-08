<script>
    export let data;
</script>

<section>
    <div class="card">
        {#if data.found}
            <h1>{data.entry.word}</h1>
            <ol>
                {#each data.entry.meanings as meaning}
                    <li>{meaning.definition}</li>
                    {#if meaning.examples.length > 0}
                        <blockquote>
                            {#each meaning.examples as example}
                                <p><i>"{example}"</i></p>
                            {/each}
                        </blockquote>
                    {/if}
                {/each}
            </ol>
        {:else}
            <h1>Oops</h1>
            <p>
                It seems like the word you were trying to search does not
                exists. Try to check your spelling again.
            </p>
        {/if}
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

