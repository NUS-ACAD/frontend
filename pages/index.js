import Container from '../components/Container';
import Footer from '../features/landing/Footer';
import Header from '../features/landing/Header';
import Hero from '../features/landing/Hero';
import SITE from '../site.config';

export default function Landing() {
  return (
    <>
      <Header />
      <Container
        className="items-center"
        title={SITE.title}
        description={SITE.description}
        padding
      >
        <Hero />
        <Footer />
      </Container>
    </>
  );
}
