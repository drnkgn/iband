<script>
    export let data;
</script>

<section>
    <div class="card">
        {#if data.found}
            <h1>{data.entry.word}</h1>
            <ol>
                {#each data.entry.meanings as meaning}
                    <li class="definition">
                        {meaning.definition}.
                        {#if meaning.note.length > 0}
                            <a>[more info]</a>
                        {/if}
                    </li>
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
                We couldn't find <i>{data.query}</i>. Try check your spelling
                again.
            </p>
        {/if}
    </div>
    <div class="card">
        <h1>Words that might interest you</h1>
        <ul>
            {#each data.suggestions as suggestion}
                <li>
                    <a href={`/search/${suggestion}`}>{suggestion}</a>
                </li>
            {/each}
        </ul>
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
        margin: 1rem;
    }

    h1 {
        border-bottom: 1px var(--gray) solid;
        padding-bottom: 1rem;
    }

    ul {
        list-style: none;
        columns: 4;
    }

    .definition {
        margin: 1rem 0;
    }

    a {
        color: rgb(47, 129, 247);
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
