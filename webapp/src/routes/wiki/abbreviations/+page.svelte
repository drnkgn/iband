<script>
    import index from "./index.json";
</script>

<div class="content">
    <h1>Abbreviations</h1>
    <p>
        Common English abbreviations are used for units of length, weight,
        volume, and currency; points of the compass; also cf. (compare),
        e.g. (for example), etc. (and others, and the like), i.e.
        (that is). The symbols ' and " for feet and inches (ft., in.),
        and the muliplication sign (×) have been used where there is no
        risk of confusion.
    </p>
    <table>
        <tbody>
            {#each index as entry}
                <tr>
                    <td>{entry.abbv}</td>
                    <td><i>{entry.expand}</i></td>
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
