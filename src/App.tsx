import React, {useState} from 'react';
import HomeHeader from './components/HomeHeader/HomeHeader';
import styles from './App.module.scss';


const App: React.FC = () => {
  const [openCreateArmy, setOpenCreateArmy] = useState(false);
  return (
    <div className={styles.AppContainer}>
      <HomeHeader/>
      <button onClick={() => setOpenCreateArmy(!openCreateArmy)}>Créer une liste d'armée</button>
      {openCreateArmy && <div>Selectionner une armée</div>}
    </div>
  );
}

export default App;
