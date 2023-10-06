type CodeCellProps = {
  codeBlock: string;
};

export default function CodeCell({ codeBlock }: CodeCellProps) {
  return <div>{codeBlock}</div>;
}
