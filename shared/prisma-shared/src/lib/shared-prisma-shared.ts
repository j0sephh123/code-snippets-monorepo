import { Language } from '@prisma/client';
import PrismaInstance from './PrismaInstance';

// TODO implement an interface
// TODO load PrismaInstance in the constructor
export class DataSource {
  getAllSnippets() {
    return PrismaInstance.getInstance().snippet.findMany();
  }
  // TODO find a way to handle types. Passing the trpc input gives a
  // strange `ts` error
  createSnippet({
    code,
    language,
    description,
  }: {
    code: string;
    description: string;
    language: Language;
  }) {
    return PrismaInstance.getInstance().snippet.create({
      data: {
        code,
        language,
        description,
        authorId: 1,
      },
    });
  }
  getOneSnippet(id: number) {
    try {
      return PrismaInstance.getInstance().snippet.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (e) {
      return null;
    }
  }
  deleteSnippet(id: number) {
    return PrismaInstance.getInstance().snippet.delete({
      where: { id },
    });
  }
  updateSnippetDescription({
    id,
    description,
  }: {
    id: number;
    description: string;
  }) {
    try {
      return PrismaInstance.getInstance().snippet.update({
        where: {
          id,
        },
        data: {
          description,
        },
      });
    } catch (e) {
      return null;
    }
  }
}
