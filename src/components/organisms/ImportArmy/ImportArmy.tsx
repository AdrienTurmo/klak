import React, { useRef } from 'react';
import { Button } from 'components/atoms/Button/Button';
import styles from './ImportArmy.module.scss';
import { AllArmies } from '_data/allArmies';

interface Props {
  onArmyImport: (version: Version, army: Army, armyUnit: ArmyUnit[]) => void;
}

export const ImportArmy: React.FC<Props> = ({ onArmyImport }) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const uploadFile = () => {
    fileInput.current?.click();
  };

  const readArmyList = () => {
    const armyFile: File | undefined = fileInput.current?.files?.[0];
    if (!armyFile || armyFile.type !== 'application/json') {
      alert('Format de fichier non accepté, application/json uniquement');
      return;
    }

    armyFile.text().then((data) => {
      const armyList = JSON.parse(data) as ArmyList;

      const armiesForVersion: Army[] | undefined = AllArmies.get(armyList.version);
      if (!armiesForVersion) {
        alert(`Version ${armyList.version} non trouvée`);
        return;
      }
      const army: Army | undefined = armiesForVersion.find((army) => army.name === armyList.armyName);
      if (!army) {
        alert(`Armée ${armyList.armyName} non trouvée`);
        return;
      }

      console.log(armyList.armyUnits);

      onArmyImport(armyList.version, army, armyList.armyUnits || []);
    });
  };
  return (
    <>
      <Button onClick={uploadFile}>Importer une liste d&apos;armée</Button>
      <input type="file" accept="application/json" ref={fileInput} className={styles.ArmyImport} onInput={readArmyList} />
    </>
  );
};
