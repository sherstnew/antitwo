import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

export function Header () {
  return (
    <header className={styles.header}>
      <Link to='/'>Главная</Link>
      <Link to='/create/mark'>Добавить оценку</Link>
    </header>
  );
};
