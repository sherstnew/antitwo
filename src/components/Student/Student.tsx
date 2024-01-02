import styles from './Student.module.scss';
import { Mark } from '../Mark/Mark';

export interface IStudentProps {
  name: string;
  marks: any[];
}

export function Student(props: IStudentProps) {
  return (
    <div className={styles.student}>
      <div className={styles.student__name}>{props.name}</div>
      <div className={styles.student__marks}>
        {props.marks.map((mark: any) => (
          <Mark
            key={mark._id}
            _id={mark._id}
            value={mark.value}
            weight={mark.weight}
            date={mark.date}
          />
        ))}
      </div>
    </div>
  );
}
