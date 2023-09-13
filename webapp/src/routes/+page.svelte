<script>
    export let data;
</script>

<section>
    <div>
        <h1>Welcome</h1>
        <p>Feeling stuck? Visit the <a href="/wiki">wiki</a> to learn more.
    </div>
    <div>
        <h1>Stats</h1>
        <p>Currently <span>{data.stats.total}</span> words have been indexed.</p>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin: 1rem 0;
    }

    div {
        width: 60%;
    }

    h1 {
        font-size: 30px;
    }

    span {
        font-size: 20px;
        font-weight: bold;
    }
</style>
