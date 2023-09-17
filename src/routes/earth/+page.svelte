<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;

	let pop = 0
	data.data.forEach((element) => {if(element.year == data.years[0] && element.month == data.months[0]){
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
