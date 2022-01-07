import { useEffect } from 'react';
import RegisterModal from '../features/register/RegisterModal';
import { Gradient } from '../utils/gradient';

const { default: Container } = require('../components/Container');
const SITE = require('../site.config');

function Register() {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-canvas');
  }, []);

  return (
    <Container
      title={`Register | ${SITE.title}`}
      description={`Register for ${SITE.title} now! ${SITE.description}`}
    >
      <canvas id="gradient-canvas" data-transition-in />
      <RegisterModal />
    </Container>
  );
}

export default Register;
