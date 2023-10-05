import { PropsWithChildren } from 'react';

export type DescriptionCellProps = PropsWithChildren

export default function DescriptionCell({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}
