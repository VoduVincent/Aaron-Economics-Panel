import type { PageServerLoad } from './$types';

import { Chart } from 'chart.js';

function onlyUnique(value: any, index: any, array: string | any[]) {
	return array.indexOf(value) === index;
  }

export const load: PageServerLoad = async ({ params }) => {

	let data = await (await fetch(`http://localhost:5173/api/earth/data/city/?year=${1}`)).json()

	let _years_ = data.toSorted((a:any,b:any) => b.year - a.year)
	let _months_ = data.toSorted((a:any,b:any) => b.month - a.month)

	let _empiers_ = data.toSorted((a:any,b:any) => a.empire.localeCompare(b.empire))

	let months = [...new Set(_months_.map((item: { month: any; }) => item.month))]
	let years = [...new Set(_years_.map((item: { year: any; }) => item.year))]

	let empires = [...new Set(_empiers_.map((item: { empire: any; }) => item.empire))]

	// let pop = 0
	// data.forEach((element) => {if(element.year == currentYear && element.month == currentMonth){
	// 	pop += element.pop
	// }
	// })
	return {
		months: months,
		years: years,
		data: data,
		empires: empires
	};
};