import { Link } from 'react-router-dom';
import styles from './Mark.module.scss';

export interface IMarkProps {
  _id: string,
  value: number;
  weight: number;
  date: string;
}

export function Mark(props: IMarkProps) {
  return (
    <Link to={`/marks/${props._id}`}>
      <div className={styles.mark}>
        <span className={styles.mark__value}>{props.value}</span>
        {props.weight !== 1 ? (
          <sub className={styles.mark__weight}>{props.weight}</sub>
        ) : (
          ''
        )}
      </div>
    </Link>
  );
}
