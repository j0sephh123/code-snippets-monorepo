import { useEffect, useState } from 'react';
import { IconCopy } from '@tabler/icons-react';
import { ActionIcon, Tooltip } from '@mantine/core';

type Props = {
  onClick: VoidFunction;
  className?: string;
};

const Copy = ({ onClick, className }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleTooltipClick = () => {
    onClick();
    setIsClicked(true);
  };

  useEffect(() => {
    if (!isClicked) return;

    const timeout = window.setTimeout(() => {
      setIsClicked(false);
    }, 1200);

    return () => {
      clearTimeout(timeout);
    };
  }, [isClicked]);

  return (
    <Tooltip label={isClicked ? 'Copied' : 'Copy'}>
      <ActionIcon
        onClick={handleTooltipClick}
        size="lg"
        variant={isClicked ? 'filled' : 'subtle'}
        className={className}
      >
        <IconCopy />
      </ActionIcon>
    </Tooltip>
  );
};

export default Copy;
