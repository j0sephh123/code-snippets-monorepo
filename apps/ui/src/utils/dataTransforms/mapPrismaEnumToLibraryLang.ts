import { Language } from '@prisma/client';

export default function mapPrismaEnumToLibraryLang(language: Language) {
  switch (language) {
    case 'JavaScript':
      return 'javascript';
    case 'TypeScript':
      return 'typescript';
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}
