<script>
    import XMark from "$lib/assets/XMark.svelte";
    import { goto } from "$app/navigation";
    export let style;

    let inputRef;
    let inputVal = "";

    function handleOnChange(e) {
        inputVal = e.target.value;
    }

    function handleSearch(e) {
        if (e.key === "Enter")
            goto(`/search/${inputRef.value}`);
    }

    function handleClickedPredict(e) {
        goto(`/search/${e.target.innerHTML}`);
    }

    function handleClear() {
        if (inputRef.value !== "") {
            inputVal = "";
            inputRef.value = "";
        }
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
            <li on:click={handleClickedPredict}>{inputVal}</li>
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
        margin: 0;
        padding: 0.7rem;
        border: 2px var(--gray) solid;
        border-top: 0;
        border-radius: 0 0 20px 20px;
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

    li:hover {
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
