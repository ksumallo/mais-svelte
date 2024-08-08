<script>
    let options = ["cmsc_124", "cmsc_125"];
</script>

<select>
    {#each options as option, i}
        <option value={i}> {option} </option>
    {/each}
</select>

<style>
    select {
        width: 100%;
        background-color: maroon;
        color: white;
        padding: 8px;
        border-radius: 4px;
    }
</style>