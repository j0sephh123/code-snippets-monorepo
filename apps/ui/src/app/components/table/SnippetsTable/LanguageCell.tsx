export type LanguageCellProps = {
  extension: string;
};

export default function LanguageCell({ extension }: LanguageCellProps) {
  return <div>{extension}</div>;
}
