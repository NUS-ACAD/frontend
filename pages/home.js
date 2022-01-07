import { motion } from 'framer-motion';
import { useStoreState } from 'easy-peasy';
import Sidebar from '../components/Sidebar';
import { FAKE_GROUP_BRIEF, FAKE_PLAN_BRIEF } from '../data/fakeData';
import SITE from '../site.config';

import SidebarContent from '../features/home/SidebarContent';
import NotAllowed from '../components/NotAllowed';

const { default: Container } = require('../components/Container');

function Home() {
  const hour = new Date().getHours();
  // eslint-disable-next-line no-nested-ternary
  const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  const user = useStoreState((state) => state.user);

  if (user == null) {
    return <NotAllowed />;
  }

  return (
    <Container title={`Home | ${SITE.title}`} description={SITE.description}>
      <Sidebar>
        <SidebarContent plan={FAKE_PLAN_BRIEF} group={FAKE_GROUP_BRIEF} />
      </Sidebar>
      <div className="sidebar-right mt-8 pl-4">
        <motion.h1 className="text-2xl mb-4">
          Good {timeOfDay}, <strong>Hanming</strong>!
        </motion.h1>
        <div className="w-full flex">
          <div className="flex flex-col home-activity-feed">
            <motion.h2 className="font-semibold mb-2">All activity</motion.h2>
          </div>
          <div className="flex flex-col home-recommendations">
            <motion.h2 className="font-semibold mb-2">Explore plans</motion.h2>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
