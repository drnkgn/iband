<section>
    <div>
        <h3>Overview</h3>
        <ul>
            <li><a href="/wiki/">Introduction</a></li>
            <li><a href="/wiki/guide">Guide</a></li>
            <li><a href="/wiki/abbreviations">Abbreviations</a></li>
        </ul>
    </div>
    <slot></slot>
</section>

<style>
    section {
        display: flex;
        width: 100%;
        margin: 1rem 0;
    }

    div {
        min-width: 310px;
        padding: 1rem;
        border-right: 1px var(--gray) solid;
    }

    ul {
        list-style: none;
    }

    li {
        margin: 0.5rem 0;
    }

    a {
        text-decoration: none;
        color: gray;
    }

    :global(p) {
        line-height: 26px;
        color: var(--darkergray);
    }

    :global(h1) {
        font-size: 30px;
    }

    :global(.content) {
        max-width: 55%;
        padding: 1rem;
    }
</style>
