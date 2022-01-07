import SITE from '../site.config';
import Container from './Container';

function NotAllowed() {
  return (
    <Container
      title={`No Access | ${SITE.title}`}
      description={SITE.description}
    >
      You do not have access to this page!
    </Container>
  );
}

export default NotAllowed;
