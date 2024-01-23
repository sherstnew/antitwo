import styles from './CreateMark.module.scss';
import { Layout } from '../../components/Layout/Layout';
import { useEffect, useState } from 'react';

export function CreateMark() {
  const [value, setValue] = useState<number>(5);
  const [weight, setWeight] = useState<number>(1);
  const [date, setDate] = useState<string>('');
  const [groupID, setGroupID] = useState<string>('');
  const [studentID, setStudentID] = useState<string>('');

  const [groups, setGroups] = useState<any>([]);

  useEffect(() => {
    if (groups.find((group: any) => group._id === groupID)) {
      setStudentID(groups.find((group: any) => group._id === groupID).students[0]._id);
    };
  }, [groupID]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/groups`)
      .then((data) => data.json())
      .then((groupsData) => {
        setGroups(groupsData);
        setGroupID(groupsData[0]._id);
        setStudentID(groupsData[0].students[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const createMark = () => {
    if (studentID && groupID) {
      const mark = {
        value: value,
        weight: weight,
        date: date,
        studentID: studentID,
        groupID: groupID,
      };
      fetch(`${process.env.REACT_APP_BACKEND_URL}/marks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mark),
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
          <label htmlFor='value' className={styles.label}>
            Введите оценку
          </label>
          <input
            type='number'
            id='value'
            className={styles.input}
            value={value}
            onChange={(evt) => setValue(Number(evt.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='weight' className={styles.label}>
            Введите вес оценки
          </label>
          <input
            type='number'
            id='weight'
            className={styles.input}
            value={weight}
            onChange={(evt) => setWeight(Number(evt.target.value))}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor='date' className={styles.label}>
            Введите дату оценки
          </label>
          <input
            type='date'
            id='date'
            className={styles.input}
            onChange={(evt) => setDate(evt.target.value)}
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
        <div className={styles.field}>
          <label htmlFor='studentID' className={styles.label}>
            Выберите ученика
          </label>
          {groups.length > 0 ? (
            <select
              className={styles.select}
              name='studentID'
              id='studentID'
              onChange={(evt) => setStudentID(evt.target.value)}
            >
              {groups
                .find((grp: any) => grp._id === groupID)
                .students.map((stdnt: any) => (
                  <option key={stdnt._id} value={stdnt._id}>
                    {stdnt.name}
                  </option>
                ))}
            </select>
          ) : (
            ''
          )}
        </div>
        <div className={styles.btn_container}>
          <button className={styles.btn} onClick={createMark}>
            Создать
          </button>
        </div>
      </main>
    </Layout>
  );
}
