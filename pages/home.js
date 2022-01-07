import Sidebar from '../components/Sidebar';
import { FAKE_GROUP_BRIEF, FAKE_PLAN_BRIEF } from '../data/fakeData';
import SITE from '../site.config';

import SidebarContent from '../features/home/SidebarContent';

const { default: Container } = require('../components/Container');

function Home() {
  const hour = new Date().getHours();
  // eslint-disable-next-line no-nested-ternary
  const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  return (
    <Container title={`Home | ${SITE.title}`} description={SITE.description}>
      <Sidebar>
        <SidebarContent plan={FAKE_PLAN_BRIEF} group={FAKE_GROUP_BRIEF} />
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <h1 className="text-2xl">
          Good {timeOfDay}, <strong>Hanming</strong>!
        </h1>
      </div>
    </Container>
  );
}

export default Home;
