type Props = {
  extension: string;
};

export default function LanguageCell({ extension }: Props) {
  return <div>{extension}</div>;
}
