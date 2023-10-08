import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import mapPrismaEnumToLibraryLang from '../../utils/dataTransforms/mapPrismaEnumToLibraryLang';
import { Language } from '@prisma/client';

type Props = {
  language: Language;
  code: string;
};

export default function CodeBlock({ language, code }: Props) {
  return (
    <SyntaxHighlighter
      wrapLines
      language={mapPrismaEnumToLibraryLang(language)}
      style={atomDark}
      showLineNumbers
      customStyle={{
        border: '1px solid gray',
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}
