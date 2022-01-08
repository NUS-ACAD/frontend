import { motion } from 'framer-motion';
import { useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import SITE from '../site.config';

import SidebarContent from '../features/home/SidebarContent';
import NotAllowed from '../components/NotAllowed';
import { getHome } from '../services/home';
import FeedCard from '../features/home/FeedCard';
import PlanCard from '../components/PlanCard';

const { default: Container } = require('../components/Container');

const generateAnim = (delay) => ({
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    opacity: [0, 1, 1, 1],
    y: 0,
    transition: {
      duration: 1.5,
      type: 'spring',
      velocity: 100,
      stiffness: 700,
      damping: 100,
      delay,
    },
  },
});

function Home() {
  const hour = new Date().getHours();
  // eslint-disable-next-line no-nested-ternary
  const timeOfDay = hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening';
  const user = useStoreState((state) => state.user);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
        <motion.h1
          className="text-2xl mb-4"
          variants={generateAnim(1)}
          initial="hidden"
          animate="show"
        >
          Good {timeOfDay}, <strong>{user.name}</strong>!
        </motion.h1>
        <div className="w-full flex">
          <div className="flex flex-col home-activity-feed mr-4">
            <motion.h2
              variants={generateAnim(1.1)}
              initial="hidden"
              animate="show"
              className="font-semibold mb-2"
            >
              All activity
            </motion.h2>
            {data?.feed?.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={generateAnim(1.2 + index * 0.1)}
                initial="hidden"
                animate="show"
              >
                <FeedCard activity={activity} />
              </motion.div>
            ))}
            <motion.div
              variants={generateAnim(1.2 + (data?.feed?.length ?? 0) * 0.1)}
              initial="hidden"
              animate="show"
            >
              <FeedCard
                activity={{
                  activityType: 'welcome',
                  createdAt: user.createdAt,
                  userName: user.name,
                  userId: user.id,
                }}
                key="welcome"
              />
            </motion.div>
          </div>
          <div className="flex flex-col home-recommendations">
            <motion.h2
              variants={generateAnim(1.3)}
              initial="hidden"
              animate="show"
              className="font-semibold mb-2"
            >
              Explore plans
            </motion.h2>
            {data?.recommendations?.map((recc, index) => (
              <motion.div
                variants={generateAnim(1.4 + index * 0.1)}
                initial="hidden"
                animate="show"
                key={recc.id}
                className="mb-2 cursor-pointer"
                onClick={() => {
                  router.push(`/profile/${recc.ownerId}`);
                }}
              >
                <PlanCard plan={recc} />
              </motion.div>
            ))}
            {(data?.feed?.length ?? 0) === 0 && (
              <motion.div
                variants={generateAnim(1.4)}
                initial="hidden"
                animate="show"
                className="text-sm"
                style={{ color: '#7B7B81' }}
              >
                Browse around more and follow more people to see
                recommendations!
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Home;
