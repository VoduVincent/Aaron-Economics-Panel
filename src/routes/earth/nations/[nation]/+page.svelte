<script lang="ts">

    import type { PageData } from './$types';

    import '@carbon/charts-svelte/styles.css'
    import { LineChart } from '@carbon/charts-svelte'

	export let data: PageData;


const popLineOptions = {
    title: "Population over Time",
    axes: {
        bottom:{
            title: "Yearly Population",
            mapsTo: "key",
            scaleType: "labels"
        },
        left:{
            mapsTo: "value",
            title: "Population",
            scaleType: "linear"
        },
    },
    height: "400px",
    width: "600px"
}

</script>

<h1>{data.nation}</h1>

<LineChart data={data.popChartData} options={popLineOptions}/>
