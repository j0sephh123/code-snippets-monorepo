import { Language } from '@prisma/client';
import PrismaInstance from './PrismaInstance';

// TODO implement an interface
// TODO load PrismaInstance in the constructor
class DataSource {
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
}

export default DataSource;
