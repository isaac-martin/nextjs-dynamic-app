import styles from './page.module.css';

export default function Home(props) {
  console.log('home', props);
  return (
    <main className={styles.main}>
      Page {props.page} {props.message}
    </main>
  );
}

export async function getStaticProps() {
  console.log('get static props running');
  const data = await fetch('https://fancy-hamster-b90cdb.netlify.app/api/isr', {method: 'POST'});

  return {
    props: {
      message: 'Test',
      page: 'Home',
    },
    revalidate: 120, // In seconds
  };
}
