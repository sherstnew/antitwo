import styles from './CreateGroup.module.scss';
import { Layout } from '../../components/Layout/Layout';
import { IStudent } from '../../static/types/IStudent';
import { useState } from 'react';

export function CreateGroup () {

  const [students, setStudents] = useState<IStudent[]>([]);

  const [groupName, setGroupName] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');

  const addStudent = () => {
    if (studentName !== '') {
      setStudents([...students, {name: studentName, marks: []}]);
    };
  };

  const clearStudents = () => {
    setStudents([]);
  };

  const createGroup = () => {
    const group = {
      name: groupName,
      students: students,
    };
    fetch(`${process.env.REACT_APP_BACKEND_URL}/groups/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group)
    })
    .then(() => {
      window.location.href = '/';
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.info}>Создание класса</div>
        <div className={styles.field}>
          <label htmlFor="groupName" className={styles.label}>Введите название класса (номер и букву)</label>
          <input type="text" id="groupName" className={styles.input} onChange={(evt) => setGroupName(evt.target.value)} />
        </div>
        <div className={styles.field}>
          <div className={styles.info}>Добавление учеников</div>
          <label htmlFor="studentName" className={styles.label}>Введите имя ученика</label>
          <input type="text" id="studentName" className={styles.input} onChange={(evt) => setStudentName(evt.target.value)} />
          <div className={styles.btn_container}>
            <button className={styles.btn} onClick={addStudent}>
              Добавить ученика
            </button>
            <button className={styles.btn} onClick={clearStudents}>
              Удалить всех
            </button>
          </div>
        </div>
        <div className={styles.students}>
          {
            students.map(student => <div className={styles.students__name}>- {student.name}</div>)
          }
        </div>
        <div className={styles.btn_container}>
            <button className={styles.btn} onClick={createGroup}>
              Создать
            </button>
          </div>
      </main>
    </Layout>
  );
};
