<script>
    import index from "./index.json";
</script>

<div class="content">
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
    table {
        margin-left: 2rem;
        color: var(--darkergray);
    }

    td:first-child {
        width: 200px;
    }
</style>
