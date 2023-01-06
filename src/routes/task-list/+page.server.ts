import { Prisma, PrismaClient } from '@prisma/client'
import type { PageServerLoad, RequestEvent } from './$types';
import type { Actions } from './$types';

const prisma = new PrismaClient()

export const load = (async ({ params }) => {
    const prisma = new PrismaClient()
    let taskpre = await prisma.task.findMany()

    return {
        tasks: taskpre,
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    
    const task = await prisma.task.create({
      data: {
        title: data.get("title") as string,
        description: data.get("description") as string,
      },
    })
  },

};