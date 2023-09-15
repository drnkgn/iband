<script>
    import XMark from "$lib/assets/XMark.svelte";
    import Fuse from "fuse.js";
    import { goto } from "$app/navigation";

    export let style;
    export let input;

    let inputRef;
    let inputVal = "";
    let results = [];

    function clearInput() {
        inputVal = "";
        inputRef.value = "";
    }

    function handleOnChange(e) {
        inputVal = e.target.value;
        if (input[inputVal[0]] !== undefined)
            results = new Fuse(input[inputVal[0]])
                .search(inputVal)
                .slice(0, 10);
        else
            results = [];
    }

    function handleSearch(e) {
        if (e.key === "Enter") {
            goto(`/search/${inputRef.value}`);
            clearInput();
        }
    }

    function handleClickedPredict(e) {
        goto(`/search/${e.target.innerHTML}`);
        clearInput();
    }

    function handleClear() {
        if (inputRef.value !== "")
            clearInput();
    }
</script>

<div class="search" style={style}>
    <div class={`search-bar ${inputVal && "search-bar-show-result"}`}>
        <input
            type="search"
            placeholder="Search for a word"
            on:keydown={handleSearch}
            on:keyup={handleOnChange}
            bind:this={inputRef}
            />
        <span title="Clear" on:click={handleClear}>
            <XMark size={{x: "15px", y: "15px"}} />
        </span>
    </div>
    <div style={`display: ${inputVal === "" ? "none" : "block"};`}>
        <ul class="search-result" style={style}>
            {#if results.length > 0}
                {#each results as result }
                    <li on:click={handleClickedPredict}>{result.item}</li>
                {/each}
            {:else}
                <li>No results found</li>
            {/if}
        </ul>
    </div>
</div>

<style>
    .search-bar {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.7rem;
        border: 2px var(--gray) solid;
        border-radius: 20px;
    }

    .search-bar:focus-within {
        border: 2px gray solid;
    }

    .search-bar-show-result {
        border-radius: 20px 20px 0 0;
    }

    .search-result {
        position: absolute;
        display: flex;
        flex-direction: column;
        max-height: 300px;
        margin: 0;
        padding: 0;
        border: 2px var(--gray) solid;
        border-top: 0;
        border-radius: 0 0 20px 20px;
        overflow-y: auto;
        scrollbar-width: thin;
        background: white;
        list-style: none;
        color: gray;
    }

    span {
        height: 15px;
    }

    span:hover {
        cursor: pointer;
    }

    input {
        width: 100%;
        border: none;
        color: gray;
    }

    input:focus {
        outline: none;
    }

    li {
        padding: 0.7em;
    }

    li:hover {
        background: var(--gray);
        color: var(--darkgray);
        cursor: pointer;
    }

    :global(.xmark) {
        fill: var(--gray);
    }

    :global(span:hover .xmark) {
        fill: gray;
    }
</style>
