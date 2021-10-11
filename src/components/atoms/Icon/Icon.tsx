import React from 'react';
import styles from './Icon.module.scss';
import CLOSE_BLACK from 'resources/icons/close_black.svg';
import MINUS_WHITE from 'resources/icons/minus_white.svg';
import PLUS_WHITE from 'resources/icons/plus_white.svg';
import TRASH_WHITE from 'resources/icons/trash_white.svg';
import clsx from 'clsx';

const getImage = (icon: Icon): string => {
  switch (icon) {
    case 'Close':
      return CLOSE_BLACK;
    case 'Minus':
      return MINUS_WHITE;
    case 'Plus':
      return PLUS_WHITE;
    case 'Trash':
      return TRASH_WHITE;
  }
};

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  icon: Icon;
  className?: string;
}

export const Icon: React.FC<Props> = ({ icon, className = '', ...rest }) => (
  <img className={clsx(styles.Icon, className)} data-testid="Icon" alt="icon" src={getImage(icon)} {...rest} />
);
