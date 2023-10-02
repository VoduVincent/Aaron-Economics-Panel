<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

	let pop = 0
	data.data.forEach((element:any) => {if(element.year == data.years[0] && element.month == data.months[0]){
		pop += element.pop
	}
	})
</script>
<p1 class="text-5xl flex items-center justify-center">
    Earth
</p1>

<p1 class="text-3xl flex items-center justify-center">
    Population:{pop.toLocaleString("en")}
</p1>

<div class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full relative left-3/4 top-13">
	<a href="http://127.0.0.1:8000/">Earth Direct Database</a>
</div>

<p1 class="text-3xl flex items-center justify-left">
    All Nations on the planet:
</p1>
<ul>
	{#each data.empires as empire}
		<li><a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="./earth/nations/{empire}"> {empire} </a></li>
	{/each}
</ul>
