import styles from './MarkPage.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { Mark } from '../../components/Mark/Mark';

export function MarkPage() {
  const { markId } = useParams();

  const [mark, setMark] = useState<any>({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/marks/${markId}`)
      .then((res) => res.json())
      .then((markData) => {
        setMark(markData[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [markId]);

  return (
    <Layout>
      {mark ? (
        <div className={styles.mark}>
          <Mark
            _id={mark._id}
            value={mark.value}
            weight={mark.weight}
            date={mark.date}
          />
          <div className={styles.date}>{mark.date}</div>
        </div>
      ) : (
        ''
      )}
    </Layout>
  );
}
