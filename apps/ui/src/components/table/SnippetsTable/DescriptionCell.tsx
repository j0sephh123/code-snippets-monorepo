import { PropsWithChildren } from 'react';

type Props = PropsWithChildren

export default function DescriptionCell({ children }: Props) {
  return <div>{children}</div>;
}
