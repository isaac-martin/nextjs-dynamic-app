export default function Home(props) {
  return <main>index.js {props.message}</main>;
}

export async function getStaticProps() {
  return {
    props: {
      message: 'not rewritten message',
    },
  };
}
