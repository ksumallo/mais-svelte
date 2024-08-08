<script>
    const days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    import moment from "moment";

    function* timeStepper() {
        let lower = moment.utc("07:00AM", "hh:mmA")
        while(true) {
            yield lower.format("hh:mmA") + " - " + lower.add("30", "minutes").format("hh:mmA")
        }
    }

    const stepper = timeStepper()
</script>

<div id="wrapper">
    <table>
        <tr>
            {#each days as day}
                <td class="header"> {day} </td>
            {/each}
        </tr>
        
        {#each Array(24) as a}
            <tr>
                <td> {stepper.next().value} </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
            </tr>
        {/each}
    </table>
</div>


<style>
    table {
        width: 100%;
        border: 3px solid black;
        padding: 4px;
        table-layout: fixed;
    }

    td {
        padding: 4px;
        border: 1px solid black;
        border-radius: 4px;
        font-size: 70%;
    }

    .header {
        color: white;
        background-color: maroon;
        text-align: center;
    }

    #wrapper {
        resize: horizontal;
        overflow-x: scroll;
    }
</style>