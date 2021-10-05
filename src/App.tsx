import React from 'react';
import HomeHeader from './components/HomeHeader/HomeHeader';
import styles from './App.module.scss';


const App : React.FC = () => (
  <div className={styles.AppContainer}>
    <HomeHeader/>
    <button>Créer une liste d'armée</button>
  </div>
)

export default App;
