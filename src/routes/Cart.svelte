<script>
	import ClassListItem from "./ClassListItem.svelte";

    export let items
</script>

<div id="wrapper">
    <h2> Cart </h2>
    {#each items as data}
        <ClassListItem {data} />
    {/each}
</div>

<style>
    #wrapper {
        display: block;
        padding: 8px;
        background-color: #fafafa;
        border-radius: 8px;
    }

    h2 {
        margin: 4px;
    }
</style>