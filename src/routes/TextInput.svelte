<script>
	import { createEventDispatcher } from "svelte";

    let content = ""

    const dispatch = createEventDispatcher()

    function search() {
        dispatch("submit", {
            query: content
        })
    }
</script>

<div>
    <input type="text" title="subject" bind:value={content}/>
    <button type="submit" on:click={search}> Search </button>
</div>

<style>
    div {
        display: flex;
    }

    input {
        width: 100%;
        border: 1px solid maroon;
        padding: 8px;
        border-radius: 4px;
    }
</style>