import styles from './GroupPage.module.scss';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Student } from '../../components/Student/Student';
import { Layout } from '../../components/Layout/Layout';
import { CreateBtn } from '../../components/CreateBtn/CreateBtn';
import { Link } from 'react-router-dom';

export function GroupPage() {
  const [group, setGroup] = useState<any>('');
  const params = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/groups/${params.groupId}`)
      .then((res) => res.json())
      .then((groupData) => {
        setGroup(groupData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.groupId]);

  return (
    <Layout>
      <header className={styles.group__header}>
        <h3>{group.name}</h3>
        <Link to='/create/student'>
          <CreateBtn />
        </Link>
      </header>
      <ol className={styles.group__list}>
        {group !== '' ? group.students.map((student: any) => (
          <li className={styles.item}>
            <Student key={student._id} name={student.name} marks={student.marks} />
          </li>
        )) : ''}
      </ol>
    </Layout>
  );
}
