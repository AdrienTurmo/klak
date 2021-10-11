import React, { useState } from 'react';
import styles from './AddOptionLine.module.scss';
import { Button } from 'components';

interface Props {
  option: Option;
  onClickAdd: (withSubOption: boolean) => void;
}

export const AddOptionLine: React.FC<Props> = ({ option, onClickAdd }) => {
  const [withSubOption, setWithSubOption] = useState(false);

  return (
    <div key={option.name} className={styles.AddOptionLine} data-testid="AddOptionLine">
      <Button className={styles.AddOptionLineButton} onClick={() => onClickAdd(withSubOption)} data-testid="AddOptionLineAddButton">
        {option.name}
      </Button>
      <span className={styles.AddOptionLinePoints}>
        {`${option.points} pt${option.points > 1 ? 's' : ''}${option.type === 'BY_UNIT' ? '/unité' : ''}`}
      </span>
      {option.subOption && (
        <>
          <input type="checkbox" onChange={() => setWithSubOption(!withSubOption)} data-testid="AddOptionLineSubOptionCheckbox" />
          <span>{option.subOption.name}</span>
          <span className={styles.AddOptionLinePoints}>
            {`${option.subOption.points} pt${option.subOption.points > 1 ? 's' : ''}${option.type === 'BY_UNIT' ? '/unité' : ''}`}
          </span>
        </>
      )}
    </div>
  );
};
