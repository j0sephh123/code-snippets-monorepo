import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function prismaGetAllSnippets() {
  try {
    const snippets = await prisma.snippet.findMany();

    return snippets;
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
}

export async function prismaCreatePost(title: string) {
  try {
    const createdPost = await prisma.post.create({
      data: {
        title,
        authorId: 1,
      },
    });

    return createdPost;
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
}
