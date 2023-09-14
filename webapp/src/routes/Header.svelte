<script>
    import House from "$lib/assets/House.svelte";
    import SearchBar from "$lib/components/SearchBar.svelte";
</script>

<header>
    <a title="Home" href="/"><House size={{x: "20px", y: "20px"}}/></a>
    <SearchBar style="width:55%;" />
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

    a {
        margin: 0.5rem;
    }

    a:hover {
        cursor: pointer;
    }

    :global(.house) {
        fill: var(--gray);
    }

    :global(a:hover .house) {
        fill: gray;
    }
</style>
