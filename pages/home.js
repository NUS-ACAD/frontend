import SITE from '../site.config';

const { default: Container } = require('../components/Container');

function Home() {
  return (
    <Container title={`Home | ${SITE.title}`} description={SITE.description}>
      Hello
    </Container>
  );
}

export default Home;
