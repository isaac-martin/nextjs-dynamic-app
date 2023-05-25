export default function Changes(props) {
  return (
    <main>
      changes-props.js <div id="message">{props.message}</div>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      message: 'not rewritten message',
    },
  };
}
