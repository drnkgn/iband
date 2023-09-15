<script>
    import { setContext } from "svelte";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";

    export let data;

    setContext("word-index", data.index);
</script>

<Header />
<slot></slot>
<Footer />
