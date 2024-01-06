import styles from './HomePage.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';
import { CreateBtn } from '../../components/CreateBtn/CreateBtn';

export function HomePage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/groups`)
      .then((res) => res.json())
      .then((groupsData) => {
        setGroups(groupsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <main className={styles.main}>
        <header className={styles.header}>Ваши классы</header>
        <div className={styles.groups_list}>
          {groups.map((group: any) => (
            <Link
              key={group._id}
              className={styles.group}
              to={`/groups/${group ? group._id : ''}`}
            >
              {group.name}, {group.students.length} учеников
            </Link>
          ))}
          <Link to='/create/group'>
            <CreateBtn />
          </Link>
        </div>
      </main>
    </Layout>
  );
}
