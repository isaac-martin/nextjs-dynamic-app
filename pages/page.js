import Image from 'next/image';
import styles from './page.module.css';

export default function Home(props) {
  console.log('props', props);
  return <main className={styles.main}>THIS IS {props.message}</main>;
}

export async function getStaticProps() {
  return {
    props: {
      message: 'Message',
      page: 'page',
    },
  };
}
