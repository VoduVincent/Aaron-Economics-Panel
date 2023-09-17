import type { PageServerLoad } from './$types';

import { Chart } from 'chart.js';

function onlyUnique(value, index, array) {
	return array.indexOf(value) === index;
  }

export const load: PageServerLoad = async ({ params }) => {

	let data = await (await fetch(`http://localhost:5173/api/earth/data/city/?year=${1}`)).json()

	let _years_ = data.toSorted((a,b) => b.year - a.year)
	let _months_ = data.toSorted((a,b) => b.month - a.month)



	let months = [...new Set(_months_.map(item => item.month))]
	let years = [...new Set(_years_.map(item => item.year))]


	// let pop = 0
	// data.forEach((element) => {if(element.year == currentYear && element.month == currentMonth){
	// 	pop += element.pop
	// }
	// })
	return {
		months: months,
		years: years,
		data: data
	};
};