<script>
	import ClassListItem from "./ClassListItem.svelte";

    export let items 
</script>

<div id="wrapper">
    <h2> Search Results </h2>
    {#each items as data}
        <ClassListItem {data} />
    {/each}
</div>

<style>
    #wrapper {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background-color: #fafafa;
        border-radius: 8px;
        gap: 4px;
        max-height: 40vh;
        overflow: scroll;
    }

    h2 {
        margin: 4px;
    }
</style>