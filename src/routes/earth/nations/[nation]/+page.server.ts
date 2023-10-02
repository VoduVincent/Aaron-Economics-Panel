import { Chart } from 'chart.js';
import type { PageServerLoad } from './$types';



export const load: PageServerLoad = async ({ params,url }) => {

   const data = await (await fetch(`${url.origin}/api/earth/data/city/?year=0&nation=${params.nation}`)).json()

   let _years_ = data.toSorted((a:any,b:any) => b.year - a.year)
   let years = [...new Set(_years_.map((item: { year: any; }) => item.year))]

   let totalpop = data.map()

   let popChartData = data.map(({month,year,pop}) => {
      return {
            time: `${year}M${month}` ,
            pop: pop 
      }
   })


   console.log(popChartData)
 return {
    data: data,
    years:years,
    nation: params.nation,
    popChartData: popChartData
 }
}
