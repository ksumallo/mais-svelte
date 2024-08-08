<script>
    export let data
</script>

<div id="list-item">
    <span id="title"> {data.code} - {data.section}</span>
    <div class="sched-row"> Lecture: 
        <div class="sched-row">
            {#each data.lecDays as lecDay}
                <div class="chip"> {lecDay} </div>
            {/each}
            {data.lecSched} 
        </div>
    </div>
    <div>
        {data.lecProfs}
    </div>

    
    {#if data.hasLab}
        <hr>
        <div class="sched-row"> Lab: 
            <div class="sched-row">
                <div class="chip"> {data.labDay} </div>
                {data.labSched}
            </div>
        </div>
        <div>
            {data.labProfs}
        </div>
    {/if}
</div>

<style>
    #list-item {
        padding: 8px;
        border-radius: 8px;
        border: 3px solid rgb(59,130,246);
        cursor: pointer;
    }
    
    #list-item:hover {
        color: white;
        background-color: green;
        transition: background-color 0.1s;
    }

    #title {
        font-weight: bold;
    }

    .chip {
        padding: 0.25em 0.4em;
        color: white;
        background-color: maroon;
        border-radius: 6px;
    }

    .sched-row {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }
</style>