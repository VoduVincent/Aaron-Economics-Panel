import type { PageServerLoad } from './$types';

import { Chart } from 'chart.js';

export const load: PageServerLoad = async ({ params,url }) => {

	let data = await (await fetch(`${url.origin}/api/earth/data/city/?year=${0}&nation=`)).json()


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