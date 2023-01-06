import { PrismaClient } from '@prisma/client';
import type { PageServerLoad, RequestEvent } from './$types';
import type { Actions } from './$types';
 
export const load = (async ({ params }) => {
    const prisma = new PrismaClient()
    let taskpre = await prisma.task.findMany()

    prisma.$disconnect
    return {
        tasks: taskpre,
    }
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({request}: RequestEvent) => {
        const formdata = await request.formData()

        let title = formdata.get("taskName") as string
        let description = formdata.get("description") as string
        
        let prisma = new PrismaClient()
    
        async function query() {

            const task = await prisma.task.create({
          
              data: {
                title: title,
                description: description
              },
          
            })
          
            console.log(query)
          
          }
    }
  };
/*
export const post = async ({ request}: RequestEvent) => {
    const formdata = await request.formData()

    let title = formdata.get("taskName") as string
    let description = formdata.get("description") as string
    
    let prisma = new PrismaClient()

    const task = await prisma.task.create({

        data: {
            title: title,

            description: description,
        },
    
      })
    console.log(task)
}
*/