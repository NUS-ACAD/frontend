import { motion } from 'framer-motion';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import SITE from '../site.config';

import SidebarContent from '../features/home/SidebarContent';
import NotAllowed from '../components/NotAllowed';
import { getHome } from '../services/home';
import FeedCard from '../features/home/FeedCard';
import PlanCard from '../components/PlanCard';

const { default: Container } = require('../components/Container');

function Home() {
  const hour = new Date().getHours();
  // eslint-disable-next-line no-nested-ternary
  const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  const user = useStoreState((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;

    const fetch = async () => {
      await getHome()
        .then((homeData) => {
          if (!didCancel) {
            setData(homeData);
            setIsLoading(false);
          }
        })
        .catch(() => {
          // TODO: Error handling
          setIsLoading(false);
        });
    };

    fetch();

    return () => {
      didCancel = true;
    };
  }, []);

  if (user == null) {
    return <NotAllowed />;
  }

  return (
    <Container title={`Home | ${SITE.title}`} description={SITE.description}>
      <Sidebar>
        <SidebarContent
          plan={
            data?.plans?.filter((plan) => plan.isPrimary).length > 0
              ? data?.plans?.filter((plan) => plan.isPrimary)[0]
              : null
          }
          group={data?.groups?.length > 0 ? data.groups[0] : null}
          activities={data?.recentActivities}
          isLoading={isLoading}
        />
      </Sidebar>
      <div className="sidebar-right mt-8 px-4">
        <motion.h1 className="text-2xl mb-4">
          Good {timeOfDay}, <strong>Hanming</strong>!
        </motion.h1>
        <div className="w-full flex">
          <div className="flex flex-col home-activity-feed mr-4">
            <motion.h2 className="font-semibold mb-2">All activity</motion.h2>
            {data?.feed?.map((activity) => (
              <FeedCard activity={activity} key={activity.id} />
            ))}
          </div>
          <div className="flex flex-col home-recommendations">
            <motion.h2 className="font-semibold mb-2">Explore plans</motion.h2>
            {data?.recommendations?.map((recc) => (
              <div key={recc.id} className="mb-2">
                <PlanCard plan={recc} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
