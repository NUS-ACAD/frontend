import { useState } from 'react';
import Container from '../components/Container';
import Footer from '../features/landing/Footer';
import Header from '../features/landing/Header';
import Hero from '../features/landing/Hero';
import LoginModal from '../features/landing/LoginModal';
import SITE from '../site.config';

export default function Landing() {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <Header setIsModalShown={setIsModalShown} />
      <Container
        className="items-center"
        title={SITE.title}
        description={SITE.description}
        padding
      >
        <Hero />
        <Footer />
      </Container>
      <LoginModal isShown={isModalShown} setIsShown={setIsModalShown} />
    </>
  );
}
