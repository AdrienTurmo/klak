import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import { Separator } from 'components/index';

interface Props {
  title?: string;
  onClickClose: () => void;
}

export const Modal: React.FC<Props> = ({ title, onClickClose, children }) =>
  ReactDOM.createPortal(
    <div className={styles.ModalOverlay} onClick={onClickClose}>
      <div className={styles.ModalWrapper}>
        <div className={styles.Modal} onClick={(event) => event.stopPropagation()}>
          {title && (
            <div className={styles.ModalHeader}>
              <div>{title}</div>
              <Separator />
            </div>
          )}
          <div>{children}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
