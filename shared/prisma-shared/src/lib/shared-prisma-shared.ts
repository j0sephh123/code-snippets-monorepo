import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getAllPosts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true, // include the author information for each post
    },
  });
  return posts;
}

export async function prismaGetAllPosts() {
  try {
    const posts = await getAllPosts();

    return posts;
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
        authorId: 1
      },
    });

    return createdPost;
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
}
