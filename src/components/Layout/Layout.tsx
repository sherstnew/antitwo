import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

export interface ILayoutProps {
  children: string | JSX.Element | React.ReactChild | React.ReactFragment | React.ReactPortal | boolean | null | undefined
}

export function Layout (props: ILayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        {
          props.children
        }
      </div>
    </div>
  );
};
