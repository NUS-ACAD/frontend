import { useState } from 'react';
import Container from '../components/Container';
import Footer from '../features/landing/Footer';
import Header from '../features/landing/Header';
import Hero from '../features/landing/Hero';
import LoginModal from '../features/landing/LoginModal';
import SITE from '../site.config';

function Landing() {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <Header setIsModalShown={setIsModalShown} />
      <Container
        className="items-center"
        title={SITE.title}
        description={SITE.description}
        padding
        isBlackBg
      >
        <Hero setIsModalShown={setIsModalShown} />
        <Footer />
      </Container>
      <LoginModal isShown={isModalShown} setIsShown={setIsModalShown} />
    </>
  );
}

export default Landing;
