import styles from './CreateBtn.module.scss';
import addIcon from '../../static/icons/add.png';

export function CreateBtn() {
  return (
    <img src={addIcon} alt='' className={styles.add} />
  );
}
