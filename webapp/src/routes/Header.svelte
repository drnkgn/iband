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
        width: 55%;
        padding: 0.7rem;
        border: 2px var(--gray) solid;
        border-radius: 20px;
    }

    input {
        width: 100%;
        border: none;
    }

    input:focus {
        outline: none;
    }
</style>

<script>
    import { goto } from "$app/navigation";

    function handleSearch(e) {
        if (e.key === "Enter")
            goto(`/search/${e.target.value}`);

    }
</script>

<header>
    <div>
        <input
            name="search-word"
            type="search"
            placeholder="Search for a word"
            on:keydown={handleSearch}
            />
    </div>
</header>
