import Container from '../components/Container';
import Header from '../components/Header';
import SITE from '../site.config';

import Arrow from '../assets/svgr/ButtonArrow';
import Button from '../components/Button';

export default function Welcome() {
  return (
    <>
      <Header />
      <Container
        className="pt-28"
        title={SITE.title}
        description={SITE.description}
        padding
      >
        <div className="rounded-3xl w-full overflow-hidden welcome-hero mb-8">
          <div className="w-full h-full px-8 md:px-24 flex flex-col items-start justify-start md:justify-center">
            <div className="flex flex-col mt-16 md:mt-0 items-center md:items-start">
              <h1 className="text-5xl md:text-7xl mb-2.5 md:mb-8 font-bold welcome-hero-title text-center md:text-left">
                The academic planner you never knew you needed.
              </h1>
              <h2 className="text-xl md:text-2xl mb-8 md:leading-normal font-semibold welcome-hero-subtitle text-center md:text-left">
                Plan your university journey together with your friends
                effortlessly now.
              </h2>
              <Button
                label="Get Started"
                icon={<Arrow />}
                className="blue-button"
              />
            </div>
          </div>
          {/* TODO: Add absolute background element */}
        </div>
      </Container>
    </>
  );
}
