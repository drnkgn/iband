<script>
    import index from "./index.json";
</script>

<div>
    <h1>Quick Guide</h1>
    <p>
        To some of the longer and more important entries in the dictionary:
    </p>
    <table>
        <tbody>
            {#each index as entry}
                <tr>
                    <td>{entry.en}</td>
                    <td><i>{entry.iba}</i></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    div {
        max-width: 55%;
        padding: 1rem;
    }

    h1 {
        font-size: 30px;
    }

    p {
        line-height: 26px;
        color: var(--darkergray);
    }

    table {
        margin-left: 2rem;
        color: var(--darkergray);
    }

    td:first-child {
        width: 200px;
    }
</style>
