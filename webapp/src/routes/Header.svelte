<script>
    import XMark from "./XMark.svelte";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    let inputRef;

    function handleSearch(e) {
        if (e.key === "Enter")
            goto(`/search/${inputRef.value}`);

    }

    function handleClear() {
        if (inputRef.value !== "")
            inputRef.value = "";
    }
</script>

<header>
    <div>
        <input
            name="search-word"
            type="search"
            placeholder="Search for a word"
            on:keydown={handleSearch}
            bind:this={inputRef}
            />
        <span on:click={handleClear}>
            <XMark size={{x: "15px", y: "15px"}} />
        </span>
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 12em;
        border-radius: 0 0 20px 20px;
        box-shadow: var(--bs-medium);
    }

    div {
        display: flex;
        align-items: center;
        width: 55%;
        padding: 0.7rem;
        border: 2px var(--gray) solid;
        border-radius: 20px;
    }

    div:focus-within {
        border: 2px gray solid;
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
    }

    input:focus {
        outline: none;
    }

    :global(.xmark) {
        fill: var(--gray);
    }

    :global(span:hover .xmark) {
        fill: gray;
    }
</style>
