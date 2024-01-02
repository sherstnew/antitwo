import styles from './CreateStudent.module.scss';
import { Layout } from '../../components/Layout/Layout';
import { useEffect, useState } from 'react';

export function CreateStudent() {
  const [studentName, setStudentName] = useState<string>('');
  const [groupID, setGroupID] = useState<string>('');

  const [groups, setGroups] = useState<any>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/groups')
      .then((data) => data.json())
      .then((groupsData) => {
        setGroups(groupsData);
        setGroupID(groupsData[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createStudent = () => {
    if (studentName && groupID) {
      const student = {
        name: studentName,
        marks: [],
        groupID: groupID,
      };
      fetch(`http://127.0.0.1:5000/students/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      })
        .then(() => {
          window.location.href = '/';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.info}>Создание ученика</div>
        <div className={styles.field}>
          <label htmlFor='studentName' className={styles.label}>
            Введите имя и фамилию ученика
          </label>
          <input
            type='text'
            id='studentName'
            className={styles.input}
            onChange={(evt) => setStudentName(evt.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='groupID' className={styles.label}>
            Выберите класс
          </label>
          {groups.length > 0 ? (
            <select
              className={styles.select}
              name='groupID'
              id='groupID'
              onChange={(evt) => setGroupID(evt.target.value)}
            >
              {groups.map((group: any) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          ) : (
            ''
          )}
        </div>
        <div className={styles.btn_container}>
          <button className={styles.btn} onClick={createStudent}>
            Создать
          </button>
        </div>
      </main>
    </Layout>
  );
}
